import jwtDecode from "jwt-decode";

function getUserRole() {
  const token = localStorage.getItem("token"); // Получаем токен из localStorage

  if (!token) {
    return null; // Если токен отсутствует, возвращаем null
  }

  // Декодируем токен, чтобы получить полезную нагрузку (payload)
  const decodedToken = jwtDecode(token) as { role?: string; roles?: string[] };

  // Предположим, что роль хранится в поле `role` или `roles`
  const userRole = decodedToken.role || decodedToken.roles;

  return userRole;
}

export default getUserRole;
