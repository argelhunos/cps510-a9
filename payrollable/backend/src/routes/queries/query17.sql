-- List of payroll deductions for each employee per period, with their total deductions for comparison
SELECT 
    pdh.PayrollID, 
    e.FirstName || ' ' || e.LastName AS EmployeeName, 
    p.PeriodStart, 
    p.PeriodEnd, 
    pdh.DeductionType, 
    pdh.Amount,
    (SELECT SUM(Amount)
    FROM PayrollDeductionHistory pdh1
    WHERE pdh1.PayrollID = pdh.PayrollID
    ) AS TotalDeductionsThisPeriod
FROM PayrollDeductionHistory pdh, Employee e, Payroll p
WHERE pdh.PayrollID = p.PayrollID
AND e.EmployeeID = p.EmployeeID;