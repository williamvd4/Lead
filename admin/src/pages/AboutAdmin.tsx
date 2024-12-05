import React, { useState } from 'react';
import { Leaf, Shield, Sprout, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutAdmin = () => {
  const initialValues = [
    {
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      title: "Quality First",
      description: "We maintain the highest standards in cultivation and processing, ensuring premium products in every batch."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Safety & Compliance",
      description: "Rigorous testing and strict adherence to New York State regulations guide every step of our process."
    },
    {
      icon: <Sprout className="w-8 h-8 text-emerald-600" />,
      title: "Sustainability",
      description: "Our commitment to environmental stewardship drives our sustainable farming practices."
    }
  ];

  const initialCommitments = [
    "100% renewable energy powered facilities",
    "Advanced water recycling systems",
    "Organic pest management practices"
  ];

  const [values, setValues] = useState(initialValues);
  const [commitments, setCommitments] = useState(initialCommitments);

  const handleValuesChange = (index: number, field: string, value: string) => {
    const updatedValues = [...values];
    updatedValues[index][field] = value;
    setValues(updatedValues);
  };

  const handleCommitmentsChange = (index: number, value: string) => {
    const updatedCommitments = [...commitments];
    updatedCommitments[index] = value;
    setCommitments(updatedCommitments);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel - About Page</h1>
      <Card>
        <CardHeader>
          <CardTitle>Core Values</CardTitle>
        </CardHeader>
        <CardContent>
          {values.map((value, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-bold mb-4">Value {index + 1}</h2>
              <Input
                placeholder="Title"
                value={value.title}
                onChange={(e) => handleValuesChange(index, 'title', e.target.value)}
                className="mb-4"
              />
              <Textarea
                placeholder="Description"
                value={value.description}
                onChange={(e) => handleValuesChange(index, 'description', e.target.value)}
                className="mb-4"
              />
            </div>
          ))}
          <Button variant="default" onClick={() => console.log('Save Changes:', values)}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Commitments to Sustainability</CardTitle>
        </CardHeader>
        <CardContent>
          {commitments.map((commitment, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-bold mb-4">Commitment {index + 1}</h2>
              <Input
                placeholder="Commitment"
                value={commitment}
                onChange={(e) => handleCommitmentsChange(index, e.target.value)}
                className="mb-4"
              />
            </div>
          ))}
          <Button variant="primary" onClick={() => console.log('Save Changes:', commitments)}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutAdmin;