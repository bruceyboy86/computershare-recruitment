import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const PriceCards = (props) => {

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
    else {
      return <span>Average closing price <Spinner animation="grow" /> </span>
    }
  }
  return (
    <>
      <HighStockPrice d={props.close} />
      <AverageStockPrice d={props.close}/>
      <LowStockPrice d={props.low}/>
    </>
  )
}

export default PriceCards