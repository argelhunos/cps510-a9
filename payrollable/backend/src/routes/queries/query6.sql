--Get the average grosspay for each period (Payroll Table)
SELECT PeriodStart, PeriodEnd, AVG(GrossPayment) --SELECT selects which columns to display, AVG calculates the average of GrossPayment
FROM Payroll --FROM chooses which table, in this case its Payroll.
GROUP BY PeriodStart, PeriodEnd; --GROUP BY selects a common value in a column to group together, in this case it is PeriodStart and PeriodEnd
