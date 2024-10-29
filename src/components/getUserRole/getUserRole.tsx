import { jwtDecode } from "jwt-decode";


function getUserRole() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }
   // Decrypt the token// Расшифровываем токен
  const decodedToken = jwtDecode(token) as { roles: { authority: string }[] };

 // Check if there is a role "ROLE_ADMIN" // Проверяем, есть ли роль "ROLE_ADMIN"
  const hasAdminRole = decodedToken.roles.some(role => role.authority === "ROLE_ADMIN");

 // Set the role to "Admin" or "User"
  const userRole = hasAdminRole ? "admin" : "user";

 // Save in localStorage // Сохраняем в localStorage
  localStorage.setItem('userRoleLocal', userRole);

  return userRole;
}

export default getUserRole;