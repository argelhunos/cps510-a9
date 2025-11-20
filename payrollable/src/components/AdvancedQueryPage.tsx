import { useNavigate } from "react-router";
import AccordionItem from "./AccordionItem";

// Advanced Query Page to list out each query for the user to run.
// Each Accordion Item shows the corresponding SQL and provides a Run button that navigates to
// a new page where the query will be ran and displayed. (QueryResultsPage)

export default function AdvancedQueryPage() {
    const navigate = useNavigate();

    return (
            <div className="col-md-12 p-4">
                <h1>Advanced Queries</h1>
                <div className="accordion" id="advancedQueries">
                    <AccordionItem id="11" title={"11. Estimated total annual payroll cost by department"}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`SELECT
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
ORDER BY TotalAnnualPayroll DESC`}
                        </pre>
                        <button 
                            className="btn btn-primary mt-2" 
                            onClick={() => navigate('/homepage/query/11', { state: { title: "Estimated total annual payroll cost by department"}})}>
                                Run
                        </button>
                    </AccordionItem>

                    <AccordionItem id="12" title={"12. Top highest paid salaried employees with their department and job title"}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`SELECT  
    e.FirstName || ' ' || e.LastName AS EmployeeName,
    d.DepartmentName,
    jp.JobPositionTitle AS JobTitle,
    s.AnnualSalary
FROM Employee e
JOIN Department d ON e.DepartmentID = d.DepartmentID
JOIN JobPosition jp ON e.JobPositionID = jp.JobPositionID
JOIN SalariedEmployee s ON e.EmployeeID = s.EmployeeID
ORDER BY s.AnnualSalary DESC`}
                        </pre>
                        {/* note: navigate route IDs don't fully line up with displayed query number to user to be in line with backend */}
                        <button 
                            className="btn btn-primary mt-2"
                            onClick={() => navigate('/homepage/query/15', { state: { title: "Top highest paid salaried employees with their department and job title" }})}>
                                Run
                        </button>
                    </AccordionItem>

                    <AccordionItem id="13" title={"13. Calculate total overtime pay for each hourly employee"}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`SELECT 
    e.FirstName || ' ' || e.LastName AS EmployeeName,
    SUM(a.OvertimeHours) AS TotalOvertimeHours,
    h.OvertimeRate,
    SUM(a.OvertimeHours * h.OvertimeRate) AS TotalOvertimePay
FROM Employee e
JOIN Attendance a ON e.EmployeeID = a.EmployeeID
JOIN HourlyEmployee h ON e.EmployeeID = h.EmployeeID
GROUP BY e.FirstName, e.LastName, h.OvertimeRate
ORDER BY TotalOvertimePay DESC`}
                        </pre>
                        <button 
                            className="btn btn-primary mt-2" 
                            onClick={() => navigate('/homepage/query/16', { state: { title: "Calculate total overtime pay for each hourly employee" }})}>
                                Run
                        </button>
                    </AccordionItem>



                    <AccordionItem id="14" title={"14. List of payroll deductions for each employee per period, with their total deductions for comparison"}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`  SELECT 
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
AND e.EmployeeID = p.EmployeeID`}
                        </pre>
                        <button 
                            className="btn btn-primary mt-2" 
                            onClick={() => navigate('/homepage/query/17', { state: { title: "List of payroll deductions for each employee per period, with their total deductions for comparison" }})}>
                                Run
                        </button>
                    </AccordionItem>

                    <AccordionItem id="15" title={"15. List of employees that have never gotten a bonus before"}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`(SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle, 'Salaried' AS PayType
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
    AND Bonus.EmployeeID = Employee.EmployeeID)`}
                        </pre>
                        <button 
                            className="btn btn-primary mt-2" 
                            onClick={() => navigate('/homepage/query/21', { state: { title: "List of employees that have never gotten a bonus before" }})}>
                                Run
                        </button>
                    </AccordionItem>

                    <AccordionItem id="16" title={"16. List out salaried employees who earn more than their department average."}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle
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
)`}
                        </pre>
                        <button 
                            className="btn btn-primary mt-2" 
                            onClick={() => navigate('/homepage/query/22', { state: { title: "List out salaried employees who earn more than their department average." }})}>
                                Run
                        </button>
                    </AccordionItem>

                    <AccordionItem id="17" title={"17. List departments with more than 2 employees and total gross payments over 10,000"}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`SELECT 
    d.DepartmentName,
    COUNT(DISTINCT e.EmployeeID) AS NumEmployees,
    SUM(g.GrossPayment) AS TotalGross
