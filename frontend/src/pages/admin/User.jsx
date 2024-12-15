import React, { useState, useEffect, useRef } from 'react';
import { Pen } from 'lucide-react';
import Navbar from '../../components/admin/Navbar';
import dummyImg from '../../assets/image 5.png';

export const User = () => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [textbox, setTextBox] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('idUser')?.replace(/"/g, '');
    const token = localStorage.getItem('token');

    if (!userId) {
      setErrorMessage('User ID not found in local storage.');
      return;
    }

    if (!token) {
      setErrorMessage('Token not found in local storage.');
      return;
    }
    const API_URL = `http://localhost:5000/api/users/${userId}`;

    const fetchUser = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setUser(data);
        setNewName(data.name);
        setNewEmail(data.email);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setErrorMessage('Failed to load user data. Please try again.');
      }
    };

    fetchUser();
  }, []);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleMouseEnter = () => {
    setTextBox(true);
  };

  const handleMouseLeave = () => {
    setTextBox(false);
  };

  const handleEdit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('idUser')?.replace(/"/g, '');
    const API_URL = `http://localhost:5000/api/users/${userId}`;

    if (!token) {
      setErrorMessage('Token not found. Please log in again.');
      return;
    }

    const updateData = {
      name: newName,
      email: newEmail,
      ...(newPassword && { password: newPassword }),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user data.');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setSuccessMessage('User information updated successfully!');
    } catch (error) {
      console.error('Failed to update user:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="bg-secondary lg:ml-44 min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <div className="w-1/4 my-1 mt-32">
            <label htmlFor="name" className="font-inter font-light text-sm">
              Name
            </label>

            <div className="relative">
              <input type="text" className="w-full rounded-lg border border-primary max-h-5 mt-3 p-4 text-sm shadow-sm bg-white" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
          </div>

          <div className="w-1/4 my-1">
            <label htmlFor="email" className="font-inter font-light text-sm">
              Email
            </label>

            <div className="relative">
              <input type="email" className="w-full rounded-lg border border-primary max-h-5 mt-3 p-4 text-sm shadow-sm bg-white" placeholder={user.email || 'Email'} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
          </div>

          <div className="w-1/4 my-1">
            <label htmlFor="password" className="font-inter font-light text-sm">
              Password
            </label>

            <div className="relative">
              <input type="password" className="w-full rounded-lg border border-primary max-h-5 mt-3 p-4 text-sm shadow-sm bg-white" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
          </div>

          <button className="w-1/4 mt-5 rounded-lg bg-primary px-5 py-1 text-sm font-medium text-white-50 flex font-inter items-center justify-center" onClick={handleEdit}>
            <Pen className="w-6 h-6 mr-4" />
            Edit
          </button>

          {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
          {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};
