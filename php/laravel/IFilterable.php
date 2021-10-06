<?php

interface IFilterable {
    /**
     * Get all filters for the `Filterable` trait.
     *
     * @example
     * [
     *     'bool' => [
     *         'relation|filter',
     *         'filter'
     *     ],
     *
     *     'string' => [
     *         'relation|relation|filter',
     *         'filter',
     *     ],
     * ]
     */
    public function getFilters (): array;
}