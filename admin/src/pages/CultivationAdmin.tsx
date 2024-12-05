import React, { useState } from 'react';
import { Leaf, Droplets, Sun, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminCultivationPanel = () => {
  const initialMethods = [
    {
      icon: <Sun className="w-8 h-8 text-emerald-600" />,
      title: "Light Management",
      description: "State-of-the-art LED lighting systems optimize plant growth while reducing energy consumption."
    },
    {
      icon: <Droplets className="w-8 h-8 text-emerald-600" />,
      title: "Precision Irrigation",
      description: "Advanced drip systems deliver precise amounts of water and nutrients to each plant."
    },
    {
      icon: <Wind className="w-8 h-8 text-emerald-600" />,
      title: "Climate Control",
      description: "Automated environmental controls maintain optimal growing conditions 24/7."
    },
    {
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      title: "Organic Practices",
      description: "Natural pest management and organic nutrients ensure pure, clean cannabis."
    }
  ];

  const [methods, setMethods] = useState(initialMethods);

  const handleMethodChange = (index: number, field: string, value: string) => {
    const updatedMethods = [...methods];
    updatedMethods[index][field] = value;
    setMethods(updatedMethods);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel - Cultivation Page</h1>
      <Card>
        <CardHeader>
          <CardTitle>Growing Methodology</CardTitle>
        </CardHeader>
        <CardContent>
          {methods.map((method, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-bold mb-4">Method {index + 1}</h2>
              <Input
                placeholder="Title"
                value={method.title}
                onChange={(e) => handleMethodChange(index, 'title', e.target.value)}
                className="mb-4"
              />
              <Textarea
                placeholder="Description"
                value={method.description}
                onChange={(e) => handleMethodChange(index, 'description', e.target.value)}
                className="mb-4"
              />
            </div>
          ))}
          <Button variant="default" onClick={() => console.log('Save Changes:', methods)}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCultivationPanel;