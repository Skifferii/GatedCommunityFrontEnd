import { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import getUserRole from "../../components/getUserRole/getUserRole";
import "./ProfilePage.css";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  addresses: Address[];
}

function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("userName")
  ); // Получаем userName
  const navigate = useNavigate(); // Для перенаправления пользователя

  // Функция для получения данных пользователя с отправкой токена
  async function fetchUserData() {
    try {
      const token = localStorage.getItem("accessToken"); // Получаем accessToken из localStorage
      if (!token || !userName) {
        throw new Error("Токен или имя пользователя отсутствуют");
      }

      const res = await fetch(`/api/users/results?name=${userName}`, {
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Не удалось загрузить данные пользователя.");
      // Перенаправляем на страницу входа или регистрации
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userName) {
      fetchUserData();
    } else {
      // Если имя пользователя отсутствует, перенаправляем на страницу входа или регистрации
      navigate("/login");
    }
  }, [userName]); // Отслеживаем изменение userName для обновления данных

  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Функция выхода из профиля
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Удаляем токен из localStorage
    localStorage.removeItem("userName"); // Удаляем userName из localStorage
    setUserData(null); // Обнуляем состояние пользователя
    navigate("/login"); // Перенаправляем на страницу логина
  };

  return (
    <div className="profile-page">
      {userData ? (
        <>
          <h2>Мой профиль</h2>
          <p>Firstname: {userData.firstName}</p>
          <p>Lastname: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>
            {role} {userData.id}
          </p>

          <button>Моя недвижимость</button>
          <button onClick={handleLogout}>Выйти из профиля</button>
          <button>Удалить аккаунт</button>
        </>
      ) : (
        <p>
          Пожалуйста, <Link to="/login">войдите</Link>.
        </p>
      )}
    </div>
  );
}

export default ProfilePage;
