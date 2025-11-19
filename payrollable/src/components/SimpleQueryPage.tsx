import AccordionItem from "./AccordionItem"

// change titles based on what felix had i think, unfinished

export default function SimpleQueryPage() {
    return (
        <div className="accordion" id="simpleQueries">
            <AccordionItem id="1" title={"List all existing deduction types that could be applied to an employee"}>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                    {`SELECT DISTINCT DeductionType
                    FROM Deduction;`}
                </pre>
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
            </AccordionItem>

            <AccordionItem id="3" title="List out all managers">
                <pre style={{ whiteSpace: "pre-wrap" }}>
                    {`SELECT *
                    FROM Employee
                    WHERE IsManager = 'Yes';`}
                </pre>
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
            </AccordionItem>

            <AccordionItem id="5" title="List department names and the number of employees from each department">
                <pre style={{ whiteSpace: "pre-wrap"}}>
                    {`SELECT DepartmentName, 'employee count is: ', NumberOfEmployees
                    FROM Department
                    ORDER BY NumberOfEmployees DESC;`}
                </pre>
            </AccordionItem>

            <AccordionItem id="6" title="List department names and the number of employees from each department">
                <pre style={{ whiteSpace: "pre-wrap"}}>
                    {`SELECT DepartmentName, 'employee count is: ', NumberOfEmployees
                    FROM Department
                    ORDER BY NumberOfEmployees DESC;`}
                </pre>
            </AccordionItem>
        </div>
    )
}