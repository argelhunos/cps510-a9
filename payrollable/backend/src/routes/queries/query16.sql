-- Calculate total overtime pay for each hourly employee
SELECT 
    e.FirstName || ' ' || e.LastName AS EmployeeName,
    SUM(a.OvertimeHours) AS TotalOvertimeHours,
    h.OvertimeRate,
    SUM(a.OvertimeHours * h.OvertimeRate) AS TotalOvertimePay
FROM Employee e
JOIN Attendance a ON e.EmployeeID = a.EmployeeID
JOIN HourlyEmployee h ON e.EmployeeID = h.EmployeeID
GROUP BY e.FirstName, e.LastName, h.OvertimeRate
ORDER BY TotalOvertimePay DESC;