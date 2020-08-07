import React, { useState, useEffect } from 'react';
import axios from "axios";

const SearchResults = () => {
  const [data, setData] = useState({});
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
  // console.log(data.t ? data.t.map((c,index) => c.keys()) : null)
  // console.log(data.t ? data.t.map((t,index) => t.find(e => e)): null)
  // console.log(data ? data :null)
  const dataMap = () => {
    if(data.c && data.t){
      return <ul>
        {data.c.map((item,index) => (
          <li key={index.toString()}>
            {item}
          </li>
        ))}
        {data.t.map((item,index) => (
          <li key={index.toString()}>
            {new Date(item * 1000).toLocaleString()}
            {/* {new Date(item * 1000).toLocaleDateString('UTC', {year: 'numeric', month: 'numeric', day: 'numeric'} )} */}
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

export default SearchResults