import React, { useEffect, useState } from 'react';
import Carousel from './utils/Carousel';
import { SwiperSlide } from 'swiper/react';
import { Star } from 'lucide-react';

export function TestiLanding() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('https://v1.digicar.my.id/api/testimoni', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        throw new Error('Data format is incorrect');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to load testimonials. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section id="testi" className="bg-rose-800 rounded-[130px_0px_130px_0px]" aria-labelledby="testimonials-heading">
      <div className="py-20 px-4 max-w-full mx-auto">
        <h2 id="testimonials-heading" className="text-5xl font-bold text-center text-white-50 mb-16" data-aos="fade-up" data-aos-duration="1000">
          Apa Kata Customer Kami?
        </h2>
        {loading ? (
          <div className="text-center text-white-50">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <Carousel>
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <article className="bg-white-50 rounded-3xl p-8" aria-labelledby={`testimonial-${testimonial._id}-heading`}>
                  <div className="flex flex-col items-center gap-6">
                    <img src={`https://v1.digicar.my.id/${testimonial.image}`} alt={testimonial.user} className="w-24 h-24 rounded-full" />
                    <div className="flex flex-col items-center ">
                      <h3 id={`testimonial-${testimonial._id}-heading`} className="text-xl font-medium text-black-950">
                        {testimonial.user}
                      </h3>
                      {testimonial.comment && <p className="mt-2 text-black-950">{testimonial.comment}</p>}
                      <div className="flex mt-2">
                        {Array.from({ length: testimonial.rating }, (_, index) => (
                          <Star style={{ fill: 'yellow', outline: 'yellow' }} key={index} className="w-5 h-5 text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}
