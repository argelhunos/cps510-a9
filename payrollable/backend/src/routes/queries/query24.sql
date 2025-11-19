-- List employees who have both received a bonus and have active deductions (EXISTS)
SELECT e.EmployeeID,
       e.FirstName || ' ' || e.LastName AS EmployeeName
FROM Employee e
WHERE EXISTS (
    SELECT 1 FROM Bonus b WHERE b.EmployeeID = e.EmployeeID
)
AND EXISTS (
    SELECT 1 FROM Deductions d WHERE d.EmployeeID = e.EmployeeID
    AND d.IsActive = 'Yes'
)
ORDER BY e.EmployeeID;