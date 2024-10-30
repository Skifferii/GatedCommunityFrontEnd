import { useEffect, useState } from "react";

// Определяем интерфейс для элемента сервиса
interface Service {
  id: number;
  title: string;
  description: string;
  files?: { id: number; fileData: string }[]; // Опционально, если у вас есть файлы
}

function OfferedServicesList() {
  const [services, setServices] = useState<Service[]>([]); // Указываем тип
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchServices() {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch("/api/offered-services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Error loading services");
      }
      const obj: Service[] = await res.json(); // Задаем ожидаемый тип
      setServices(obj);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="request-list">
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.title} -- {service.description}
            {service.files && service.files.map((file) => (
              <div key={file.id}>
                <img
                  src={`data:image/jpeg;base64,${file.fileData}`} // Здесь вставляем кодировку
                  alt={`File ${file.id}`}
                  style={{ width: '100px', height: '100px' }} // Установите нужные размеры
                />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OfferedServicesList;
