import { useEffect, useState } from "react";

function OfferedServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchServices() {
    const token = localStorage.getItem("accessToken"); // Получаем токен
    try {
      const res = await fetch("/api/offered-services", {
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
      if (!res.ok) {
        throw new Error("Ошибка при загрузке сервисов");
      }
      const obj = await res.json();
      setServices(obj);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Не удалось загрузить сервисы");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return <div>Загрузка сервисов...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="request-list">
      <ul>
        {services.map((service: { title: string; id: number; description: string }) => (
          <li key={service.id}>
            {service.title} -- {service.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OfferedServicesList;

