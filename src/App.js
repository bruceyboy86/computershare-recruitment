import React, { useState, useEffect } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';


function SearchResults() {
  const [data, setData] = useState({ h: [] });
  const [query, setQuery] = useState("");
  // const today = Math.round((new Date()).getTime() / 1000);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios(
        "https://finnhub.io/api/v1/stock/candle?symbol="+ query +"&resolution=1&from=1572651390&to=1572910590&token=bsko48frh5rfr4cc6t20"
      );
      if (!ignore) setData(result.data);
      console.log(result.data)
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [query]);

  const dataMap = () => {
    if(data.h){
      return <ul>
        {data.h.map((item,index) => (
          <li key={index+item}>
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
