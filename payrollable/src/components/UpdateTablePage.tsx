import { useState, useEffect } from "react";

// Function to send update request to the server
async function sendUpdate(endpoint: string, values: any[]) {
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

    alert("Successfully updated!");
}

// Main component for updating tables
export default function UpdateTablePage() {
    const [selectedTable, setSelectedTable] = useState("");
    const [tableData, setTableData] = useState<{ rows: any[], columns: any[] } | null>(null);

    // Map of table names to their corresponding IDs
    const tableMap: { [key: string]: number } = {
        "Department": 1,
        "Department Manager": 2,
        "Job Position": 3,
        "Employee": 4,
        "Hourly-employee": 5,
        "Salaried Employee": 6,
        "Deductions": 7,
        "Payroll": 8,
        "Gross Pay Calculation": 9,
        "Attendance": 10,
        "Bonus": 11,
        "Payroll Deduction History": 12
    };

    // Fetch table data when a table is selected
    useEffect(() => {
        if (!selectedTable) return;

        const tableId = tableMap[selectedTable];
        if (!tableId) return;

        async function fetchTable() {
            try {
                const username = localStorage.getItem("username");
                const password = localStorage.getItem("password");

                const res = await fetch("http://localhost:3000/admin/show-table", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password, table: tableId })
                });

                const data = await res.json();
                if (!res.ok) {
                    alert("Error: " + data.error);
                    return;
                }

                setTableData({ rows: data.rows, columns: data.columns });
            } catch (err) {
                console.error(err);
                alert("Failed to fetch table");
            }
        }

        fetchTable();
    }, [selectedTable]);

    // Render the component
    return (
        <div className="col-md-12">
            <h1>Update Table</h1>

            <div className="DropDown" id="insertionDropdown">
                <select
                    className="form-select"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                >
                    <option value="">-- Select a table --</option>
                    {Object.keys(tableMap).map((tableName) => (
                        <option key={tableName} value={tableName}>{tableName}</option>
                    ))}
                </select>
            </div>

            <div className="mt-4">
                {selectedTable && tableData && (
                    <UpdateableTable
                        rows={tableData.rows}
                        columns={tableData.columns}
                        endpoint={selectedTable.replace(" ", "-").toLowerCase().concat("-update")}
                        setRows={(newRows) => setTableData({ ...tableData, rows: newRows })}
                    />
                )}
            </div>
        </div>
    );
}


// Component for rendering an updateable table
function UpdateableTable({
    rows,
    columns,
    endpoint,
    setRows
}: {
    rows: any[];
    columns: any[];
    endpoint: string;
    setRows: (newRows: any[]) => void;
}) {
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<any>({});

    function startEdit(index: number, row: any) {
        setEditIndex(index);
        setEditValues({ ...row });
    }

    function cancelEdit() {
        setEditIndex(null);
        setEditValues({});
    }

    // Function to save the edited row
    async function saveEdit() {
        console.log("Saving edit:", editValues);
        if (editIndex === null) return;
        const valuesArr = columns.map((c) => editValues[c.name]);
        console.log(endpoint, valuesArr);
        await sendUpdate(endpoint, valuesArr);
        const newRows = [...rows];
        newRows[editIndex] = { ...editValues };
        setRows(newRows);

        setEditIndex(null);
    }

    const nonEditableCols = ["DEPARTMENTID", "EMPLOYEEID", "MANAGERID", "JOBPOSITIONID", "PAYROLLID", "DEDUCTIONTYPE", "DATEWORKED", "CLOCKIN", "CLOCKOUT", "BASEPAYMENT", "OVERTIMEPAY", "OVERTIMEHOUR", "BONUSTYPE", "DATEGRANTED"];

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Update</th>
                    {columns.map((col) => (
                        <th key={col.name}>{col.name}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx}>
                        {/* Left-side update button */}
                        <td>
                            {editIndex === idx ? (
                                <>
                                    <button className="btn btn-success btn-sm" onClick={() => { console.log("Clicked!"); saveEdit(); }}>
                                        Save
                                    </button>
                                    <button className="btn btn-secondary btn-sm ms-2" onClick={cancelEdit}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => startEdit(idx, row)}
                                >
                                    Update
                                </button>
                            )}
                        </td>

                        {/* Table cells */}
                        {columns.map((col) => (
                            <td key={col.name}>
                                {editIndex === idx && !nonEditableCols.includes(col.name) ? (
                                    <input
                                        className="form-control"
                                        value={editValues[col.name] ?? ""}
                                        onChange={(e) => {
                                            setEditValues({
                                                ...editValues,
                                                [col.name]: e.target.value
                                            })
                                        }}
                                    />
                                ) : (
                                    row[col.name]
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
