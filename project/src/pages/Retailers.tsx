import logoImage from '/images/logo.png';
import { useState, useEffect } from 'react';

interface Retailer {
  make_active: boolean;
  products?: any[];
  url: string;
  logo: string;
  name: string;
  address: string;
}

const Retailers = () => {
  const [retailers, setRetailers] = useState<Retailer[]>([]);

  useEffect(() => {
    fetch('https://leadback.onrender.com/api/retailers')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        setRetailers(data.filter((item: Retailer) => item.make_active));
      })
      .catch(error => console.error('Error fetching retailers:', error)); // Log any fetch errors
  }, []);

  const handleRedirect = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-black bg-black bg-center"
          style={{
            backgroundImage: `url(${logoImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-label="Lead Farmer"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-5xl font-bold mb-4">Retailers</h1>
              <p className="text-xl">Find our products at these locations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {retailers.map((retailer, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
              onClick={() => handleRedirect(retailer.url)}
            >
              <img
                src={retailer.logo}  // Remove any API_URL concatenation as Django returns full URL
                alt={`${retailer.name} logo`}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{retailer.name}</h3>
              <p className="text-gray-600 mb-2">{retailer.address}</p>
              <p className="text-gray-600 mb-2">Products:</p>
              <ul className="list-disc list-inside text-gray-600">
                {Array.isArray(retailer.products) ? (
                  retailer.products.map((product: any, idx: number) => (
                    <li key={idx}>{product.name}</li>
                  ))
                ) : (
                  <li>No products available</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Retailers;