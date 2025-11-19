--List All Managers (Employee Table):
SELECT * --SELECT selects which columns to display, In this case '*' represents ALL from the table after FROM
FROM Employee --FROM chooses which table, in this case its Employee
WHERE IsManager = 'Yes'; --WHERE restricts the display behind a filter, we filter this query if IsManager is 'Yes'.
