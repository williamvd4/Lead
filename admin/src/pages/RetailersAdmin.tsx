import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RetailersAdmin = () => {
  const initialRetailers = [
    {
      name: 'Cannabis Realm',
      logo: '/images/realm.png',
      address: '123 Main St, Hartsdale, NY',
      url: 'https://cannabisrealmny.com/',
      products: ['Mango OG', 'Kush Mints', 'Edibles'],
    },
    {
      name: 'FrassBox',
      logo: '/images/frass.webp',
      address: '456 Elm St, Bronx, NY',
      url: 'https://frassboxcannabis.com/',
      products: ['Blue Dream', 'Purple Haze', 'Pre-rolls'],
    },
    {
      name: 'Purple Owl',
      logo: '/images/owl.webp',
      address: '789 Oak St, White Plains, NY',
      url: 'https://thepurpleowldispensary.com/',
      products: ['OG Kush', 'Sour Diesel', 'Tinctures'],
    },
  ];

  const [retailers, setRetailers] = useState(initialRetailers);

  const handleRetailerChange = (index: number, field: string, value: string) => {
    const updatedRetailers = [...retailers];
    if (field === 'products') {
      updatedRetailers[index][field] = value.split(',').map(item => item.trim());
    } else {
      updatedRetailers[index][field] = value;
    }
    setRetailers(updatedRetailers);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel - Retailers Page</h1>
      <Card>
        <CardHeader>
          <CardTitle>Retailers</CardTitle>
        </CardHeader>
        <CardContent>
          {retailers.map((retailer, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-bold mb-4">Retailer {index + 1}</h2>
              <Input
                placeholder="Name"
                value={retailer.name}
                onChange={(e) => handleRetailerChange(index, 'name', e.target.value)}
                className="mb-4"
              />
              <Input
                placeholder="Logo URL"
                value={retailer.logo}
                onChange={(e) => handleRetailerChange(index, 'logo', e.target.value)}
                className="mb-4"
              />
              <Input
                placeholder="Address"
                value={retailer.address}
                onChange={(e) => handleRetailerChange(index, 'address', e.target.value)}
                className="mb-4"
              />
              <Input
                placeholder="URL"
                value={retailer.url}
                onChange={(e) => handleRetailerChange(index, 'url', e.target.value)}
                className="mb-4"
              />
              <Textarea
                placeholder="Products (comma separated)"
                value={retailer.products.join(', ')}
                onChange={(e) => handleRetailerChange(index, 'products', e.target.value)}
                className="mb-4"
              />
            </div>
          ))}
          <Button variant="default" onClick={() => console.log('Save Changes:', retailers)}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetailersAdmin;