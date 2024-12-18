import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DummyImg from './../assets/image 5.png';

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    startDate: '',
    endDate: '',
    destination: '',
    ktp: null,
    stnk: null,
  });
  const [totalPayment, setTotalPayment] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`https://v1.digicar.my.id/api/cars/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === 'startDate' || name === 'endDate') {
        calculateTotalPayment(name === 'startDate' ? value : formData.startDate, name === 'endDate' ? value : formData.endDate, carData?.pricePerDay);
      }
    }
  };

  const calculateTotalPayment = (startDate, endDate, pricePerDay) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start < end) {
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const total = duration * pricePerDay;
        setTotalPayment(total);
      } else {
        setTotalPayment(0);
      }
    } else {
      setTotalPayment(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('car', id);
    data.append('name', formData.name);
    data.append('contact', formData.contact);
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    data.append('destination', formData.destination);
    data.append('KTP', formData.ktp);
    data.append('STNK', formData.stnk);

    try {
      const response = await fetch('https://v1.digicar.my.id/api/orders', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        alert('Tanggal selesai tidak boleh lebih rendah dari tanggal mulai !');
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Order submitted successfully:', result);
      setSuccessMessage('Order submitted successfully!');

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-3">
          <div className="lg:col-span-1 lg:py-12 ">
            <div className="mt-24">
              <img src={carData.image ? `https://v1.digicar.my.id/${carData.image}` : DummyImg} alt={carData.name} className="w-full h-auto rounded-lg" />
              <h1 className="text-2xl font-bold text-pink-600">{carData.name}</h1>
              <p className="text-gray-700">{carData.description}</p>
              <p className="text-lg font-semibold text-gray-900">Harga per Hari: Rp {carData.pricePerDay.toLocaleString('id-ID')}</p>
              <p className="text-sm text-gray-500">Tahun: {carData.tahun}</p>
              <p className="text-sm text-gray-500">Status: {carData.isUsed}</p>
            </div>
          </div>

          <div className="rounded-lg bg-white-100 p-8 shadow-lg lg:col-span-2 lg:p-12">
            {successMessage && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{successMessage}</div>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="sr-only" htmlFor="name">
                  Nama
                </label>
                <input className="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="Nama" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div>
                <label className="sr-only" htmlFor="contact">
                  Kontak (Email)
                </label>
                <input className="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="Alamat Email" type="email" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="" htmlFor="startDate">
                    Tanggal Mulai
                  </label>
                  <input className="w-full rounded-lg border-gray-200 p-3 text-sm" type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} min={today} required />
                </div>

                <div>
                  <label className="" htmlFor="endDate">
                    Tanggal Selesai
                  </label>
                  <input className="w-full rounded-lg border-gray-200 p-3 text-sm" type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} min={formData.startDate || today} required />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="destination">
                  Tujuan
                </label>
                <input className="w-full rounded-lg border-gray-200 p-3 text-sm" placeholder="Tujuan Perjalanan" type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required />
              </div>

              <div>
                <h1 className="text-black-950" htmlFor="ktp">
                  KTP (Unggah Gambar)
                </h1>
                <input className="w-full rounded-lg border-gray-200 p-3 text-sm" type="file" id="ktp" name="ktp" accept="image/*" onChange={handleChange} required />
              </div>

              <div>
                <h1 className="text-black-950" htmlFor="stnk">
                  SIM (Unggah Gambar)
                </h1>
                <input className="w-full rounded-lg border-gray-200 p-3 text-sm" type="file" id="stnk" name="stnk" accept="image/*" onChange={handleChange} required />
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Total Pembayaran: Rp {totalPayment.toLocaleString()}</span>
              </div>

              <div className="mt-4 flex justify-end gap-4">
                <Link to={'/catalog'}>
                  <button type="button" className="py-2 px-4 bg-gray-500 text-white-100 rounded-lg hover:bg-gray-600">
                    Batal
                  </button>
                </Link>
                <button type="submit" className="py-2 px-4 bg-blue-500 text-white-100 rounded-lg hover:bg-blue-600">
                  Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
