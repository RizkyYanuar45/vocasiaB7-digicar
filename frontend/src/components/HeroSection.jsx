import React, { useState } from 'react';

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://v1.digicar.my.id/api/subscriber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Berhasil berlangganan!');
        setEmail('');
      } else {
        setMessage('Gagal berlangganan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="self-stretch px-16 pt-16 pb-4 w-full max-md:px-5 max-md:max-w-full bg-gradient-to-r from-cinderella-100 to-white-50">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full animate__animated animate__slideInLeft">
          <div className="flex flex-col self-stretch my-auto w-full max-md:mt-10 max-md:max-w-full">
            <h1 className="text-5xl font-bold text-stone-600 max-md:max-w-full max-md:text-4xl">
              <span className="text-rose-800">Kenyamanan dan Keamanan</span> <br />
              <span className="text-rose-800">Perjalanan Anda, </span>
              <br />
              Prioritas Kami{' '}
            </h1>
            <form className="flex gap-10 px-9 py-3 mt-16 max-w-full bg-white-50 rounded-2xl w-[416px] max-md:px-5 max-md:mt-10" onSubmit={handleSubmit}>
              <label htmlFor="emailSubscribe" className="sr-only">
                Masukkan email anda
              </label>
              <input type="email" id="emailSubscribe" value={email} onChange={handleEmailChange} className="grow shrink my-auto text-lg text-stone-600 w-[154px]" placeholder="Masukkan email anda" required />
              <button type="submit" className="gap-2.5 self-stretch py-3 pr-3.5 pl-4 text-sm font-medium text-white-50 whitespace-nowrap bg-rose-800 rounded-xl" disabled={loading}>
                {loading ? 'Mengirim...' : 'Berlangganan'}
              </button>
            </form>
            {message && <p className="mt-4 text-center text-red-600">{message}</p>}
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full animate__animated animate__slideInRight">
          <div className="flex relative flex-col grow min-h-[402px] max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/39d073c612bb2e10ebf976180e8edbd7bcad9bf2f6a03d6745ea651c82bc839b?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966"
              className="object-cover absolute inset-0 size-full"
              alt="Hero background"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/39d073c612bb2e10ebf976180e8edbd7bcad9bf2f6a03d6745ea651c82bc839b?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966"
              className="object-contain w-full aspect-[1.4] max-md:max-w-full"
              alt="Hero foreground"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
