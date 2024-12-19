import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditModal({ isOpen, onClose, testimoniData, onTestimoniUpdated }) {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (testimoniData) {
      console.log(testimoniData);
      setName(testimoniData.user || '');
      setContent(testimoniData.comment || '');
      setRating(testimoniData.rating || 0);
      setOldImage(testimoniData.image || '');
      setImage(null);
    }
  }, [isOpen, testimoniData]);

  const token = localStorage.getItem('token');

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user', name);
    formData.append('comment', content);
    formData.append('rating', rating);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`https://v1.digicar.my.id/api/testimoni/${testimoniData._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Updated Testimoni:', response.data);
      if (typeof onTestimoniUpdated === 'function') {
        onTestimoniUpdated(response.data);
      }
      onClose();
    } catch (error) {
      console.error('Error updating testimoni:', error);
      setErrorMessage('Failed to update testimoni. Please try again.');
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-4xl">
        <div className="relative bg-secondary rounded-lg shadow">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-text">Edit Testimoni</h3>
            <button
              onClick={onClose} // Close modal
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            {/* Error message */}
            {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

            <div className="grid gap-4 mb-4 grid-cols-2">
              {/* Name Input */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-text">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Rating Input */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="rating" className="block mb-2 text-sm font-medium text-text">
                  Rating
                </label>
                <div id="rating" className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star fill={value <= rating ? '#A80743' : 'none'} key={value} onClick={() => handleRating(value)} className="cursor-pointer w-6 h-6" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">{rating > 0 ? `You give ${rating} star(s)` : 'No rating selected'}</p>
              </div>

              {/* Upload Image */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-text">
                  Upload Photo
                </label>
                <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} accept="image/*" className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none" />
                {/* Preview Gambar */}
                {image ? (
                  <div className="mt-2">
                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-32 h-32 object-cover" />
                  </div>
                ) : oldImage ? (
                  <div className="mt-2">
                    <img src={`https://v1.digicar.my.id/${oldImage}`} alt="Old" className="w-32 h-32 object-cover" />
                  </div>
                ) : null}
              </div>

              {/* Comment Input */}
              <div className="col-span-2 sm:col-span-2">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-text">
                  Comment
                </label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  id="comment"
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your comment here"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="text-white-50 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Edit Testimoni
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
