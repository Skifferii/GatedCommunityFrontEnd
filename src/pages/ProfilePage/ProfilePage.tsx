import { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import AddressesList from "../../components/addresses-list/AddressesList";

interface Address {
  id: number;
  street: string;
  numberHouse: string;
  city: string;
  index: number;
 // active: boolean;
}

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  addresses: Address[];
}

function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editAddressId, setEditAddressId] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showAddAddress, setShowAddAddress] = useState<boolean>(false);
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch(`/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUserData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load user data.");
        navigate("/login");
      } finally {
        // setLoading(false);
      }
    }

    if (userName) fetchUserData();
  }, [userName, navigate]);

  
  // if (loading) {
  //   return <div>Loading profile data.</div>;
    
  // }

  if (error) {
    return <div>{error}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    setUserData(null);
    navigate("/login");
    window.location.reload();
  };

  const handleDeleteAddress = async () => {
    if (showDeleteConfirm) {
      try {
        const token = localStorage.getItem("accessToken");
        await fetch(`/api/users/${userData?.id}/address/${showDeleteConfirm}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData((prev) => 
          prev ? { ...prev, addresses: prev.addresses.filter((addr) => addr.id !== showDeleteConfirm) } : prev
        );
        setShowDeleteConfirm(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  
  const handleAddAddress = async () => {
    if (selectedAddress) {
      try {
        const token = localStorage.getItem("accessToken");
        await fetch(`/api/users/${userData?.id}/address/${selectedAddress.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData((prev) => 
          prev ? { ...prev, addresses: [...prev.addresses, selectedAddress] } : prev
        );
        setShowAddAddress(false);
      } catch (err) {
        console.log(err);
      }
    }
  };


  const handleUpdateAddress = async () => {
    
    if (editAddressId && selectedAddress) {
      try {
        const token = localStorage.getItem("accessToken");
        await fetch(`/api/users/${userData?.id}/address/${editAddressId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userData?.id,
            addressId: selectedAddress.id,
          }),
        });
        setUserData((prev) => 
          prev ? { ...prev, addresses: prev.addresses.map((addr) => (addr.id === editAddressId ? selectedAddress : addr)) } : prev
        );
        setEditAddressId(null);
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="profile-page">
      {userData ? (
        <>
          <h2>Hello {userData.userName}</h2>
          <p></p>
          <p>Firstname: {userData.firstName}</p>
          <p>Lastname: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>Logout</button>

          <h3>Addresses</h3>
          {userData.addresses.map((address) => (
            <div key={address.id}>
              {editAddressId === address.id ? (
                <div>
                  <AddressesList onSelect={(_id, addr) => setSelectedAddress(addr)} />
                  <button onClick={() => setEditAddressId(null)}>Cancel</button>
                  <button onClick={handleUpdateAddress}>Save</button>
                </div>
              ) : (
                <div>
                  <p>{address.street}, {address.numberHouse}, {address.city}, {address.index}</p>
                  <button onClick={() => setEditAddressId(address.id)}>Edit</button>
                  <button onClick={() => setShowDeleteConfirm(address.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}

          {showDeleteConfirm && (
            <div>
              <p>Are you sure you want to delete it?</p>
              <button onClick={() => setShowDeleteConfirm(null)}>NO</button>
              <button onClick={handleDeleteAddress}>YES</button>
            </div>
          )}

          <button onClick={() => setShowAddAddress(true)}>Add address</button>
          {showAddAddress && (
            <div>
              <AddressesList onSelect={(_id, addr) => setSelectedAddress(addr)} />
              <button onClick={handleAddAddress}>Save new address</button>
              <button onClick={() => setShowAddAddress(false)}>Cancel</button>
            </div>
          )}
        </>
      ) : (
        <p>
          Please, <Link to="/login">Log in</Link>.
        </p>
      )}
    </div>
  );
}

export default ProfilePage;