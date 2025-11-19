(SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle, 'Salaried' AS PayType
FROM Employee, Department, JobPosition, SalariedEmployee
WHERE SalariedEmployee.EmployeeID = Employee.EmployeeID
    AND Department.DepartmentID = Employee.DepartmentID
    AND JobPosition.JobPositionID = Employee.JobPositionID
UNION
SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle, 'Hourly' AS PayType
FROM Employee, Department, JobPosition, HourlyEmployee
WHERE HourlyEmployee.EmployeeID = Employee.EmployeeID
    AND Department.DepartmentID = Employee.DepartmentID
    AND JobPosition.JobPositionID = Employee.JobPositionID)
MINUS
(SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle, 'Salaried' AS PayType
FROM Employee, Department, JobPosition, SalariedEmployee, Bonus
WHERE SalariedEmployee.EmployeeID = Employee.EmployeeID
    AND Department.DepartmentID = Employee.DepartmentID
    AND JobPosition.JobPositionID = Employee.JobPositionID
    AND Bonus.EmployeeID = Employee.EmployeeID
UNION
SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle, 'Hourly' AS PayType
FROM Employee, Department, JobPosition, HourlyEmployee, Bonus
WHERE HourlyEmployee.EmployeeID = Employee.EmployeeID
    AND Department.DepartmentID = Employee.DepartmentID
    AND JobPosition.JobPositionID = Employee.JobPositionID
    AND Bonus.EmployeeID = Employee.EmployeeID);