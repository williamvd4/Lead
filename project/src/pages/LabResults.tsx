import { useState, useEffect } from 'react';
import logoImage from '/images/logo.png';
import { LabResult } from '../api';

const LabResults = () => {
  interface LabResults {
    make_active: boolean;
    batchNumber: string;
    product: {
      name: string;
      category: string;
      type: string;
      thc: string;
      cbd: string;
    };
    thc: string;
    cbd: string;
    date: string;
    lab: string;
    pdf: string;
  }
  const [labResults, setLabResults] = useState<LabResults[]>([]);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/lab-results/')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Log fetched data
        const activeResults = data.filter((item: any) => item.make_active).map((item: any) => ({
          make_active: item.make_active,
          batchNumber: item.batch_number,
          product: item.product,
          thc: item.thc,
          cbd: item.cbd,
          date: item.date,
          lab: item.lab,
          pdf: item.pdf,
        }));
        console.log('Filtered active results:', activeResults); // Log filtered data
        setLabResults(activeResults);
      });
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
              <p className="text-gray-600 mb-2">Product: {result.product.name}</p>
              <p className="text-gray-600 mb-2">Category: {result.product.category}</p>
              <p className="text-gray-600 mb-2">Type: {result.product.type}</p>
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