FROM Department d
JOIN Employee e ON d.DepartmentID = e.DepartmentID
JOIN Payroll p ON e.EmployeeID = p.EmployeeID
JOIN GrossPayCalculation g 
    ON g.BasePayment = p.BasePayment
AND g.OvertimeHour = p.OvertimeHour
AND g.OvertimePay = p.OvertimePay
GROUP BY d.DepartmentName
HAVING COUNT(DISTINCT e.EmployeeID) > 2
AND SUM(g.GrossPayment) > 10000
ORDER BY TotalGross DESC`}
                        </pre>
                        <button 
                            className="btn btn-primary mt-2" 
                            onClick={() => navigate('/homepage/query/23', { state: { title: "List departments with more than 2 employees and total gross payments over 10,000" }})}>
                                Run
                        </button>
                    </AccordionItem>
                    
                    <AccordionItem id="18" title={"18. List employees who have both received a bonus and have active deductions"}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`SELECT e.EmployeeID,
    e.FirstName || ' ' || e.LastName AS EmployeeName
FROM Employee e
WHERE EXISTS (
    SELECT 1 FROM Bonus b WHERE b.EmployeeID = e.EmployeeID
)
AND EXISTS (
    SELECT 1 FROM Deductions d WHERE d.EmployeeID = e.EmployeeID
    AND d.IsActive = 'Yes'
)
ORDER BY e.EmployeeID`}
                        </pre>
                        <button 
                            className="btn btn-primary mt-2" 
                            onClick={() => navigate('/homepage/query/24', { state: { title: "List employees who have both received a bonus and have active deductions" }})}>
                                Run
                        </button>
                    </AccordionItem>

                    <AccordionItem id="19" title={"19. Employees paid in September but not in October"}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`(SELECT e.EmployeeID,
        e.FirstName || ' ' || e.LastName AS EmployeeName
FROM Employee e, Payroll p
WHERE e.EmployeeID = p.EmployeeID
AND p.PERIODSTART BETWEEN DATE '2025-09-01' AND DATE '2025-09-30')
MINUS
(SELECT e.EmployeeID,
        e.FirstName || ' ' || e.LastName AS EmployeeName
FROM Employee e, Payroll p
WHERE e.EmployeeID = p.EmployeeID
AND p.PERIODSTART BETWEEN DATE '2025-10-01' AND DATE '2025-10-31')`}
                        </pre>
                        <button 
                            className="btn btn-primary mt-2" 
                            onClick={() => navigate('/homepage/query/25', { state: { title: "Employees paid in September but not in October" }})}>
                                Run
                        </button>
                    </AccordionItem>

                    <AccordionItem id="20" title={"20. List job positions where the average salary is greater than the company's overall average"}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`SELECT JobPositionTitle, AVG(AnnualSalary) AS Average_Salary
FROM   JobPosition j, Employee e, SalariedEmployee s
WHERE  j.JobPositionID = e.JobPositionID
AND s.EmployeeID = e.EmployeeID
GROUP BY JobPositionTitle
HAVING AVG(AnnualSalary) > 
    (SELECT AVG(AnnualSalary)
    FROM   SalariedEmployee)
ORDER BY Average_Salary DESC`}
                        </pre>
                        <button 
                            className="btn btn-primary mt-2" 
                            onClick={() => navigate('/homepage/query/26', { state: { title: "List job positions where the average salary is greater than the company's overall average" }})}>
                                Run
                        </button>
                    </AccordionItem>

                    <AccordionItem id="21" title={"21. List employees whose total bonuses exceed their total deductions"}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                            {`SELECT e.EmployeeID, 
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
ORDER BY e.EmployeeID`}
                        </pre>
                        <button 
                            className="btn btn-primary mt-2" 
                            onClick={() => navigate('/homepage/query/27', { state: { title: "List employees whose total bonuses exceed their total deductions" }})}>
                                Run
                        </button>
                    </AccordionItem>

                </div>
        </div>
    )
}