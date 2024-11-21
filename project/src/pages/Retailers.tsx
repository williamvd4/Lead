import realmLogo from '/images/realm.png';
import frassLogo from '/images/frass.webp';
import owlLogo from '/images/owl.webp';
import logoImage from '/images/logo.png';

const Retailers = () => {
  const retailers = [
    {
      name: 'Cannabis Realm',
      logo: realmLogo,
      logoAlt: 'Cannabis Realm logo',
      address: '123 Main St, Hartsdale, NY',
      url: 'https://cannabisrealmny.com/',
      products: ['Mango OG', 'Kush Mints', 'Edibles'],
    },
    {
      name: 'FrassBox',
      logo: frassLogo,
      logoAlt: 'FrassBox logo',
      address: '456 Elm St, Bronx, NY',
      url: 'https://frassboxcannabis.com/',
      products: ['Blue Dream', 'Purple Haze', 'Pre-rolls'],
    },
    {
      name: 'Purple Owl',
      logo: owlLogo,
      logoAlt: 'Purple Owl logo',
      address: '789 Oak St, White Plains, NY',
      url: 'https://thepurpleowldispensary.com/',
      products: ['OG Kush', 'Sour Diesel', 'Tinctures'],
    },
  ];
const handleRedirect = (url: string) => {
  window.open(url, '_blank');
};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-black bg-black bg-center"
          style={{
            backgroundImage: `url(${logoImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',

          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-5xl font-bold mb-4">Retailers</h1>
              <p className="text-xl">Find our products at these locations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {retailers.map((retailer, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
              onClick={() => handleRedirect(retailer.url)}
            >
              <img
                src={retailer.logo}
                alt={`${retailer.name} logo`}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{retailer.name}</h3>
              <p className="text-gray-600 mb-2">{retailer.address}</p>
              <p className="text-gray-600 mb-2">Products:</p>
              <ul className="list-disc list-inside text-gray-600">
                {retailer.products.map((product, idx) => (
                  <li key={idx}>{product}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Retailers;