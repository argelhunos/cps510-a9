-- List job positions where the average salary is greater than the company's overall average
SELECT JobPositionTitle, AVG(AnnualSalary) AS Average_Salary
FROM   JobPosition j, Employee e, SalariedEmployee s
WHERE  j.JobPositionID = e.JobPositionID
   AND s.EmployeeID = e.EmployeeID
GROUP BY JobPositionTitle
HAVING AVG(AnnualSalary) > 
      (SELECT AVG(AnnualSalary)
       FROM   SalariedEmployee)
ORDER BY Average_Salary DESC;