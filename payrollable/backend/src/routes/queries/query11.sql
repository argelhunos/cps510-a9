-- Calculate Total Annual Payroll Cost by Department
SELECT
    d.DepartmentName,
    SUM(
        CASE
            WHEN e.WageJobPosition = 'Salary' THEN se.AnnualSalary
            WHEN e.WageJobPosition = 'Hourly' THEN he.HourlyRate * 2080
            ELSE 0
        END
    ) AS TotalAnnualPayroll
    FROM Employee e
    JOIN Department d ON e.DepartmentID = d.DepartmentID
    LEFT JOIN SalariedEmployee se ON e.EmployeeID = se.EmployeeID
    LEFT JOIN HourlyEmployee he ON e.EmployeeID = he.EmployeeID
    GROUP BY d.DepartmentName
    ORDER BY TotalAnnualPayroll DESC;