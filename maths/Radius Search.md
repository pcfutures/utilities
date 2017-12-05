# Radius Search (MySQL)

Variables:

| Key | Meaning |
| --- | --- |
| _`u`_ | The radius of Earth, can be any unit (3959 miles, 6371km) |
| _`r`_ | Radius to search within, in the same unit as _u_ |
| _`l1`_ | The latitude coordinate to search from |
| _`l2`_ | The longitude coordinate to search from |
| _`c1`_ | The latitude column |
| _`c2`_ | The longitude column |
| _`t`_ | The table you're searching through |


```mysql
SELECT *, (
    u * acos(
        cos(radians(l1)) * cos(radians(c1)) * cos(radians(c2) - radians(l2))
        +
        sin(radians(l1)) * sin(radians(c1))
    )
) AS distance FROM t
```
