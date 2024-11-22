import { Leaf, Droplets, Sun, Wind } from 'lucide-react';
import nyImage from '/images/NY.jpg';
import startingImage from '/images/starting.png';
import controlImage from '/images/control.png';
import modernfacilityImage from '/images/modernfacility.png';

const Cultivation = () => {
  const methods = [
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${nyImage})`
          }}
          aria-label="New York City Skyline and Cannabis"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-5xl font-bold mb-4">Our Cultivation Process</h1>
              <p className="text-xl">Where Science Meets Nature</p>
            </div>
          </div>
        </div>
      </div>

      {/* Growing Methodology */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Growing Methodology</h2>
              <p className="text-gray-600 mb-6">
                At LEADFARMER, we combine traditional farming wisdom with cutting-edge technology to produce exceptional cannabis. Our cultivation methods are rooted in sustainable practices and driven by data-backed decisions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {methods.map((method, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg" tabIndex={0}>
                    <div className="mb-2">{method.icon}</div>
                    <h3 className="font-semibold mb-1">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src={startingImage}
                alt="Indoor cultivation facility"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quality Control Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[

              {
                title: "Climate Monitoring",
                description: "24/7 environmental monitoring maintains perfect growing conditions.",
                image: controlImage 
              },
              {
                title: "Harvest Care",
                description: "Careful handling and precise timing ensure peak potency and flavor.",
                image: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&q=80"
              },
              {
                title: "Testing & Analysis",
                description: "Regular testing throughout the growing cycle ensures optimal plant health and product safety.",
                image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden" tabIndex={0}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-w-1 aspect-h-1 h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Facility</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <img
              src={modernfacilityImage}
              alt="Cultivation facility exterior"
              className="rounded-lg shadow-xl"
            />
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">State-of-the-Art Growing Facility</h3>
              <p className="text-gray-600">
                Our 50,000 square foot facility features the latest in cultivation technology, including:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start" tabIndex={0}>
                  <Sun className="h-5 w-5 text-emerald-600 mt-1 mr-2" />
                  <span>Advanced LED lighting systems</span>
                </li>
                <li className="flex items-start" tabIndex={0}>
                  <Droplets className="h-5 w-5 text-emerald-600 mt-1 mr-2" />
                  <span>Automated irrigation and fertigation</span>
                </li>
                <li className="flex items-start" tabIndex={0}>
                  <Wind className="h-5 w-5 text-emerald-600 mt-1 mr-2" />
                  <span>HVAC and environmental controls</span>
                </li>
                <li className="flex items-start" tabIndex={0}>
                  <Leaf className="h-5 w-5 text-emerald-600 mt-1 mr-2" />
                  <span>Integrated pest management systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cultivation;
