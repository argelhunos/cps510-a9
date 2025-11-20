import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../context/AuthContext"

// QueryResultsPage to show the results of the simple and advanced queries.
// Displays results within a bootstrap table.
// Allows users to search results by all columns or by a specific column.

export default function QueryResultsPage() {
  const { queryId } = useParams();             // queryId taken from the URL, determined through the route Simple/AdvancedQueryPage sends the user to
  const { user } = useAuth();
  const location = useLocation();              // location needed to grab state that is passed over which includes the title of the query
  const queryTitle = location.state?.title;    
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");


  useEffect(() => {
    // grab data from the database by querying the endpoint, specific query # gotten from URL
    async function fetchData() {
      setLoading(true);
      
      // get username and password from react context
      const currUser = user?.username;
      const currPassword = user?.password;

      try {
        const res = await fetch("http://localhost:3000/admin/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({username: currUser, password: currPassword, queryId, choice: Number(queryId)})
        })

        const json = await res.json();

        if (!json.success) {
          setData([]);
        }

        setData(json.rows);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [queryId]);

  // grab columns from first row of results to be able to search by col
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // show data based on filter for search func
  const filteredData = data.filter(row => {
    if (!searchTerm) {
      return true; // just give the whole thing
    }

    if (selectedColumn && row[selectedColumn] !== undefined) {
      return String(row[selectedColumn])
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    // just in case neither worked (from older ver of this func)
    return Object.values(row).some(value => 
      String(value)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  })

  return (
    <div className="container mt-4">

      <h1 className="mb-4">
        Results for query: <span className="text-primary">{queryTitle}</span>
      </h1>

      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && data.length === 0 && (
        <p className="text-danger">No results found.</p>
      )}

      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            <option value="">All Columns</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      </div>

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
              {filteredData.map((row, i) => (
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