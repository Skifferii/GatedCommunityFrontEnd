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
      try {
        const response = await fetch("/api/user-request");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Ошибка при получении списка запросов", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="request-list">
      <h3>Список запросов</h3>
      <select onChange={(e) => onSelectRequest(e.target.value)}>
        <option value="">Выберите запрос</option>
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

// import React, { useEffect, useState } from "react";

// interface RequestListProps {
//   onSelectRequest: (requestId: string) => void;
// }

// const RequestList: React.FC<RequestListProps> = ({ onSelectRequest }) => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await fetch("/api/user-request");
//         const data = await response.json();
//         setRequests(data);
//       } catch (error) {
//         console.error("Ошибка при получении списка запросов", error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   return (
//     <div className="request-list"> {/* Обертка для стиля */}
//       <h3>Список запросов</h3>
//       <select onChange={(e) => onSelectRequest(e.target.value)}>
//         <option value="">Выберите запрос</option>
//         {requests.map((request) => (
//           <option key={request.id} value={request.id}>
//             {request.id} - {request.propositionServiceTitle}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default RequestList;

// // import React, { useEffect, useState } from "react";

// // interface Request {
// //   id: string;
// //   propositionServiceId: string;
// //   propositionServiceTitle: string;
// // }

// // interface RequestListProps {
// //   onSelectRequest: (requestId: string) => void; // Функция для обработки выбора запроса
// // }

// // const RequestList: React.FC<RequestListProps> = ({ onSelectRequest }) => {
// //   const [requests, setRequests] = useState<Request[]>([]);

// //   useEffect(() => {
// //     const fetchRequests = async () => {
// //       try {
// //         const response = await fetch("/api/user-request");
// //         const data = await response.json();
// //         setRequests(data);
// //       } catch (error) {
// //         console.error("Ошибка при получении списка запросов", error);
// //       }
// //     };

// //     fetchRequests();
// //   }, []);

// //   return (
// //     <div className="request-list">
// //       <h3>Список запросов</h3>
// //       <select onChange={(e) => onSelectRequest(e.target.value)}>
// //         <option value="">Выберите запрос</option>
// //         {requests.map((request) => (
// //           <option key={request.id} value={request.id}>
// //             {request.id} - {request.propositionServiceTitle}
// //           </option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // };

// // export default RequestList;
