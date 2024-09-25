import { useEffect, useState } from "react";

function RequestList() {
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchRequest() {
    try {
      const res = await fetch("/api/user-request");

      if (!res.ok) {
        throw new Error("Error downloading requeest");
      }

      const obj = await res.json();
      setRequest(obj);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Can't loading requst's");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequest();
  }, []);

  if (loading) {
    return <div>loading requst's...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ul>
        {request.map((request: {  id: number;picture: string; propositionServiceId: number; description: string; desiredDateTime: LocalDateTime ; userId: number; addressId: number; }) => (
          <li key={request.id}>
            {request.picture} -- {request.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestList;