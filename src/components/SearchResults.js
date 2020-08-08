import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const SearchResults = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("AMZN");
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    let ignore = false;
    // const today = Math.round((new Date()).getTime() / 1000);
    // const lastWeek = Math.round((startDate).getTime() / 1000)-600000;
    const queryDate = Math.round(new Date(startDate).getTime() / 1000)
    const lastWeek = queryDate - 600000;
    // console.log(Math.round(new Date(startDate).getTime() / 1000))
    async function fetchData() {
      const result = await axios(
        "https://finnhub.io/api/v1/stock/candle?symbol=" + query + "&resolution=60&from=" + lastWeek + "&to=" + queryDate + "&token=bsko48frh5rfr4cc6t20"
      );
      if (!ignore) setData(result.data);
      // console.log(startDate)
      // console.log(new Date(queryDate * 1000).toLocaleDateString('UTC', { year: 'numeric', month: 'long', day: 'numeric' }))
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [query, startDate]);
  // console.log(data.t ? data.t.map((c,index) => c.keys()) : null)
  // console.log(data.t ? data.t.map((t,index) => t.find(e => e)): null)
  // console.log(data ? data :null)
  const dataMap = () => {
    if (data.c && data.t) {
      return <ul>
        {data.c.map((item, index) => (
          <li key={index.toString()}>
            {item}
          </li>
        ))}
        {data.t.map((item, index) => (
          <li key={index.toString()}>
            {new Date(item * 1000).toLocaleDateString('UTC', { year: 'numeric', month: 'long', day: 'numeric' })}
            {/* {new Date(item * 1000).toLocaleDateString('UTC', {year: 'numeric', month: 'numeric', day: 'numeric'} )} */}
          </li>
        ))}
      </ul>
    }
    else {
      return <span>enter a company</span>
    }
  }

   let chartData = []
  // const combineArrays = () => {
    if(data.c !== undefined){
      data.c.map((item, i) =>
      // Object.assign({}, item, data.t[i])
      chartData.push(
        [data.o[i]],
        [data.h[i]],
        [data.l[i]],
        [item],
        [data.t[i]],
        [data.v[i]],
        )

      );
    }
    console.log(chartData)
  // }

  const options = {
    title: {
      text: 'My stock chart'
    },
    // series: [{
    //   data: [1, 2, 3]
    // }],
    series: [
      // {data: [data.c]},
      // {data: [data.h]},
      // {data: data.l},
      // {data: data.o},
      // {data: data.v},
      {
        type: 'candlestick',
        name: 'AAPL',
        data: [ data.c],
      },
    ]
  }

  const MyStockChart = () => <HighchartsReact
    highcharts={Highcharts}
    constructorType={'stockChart'}
    options={options}
  />

  const HighStockPrice = (data) => {
    return <><span>High stock price {data.d ? Math.max.apply(null, data.d) : '...'}</span></>
  }

  const LowStockPrice = (data) => {
    return <><span>Low stock price {data.d ? Math.min.apply(null, data.d) : '...'}</span></>
  }

  // get average by reducing the array then divide by number of returned entries
  const AverageStockPrice = (data) => {
    if (data.d !== undefined) {
      const average = data.d.reduce(
        (total, num) => {
          return total ? total + num : null;
        }
      )
      return <>Average closing price {Math.round(average / data.d.length)}</>
    }
    else{
      return 'Average closing price ...'
    }
  }


  // console.log(Date.parse(startDate).getTime()/1000 )
  // console.log('startDate :', Date.parse(startDate), new Date(startDate) )
  return (
    <>
      <DatePicker selected={startDate} value={startDate} onChange={date => setStartDate(date)} />
      <input value={query} onChange={e => setQuery(e.target.value.toUpperCase())} />
      {dataMap()}
      <HighStockPrice d={data.c} />
      <LowStockPrice d={data.l} />
      <AverageStockPrice d={data.c} />
      <MyStockChart />
    </>
  );
}

export default SearchResults