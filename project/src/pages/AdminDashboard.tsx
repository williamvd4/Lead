import React, { useState } from 'react';

const AdminDashboard = () => {
  const [content, setContent] = useState({
    home: '',
    about: '',
    products: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to save changes
    console.log('Content saved:', content);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="home" className="block text-lg font-medium text-gray-700">
            Home Page Content
          </label>
          <textarea
            id="home"
            name="home"
            value={content.home}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            rows={5}
          />
        </div>
        <div>
          <label htmlFor="about" className="block text-lg font-medium text-gray-700">
            About Page Content
          </label>
          <textarea
            id="about"
            name="about"
            value={content.about}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            rows={5}
          />
        </div>
        <div>
          <label htmlFor="products" className="block text-lg font-medium text-gray-700">
            Products Page Content
          </label>
          <textarea
            id="products"
            name="products"
            value={content.products}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            rows={5}
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-lg font-medium text-gray-700">
            Contact Page Content
          </label>
          <textarea
            id="contact"
            name="contact"
            value={content.contact}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
