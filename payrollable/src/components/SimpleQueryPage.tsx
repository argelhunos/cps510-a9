import { useNavigate } from "react-router"
import AccordionItem from "./AccordionItem"

// Simple Query Page to list out each query for the user to run.
// Each Accordion Item shows the corresponding SQL and provides a Run button that navigates to
// a new page where the query will be ran and displayed. (QueryResultsPage)

export default function SimpleQueryPage() {
    const navigate = useNavigate();

    return (
        <div className="col-md-12 p-4">
            <h1>Simple Queries</h1>
            <div className="accordion" id="simpleQueries">
                <AccordionItem id="1" title={"1. List all existing deduction types that could be applied to an employee"}>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {`SELECT DISTINCT DeductionType
FROM Deduction;`}
                    </pre>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => navigate('/homepage/query/1', { state: { title: "List all existing deduction types that could be applied to an employee"}})}>
                            Run
                    </button>
                </AccordionItem>

                <AccordionItem id="2" title="2. List out all information for hourly employees">
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {`SELECT
    e.EmployeeID,
    e.FirstName,
    e.LastName,
    e.Email,
    e.PhoneNumber,
    e.StreetNumber,
    e.StreetName,
    e.City,
    e.ArrivalDate,
    e.DateOfBirth,
    e.DepartmentID,
    e.JobPositionID,
    e.WageJobPosition,
    e.IsManager,
    h.HourlyRate,
    h.OvertimeRate
FROM Employee e
JOIN HourlyEmployee h ON e.EmployeeID = h.EmployeeID;`}
                    </pre>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => navigate('/homepage/query/2', { state: { title: "List out all information for hourly employees" }})}>
                            Run
                    </button>
                </AccordionItem>

                <AccordionItem id="3" title="3. List out all managers">
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {`SELECT *
        FROM Employee
        WHERE IsManager = 'Yes';`}
                    </pre>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => navigate('/homepage/query/3', { state: { title: "List out all managers" }})}>
                            Run
                    </button>
                </AccordionItem>

                <AccordionItem id="4" title="4. List out all salaried employees whose annual salary is more than $70000">
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {`SELECT 
      e.EmployeeID,
      e.FirstName,
      e.Email,
      e.PhoneNumber,
      e.StreetNumber,
      e.StreetName,
      e.City,
      e.ArrivalDate,
      e.DateOfBirth,
      e.DepartmentID,
      e.JobPositionID,
      e.WageJobPosition,
      e.IsManager,
      s.AnnualSalary
  FROM Employee e 
  JOIN SalariedEmployee s 
  ON e.EmployeeID = s.EmployeeID
  WHERE s.AnnualSalary > 70000
  ORDER BY s.AnnualSalary DESC`}
                    </pre>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => navigate('/homepage/query/4', { state: { title: "List out all salaried employees whose annual salary is more than $70000" }})}>
                            Run
                    </button>
                </AccordionItem>

                <AccordionItem id="5" title="5. List department names and the number of employees from each department">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT DepartmentName, 'employee count is: ', NumberOfEmployees
    FROM Department
    ORDER BY NumberOfEmployees DESC;`}
                    </pre>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/5')}>Run</button>
                </AccordionItem>

                <AccordionItem id="6" title="6. Determine the average gross payment for each pay period">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT PeriodStart, PeriodEnd, AVG(GrossPayment) FROM Payroll
    GROUP BY PeriodStart, PeriodEnd;`}
                    </pre>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => navigate('/homepage/query/6', { state: { title: "Determine the average gross payment for each pay period" } })}>
                            Run
                    </button>
                </AccordionItem>

                <AccordionItem id="7" title="7. Find which deductions were applied for payroll 1001">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT * FROM PayrollDeductionHistory
    WHERE PayrollID = 1001
    ORDER BY Amount DESC;`}
                    </pre>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => navigate('/homepage/query/7', { state: { title: "Find which deductions were applied for payroll 1001"}})}>
                            Run
                    </button>
                </AccordionItem>

                <AccordionItem id="8" title="8. List bonuses granted to employee">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`  SELECT b.EmployeeID, e.FirstName, e.LastName, b.BonusType, b.Amount, b.DateGranted 
  FROM Bonus b 
  JOIN Employee e ON b.EmployeeID = e.EmployeeID 
  ORDER BY b.amount`}
                    </pre>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => navigate('/homepage/query/8', { state: { title: "List bonuses granted to employee"}})}>
                            Run
                    </button>
                </AccordionItem>

                <AccordionItem id="9" title="9. Find employees who have worked overtime in descending order">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT a.EmployeeID, DateWorked, HoursWorked, OvertimeHours 
  FROM Attendance a 
  WHERE a.OvertimeHours > 0 
  ORDER BY DateWorked DESC`}
                    </pre>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => navigate('/homepage/query/9', { state: { title: "Find employees who have worked overtime in descending order"}})}>
                            Run
                    </button>
                </AccordionItem>

                <AccordionItem id="10" title="10. Determine how many employees work for each job position">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT jp.JobPositionTitle, COUNT(e.EmployeeID) AS NumEmployees 
  FROM JobPosition jp, Employee e 
  WHERE jp.JobPositionID = e.JobPositionID 
  GROUP BY jp.JobPositionTitle 
  ORDER BY NumEmployees DESC`}
                    </pre>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => navigate('/homepage/query/10', { state: { title: "Determine how many employees work for each job position"}})}>
                            Run
                    </button>
                </AccordionItem>
            </div>
        </div>
    )
}