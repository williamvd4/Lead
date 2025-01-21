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
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" aria-label="Instagram"/>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors" aria-label="About Us">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors" aria-label="Products">
                  Products

                </Link>

              </li>
              <li>
                <Link to="/retailers" className="text-gray-300 hover:text-white transition-colors" aria-label="Find a Retailer">
                  Find a Retailer
                </Link>
              </li>
              <li>
                <Link to="/lab-results" className="text-gray-300 hover:text-white transition-colors" aria-label="Lab Results">
                  Lab Results
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Cannabis Way</li>
              <li>New York, NY 10001</li>
              <li>info@leadfarmer.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>
            © {new Date().getFullYear()} LEADFARMER. All rights reserved. For use by persons 21 or
            older only.
          </p>
          <p className="mt-2">
            This product has not been evaluated by the Food and Drug Administration.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;