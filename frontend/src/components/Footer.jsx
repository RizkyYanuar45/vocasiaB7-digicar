import React, { useState, useEffect } from "react";

const Footer = () => {
  const [contact, setContact] = useState(null);
  const [subsEmail, setSubsEmail] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setContact(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContact();
  }, []);

  const postSubscribers = async (subsEmail) => {
    const data = {
      email: subsEmail,
    };
    try {
      const response = await fetch("http://localhost:5000/api/subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);

      setSubsEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  const handleSubscribe = () => {
    if (subsEmail) {
      postSubscribers(subsEmail);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div id="footer" className="bg-jon-950 w-full">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-24 text-white-50">
        <div className="space-y-5">
          <h2 className="font-semibold text-white-50 text-4xl">
            <span className="text-night-shadz-700">DigiCar</span>Point
          </h2>
          <p>
            DigiCarPoint merupakan usaha serta wadah yang menyediakan jasa untuk
            merental mobil dengan misi untuk mempermudah pengguna mencari rental
            mobil yang dibutuhkan.
          </p>
          <div className="flex w-full space-x-3">
            {contact && (
              <>
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/facebook.png" alt="facebook" />
                </a>
                <a
                  href={contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/twitter.png" alt="twitter" />
                </a>
                <a
                  href={contact.linkedln}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/linkedin.png" alt="linkedin" />
                </a>
              </>
            )}
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold">Terus Ikuti Perkembangan</h2>
          <p>
            Bergabunglah dengan mailing list kami untuk terus mengikuti
            perkembangan info-info menarik dari kami
          </p>
          <div className="flex w-full border border-white-50 rounded-full p-2">
            <input
              type="text"
              className="w-full bg-transparent rounded-l-full px-3 active:border-none"
              placeholder="Masukkan Email"
              value={subsEmail}
              onChange={(e) => setSubsEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className="bg-cinderella-200 hover:bg-cinderella-300 rounded-r-full w-full text-scorpion-700 py-3"
            >
              Berlangganan Sekarang
            </button>
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="font-semibold text-white-50 text-2xl">
            <span className="text-night-shadz-700">DigiCar</span>Point
          </h2>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <li className="w-6/12">
              <a href="#">Tentang Kami</a>
            </li>
            <li className="w-6/12">
              <a href="#">Kontak</a>
            </li>
            <li>
              <a href="#">Bantuan</a>
            </li>
            <li>
              <a href="#">Kontak</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center py-8 text-white-50">
        Copyright © 2024 <span className="text-night-shadz-700">DigiCar</span>
        Point
      </p>
    </div>
  );
};

export default Footer;
