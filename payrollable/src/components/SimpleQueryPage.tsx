import { useNavigate } from "react-router"
import AccordionItem from "./AccordionItem"

// change titles based on what felix had i think, unfinished
// possible would want to put the text of the queries inside somewhere else to clean this up

export default function SimpleQueryPage() {
    const navigate = useNavigate();

    return (
        <div className="col-md-12">
            <h1>Simple Queries</h1>
            <div className="accordion" id="simpleQueries">
                <AccordionItem id="1" title={"List all existing deduction types that could be applied to an employee"}>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {`SELECT DISTINCT DeductionType
    FROM Deduction;`}
                    </pre>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/1')}>Run</button>
                </AccordionItem>

                <AccordionItem id="2" title="List out all information for hourly employees">
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
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/2')}>Run</button>
                </AccordionItem>

                <AccordionItem id="3" title="List out all managers">
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {`SELECT *
        FROM Employee
        WHERE IsManager = 'Yes';`}
                    </pre>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/3')}>Run</button>
                </AccordionItem>

                <AccordionItem id="4" title="List out all salaried employees whose annual salary is more than $70000">
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
    JOIN SalariedEmployee s on e.EmployeeID = s.EmployeeID
    WHERE s.AnnualSalary > 70000
    ORDER BY s.AnnualSalary DESC;`}
                    </pre>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/4')}>Run</button>
                </AccordionItem>

                <AccordionItem id="5" title="List department names and the number of employees from each department">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT DepartmentName, 'employee count is: ', NumberOfEmployees
    FROM Department
    ORDER BY NumberOfEmployees DESC;`}
                    </pre>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/5')}>Run</button>
                </AccordionItem>

                <AccordionItem id="6" title="Find which deductions were applied for payroll 1001">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT * FROM PayrollDeductionHistory
    WHERE PayrollID = 1001
    ORDER BY Amount DESC;`}
                    </pre>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/6')}>Run</button>
                </AccordionItem>

                <AccordionItem id="7" title="Determine the average gross payment for each pay period">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT PeriodStart, PeriodEnd, AVG(GrossPayment) FROM Payroll
    GROUP BY PeriodStart, PeriodEnd;`}
                    </pre>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/7')}>Run</button>
                </AccordionItem>

                <AccordionItem id="8" title="List bonuses granted to employee">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT PeriodStart, PeriodEnd, AVG(GrossPayment) FROM Payroll
    GROUP BY PeriodStart, PeriodEnd;`}
                    </pre>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/8')}>Run</button>
                </AccordionItem>

                <AccordionItem id="9" title="Find employees who have worked overtime in descending order">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT PeriodStart, PeriodEnd, AVG(GrossPayment) FROM Payroll
    GROUP BY PeriodStart, PeriodEnd;`}
                    </pre>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/9')}>Run</button>
                </AccordionItem>

                <AccordionItem id="10" title="Determine how many employees work for each job position">
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`SELECT jp.JobPositionTitle, COUNT(e.EmployeeID) AS NumEmployees
    FROM JobPosition jp, Employee e
    WHERE jp.JobPositionID = e.JobPositionID
    GROUP BY jp.JobPositionTitle
    ORDER BY NumEmployees DESC;`}
                    </pre>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/homepage/query/10')}>Run</button>
                </AccordionItem>
            </div>
        </div>
    )
}