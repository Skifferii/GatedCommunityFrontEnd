import React, { useEffect, useState } from 'react';

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

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>Данные пользователя отсутствуют.</div>;
    }

    return (
        <div className="profile-page">
            <h2>Мой профиль</h2>
            <p>Имя: {userData.firstName} {userData.lastName}</p>
            <p>Username: {userData.userName}</p>
            <p>Email: {userData.email}</p>
            <button>Моя недвижимость</button>
            <button>Выйти из профиля</button>
            <button>Удалить аккаунт</button>
        </div>
    );
}

export default ProfilePage;