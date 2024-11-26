import logoImage from '/images/logo.png';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-black  bg-center"
          style={{
            backgroundImage: `url(${logoImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          aria-label="Lead Farmer"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl">We'd love to hear from you</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <iframe
            title="Contact Form"
            src="https://docs.google.com/forms/d/e/1FAIpQLSfI3teUVxaeKIFfG0n8nHnoCydNOZ6hmVGYdhcmseGWMh4gzw/viewform?embedded=true"
            width="100%"
            height="1020px"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;