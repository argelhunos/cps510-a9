CREATE VIEW DepartmentPayrollSummary AS
SELECT 
	d.DepartmentName,
SUM(p.GrossPayment) AS TotalGrossPayment,
SUM(p.NetPayment) AS TotalNetPayment,
ROUND(AVG(p.NetPayment),2) AS AvgNetPayment
FROM Department d
JOIN Employee e ON d.DepartmentID = e.DepartmentID
JOIN Payroll p ON e.EmployeeID = p.EmployeeID
GROUP BY d.DepartmentName
ORDER BY TotalGrossPayment DESC
WITH READ ONLY;