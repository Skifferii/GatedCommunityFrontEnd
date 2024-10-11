import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getUserRole from "../../components/getUserRole/getUserRole";
import "./ProfilePage.css";

interface Address {
  id: number;
  street: string;
  numberHouse: string;
  city: string;
  index: number;
  active: boolean;
}

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  addresses: Address[];
}

function ProfilePage() {
  const role = getUserRole();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddresses, setShowAddresses] = useState<boolean>(false);
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  async function fetchUserData() {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token || !userName) {
        throw new Error("Токен или имя пользователя отсутствуют");
      }

      const res = await fetch(`/api/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }

      const obj: UserData = await res.json();
      setUserData(obj);
    } catch (err) {
      setError("Не удалось загрузить данные пользователя.");
      console.log(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userName) {
      fetchUserData();
    } else {
      navigate("/login");
    }
  }, [userName]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    setUserData(null);
    navigate("/login");
  };

  const handleShowAddresses = () => {
    setShowAddresses(!showAddresses);
  };

  const handleUpdateAddress = async (id: number, updatedAddress: Address) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`/api/addresses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAddress),
      });
      if (!res.ok) {
        throw new Error("Ошибка обновления адреса");
      }
      const updatedData = await res.json();
      setUserData((prevData) =>
        prevData ? { ...prevData, addresses: prevData.addresses.map((addr) => (addr.id === id ? updatedData : addr)) } : null
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Ошибка удаления адреса");
      }
      setUserData((prevData) =>
        prevData ? { ...prevData, addresses: prevData.addresses.filter((addr) => addr.id !== id) } : null
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-page">
      <h2>Мой профиль</h2>
      {userData ? (
        <>
          <p>Firstname: {userData.firstName}</p>
          <p>Lastname: {userData.lastName}</p>
          <p>Username: {userData.userName}</p>
          <p>Email: {userData.email}</p>
          <p>
            {role} {userData.id}
          </p>

          <button onClick={handleShowAddresses}>Моя недвижимость</button>
          {showAddresses && (
            <div>
              <h3>Мои адреса:</h3>
              {userData.addresses.map((address) => (
                <div key={address.id}>
                  <p>Улица: {address.street}</p>
                  <p>Дом: {address.numberHouse}</p>
                  <p>Город: {address.city}</p>
                  <p>Индекс: {address.index}</p>
                  <p>Активный: {address.active ? "Да" : "Нет"}</p>
                  <button onClick={() => handleUpdateAddress(address.id, address)}>Изменить</button>
                  <button onClick={() => handleDeleteAddress(address.id)}>Удалить</button>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleLogout}>Выйти из профиля</button>
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
