import getUserRole from "../getUserRole/getUserRole";
import "./AdminButton.css";

interface AdminButtonProps {
  buttonText: string;
  onClick: () => void;
}

function AdminButton({ buttonText, onClick }: AdminButtonProps) {
  const role = getUserRole();

  if (role !== "admin") {
    return null; // Не рендерим кнопку, если роль не "Admin"
  }

  return (
    <button className="admin-button" onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default AdminButton;
