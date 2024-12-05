import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const HomeAdmin = () => {
  const initialCarouselItems = [
    {
      image: '/images/logo.png',
      title: 'Premium Cannabis',
      description: 'Cultivated with care in New York State',
      link: '/Products',
      buttonText: 'Products',
    },
    {
      image: '/images/livingsoil.webp',
      title: 'Sustainable Farming',
      description: 'Committed to environmental stewardship',
      link: '/Cultivation',
      buttonText: 'View Our Operation',
    },
    {
      image: '/images/labtest.jpg',
      title: 'Quality Assured',
      description: 'Lab tested for your safety',
      link: '/LabResults',
      buttonText: 'Lab Results',
    },
  ];

  const [carouselItems, setCarouselItems] = useState(initialCarouselItems);

  const handleCarouselChange = (index: number, field: string, value: string) => {
    const updatedItems = [...carouselItems];
    updatedItems[index][field] = value;
    setCarouselItems(updatedItems);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel - Home Page</h1>
      <Card>
        <CardHeader>
          <CardTitle>Hero Carousel</CardTitle>
        </CardHeader>
        <CardContent>
          {carouselItems.map((item, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-bold mb-4">Slide {index + 1}</h2>
              <Input
                placeholder="Image URL"
                value={item.image}
                onChange={(e) => handleCarouselChange(index, 'image', e.target.value)}
                className="mb-4"
              />
              <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) => handleCarouselChange(index, 'title', e.target.value)}
                className="mb-4"
              />
              <Textarea
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleCarouselChange(index, 'description', e.target.value)}
                className="mb-4"
              />
              <Input
                placeholder="Link"
                value={item.link}
                onChange={(e) => handleCarouselChange(index, 'link', e.target.value)}
                className="mb-4"
              />
              <Input
                placeholder="Button Text"
                value={item.buttonText}
                onChange={(e) => handleCarouselChange(index, 'buttonText', e.target.value)}
                className="mb-4"
              />
            </div>
          ))}
          <Button variant="default" onClick={() => console.log('Save Changes:', carouselItems)}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeAdmin;