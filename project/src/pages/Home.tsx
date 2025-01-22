import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import treesImage from '/images/trees.jpg';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

// Custom Next Arrow Component
const NextArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '25px', zIndex: 1 }}
      onClick={onClick}
    >
      <ArrowRight className="text-white h-8 w-8" />
    </div>
  );
};

// Custom Previous Arrow Component
const PrevArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '25px', zIndex: 1 }}
      onClick={onClick}
    >
      <ArrowLeft className="text-white h-8 w-8" />
    </div>
  );
};

interface HomeFeature {
  name: string;
  description: string;
  image: string;
  link: string;
}

const Home = () => {
  interface CarouselItem {
    image: string;
    title: string;
    description: string;
    link: string;
    buttonText: string;
    link_page?: string;
    make_active: boolean;

  }

  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [homeFeatures, setHomeFeatures] = useState<HomeFeature[]>([]);

  useEffect(() => {
    // Fetch Carousel Items
    fetch('https://leadback.onrender.com/api/home-carousel')
      .then(response => response.json())
      .then(data => setCarouselItems(data.filter((item: CarouselItem) => item.make_active)));

    // Fetch Home Features
    fetch('https://leadback.onrender.com/api/home-features')
      .then(response => response.json())
      .then(data => setHomeFeatures(data));
  }, []);

  // Dynamic Slider Settings
  const sliderSettings = {
    dots: carouselItems.length > 1, // Show dots only if more than one item
    infinite: carouselItems.length > 1, // Enable infinite scrolling only if more than one item
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: carouselItems.length > 1, // Enable autoplay only if more than one item
    arrows: carouselItems.length > 1, // Show arrows only if more than one item
    autoplaySpeed: 7000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <div className="relative">
        {carouselItems.length > 0 ? (
          <Slider {...sliderSettings}>
            {carouselItems.map((item, index) => (
              <div key={index} className="relative h-[500px]">
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
                      {item.link_page && (
                        <Link
                          to={item.link_page}
                          tabIndex={-1}
                          className="inline-flex items-center bg-emerald-800 text-white px-8 py-3 rounded-lg hover:bg-emerald-800 transition-colors"
                        >
                          {item.buttonText}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          // Display a placeholder or alternative content if no carousel items are available
          <div className="relative h-[500px] flex items-center justify-center bg-gray-200">
            <p className="text-xl text-gray-700">No carousel items to display.</p>
          </div>
        )}
      </div>

      {/* Brand Story Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
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
                className="inline-flex items-center text-emerald-800 hover:text-emerald-800"
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
            {homeFeatures.map((product, index) => (
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
                  <span className="text-emerald-800 hover:text-emerald-800 inline-flex items-center">
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