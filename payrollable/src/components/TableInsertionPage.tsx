import { useState, useRef } from "react";

async function sendInsert(endpoint: string, values: any[]) {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const res = await fetch(`http://localhost:3000/admin/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, user_values: values })
    });

    const data = await res.json();
    if (!res.ok) {
        alert("Error: " + data.error);
        return;
    }

    alert("Success!");
}

export default function TableInsertionPage() {

    // Track which table the user picked
    const [selectedTable, setSelectedTable] = useState("");

    return (
        <div className="col-md-12">
            <h1>Table Insertions</h1>

            {/* Dropdown */}
            <div className="DropDown" id="insertionDropdown">
                <select
                    className="form-select"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                >
                    <option value="">-- Select a table --</option>
                    <option value="Department">Department</option>
                    <option value="Department Manager">Department Manager</option>
                    <option value="Job Position">Job Position</option>
                    <option value="Employee">Employee</option>
                    <option value="Hourly Employee">Hourly Employee</option>
                    <option value="Salaried Employee">Salaried Employee</option>
                    <option value="Deductions">Deductions</option>
                    <option value="Payroll">Payroll</option>
                    <option value="Gross Pay Calculation">Gross Pay Calculation</option>
                    <option value="Attendance">Attendance</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Payroll Deduction History">Payroll Deduction History</option>

                </select>
            </div>

            {/* Conditional forms */}
            <div className="mt-4">
                {selectedTable === "Department" && (
                    <DepartmentForm />
                )}

                {selectedTable === "Department Manager" && (
                    <DepartmentManagerForm />
                )}

                {selectedTable === "Job Position" && (
                    <JobPositionForm />
                )}

                {selectedTable === "Employee" && (
                    <EmployeeForm />
                )}

                {selectedTable === "Hourly Employee" && (
                    <HourlyEmployeeForm />
                )}

                {selectedTable === "Salaried Employee" && (
                    <SalariedEmployeeForm />
                )}

                {selectedTable === "Deductions" && (
                    <DeductionsForm />
                )}

                {selectedTable === "Payroll" && (
                    <PayrollForm />
                )}

                {selectedTable === "Gross Pay Calculation" && (
                    <GrossPayCalculationForm />
                )}

                {selectedTable === "Attendance" && (
                    <AttendanceForm />
                )}

                {selectedTable === "Bonus" && (
                    <BonusForm />
                )}

                {selectedTable === "Payroll Deduction History" && (
                    <PayrollDeductionHistoryForm />
                )}
            </div>
        </div>
    );
}

function DepartmentForm() {
    const vals = useRef(["", "", ""]);
    
    return (
        <div>
            <h3>Insert Department</h3>
            <input className="form-control mb-2" placeholder="Department ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Department Name" onChange={e => vals.current[1] = e.target.value}/>
            <input className="form-control mb-2" placeholder="Number Of Employees" onChange={e => vals.current[2] = e.target.value}/>
            <button type="button" className="btn btn-primary" onClick={() => {console.log("Submitting Department:", vals.current); sendInsert("department-insert", vals.current);}}>Submit</button>
        </div>
    );
}

function DepartmentManagerForm() {
    const vals = useRef(["", ""]);

    return (
        <div>
            <h3>Insert Department Manager</h3>
            <input className="form-control mb-2" placeholder="Manager ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Department Name" onChange={e => vals.current[1] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("department-manager-insert", vals.current)}>Submit</button>
        </div>
    );
}

function JobPositionForm() {
    const vals = useRef(["", ""]);

    return (
        <div>
            <h3>Insert Job Position</h3>
            <input className="form-control mb-2" placeholder="Job Position ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Job Position Title" onChange={e => vals.current[1] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("job-position-insert", vals.current)}>Submit</button>
        </div>
    );
}

function EmployeeForm() {
    const vals = useRef(["", "", "", "", "", "", "", "", "", "", "", "", "", ""]);

    return (
        <div>
            <h3>Insert Employee</h3>
            <input className="form-control mb-2" placeholder="Employee ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="First Name" onChange={e => vals.current[1] = e.target.value} />
            <input className="form-control mb-2" placeholder="Last Name" onChange={e => vals.current[2] = e.target.value} />
            <input className="form-control mb-2" placeholder="Email" onChange={e => vals.current[3] = e.target.value} />
            <input className="form-control mb-2" placeholder="Street Number" onChange={e => vals.current[4] = e.target.value} />
            <input className="form-control mb-2" placeholder="Street Name" onChange={e => vals.current[5] = e.target.value} />
            <input className="form-control mb-2" placeholder="City" onChange={e => vals.current[6] = e.target.value} />
            <input className="form-control mb-2" placeholder="Arrival Date" onChange={e => vals.current[7] = e.target.value} />
            <input className="form-control mb-2" placeholder="Phone Number" onChange={e => vals.current[8] = e.target.value} />
            <input className="form-control mb-2" placeholder="Date Of Birth" onChange={e => vals.current[9] = e.target.value} />
            <input className="form-control mb-2" placeholder="Department ID" onChange={e => vals.current[10] = e.target.value} />
            <input className="form-control mb-2" placeholder="Job Position ID" onChange={e => vals.current[11] = e.target.value} />
            <input className="form-control mb-2" placeholder="Wage Job Position" onChange={e => vals.current[12] = e.target.value} />
            <input className="form-control mb-2" placeholder="Is a Manager?" onChange={e => vals.current[13] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("employee-insert", vals.current)}>Submit</button>
        </div>
    );
}

function HourlyEmployeeForm() {
    const vals = useRef(["", "", ""]);

    return (
        <div>
            <h3>Insert Hourly Employee</h3>
            <input className="form-control mb-2" placeholder="Employee ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Hourly Rate" onChange={e => vals.current[1] = e.target.value} />
            <input className="form-control mb-2" placeholder="Overtime Rate" onChange={e => vals.current[2] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("hourly-employee-insert", vals.current)}>Submit</button>
        </div>
    );
}

function SalariedEmployeeForm() {
    const vals = useRef(["", ""]);
    
    return (
        <div>
            <h3>Insert Salaried Employee</h3>
            <input className="form-control mb-2" placeholder="Employee ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Annual Salary" onChange={e => vals.current[1] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("salaried-employee-insert", vals.current)}>Submit</button>
        </div>
    );
}

function DeductionsForm() {
    const vals = useRef(["", "", "", ""]);
    
    return (
        <div>
            <h3>Insert Deductions</h3>
            <input className="form-control mb-2" placeholder="Employee ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Deduction Type" onChange={e => vals.current[1] = e.target.value} />
            <input className="form-control mb-2" placeholder="Is Active" onChange={e => vals.current[2] = e.target.value} />
            <input className="form-control mb-2" placeholder="Percentage" onChange={e => vals.current[3] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("deductions-insert", vals.current)}>Submit</button>
        </div>
    );
}

function PayrollForm() {
    const vals = useRef(["", "", "", "", "", "", "", ""]);
    
    return (
        <div>
            <h3>Insert Payroll</h3>
            <input className="form-control mb-2" placeholder="Payroll ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Employee ID" onChange={e => vals.current[1] = e.target.value} />
            <input className="form-control mb-2" placeholder="Period Start" onChange={e => vals.current[2] = e.target.value} />
            <input className="form-control mb-2" placeholder="Period End" onChange={e => vals.current[3] = e.target.value} />
            <input className="form-control mb-2" placeholder="Base Payment" onChange={e => vals.current[4] = e.target.value} />
            <input className="form-control mb-2" placeholder="Overtime Hour" onChange={e => vals.current[5] = e.target.value} />
            <input className="form-control mb-2" placeholder="Overtime Pay" onChange={e => vals.current[6] = e.target.value} />
            <input className="form-control mb-2" placeholder="Net Payment" onChange={e => vals.current[7] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("payroll-insert", vals.current)}>Submit</button>
        </div>
    );
}

function GrossPayCalculationForm() {
    const vals = useRef(["", "", "", ""]);
    
    return (
        <div>
            <h3>Insert Gross Pay Calculation</h3>
            <input className="form-control mb-2" placeholder="Base Payment" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Overtime Hour" onChange={e => vals.current[1] = e.target.value} />
            <input className="form-control mb-2" placeholder="Overtime Pay" onChange={e => vals.current[2] = e.target.value} />
            <input className="form-control mb-2" placeholder="Gross Payment" onChange={e => vals.current[3] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("gross-pay-calculation-insert", vals.current)}>Submit</button>
        </div>
    );
}


function AttendanceForm() {
    const vals = useRef(["", "", "", "", "", ""]);
    
    return (
        <div>
            <h3>Insert Attendance</h3>
            <input className="form-control mb-2" placeholder="Employee ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Date Worked" onChange={e => vals.current[1] = e.target.value} />
            <input className="form-control mb-2" placeholder="Clock In" onChange={e => vals.current[2] = e.target.value} />
            <input className="form-control mb-2" placeholder="Clock Out" onChange={e => vals.current[3] = e.target.value} />
            <input className="form-control mb-2" placeholder="Hours Worked" onChange={e => vals.current[4] = e.target.value} />
            <input className="form-control mb-2" placeholder="Overtime Hours" onChange={e => vals.current[5] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("attendance-insert", vals.current)}>Submit</button>
        </div>
    );
}

function BonusForm() {
    const vals = useRef(["", "", "", ""]);
    
    return (
        <div>
            <h3>Insert Bonus</h3>
            <input className="form-control mb-2" placeholder="Employee ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Bonus Type" onChange={e => vals.current[1] = e.target.value} />
            <input className="form-control mb-2" placeholder="Amount" onChange={e => vals.current[2] = e.target.value} />
            <input className="form-control mb-2" placeholder="Date Granted" onChange={e => vals.current[3] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("bonus-insert", vals.current)}>Submit</button>
        </div>
    );
}

function PayrollDeductionHistoryForm() {
    const vals = useRef(["", ""]);
    
    return (
        <div>
            <h3>Insert Payroll Entry</h3>
            <input className="form-control mb-2" placeholder="Employee ID" onChange={e => vals.current[0] = e.target.value} />
            <input className="form-control mb-2" placeholder="Gross Payment" onChange={e => vals.current[1] = e.target.value} />
            <button className="btn btn-primary" onClick={() => sendInsert("payroll-deduction-history-insert", vals.current)}>Submit</button>
        </div>
    );
}