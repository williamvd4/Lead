import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Product {
  id: number;
  name: string;
  category: string;
  type: string;
  thc: number;
  cbd: number;
  image: { src: string; alt: string };
  description: string;
  effects: string[];
  terpenes: { name: string; percentage: number }[];
}

const ProductsManagement = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Purple Haze",
      category: "flower",
      type: "Sativa",
      thc: 22,
      cbd: 0.1,
      image: { src: '/images/purple.jpg', alt: "Purple Haze" },
      description: "A classic sativa-dominant strain known for its euphoric and creative effects.",
      effects: ["Creative", "Energetic", "Euphoric"],
      terpenes: [
        { name: "Myrcene", percentage: 0.5 },
        { name: "Limonene", percentage: 0.3 },
        { name: "Pinene", percentage: 0.2 }
      ]
    },
    {
      id: 2,
      name: "Blue Dream",
      category: "flower",
      type: "Hybrid",
      thc: 18,
      cbd: 0.2,
      image: { src: '/images/dream.webp', alt: "Blue Dream" },
      description: "A balanced hybrid offering full-body relaxation with gentle cerebral invigoration.",
      effects: ["Relaxed", "Happy", "Creative"],
      terpenes: [
        { name: "Myrcene", percentage: 0.4 },
        { name: "Caryophyllene", percentage: 0.3 },
        { name: "Pinene", percentage: 0.1 }
      ]
    },
    {
      id: 3,
      name: "OG Kush",
      category: "flower",
      type: "Hybrid",
      thc: 80,
      cbd: 0.1,
      image: { src: '/images/kush.jpg', alt: "OG Kush" },
      description: "High-potency concentrate with complex flavor profile.",
      effects: ["Relaxed", "Euphoric", "Happy"],
      terpenes: [
        { name: "Limonene", percentage: 0.6 },
        { name: "Myrcene", percentage: 0.4 },
        { name: "Caryophyllene", percentage: 0.3 }
      ]
    },
    {
      id: 4,
      name: "Calm Gummies",
      category: "edibles",
      type: "Indica",
      thc: 10,
      cbd: 10,
      image: { src: '/images/gummies.jpg', alt: "Calm Gummies" },
      description: "1:1 THC:CBD ratio gummies for balanced effects.",
      effects: ["Relaxed", "Calm", "Peaceful"],
      terpenes: [
        { name: "Myrcene", percentage: 0.3 },
        { name: "Linalool", percentage: 0.2 }
      ]
    },
    {
      id: 5,
      name: "Vape Pen",
      category: "vapes",
      type: "vapes",
      thc: 70,
      cbd: 0.2,
      image: { src: '/images/vapes.webp', alt: "Vape Pen" },
      description: "Portable vape pen with high THC concentrates.",
      effects: ["Quick Relief", "Euphoric", "Relaxed"],
      terpenes: [
        { name: "Pinene", percentage: 0.4 },
        { name: "Caryophyllene", percentage: 0.3 }
      ]
    },
    {
      id: 6,
      name: "Live Rosin",
      category: "concentrates",
      type: "concentrates",
      thc: 70,
      cbd: 0.2,
      image: { src: '/images/contrate.jpg', alt: "Live Rosin" },
      description: "Portable vape pen with high THC concentrates.",
      effects: ["Quick Relief", "Euphoric", "Relaxed"],
      terpenes: [
        { name: "Pinene", percentage: 0.4 },
        { name: "Caryophyllene", percentage: 0.3 }
      ]
    }
  ]);

  const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: '', category: '', type: '', thc: 0, cbd: 0, image: { src: '', alt: '' }, description: '', effects: [], terpenes: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'flower', 'edibles', 'vapes', 'concentrates'];

  const handleAddProduct = () => {
    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ id: 0, name: '', category: '', type: '', thc: 0, cbd: 0, image: { src: '', alt: '' }, description: '', effects: [], terpenes: [] });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-black bg-center"
          style={{
            backgroundImage: `url(/images/logo.png)`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-label="Lead Farmer"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-8xl font-bold mb-4">Products Management</h1>
            </div>
          </div>
        </div>
      </div>

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

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Add New Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Input
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              />
              <Input
                placeholder="Type"
                value={newProduct.type}
                onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
              />
              <Input
                placeholder="THC"
                type="number"
                value={newProduct.thc.toString()}
                onChange={(e) => setNewProduct({ ...newProduct, thc: parseFloat(e.target.value) })}
              />
              <Input
                placeholder="CBD"
                type="number"
                value={newProduct.cbd.toString()}
                onChange={(e) => setNewProduct({ ...newProduct, cbd: parseFloat(e.target.value) })}
              />
              <Input
                placeholder="Image URL"
                value={newProduct.image.src}
                onChange={(e) => setNewProduct({ ...newProduct, image: { ...newProduct.image, src: e.target.value } })}
              />
              <Input
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
              <Button onClick={handleAddProduct}>Save Product</Button>
            </div>
          </DialogContent>
        </Dialog>

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
                      src={product.image.src}
                      alt={product.name}
                      className="w-full aspect-w-1 aspect-h-1 object-cover"
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
                                key={effect}
                                className="bg-gray-100 text-sm px-3 py-1 rounded"
                              >
                                {effect}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Terpenes</h4>
                          <div className="space-y-2">
                            {product.terpenes.map(terpene => (
                              <div
                                key={terpene.name}
                                className="flex justify-between items-center"
                              >
                                <span>{terpene.name}</span>
                                <span className="text-sm text-gray-600">
                                  {terpene.percentage}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
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

export default ProductsManagement;