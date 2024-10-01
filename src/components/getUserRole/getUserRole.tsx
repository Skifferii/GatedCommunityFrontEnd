import jwtDecode from "jwt-decode";

function getUserRole() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const decodedToken = jwtDecode(token) as { role?: string; roles?: string[] };

  const userRole = decodedToken.role || decodedToken.roles;

  return userRole;
}

export default getUserRole;
