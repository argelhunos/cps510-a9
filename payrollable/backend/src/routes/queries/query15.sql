-- Top highest paid salaried employees with their department and job title
SELECT  
    e.FirstName || ' ' || e.LastName AS EmployeeName,
    d.DepartmentName,
    jp.JobPositionTitle AS JobTitle,
    s.AnnualSalary
FROM Employee e
JOIN Department d ON e.DepartmentID = d.DepartmentID
JOIN JobPosition jp ON e.JobPositionID = jp.JobPositionID
JOIN SalariedEmployee s ON e.EmployeeID = s.EmployeeID
ORDER BY s.AnnualSalary DESC;