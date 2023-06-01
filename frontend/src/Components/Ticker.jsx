import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ticker.css'; // Import your custom CSS file

const TickersForm = () => {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchTickers();
  }, []);

  const fetchTickers = async () => {
    try {
      const response = await fetch('http://localhost:5000/tickers');
      const data = await response.json();
      setTickers(data);
      setLoading(false);
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
          <p>Data is loading , kindly wait...</p>
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
              {tickers.map((ticker) => (
                <tr key={ticker._id}>
                  <td>{ticker.name}</td>
                  <td>{ticker.last}</td>
                  <td>{ticker.buy}</td>
                  <td>{ticker.sell}</td>
                  <td>{ticker.volume}</td>
                  <td>{ticker.base_unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TickersForm;
