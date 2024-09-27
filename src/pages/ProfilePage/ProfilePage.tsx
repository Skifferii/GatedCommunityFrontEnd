import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  async function fetchUserData() {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const obj: UserData = await res.json();
      setUserData(obj);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Не удалось загрузить данные пользователя.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен из localStorage
    setUserData(null); // Обнуляем состояние пользователя
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-page">
      <h2>Мой профиль</h2>
      {userData ? (
        <>
          <p>
            Имя: {userData.firstName} {userData.lastName}
          </p>
          <p>Username: {userData.userName}</p>
          <p>Email: {userData.email}</p>
          <button>Моя недвижимость</button>
          <button onClick={handleLogout}>Выйти из профиля</button>
          <button>Удалить аккаунт</button>
        </>
      ) : (
        <div>
          <p>
            Пожалуйста, <Link to="/login">войдите</Link> или{" "}
            <Link to="/register">зарегистрируйтесь</Link>.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
