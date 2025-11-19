CREATE VIEW ActiveDeductions AS
SELECT e.FirstName || ' ' || e.LastName AS EmployeeName, d.DeductionType, d.Percentage
FROM Employee e
JOIN Deductions d ON e.EmployeeID = d.EmployeeID
WHERE IsActive = 'Yes'
WITH READ ONLY;