CREATE VIEW FullEmployeeProfile AS
SELECT 
    e.FirstName || ' ' || e.LastName AS EmployeeName,
    e.Email,
    e.StreetNumber || ' ' || e.StreetName || ', ' || e.City AS Address,
    e.PhoneNumber,
    d.DepartmentName,
    jp.JobPositionTitle AS Position,
    e.IsManager,
    he.HourlyRate,
    se.AnnualSalary
FROM Employee e
JOIN Department d ON d.DepartmentID = e.DepartmentID
JOIN JobPosition jp ON e.JobPositionID = jp.JobPositionID
LEFT JOIN HourlyEmployee he ON e.EmployeeID = he.EmployeeID
LEFT JOIN SalariedEmployee se ON e.EmployeeID = se.EmployeeID
ORDER BY d.DepartmentName, EmployeeName
WITH READ ONLY;