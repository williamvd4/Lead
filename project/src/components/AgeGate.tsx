import React from 'react';
import { Flower } from 'lucide-react';

interface AgeGateProps {
  onVerify: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onVerify }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg p-8 text-center">
        <Flower className="w-16 h-16 mx-auto mb-6 text-emerald-600" />
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Welcome to LEADFARMER</h1>
        <p className="mb-6 text-gray-700">
          Please verify that you are 21 years of age or older to enter this site.
        </p>
        <div className="space-y-4">
          <button
            onClick={onVerify}
            className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            tabIndex={0}
          >
            I am 21 or older
          </button>
          <a
            href="https://www.google.com"
            className="block w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            tabIndex={0}
          >
            I am under 21
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          By entering this site, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AgeGate;
