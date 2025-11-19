-- Employees paid in September but not in October (MINUS)
(SELECT e.EmployeeID,
        e.FirstName || ' ' || e.LastName AS EmployeeName
 FROM Employee e, Payroll p
 WHERE e.EmployeeID = p.EmployeeID
   AND p.PERIODSTART BETWEEN DATE '2025-09-01' AND DATE '2025-09-30')
MINUS
(SELECT e.EmployeeID,
        e.FirstName || ' ' || e.LastName AS EmployeeName
 FROM Employee e, Payroll p
 WHERE e.EmployeeID = p.EmployeeID
   AND p.PERIODSTART BETWEEN DATE '2025-10-01' AND DATE '2025-10-31');