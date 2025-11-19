-- List employees whose total bonuses exceed their total deductions
SELECT e.EmployeeID, 
       e.FirstName || ' ' || e.LastName AS EmployeeName
FROM   Employee e
WHERE EXISTS (
   SELECT 1
   FROM   Bonus b
   WHERE  b.EmployeeID = e.EmployeeID
   GROUP BY b.EmployeeID
   HAVING SUM(b.Amount) >
          (SELECT NVL(SUM(pdh.Amount), 0)
           FROM   PayrollDeductionHistory pdh, Payroll p
           WHERE  pdh.PayrollID = p.PayrollID
           AND    p.EmployeeID = e.EmployeeID)
)
ORDER BY e.EmployeeID;