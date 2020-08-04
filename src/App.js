import React, { useState, useEffect } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';


function SearchResults() {
  const [data, setData] = useState({c:[]});
  const [query, setQuery] = useState("AMZN");

  useEffect(() => {
    let ignore = false;
    const today = Math.round((new Date()).getTime() / 1000);
    const lastWeek = Math.round((new Date()).getTime() / 1000 - 600000);

    async function fetchData() {
      const result = await axios(
        "https://finnhub.io/api/v1/stock/candle?symbol="+ query +"&resolution=1&from="+lastWeek+"&to="+today+"&token=bsko48frh5rfr4cc6t20"
      );
      if (!ignore) setData(result.data);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [query]);

  const dataMap = () => {
    if(data.c){
      return <ul>
        {data.c.map((item,index) => (
          <li key={index.toString()}>
            {item}
          </li>
        ))}
      </ul>
    }
    else{
      return <span>enter a company</span>
    }
  }

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value.toUpperCase())} />
        {dataMap()}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {SearchResults()}
      </header>
    </div>
  );
}

export default App;
