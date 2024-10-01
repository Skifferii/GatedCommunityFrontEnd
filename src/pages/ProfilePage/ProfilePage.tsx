import React, { useEffect, useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>(""); // Добавляем userName

  // Функция для получения данных пользователя с отправкой токена
  async function fetchUserData() {
    try {
      const token = localStorage.getItem("accessToken"); // Получаем accessToken из localStorage
      if (!token) {
        throw new Error("Токен отсутствует");
      }

      const res = await fetch(`/api/users/${userName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок Authorization
        },
      });

      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }

      const obj: UserData = await res.json();
      setUserData(obj);
    } catch (err) {
      setError("Не удалось загрузить данные пользователя.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [userName]); // Отслеживаем изменение userName для обновления данных

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-page">
      {userData && (
        <div>
          <h1>{userData.firstName} {userData.lastName}</h1>
          <p>Username: {userData.userName}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// interface UserData {
//   firstName: string;
//   lastName: string;
//   userName: string;
//   email: string;
// }

// function ProfilePage() {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Функция для получения данных пользователя с отправкой токена
//   async function fetchUserData() {
//     try {
//       const token = localStorage.getItem("accessToken"); // Получаем accessToken из localStorage
//       if (!token) {
//         throw new Error("Токен отсутствует");
//       }

//       const res = await fetch("/api/users/results", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Добавляем токен в заголовок Authorization
//         },
//         body: "userName" : ""
//       });

//       if (!res.ok) {
//         throw new Error(`Ошибка: ${res.status}`);
//       }

//       const obj: UserData = await res.json();
//       setUserData(obj);
//     } catch (err) {
//       setError("Не удалось загрузить данные пользователя.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   // Функция выхода из профиля
//   const handleLogout = () => {
//     localStorage.removeItem("accessToken"); // Удаляем токен из localStorage
//     setUserData(null); // Обнуляем состояние пользователя
//   };

//   if (loading) {
//     return <div>Загрузка...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="profile-page">
//       <h2>Мой профиль</h2>
//       {userData ? (
//         <>
//           <p>Имя: {userData.firstName} {userData.lastName}</p>
//           <p>Username: {userData.userName}</p>
//           <p>Email: {userData.email}</p>
//           <button>Моя недвижимость</button>
//           <button onClick={handleLogout}>Выйти из профиля</button>
//           <button>Удалить аккаунт</button>
//         </>
//       ) : (
//         <div>
//           <p>Пожалуйста, <Link to="/login">войдите</Link> или <Link to="/register">зарегистрируйтесь</Link>.</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProfilePage;
