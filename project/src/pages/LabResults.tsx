import { useTina, tinaField } from 'tinacms/dist/react';
import client from '../tina/__generated__/client'; // Ensure this path is correct and the module exists

const LabResults = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const handlePdfOpen = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-black bg-center"
          style={{
            backgroundImage: `url(${data.logoImage})`, // Use Tina data
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-label="Lead Farmer"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1
                className="text-5xl font-bold mb-4"
                data-tina-field={tinaField(data, 'title')}
              >
                {data.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.labResults.map((result, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
              onClick={() => handlePdfOpen(result.pdf)}
              data-tina-field={tinaField(result, `labResults.${index}`)}
            >
              <h3
                className="text-xl font-semibold mb-2"
                data-tina-field={tinaField(result, 'batchNumber')}
              >
                Batch Number: {result.batchNumber}
              </h3>
              <p data-tina-field={tinaField(result, 'strain')}>
                Strain: {result.strain}
              </p>
              <p data-tina-field={tinaField(result, 'thc')}>THC: {result.thc}</p>
              <p data-tina-field={tinaField(result, 'cbd')}>CBD: {result.cbd}</p>
              <p data-tina-field={tinaField(result, 'date')}>Date: {result.date}</p>
              <p data-tina-field={tinaField(result, 'lab')}>Lab: {result.lab}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabResults;

export const getStaticProps = async () => {
  const labResultsResponse = await client.queries.labResults({
    relativePath: 'labResults.json', // Update with your file path
  });

  return {
    props: {
      data: labResultsResponse.data,
      query: labResultsResponse.query,
      variables: labResultsResponse.variables,
    },
  };
};
