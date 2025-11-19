-- List departments with more than 2 employees and total gross payments over 10,000 (COUNT, GROUP BY, HAVING)
SELECT 
    d.DepartmentName,
    COUNT(DISTINCT e.EmployeeID) AS NumEmployees,
    SUM(p.GrossPayment) AS TotalGross
FROM Department d, Employee e, Payroll p
WHERE d.DepartmentID = e.DepartmentID
    AND e.EmployeeID = p.EmployeeID
GROUP BY d.DepartmentName
HAVING COUNT(DISTINCT e.EmployeeID) > 2
   AND SUM(p.GrossPayment) > 10000
ORDER BY TotalGross DESC;