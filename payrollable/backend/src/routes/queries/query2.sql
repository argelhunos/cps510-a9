SELECT --SELECT selects which columns to display, in this case it's all the listed columns from 'h' and 'e'
h.HourlyRate, 
h.OvertimeRate,
e.EmployeeID, 
e.FirstName, 
e.LastName, 
e.Email, 
e.DepartmentID, 
e.JobPositionID,
e.WageJobPosition, 
e.IsManager
FROM HourlyEmployee h --FROM chooses which table, in this case its HourlyEmployee, the 'h' beside it references HourlyEmployee by the variable we choose.
JOIN Employee e --JOIN chooses another table to combine into one table, in this case its Employee, the 'e' beside it references Employee by the variable we choose.
ON h.EmployeeID = e.EmployeeID; --ON determines which column to link/create a relationship between the two tables, in this case we match by EmployeeID.
