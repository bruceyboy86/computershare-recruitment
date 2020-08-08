import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Spinner from 'react-bootstrap/Spinner';

const SearchResults = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("AMZN");
  const [startDate, setStartDate] = useState(new Date());  //always load on today's date

  // change data based on user's selection of date or company
  useEffect(() => {
    let ignore = false;
    const queryDate = Math.round(new Date(startDate).getTime() / 1000) // change format for query
    const lastWeek = queryDate - 600000; // calculate for previous 7 days
    async function fetchData() {
      const result = await axios(
        "https://finnhub.io/api/v1/stock/candle?symbol=" + query + "&resolution=60&from=" + lastWeek + "&to=" + queryDate + "&token=bsko48frh5rfr4cc6t20"
      );
      if (!ignore) setData(result.data);
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [query, startDate]);

  // make fresh arrays capable of rendering on highcharts stock candles chart
  let chartDataCandles = []
  if (data.c !== undefined) {
    data.c.map((item, i) =>
      chartDataCandles.push(
        [data.t[i] * 1000,
        data.o[i],
        data.h[i],
        data.l[i],
          item,],
      )
    );
  }

  // highcharts uses an object of otions to populate chart.
  // chartDataCandles is a combination of results bundles into individual arrays per index entry
  const options = {
    title: {
      text: query + ' stock chart'
    },
    rangeSelector: {
      enabled:false,
    },
    backgroundColor: 'transparent',
    legend: {
      enabled: false,
      borderColor: 'transparent'
    },
    scrollbar:{
      showFull: false
    },
    navigator:{
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [
      {
        type: 'candlestick',
        name: 'AAPL',
        data: chartDataCandles,
      },
    ]
  }

  // basics of rendering chart
  const HighStocksChart = () => <HighchartsReact
    highcharts={Highcharts}
    constructorType={'stockChart'}
    options={options}
  />

  // calculate the highest/lowest stock price using ternary so element can render without data
  const HighStockPrice = (data) => {
    return <><span>High stock price {data.d ? Math.max.apply(null, data.d) : <Spinner animation="grow" />}</span></>
  }
  const LowStockPrice = (data) => {
    return <><span>Low stock price {data.d ? Math.min.apply(null, data.d) : <Spinner animation="grow" />}</span></>
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
      return <span>Average closing price <Spinner animation="grow" /> </span>
    }
  }

  return (
    <>
      <DatePicker selected={startDate} value={startDate} onChange={date => setStartDate(date)} />
      <input value={query} onChange={e => setQuery(e.target.value.toUpperCase())} />
      <HighStocksChart />
      <HighStockPrice d={data.c} />
      <LowStockPrice d={data.l} />
      <AverageStockPrice d={data.c} />
    </>
  );
}

export default SearchResults