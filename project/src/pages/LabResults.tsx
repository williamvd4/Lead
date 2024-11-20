import React from 'react';

const LabResults = () => {
  const labResults = [
    {
      batchNumber: '12345',
      strain: 'Blue Dream',
      thc: '18%',
      cbd: '0.2%',
      date: '2023-09-01',
      lab: 'Green Labs',
    },
    {
      batchNumber: '67890',
      strain: 'Purple Haze',
      thc: '22%',
      cbd: '0.1%',
      date: '2023-08-15',
      lab: 'Pure Analytics',
    },
    {
      batchNumber: '11223',
      strain: 'OG Kush',
      thc: '20%',
      cbd: '0.3%',
      date: '2023-07-20',
      lab: 'Cannalysis',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?auto=format&fit=crop&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-5xl font-bold mb-4">Lab Results</h1>
              <p className="text-xl">View our latest lab results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labResults.map((result, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
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