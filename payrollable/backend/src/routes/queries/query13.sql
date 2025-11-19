-- Create a history for deductions
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount)
SELECT
	p.PayrollID,
	d.DeductionType,
	CASE d.DeductionType
		WHEN 'Income Tax' THEN p.GrossPayment - (p.GrossPayment * (d.Percentage / 100))
		WHEN 'Retirement' THEN p.GrossPayment - (p.GrossPayment * (d.Percentage / 100))
        ELSE 0
	END AS Amount
FROM Payroll p 
JOIN Deductions d ON p.EmployeeID = d.EmployeeID
WHERE p.PeriodEnd = TO_DATE('2025-10-06', 'YYYY-MM-DD')
AND d.IsActive = 'Yes';