import React, { useState, useEffect } from 'react';
import './RequestForm.css'; // Подключаем файл стилей
import Spinner from '../Spinner/Spinner'; // Подключаем спиннер

interface Service {
  id: number;
  title: string;
}

interface Address {
  id: number;
  index: number;
  city: string;
  street: string;
  numberHouse: string;
}

function RequestForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [userId, setUserId] = useState<string>('2'); // временное значение userId
  const [userValid, setUserValid] = useState<boolean | null>(null); // проверка пользователя
  const [loading, setLoading] = useState<boolean>(true); // глобальная загрузка
  const [formData, setFormData] = useState({
    picture: '',
    propositionServiceId: '',
    description: '',
    desiredDateTime: '',
    userId: '1', // временное значение
    addressId: ''
  });

  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  // Функция для получения списка services
  async function fetchServices() {
    try {
      const res = await fetch('/api/offered-services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Ошибка при загрузке услуг.');
    } finally {
      setLoadingServices(false);
    }
  }

  // Функция для получения списка addresses
  async function fetchAddresses() {
    try {
      const res = await fetch('/api/addresses');
      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      console.error('Ошибка при загрузке адресов.');
    } finally {
      setLoadingAddresses(false);
    }
  }

  // Проверка userId
  const validateUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/users${userId}`);
      if (res.ok) {
        setUserValid(true);
      } else {
        // TODO  MUST CHANGE !!!!!!!!!!!!!! ACHTUNG ACHTUNG !!!!!
        setUserValid(true); // TODO  MUST CHANGE !!!!!!!!!!!!!! ACHTUNG ACHTUNG !!!!!
        // TODO  MUST CHANGE !!!!!!!!!!!!!! ACHTUNG ACHTUNG !!!!!
      }
    } catch (err) {
      setUserValid(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchServices();
    fetchAddresses();
    setLoading(false);
  }, []);

  // Обработчик изменения формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'userId') {
      validateUser(value);
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData = {
      picture: formData.picture,
      propositionServiceId: parseInt(formData.propositionServiceId),
      description: formData.description,
      desiredDateTime: formData.desiredDateTime,
      userId: parseInt(formData.userId),
      addressId: parseInt(formData.addressId),
    };

    try {
      const res = await fetch('/api/user-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (res.ok) {
        alert('Запрос успешно создан!');
      } else {
        alert('Ошибка при создании запроса.');
      }
    } catch (err) {
      console.error('Ошибка отправки запроса:', err);
      alert('Не удалось отправить запрос.');
    }
  };

  if (loadingServices || loadingAddresses || loading) {
    return <Spinner />; // Показываем спиннер, пока идет загрузка
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Picture URL:</label>
        <input type="text" name="picture" value={formData.picture} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Proposition Service:</label>
        <select name="propositionServiceId" value={formData.propositionServiceId} onChange={handleChange} required>
          <option value="">Выберите услугу</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.id} - {service.title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Desired Date:</label>
        <input type="datetime-local" name="desiredDateTime" value={formData.desiredDateTime} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Address:</label>
        <select name="addressId" value={formData.addressId} onChange={handleChange} required>
          <option value="">Выберите адрес</option>
          {addresses.map(address => (
            <option key={address.id} value={address.id}>
              {address.id} - {address.index}, {address.city}, {address.street}, {address.numberHouse}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
          style={{ borderColor: userValid === false ? 'red' : '' }}
        />
        {userValid === false && <span style={{ color: 'red' }}>Пользователь не найден</span>}
      </div>

      <button type="submit" disabled={!userValid}>Create Request</button>
    </form>
  );
}

export default RequestForm;