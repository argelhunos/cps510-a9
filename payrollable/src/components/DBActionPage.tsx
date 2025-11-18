import { useParams } from "react-router";
import { useState, type ReactNode } from "react";
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
              <li>Department</li>
              <li>JobPosition</li>
              <li>Employee</li>
              <li>HourlyEmployee</li>
              <li>SalariedEmployee</li>
              <li>Payroll</li>
              <li>PayrollDeductionHistory</li>
              <li>Attendance</li>
              <li>Bonus</li>
            </ul>
          </div>
        ),
        endpoint: "insertendpoint",
      };

    case "create":
      return {
        title: "Create tables?",
        body: (
          <div>
            <p>This action will create:</p>
            <ul>
              <li>Department</li>
              <li>JobPosition</li>
              <li>Employee</li>
              <li>HourlyEmployee</li>
              <li>SalariedEmployee</li>
              <li>Payroll</li>
              <li>PayrollDeductionHistory</li>
              <li>Attendance</li>
              <li>Bonus</li>
            </ul>
          </div>
        ),
        endpoint: "insertendpoint",
      };

    case "populate":
      return {
        title: "Populate Database",
        body: "This will insert sample data into your tables. Continue?",
        endpoint: "insertendpoint",
      };

    default:
      return null;
  }
}

export default function DBActionPage() {
  const { action } = useParams();
  const actionInfo = getActionInfo(action);
  const [result, setResult] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  if (!actionInfo) {
    return <h2>Invalid action: {action}</h2>;
  }

  async function handleConfirm() {
    try {
      // setLoading(true);

      const res = await fetch(actionInfo!.endpoint, { method: "POST" });
      const json = await res.json();

      setResult(JSON.stringify(json, null, 2));
    } catch (err) {
      setResult("Error contacting server.");
    } finally {
      // setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      {result == null && <Dialog title={actionInfo.title} body={actionInfo.body} onConfirm={handleConfirm}/>}
      {result != null && <p>a result goes here</p>}
    </div>
  );
}