import React from 'react';
import getUserRole from '../getUserRole/getUserRole';


function AdminButton() {
  const role = getUserRole();

  return (
    <div>
      {role === 'admin' && (
        <button onClick={() => alert("Admin action")}>
          Admin Only Button
        </button>
      )}
    </div>
  );
}

export default AdminButton;