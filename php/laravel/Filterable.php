<?php

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

use Str;

trait Filterable {
    use Utilities;

    /**
     * Searches a query for $param with $value.
     *
     * @param Builder $query The query to search.
     * @param string $param The param.
     * @param mixed $value The value.
     * @param bool $like Whether to return results "like" $value for $param.
     *
     * @return Builder
     */
    private function search (Builder $query, string $param, $value, bool $like): Builder {
        return collect(is_array($value) ? $value : [$value])
            ->reduce(function ($acc, $v, $index) use ($param, $like) {
                $method = $index > 0 ? 'orWhere' : 'where';

                return $like
                    ? $acc->$method($param, "LIKE", "%{$this->escapeLike($v)}%")
                    : $acc->$method($param, $v);
            }, $query);
    }

    /**
     * Searches for a relational value.
     *
     * @note Can handle nested relations.
     *
     * @param Builder $query The query to search.
     * @param array $relations All relations to get to where the column is.
     * @param string $column The column.
     * @param mixed $value The value.
     * @param bool $like Whether to return results "like" $value for $param.
     *
     * @return Builder
     */
    private function searchRelation (Builder $query, array $relations, string $column, $value, bool $like): Builder {
        $relations = collect($relations);

        $relation = $relations->shift();

        return $query->whereHas($relation, function ($sq) use ($relations, $column, $value, $like) {
            if ($relations->isEmpty()) {
                $this->search($sq, $column, $value, $like);
            } else {
                $this->searchRelation($sq, $relations->all(), $column, $value, $like);
            }
        });
    }

    /**
     * Searches a query for $param with $value.
     *
     * @param Builder $query The query to search.
     * @param string $param The param.
     * @param mixed $value The value.
     * @param bool $like Whether to return results "like" $value for $param.
     *
     * @return Builder
     */
    private function searchFor (Builder $query, string $param, $value, bool $like): Builder {
        if ($value === null) return $query;

        if (strpos($param, '|') !== false) {
            $relationalData = collect(explode('|', $param));

            $column = $relationalData->pop();
            $relations = $relationalData->all();

            return $this->searchRelation($query, $relations, $column, $value, $like);
        }

        return $this->search($query, $param, $value, $like);
    }

    /**
     * Sort $query by $sortBy in $sortOrder order.
     *
     * @param Builder $query The query to search.
     * @param string $param The param.
     * @param mixed $value The value.
     *
     * @return Builder
     */
    private function sort (Builder $query, string $sortBy, $sortOrder = 'asc'): Builder {
        $relations = collect(explode('|', $sortBy));

        $column = $relations->pop();

        if ($relations->count() > 0) {
            return $query; // @todo handle this!
        }

        return $query->orderBy($column, $sortOrder);
    }

    /**
     * Filters a query based on requested params.
     *
     * @param Builder $query The original query.
     * @param Request $request The original request.
     * @param array $filters The params safe to take from the request.
     *
     * @return Builder
     */
    public function scopeFilter (Builder $query, Request $request, array $filters = null): Builder {
        $filters = collect($filters ?? $this->getFilters());

        if ($filters->has('string')) {
            $query = collect($filters->get('string'))->reduce(function ($acc, $param) use ($request) {
                return $this->searchFor($acc, $param, $request->query($param) ?? $request->query(Str::camel($param)), true);
            }, $query);
        }

        if ($filters->has('bool')) {
            $query = collect($filters->get('bool'))->reduce(function ($acc, $param) use ($request) {
                $value = $request->query($param);

                if ($value === null) { return $acc; }

                if (strpos('yes', strtolower($value)) !== false) {
                    $value = true;
                } else if (strpos('no', strtolower($value)) !== false) {
                    $value = false;
                } else {
                    return $this->searchFor($acc, 'id', -1, false);
                }

                return $this->searchFor($acc, $param, $value, false);
            }, $query);
        }

        if ($sortBy = Str::snake($request->query('sortBy') ?? '')) {
            if (collect($filters->get('string'))->contains($sortBy)) {
                $query = $this->sort($query, $sortBy, $request->query('sortOrder'));
            }
        }

        return $query;
    }
}
