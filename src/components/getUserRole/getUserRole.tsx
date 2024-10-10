import { jwtDecode } from "jwt-decode";


function getUserRole() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }
   // Расшифровываем токен
  const decodedToken = jwtDecode(token) as { roles: { authority: string }[] };

  // Проверяем, есть ли роль "ROLE_ADMIN"
  const hasAdminRole = decodedToken.roles.some(role => role.authority === "ROLE_ADMIN");

  // Устанавливаем роль "Admin" или "User"
  const userRole = hasAdminRole ? "admin" : "user";

  // Сохраняем в localStorage
  localStorage.setItem('userRoleLocal', userRole);

  return userRole;
}

export default getUserRole;