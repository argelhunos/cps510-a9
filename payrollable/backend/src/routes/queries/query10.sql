--Count how many employees are in each job position (JobPosition Table)
SELECT jp.JobPositionTitle, COUNT(e.EmployeeID) AS NumEmployees --SELECT selects which columns to display, in this case it is all columns
FROM JobPosition jp, Employee e --FROM chooses which table, in this case its JobPosition and Employee.
WHERE jp.JobPositionID = e.JobPositionID --WHERE restricts the display behind a filter, we filter this query if JobPositionID are equal.
GROUP BY jp.JobPositionTitle --GROUP BY selects a common value in a column to group together, in this case it is JobPositionTitle
ORDER BY NumEmployees DESC; --ORDER BY selects a column to sort by, DESC means that we sort the column by descending values, in this case we sort NumEmployees from the highest to lowest.
