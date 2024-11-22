import { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logoImage from '/images/logo.png';
import treesImage from '/images/trees.jpg';
import livingsoilImage from '/images/livingsoil.webp';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gummiesImage from '/images/gummies.jpg';
import contrateImage from '/images/contrate.jpg';
import kushImage from '/images/kush.jpg';
import labtestImage from '/images/labtest.jpg';

const NextArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...style, display: 'block', right: '25px', zIndex: 1 }}
      onClick={onClick}
      aria-label="Next Slide"
      aria-hidden="false"
    >
      <ArrowRight className="text-white h-8 w-8" />
    </button>
  );
};

const PrevArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...style, display: 'block', left: '25px', zIndex: 1 }}
      onClick={onClick}
      aria-label="Previous Slide"
      aria-hidden="false"
    >
      <ArrowLeft className="text-white h-8 w-8" />
    </button>
  );
};

const Home = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);  // State to track the active slide

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 7000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    afterChange: (index: number) => setCurrentSlideIndex(index), // Update state with active slide index
  };

  const carouselItems = [
    {
      image: logoImage,
      title: 'Premium Cannabis',
      description: 'Cultivated with care in New York State',
      link: '/Products',
      buttonText: 'Our Products',
    },
    {
      image: livingsoilImage,
      title: 'Sustainable Farming',
      description: 'Committed to environmental stewardship',
      link: '/Cultivation',
      buttonText: 'View Our Operation',
    },
    {
      image: labtestImage,
      title: 'Quality Assured',
      description: 'Lab tested for your safety',
      link: '/LabResults',
      buttonText: 'Lab Results',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <div className="relative">
        <Slider {...sliderSettings}>
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="relative h-[500px]"
              aria-hidden={index !== currentSlideIndex ? 'true' : 'false'} // Set aria-hidden for inactive slides
            >
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
                      to={item.link}
                      className="inline-flex items-center bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      {item.buttonText}
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
                src={treesImage}
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
                image: kushImage,
                description: 'Hand-trimmed, carefully cured premium cannabis flower.',
                link: '/products#flower', // Added #flower
              },
              {
                name: 'Concentrates',
                image: contrateImage,
                description: 'Pure and potent extracts for the discerning consumer.',
                link: '/products#concentrates', // Added #concentrates
              },
              {
                name: 'Edibles',
                image: gummiesImage,
                description: 'Precisely dosed edibles made with premium ingredients.',
                link: '/products#edibles', // Added #edibles
              },
            ].map((product, index) => (
              <Link
                key={index}
                to={product.link}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <span className="text-emerald-600 hover:text-emerald-700 inline-flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
