-- Insert Employees into Payroll
INSERT INTO Payroll(PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, GrossPayment, NetPayment)
SELECT
	Payroll_SEQ.NEXTVAL AS PayrollID,
	e.EmployeeID,
	TO_DATE('2025-09-29', 'YYYY-MM-DD') AS PeriodStart,
    TO_DATE('2025-10-06', 'YYYY-MM-DD') AS PeriodEnd,
    s.AnnualSalary / 26 AS BasePayment,
    0 AS OvertimeHour,
    0.0 AS OvertimePay,
    (s.AnnualSalary / 26) + 0.0 AS GrossPayment,
    (s.AnnualSalary / 26) + 0.0 AS NetPayment
FROM Employee e 
JOIN SalariedEmployee s ON e.EmployeeID = s.EmployeeID;