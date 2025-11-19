-- List out salaried employees who earn more than their department average.
SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle
FROM Employee, SalariedEmployee se1, Department d1, JobPosition
WHERE Employee.DepartmentID = d1.DepartmentID
    AND JobPosition.JobPositionID = Employee.JobPositionID
    AND se1.EmployeeID = Employee.EmployeeID
    AND EXISTS (
        SELECT DepartmentName, AVG(AnnualSalary)
        FROM Department d2, Employee, SalariedEmployee se2
        WHERE se2.EmployeeID = Employee.EmployeeID
            AND d2.DepartmentID = Employee.DepartmentID
            AND d2.DepartmentID = d1.DepartmentID
        GROUP BY DepartmentName
        HAVING AVG(AnnualSalary) < se1.AnnualSalary
    );