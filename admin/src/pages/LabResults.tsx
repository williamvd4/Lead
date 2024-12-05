import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LabResults = () => {
  const labResults = [
    {
      batchNumber: '12345',
      strain: 'Blue Dream',
      thc: '18%',
      cbd: '0.2%',
      date: '2023-09-01',
      lab: 'Green Labs',
      pdf: 'King_Kong.pdf',
    },
    {
      batchNumber: '67890',
      strain: 'Purple Haze',
      thc: '22%',
      cbd: '0.1%',
      date: '2023-08-15',
      lab: 'Pure Analytics',
      pdf: 'Mango_OG.pdf',
    },
    {
      batchNumber: '11223',
      strain: 'OG Kush',
      thc: '20%',
      cbd: '0.3%',
      date: '2023-07-20',
      lab: 'Cannalysis',
      pdf: 'Thai_Star.pdf',
    },
  ];

  const handlePdfOpen = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 md:h-96 bg-black">
        <div className="absolute inset-0 opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Lab Results</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labResults.map((result, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Batch Number: {result.batchNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Strain:</strong> {result.strain}</p>
                  <p><strong>THC:</strong> {result.thc}</p>
                  <p><strong>CBD:</strong> {result.cbd}</p>
                  <p><strong>Date:</strong> {result.date}</p>
                  <p><strong>Lab:</strong> {result.lab}</p>
                  <Button 
                    onClick={() => handlePdfOpen(result.pdf)}
                    className="w-full mt-4"
                  >
                    View Lab Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabResults;
