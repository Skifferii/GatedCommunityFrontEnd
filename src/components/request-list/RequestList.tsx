import React, { useEffect, useState } from "react";

interface Request {
  id: string;
  propositionServiceId: string;
  propositionServiceTitle: string;
}

interface RequestListProps {
  onSelectRequest: (requestId: string) => void;
}

const RequestList: React.FC<RequestListProps> = ({ onSelectRequest }) => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("accessToken"); 
      try {
        const response = await fetch("/api/user-request", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error getting list of requests", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="request-list">
      <h3>List of requests</h3>
      <select onChange={(e) => onSelectRequest(e.target.value)}>
        <option value="">Select requests</option>
        {requests.map((request) => (
          <option key={request.id} value={request.id}>
            {request.id} - {request.propositionServiceTitle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RequestList;