import React, { useState } from 'react';
import carImage from './../../assets/logindash.png';
import Logo from './../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { SuccessReset } from '../../components/admin/Notification/SuccessReset';

export const Reset = () => {
  const [step, setStep] = useState('request'); // "request" or "reset"
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRequestResetCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      console.log(response);  

      if (response.ok) {
        alert('Kode OTP telah dikirim ke email Anda.');
        setStep('reset');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim kode OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: otp, newPassword }),
      });

      if (response.ok) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          navigate('/admin/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mereset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:flex-row flex flex-col bg-secondary min-h-screen overflow-hidden">
      {/* Banner Section */}
      <section id="banner" className="bg-secondary w-full lg:w-2/5 h-60 lg:h-screen flex flex-col relative lg:items-start lg:justify-start">
        <img src={Logo} alt="Logo" className="w-36 h-16 m-5 object-contain" />
        <img src={carImage} alt="Car Illustration" className="absolute w-[7rem] h-[7rem] right-0 top-0 lg:start-20 lg:w-[34rem] lg:h-[34rem]" />
      </section>

      {/* Form Section */}
      <section id="form-section" className="lg:w-4/5 w-full bg-white-50 rounded-tl-3xl rounded-bl-3xl flex-grow">
        <h1 className="font-main font-bold text-3xl lg:text-4xl pt-8 lg:pt-16 px-5 text-text text-center lg:text-left">{step === 'request' ? 'Kirim Kode Reset' : 'Reset Password'}</h1>

        <form onSubmit={step === 'request' ? handleRequestResetCode : handleResetPassword} className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-10rem)] overflow-y-auto px-4">
          {step === 'request' && (
            <div className="flex flex-col w-full max-w-lg">
              <label htmlFor="email" className="font-main font-semibold text-text text-lg lg:text-xl mb-2">
                Masukkan Email Anda
              </label>
              <input type="email" id="email" className="border w-full h-12 p-3 border-text rounded-xl" placeholder="Masukkan email Anda" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" className="bg-primary text-white-50 p-3 mt-6 rounded-lg w-full" disabled={loading}>
                {loading ? 'Mengirim...' : 'Kirim Kode Reset'}
              </button>
            </div>
          )}

          {step === 'reset' && (
            <>
              <div className="flex flex-col w-full max-w-lg">
                <label htmlFor="otp" className="font-main font-semibold text-text text-lg lg:text-xl mb-2">
                  Kode OTP
                </label>
                <input type="text" id="otp" className="border w-full h-12 p-3 border-text rounded-xl" placeholder="Masukkan kode OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              </div>

              <div className="relative flex flex-col w-full max-w-lg mt-6">
                <label htmlFor="newPassword" className="font-main font-semibold text-text text-lg lg:text-xl mb-2">
                  Password Baru
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  className="border w-full h-12 p-3 border-text rounded-xl"
                  placeholder="Masukkan password baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={togglePassword} className="absolute right-3 top-12">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              <button type="submit" className="bg-primary text-white-50 p-3 mt-6 rounded-lg w-full" disabled={loading}>
                {loading ? 'Mereset...' : 'Reset Password'}
              </button>
            </>
          )}
        </form>
      </section>
      {showNotification && <SuccessReset />}
    </div>
  );
};
