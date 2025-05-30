import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../api/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Cultivation', href: '/cultivation' },
    { name: 'Products', href: '/products' },
    { name: 'Retailers', href: '/retailers' },
    { name: 'Lab Results', href: '/LabResults' },
    { name: 'Contact', href: '/contact' },
    { name: 'Shop', href: '/ShopItems' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold text-emerald-800">LEADFARMER</span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  isActive ? 'font-bold text-emerald-800' : 'font-semibold text-emerald-800 hover:text-emerald-800'
                }
              >
                {item.name}
              </NavLink>
            ))}
            {/* Cart Icon */}
            <NavLink
              to="/cart"
              className={({ isActive }) => `text-gray-700 hover:text-emerald-800 ${isActive ? 'font-bold' : ''}`}
            >
              <ShoppingCart className="h-6 w-6" aria-label="Cart" />
            </NavLink>
          </div>
          {/* Mobile Navigation Button */}
          <div className="flex">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-emerald-800"
              aria-label="Open navigation menu"
            >
              {isOpen ? <X className="h-6 w-6 inline-block" /> : <Menu className="h-6 w-6 inline-block" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
              }
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
          {/* Cart Icon for Mobile */}
          <NavLink
            to="/cart"
            className="text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart className="h-6 w-6 inline-block mr-2" />
            Cart
            {itemCount > 0 && (
              <span className="cart-item-count">{itemCount}</span>
            )}
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;