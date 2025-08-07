import { useEffect, useState } from "react";
import "./styles.css";
import TopBar from "./components/TopBar";
import MainContent from "./components/MainContent";

function App() {
  const [totalData, setTotalData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [choose, setChoose] = useState("london");
  const [isError, setError] = useState({ status: false, msg: "" });

  const handleChooseButton = (cityName) => {
    setChoose(cityName);
  };

  const fetchData = async (url) => {
    setError({ status: false, msg: "" });
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const { location } = data;
      if (!location) throw new Error("No results found!!!");
      setTotalData(data);
      setLoading(false);
    } catch (error) {
      //console.log(error.message);
      setError({ status: true, msg: error.message });
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch weather data when city changes
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    fetchData(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=3&q=${choose}`
    );
  }, [choose]);
  return (
    <div className="weather-app">
      <TopBar onChooseCity={handleChooseButton} />
      {isLoading ? (
        <div className="load-center">
        <div className="loader"></div>
        </div>
       
      ) : isError.status ? (
        <h1>{isError.msg}</h1>
      ) : (
        <MainContent mainContentData={totalData} />
      )}
    </div>
  );
}

export default App;