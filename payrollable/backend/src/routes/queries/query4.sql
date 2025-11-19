SELECT --SELECT selects which columns to display, in this case it's all the listed columns from 'e' and 's'
    e.EmployeeID,
    e.FirstName,
    e.Email,
    e.PhoneNumber,
    e.StreetNumber,
    e.StreetName,
    e.City,
    e.ArrivalDate,
    e.DateOfBirth,
    e.DepartmentID,
    e.JobPositionID,
    e.WageJobPosition,
    e.IsManager,
    s.AnnualSalary
FROM Employee e --FROM chooses which table, in this case its Employee, the 'e' beside it references Employee by the variable we choose.
JOIN SalariedEmployee s  --JOIN chooses another table to combine into one table, in this case its SalariedEmployee, the 's' beside it references Employee by the variable we choose.
ON e.EmployeeID = s.EmployeeID --ON determines which column to link/create a relationship between the two tables, in this case we match by EmployeeID.
WHERE s.AnnualSalary > 70000 --WHERE restricts the display behind a filter, we filter this query if AnnualSalary is greater than 70000.
ORDER BY s.AnnualSalary DESC; --ORDER BY selects a column to sort by, DESC means that we sort the column by descending values, in this case we sort AnnualSalary from SalariedEmployee.
