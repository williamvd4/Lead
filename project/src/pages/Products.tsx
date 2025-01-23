import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import logoImage from '/images/logo.png';

interface Effect {
  id: number;
  name: string;
}

interface Terpene {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  type: string;
  thc: number;
  cbd: number;
  image: string; // Changed to string if the API returns a URL string
  description: string;
  effects: Effect[];
  terpenes: Terpene[];
  make_active: boolean;
}

const API_URL = 'https://leadback.onrender.com';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products/`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched products:', data); // Log fetched data
        const activeProducts = data.filter((item: Product) => item.make_active);
        console.log('Active products:', activeProducts); // Log active products
        setProducts(activeProducts);
      });
  }, []);

  const categories = ['all', 'flower', 'edibles', 'vapes', 'concentrates', 'preroll'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  console.log('Filtered products:', filteredProducts); // Log filtered products

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-black bg-center"
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
              <h1 className="text-8xl font-bold mb-4">Products</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow items-center justify-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" />
            <select
              className="py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Sections */}
        {categories.filter(cat => cat !== 'all').map(category => {
          const categoryProducts = filteredProducts.filter(product => product.category === category);
          if (categoryProducts.length === 0) return null;
          return (
            <section key={category} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 capitalize">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={product.image} // Updated to use product.image directly
                      alt={product.name}
                      className="w-full h-60 object-contain bg-black" // Adjusted height for better display
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <span className="bg-emerald-100 text-emerald-900 text-sm font-medium px-2 py-1 rounded">
                          {product.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Potency</h4>
                          <div className="flex gap-4">
                            <div className="bg-gray-100 px-3 py-1 rounded">
                              THC: {product.thc}%
                            </div>
                            <div className="bg-gray-100 px-3 py-1 rounded">
                              CBD: {product.cbd}%
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Effects</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.effects.map(effect => (
                              <span
                                key={effect.id}
                                className="bg-gray-100 text-sm px-3 py-1 rounded"
                              >
                                {effect.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Terpenes</h4>
                          <div className="space-y-2">
                            {product.terpenes.map(terpene => (
                              <div
                                key={terpene.id}
                                className="flex justify-between items-center"
                              >
                                <span>{terpene.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Products;