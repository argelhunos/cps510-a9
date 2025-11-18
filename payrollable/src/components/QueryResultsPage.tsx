import { useParams } from "react-router";

export default function QueryResultsPage() {
  const { queryId } = useParams();

  return (
    <div>
      <h1>Results for: {queryId}</h1>
      {/* <QueryResults queryId={queryId} /> */}
    </div>
  );
}