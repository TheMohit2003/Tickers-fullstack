import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ticker.css'; // Import your custom CSS file

const TickersForm = () => {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    fetchTickers();
  }, []);

  const fetchTickers = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching data

      if (fetchCount < 2) {
        // Fetch data for the first 3 seconds, 2 times
        setTimeout(async () => {
          const response = await fetch('http://localhost:5000/tickers');
          const data = await response.json();
          setTickers(data);
          setLoading(false);
          setFetchCount(fetchCount + 1);
        }, 1500);
      } else {
        // Stop fetching data after the initial fetches
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching tickers:', error);
      setLoading(false);
    }
  };

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="mode-toggle">
        {/* <button className="btn btn-primary" onClick={handleModeToggle}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>
      <div className="tickers-table">
        <h1>Tickers</h1>
        {loading ? (
          <p>Data is loading, please wait...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Last</th>
                <th>Buy</th>
                <th>Sell</th>
                <th>Volume</th>
                <th>Base Unit</th>
              </tr>
            </thead>
            <tbody>
              {tickers.length > 0 ? (
                tickers.map((ticker) => (
                  <tr key={ticker._id}>
                    <td>{ticker.name}</td>
                    <td>{ticker.last}</td>
                    <td>{ticker.buy}</td>
                    <td>{ticker.sell}</td>
                    <td>{ticker.volume}</td>
                    <td>{ticker.base_unit}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No tickers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TickersForm;
