import React, { useState, useEffect } from 'react';
import { Bolt, Car, Newspaper, Contact, NotebookPen, UserCog, LogOut, Menu, X, Logs, MailCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './../../assets/Logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/admin/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  return (
    <div>
      {/* Navbar untuk Desktop */}
      <div className="hidden md:block h-screen w-44 bg-primary fixed top-0 left-0 z-50">
        <img src={Logo} alt="Logo" className="w-full h-16 object-contain bg-white-50 rounded-tr-full rounded-br-full" />
        <ul className="flex flex-col text-white-50 font-main justify-evenly items-start h-full">
          {/* Navbar Items */}
          {[
            { name: 'Dashboard', path: '/admin/dashboard', icon: <Bolt /> },
            { name: 'Order', path: '/admin/order', icon: <Logs /> },
            { name: 'Car Option', path: '/admin/car', icon: <Car /> },
            { name: 'Konten Blog', path: '/admin/blog', icon: <Newspaper /> },
            {
              name: 'Contact Section',
              path: '/admin/contact',
              icon: <Contact />,
            },
            {
              name: 'Subscribers',
              path: '/admin/subscribers',
              icon: <MailCheck />,
            },
            {
              name: 'Testimoni Section',
              path: '/admin/testimoni',
              icon: <NotebookPen />,
            },

            { name: 'User', path: '/admin/user', icon: <UserCog /> },
          ].map((item) => (
            <li
              key={item.name}
              className={`relative w-full flex items-center px-4 py-2 rounded-md transition-all duration-300 ${location.pathname === item.path ? 'bg-white-50 text-primary shadow-md' : 'hover:bg-gray-700 hover:text-gray-300'}`}
            >
              <Link to={item.path} className="flex items-center w-full space-x-4">
                <span className="w-6 flex justify-center">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          {/* Log Out */}
          <li className=" mb-16 w-full flex justify-center items-center">
            <button className="flex items-center space-x-2 px-4 w-36 py-2 border border-secondary text-white-50 rounded hover:text-gray-900 hover:bg-secondary transition-all duration-300">
              <span className="w-6 flex justify-center">
                <LogOut />
              </span>
              <Link to={'/admin/login'}>
                <span>Log Out</span>
              </Link>
            </button>
          </li>
        </ul>
      </div>

      {/* Navbar untuk Mobile */}
      <div className="md:hidden fixed top-0 left-0 z-50 w-full bg-primary">
        <div className="flex items-center justify-between px-4 py-3 bg-white-50">
          <img src={Logo} alt="Logo" className="h-10 object-contain" />
          <button onClick={toggleNavbar} className="text-primary focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <ul className="flex flex-col text-white-50 font-main bg-primary space-y-2 px-4 py-2">
            {[
              { name: 'Dashboard', path: '/admin/dashboard', icon: <Bolt /> },
              { name: 'Order', path: '/admin/order', icon: <Logs /> },
              { name: 'Car Option', path: '/admin/car', icon: <Car /> },
              { name: 'Konten Blog', path: '/admin/blog', icon: <Newspaper /> },
              {
                name: 'Contact Section',
                path: '/admin/contact',
                icon: <Contact />,
              },
              {
                name: 'Testimoni Section',
                path: '/admin/testimoni',
                icon: <NotebookPen />,
              },
              {
                name: 'Subscribers',
                path: '/admin/subscribers',
                icon: <MailCheck />,
              },
              { name: 'User', path: '/admin/user', icon: <UserCog /> },
            ].map((item) => (
              <li key={item.name} className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${location.pathname === item.path ? 'bg-white-50 text-primary shadow-md' : 'hover:bg-gray-700 hover:text-gray-300'}`}>
                <Link
                  to={item.path}
                  className="flex items-center w-full space-x-4"
                  onClick={toggleNavbar} // Tutup menu setelah klik
                >
                  <span className="w-6 flex justify-center">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}

            {/* Log Out */}
            <li className="mb-5 w-full flex justify-center items-center">
              <button onClick={handleLogout} className="flex items-center space-x-2 px-4 w-full py-2 border border-secondary text-white-50 rounded hover:text-gray-900 hover:bg-secondary transition-all duration-300">
                <span className="w-6 flex justify-center">
                  <LogOut />
                </span>
                <Link to={'/admin/login'}>
                  <span>Log Out</span>
                </Link>
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
