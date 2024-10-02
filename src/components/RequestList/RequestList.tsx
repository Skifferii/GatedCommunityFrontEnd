import React, { useEffect, useState } from "react";

interface Request {
  id: string;
  propositionServiceId: string;
  description: string;
  picture?: string;
  desiredDateTime: string;
  userId: string;
  addressId: string;
}

interface RequestListProps {
  onSelectRequest: (requestId: string) => void; // Функция для обработки выбора запроса
}

const RequestList: React.FC<RequestListProps> = ({ onSelectRequest }) => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/user-request");
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
        <option value="">Select your query</option>
        {requests.map((request) => (
          <option key={request.id} value={request.id}>
            {request.id} - {request.propositionServiceId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RequestList;