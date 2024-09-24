import React, { useEffect, useState } from 'react';

interface UserData {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}

function ProfilePage() {
    const [userData, setUserData] = useState<UserData | null>(null);

    async function fetchUserData() {
        const res = await fetch("/api/users");
        const obj: UserData = await res.json();
        setUserData(obj);
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Загрузка...</div>;
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