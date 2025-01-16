import { useState, useEffect } from 'react';
import logoImage from '/images/logo.png';


const LabResults = () => {
  const [labResults, setLabResults] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://leadback.onrender.com/api/lab-results/')
      .then(response => response.json())
      .then(data => setLabResults(data));
  }, []);

  const handlePdfOpen = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-black bg-center"
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
              <h1 className="text-5xl font-bold mb-4">Lab Results</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labResults.map((result, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
              onClick={() => handlePdfOpen(result.pdf)}
            >
              <h3 className="text-xl font-semibold mb-2">Batch Number: {result.batchNumber}</h3>
              <p className="text-gray-600 mb-2">Strain: {result.strain}</p>
              <p className="text-gray-600 mb-2">THC: {result.thc}</p>
              <p className="text-gray-600 mb-2">CBD: {result.cbd}</p>
              <p className="text-gray-600 mb-2">Date: {result.date}</p>
              <p className="text-gray-600 mb-2">Lab: {result.lab}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabResults;
