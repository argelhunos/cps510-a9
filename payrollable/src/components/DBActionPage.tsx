import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router";
import { useEffect, useState, type ReactNode } from "react";
import Dialog from "./Dialog";

type ActionInfo = {
  title: string;
  body: ReactNode;
  endpoint: string;
};

function getActionInfo(action: string | undefined): ActionInfo | null {
  switch (action) {
    case "drop":
      return {
        title: "Are you sure you want to drop tables?",
        body: (
          <div>
            <p>This action will drop:</p>
            <ul>
              <li>Bonus</li>
              <li>Attendance</li>
              <li>PayrollDeductionHistory</li>
              <li>Payroll</li>
              <li>GrossPayCalculation</li>
              <li>Deductions</li>
              <li>SalariedEmployee</li>
              <li>HourlyEmployee</li>
              <li>Employee</li>
              <li>Department</li>
              <li>DepartmentManager</li>
              <li>JobPosition</li>
              <li>ActiveDeductions</li>
            </ul>
          </div>
        ),
        endpoint: "localhost:3000/admin/drop-tables",
      };

    case "create":
      return {
        title: "Create tables?",
        body: (
          <div>
            <p>This action will create:</p>
            <ul>
              <li>Bonus</li>
              <li>Attendance</li>
              <li>PayrollDeductionHistory</li>
              <li>Payroll</li>
              <li>GrossPayCalculation</li>
              <li>Deductions</li>
              <li>SalariedEmployee</li>
              <li>HourlyEmployee</li>
              <li>Employee</li>
              <li>Department</li>
              <li>DepartmentManager</li>
              <li>JobPosition</li>
              <li>ActiveDeductions</li>
            </ul>
          </div>
        ),
        endpoint: "localhost:3000/admin/create-tables",
      };

    case "populate":
      return {
        title: "Populate Database",
        body: "This will insert sample data into your tables. Continue?",
        endpoint: "localhost:3000/admin/populate-tables",
      };

    default:
      return null;
  }
}

export default function DBActionPage() {
  const { action } = useParams();
  const { user } = useAuth();
  const actionInfo = getActionInfo(action);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResult(null);
  }, [action])

  if (!actionInfo) {
    return <h2>Invalid action: {action}</h2>;
  }

  async function handleConfirm() {
    try {
      setLoading(true);

      const currUsername = user?.username;
      const currPassword = user?.password;

      const res = await fetch(`http://${actionInfo!.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currUsername, password: currPassword })
      });

      const json = await res.json();

      if (!res.ok) {
        setResult(json.error || "Server error occurred.");
        return;
      }

      let message = "";
      switch (action) {
        case "drop":
          message = "Dropped tables successfully.";
          break;
        case "create":
          message = "Created tables successfully.";
          break;
        case "populate":
          message = "Populated tables successfully.";
          break;
        default:
          message = "Action completed successfully.";
      }

      setResult(message);

    } catch (err) {
      setResult("Error contacting server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {result == null && !loading && 
        <Dialog title={actionInfo.title} body={actionInfo.body} onConfirm={handleConfirm}/>
      }
      {result != null && !loading && 
        <p>{result}</p>
      }
    </div>
  );
}