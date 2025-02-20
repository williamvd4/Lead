import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const carouselItems = [
    {
      image: '/images/logo.png',
      title: 'Premium Cannabis',
      description: 'Cultivated with care in New York State',
    },
    {
      image: 'https://images.unsplash.com/photo-1587304947504-569c0e3c4b67?auto=format&fit=crop&q=80',
      title: 'Sustainable Farming',
      description: 'Committed to environmental stewardship',
    },
    {
      image: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&q=80',
      title: 'Quality Assured',
      description: 'Lab tested for your safety',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <div className="relative">
        <Slider {...sliderSettings}>
          {carouselItems.map((item, index) => (
            <div key={index} className="relative h-[600px]">
              <div
                className="absolute inset-0 bg-black bg-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div className="max-w-3xl px-4">
                    <h1 className="text-5xl font-bold mb-4">{item.title}</h1>
                    <p className="text-xl mb-8">{item.description}</p>
                    <Link
                      to="/products"
                      className="inline-flex items-center bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Explore Products
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Brand Story Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/trees.jpg"
                alt="Cannabis cultivation"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Rooted in Excellence</h3>
              <p className="text-gray-600 mb-6">
                LEADFARMER was founded with a simple mission: to produce the highest quality cannabis
                products while maintaining sustainable farming practices. Our journey began in the heart
                of New York, where we combined traditional farming methods with modern technology.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
              >
                Learn more about our story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Premium Flower',
                image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80',
                description: 'Hand-trimmed, carefully cured premium cannabis flower.',
              },
              {
                name: 'Concentrates',
                image: 'https://images.unsplash.com/photo-1597354984706-fac992d9306f?auto=format&fit=crop&q=80',
                description: 'Pure and potent extracts for the discerning consumer.',
              },
              {
                name: 'Edibles',
                image: 'https://images.unsplash.com/photo-1621466550398-ac8062907657?auto=format&fit=crop&q=80',
                description: 'Precisely dosed edibles made with premium ingredients.',
              },
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Link
                    to="/products"
                    className="text-emerald-600 hover:text-emerald-700 inline-flex items-center"
                  >
                    View details
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Follow Us on Instagram</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="aspect-square">
                <img
                  src={`https://images.unsplash.com/photo-${
                    [
                      '1603386329225-868f9b1ee6c9',
                      '1597354984706-fac992d9306f',
                      '1620321023374-d1a68fbc720d',
                      '1603909223429-69bb7101f420',
                      '1587304947504-569c0e3c4b67',
                      '1621466550398-ac8062907657',
                      '1536819114556-1c5f87e58044',
                      '1620321023374-d1a68fbc720d',
                    ][index]
                  }?auto=format&fit=crop&q=80`}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="#"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow us on Instagram
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;