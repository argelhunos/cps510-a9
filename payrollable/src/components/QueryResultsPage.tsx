import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function QueryResultsPage() {
  const { queryId } = useParams();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const dummyData = [
    {
      DEPARTMENTID: 1,
      DEPARTMENTNAME: "Human Resources",
      NUMBEROFEMPLOYEES: 12
    },
    {
      DEPARTMENTID: 2,
      DEPARTMENTNAME: "Finance",
      NUMBEROFEMPLOYEES: 18
    },
    {
      DEPARTMENTID: 3,
      DEPARTMENTNAME: "Engineering",
      NUMBEROFEMPLOYEES: 45
    }
  ];

  useEffect(() => {
    // fake waiting for backend
    setLoading(true);

    const timer = setTimeout(() => {
      setData(dummyData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [queryId]);

  return (
    <div className="container mt-4">

      <h1 className="mb-4">
        Results for query: <span className="text-primary">{queryId}</span>
      </h1>

      {loading && (
        <p className="text-muted">Loading data...</p>
      )}

      {!loading && data.length === 0 && (
        <p className="text-danger">No results found.</p>
      )}

      {!loading && data.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                {Object.keys(data[0]).map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((value, j) => (
                    <td key={j}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}