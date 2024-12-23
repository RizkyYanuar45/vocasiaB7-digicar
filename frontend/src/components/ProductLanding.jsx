import React, { useState, useEffect } from 'react';
import Carousel from './utils/Carousel';
import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { CarDetail } from './Modal/CarDetail';
import { scrollToTop } from './utils/ScrollToTop';
import classNames from 'classnames';

export function ProductLanding() {
  const [isDetail, setIsDetail] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCars = async () => {
    try {
      const response = await fetch('https://v1.digicar.my.id/api/cars/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const filteredCars = data.filter((car) => car.isUsed === 'Ready').slice(0, 5);
      setProducts(filteredCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load cars. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleOpenDetail = (car) => {
    setSelectedCar(car);
    setIsDetail(true);
  };

  const handleCloseDetail = () => {
    setIsDetail(false);
    setSelectedCar(null);
  };

  return (
    <section id="products" className="bg-rose-800 py-20 px-4 rounded-[130px_0px_0px_0px]" aria-labelledby="products-heading">
      <div className="w-full mx-auto">
        <h2 id="products-heading" className="text-5xl font-bold text-white-50 mb-8 ml-32">
          Produk
        </h2>
        <div className="flex justify-end mb-8">
          <Link to={'/catalog'}>
            <button onClick={scrollToTop} className="text-lg font-medium text-white-50 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 rounded-lg px-4 py-2">
              Lihat Semua
            </button>
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-white-50">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <Carousel>
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <article
                  className={classNames('rounded-3xl p-8 h-[500px] flex flex-col justify-between', {
                    'bg-red-100': product._id % 2 !== 0,
                    'bg-stone-600': product._id % 2 === 0,
                  })}
                  aria-labelledby={`product-${product._id}-heading`}
                >
                  <img src={`https://v1.digicar.my.id/${product.image}`} alt={product.name} className="w-full rounded-3xl mb-6" />
                  <h3 id={`product-${product._id}-heading`} className="text-2xl font-bold text-black-950 mb-2">
                    {product.name} | {product.tahun }
                  </h3>
                  <p className="text-lg text-black-950 mb-4">{product.plate}</p>
                  <div className="text-2xl font-bold mb-6">Rp. {product.pricePerDay.toLocaleString('id-ID')}/ 1 Hari</div>
                  <div className="flex gap-8">
                    <a href="#" className="w-1/2 py-2 text-md rounded-full text-center bg-night-shadz-800 hover:bg-night-shadz-900 text-white-50" onClick={() => handleOpenDetail(product)}>
                      Detail
                    </a>
                    <Link to={`/catalog/order/${product._id}`} className="w-1/2 py-2 text-md rounded-full text-center bg-night-shadz-800 hover:bg-night-shadz-900 text-white-50">
                      Pesan Sekarang
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Carousel>
        )}
      </div>
      <CarDetail
        isOpen={isDetail}
        onClose={handleCloseDetail}
        detail={selectedCar ? selectedCar.description : ''}
        imageCar={selectedCar ? `https://v1.digicar.my.id/${selectedCar.image}` : ''}
        nameCar={selectedCar ? selectedCar.name : ''}
      />
    </section>
  );
}
