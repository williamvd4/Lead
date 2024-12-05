import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ProductsManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Blue Dream', category: 'Flower', price: 35 },
    { id: 2, name: 'Purple Haze', category: 'Flower', price: 40 }
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '' });

  const handleAddProduct = () => {
    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      price: parseFloat(newProduct.price)
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', category: '', price: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products Management</h1>
      
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
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            />
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Button onClick={handleAddProduct}>Save Product</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsManagement;
