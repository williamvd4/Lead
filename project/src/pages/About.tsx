import React from 'react';
import { ArrowRight, Leaf, Shield, Sprout } from 'lucide-react';

const About = () => {
  const values = [
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div
          className="absolute inset-0 bg-black bg-center"
          style={{
            backgroundImage: 'url(/images/logo.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-5xl font-bold mb-4">Our Story</h1>
              <p className="text-xl">Cultivating Excellence in New York State</p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder's Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/trees.jpg"
                alt="Founder in cannabis field"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">The LEADFARMER Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2021, LEADFARMER emerged from a passion for sustainable agriculture and a vision for the future of cannabis cultivation. Our journey began when our founder, drawing from generations of farming expertise, recognized the opportunity to combine traditional agricultural wisdom with modern innovation.
              </p>
              <p className="text-gray-600 mb-6">
                Today, we're proud to be at the forefront of New York's legal cannabis industry, setting new standards for quality, sustainability, and responsibility in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section id="values" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Commitment */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Our Commitment to Sustainability</h2>
              <p className="text-gray-600 mb-4">
                At LEADFARMER, sustainability isn't just a buzzword—it's a core principle that guides every decision we make. From our energy-efficient facilities to our water conservation practices, we're committed to minimizing our environmental impact while maximizing the quality of our products.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-emerald-600 mt-1 mr-2" />
                  <span>100% renewable energy powered facilities</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-emerald-600 mt-1 mr-2" />
                  <span>Advanced water recycling systems</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-emerald-600 mt-1 mr-2" />
                  <span>Organic pest management practices</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/images/pups.png"
                alt="Sustainable farming practices"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;