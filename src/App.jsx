import { useState } from 'react';
import axios from 'axios';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://chimpu.xyz/api/post.php', { phonenumber: phoneNumber });

      // Get headers from response
      const headers = response.headers;

      console.log("response: ", response);
      console.log("headers: ",headers);

      // Store headers data in state
      setResponseData(Object.fromEntries(headers));
      setError(null);
    } catch (error) {
      console.error('Error posting data:', error);
      setError('An error occurred while posting data. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">API Data</h1>
      <div className="bg-white shadow-md rounded-lg px-8 py-6">
        <form onSubmit={handleSubmit}>
          <label htmlFor="phoneNumber" className="block mb-2">Phone Number:</label>
          <input 
            type="text" 
            id="phoneNumber" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
        </form>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {responseData && (
          <div>
            <h2 className="text-xl font-semibold mt-6 mb-4">Headers received from the API:</h2>
            <ul className="list-disc pl-5">
              {Object.entries(responseData).map(([name, value], index) => (
                <li key={index} className="mb-2">{name}: {value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
