import { Link } from 'react-router-dom';
import {  Instagram} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
             
              <span className="ml-2 text-xl font-bold">LEADFARMER</span>
            </div>
            <p className="text-gray-300">
              New York State licensed cannabis producer committed to quality and sustainability.
            </p>
            <p className="text-gray-300" >License #: OCM-MICR-24-000011</p>
            <p className="text-gray-300" >For use by persons 21 or older only.</p>
            <div className="flex space-x-4">
            <a href="https://www.instagram.com/leadfarmer_actual/" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" aria-label="Instagram"/>
              </a>
            </div>
          </div>



        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>
            © {new Date().getFullYear()} LEADFARMER. All rights reserved. For use by persons 21 or
            older only.
          </p>

        </div>
      </div>
      </div>
      </footer>
    );
  };

export default Footer;