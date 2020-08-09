import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import PriceCards from './PriceCards'
import NewsCarousel from './NewsCarousel'

const SearchResults = () => {
  const [data, setData] = useState({});
  const [info, setCompanyInfo] = useState({});
  const [news, setCompanyNews] = useState({});
  const [quote, setCompanyQuote] = useState({});
  const [query, setQuery] = useState("AMZN");
  const [startDate, setStartDate] = useState(new Date());  //always load on today's date

  // change data based on user's selection of date or company
  useEffect(() => {
    let ignore = false;
    const queryDate = Math.round(new Date(startDate).getTime() / 1000) // change format for query
    const lastWeek = queryDate - 600000; // calculate for previous 7 days
    const monthOfNews = new Date(startDate) // prepare date format for rolling back a month
    monthOfNews.setUTCDate(monthOfNews.getUTCDate() - 30); // one month's worth of news
    async function fetchData() {
      const result = await axios(
        "https://finnhub.io/api/v1/stock/candle?symbol=" + query + "&resolution=60&from=" + lastWeek + "&to=" + queryDate + "&token=bsko48frh5rfr4cc6t20"
      );
      const CompanyInfo = await axios(
        "https://finnhub.io/api/v1/stock/profile2?symbol=" + query + "&token=bsko48frh5rfr4cc6t20"
      );
      const CompanyNews = await axios(
        "https://finnhub.io/api/v1/company-news?symbol=" + query + "&from=" + monthOfNews.toISOString().split('T')[0] + "&to=" + startDate.toISOString().split('T')[0] + "&token=bsko48frh5rfr4cc6t20"
      );
      const CompanyQuote = await axios(
        "https://finnhub.io/api/v1/quote?symbol=" + query + "&token=bsko48frh5rfr4cc6t20"
      );
      if (!ignore) {
        setCompanyInfo(CompanyInfo.data)
        setCompanyNews(CompanyNews.data)
        setCompanyQuote(CompanyQuote.data)
        setData(result.data)
      };
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
      text: info.name + ' shares',
      style: { "color": '#c8baee' }
    },
    rangeSelector: {
      enabled: false,
    },
    backgroundColor: 'transparent',
    legend: {
      enabled: false,
      borderColor: 'transparent'
    },
    scrollbar: {
      showFull: false
    },
    navigator: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    chart: {
      backgroundColor: '#132238'
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

  return (
    <>
      <Jumbotron>
        <Row>

          <Col md={12}>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Label>Company id</Form.Label>
                  <Form.Control className="form-control rounded-pill search-input" value={query} onChange={e => setQuery(e.target.value.toUpperCase())} />
                </Col>
                <Col>
                  <Form.Label>Week ending on ...</Form.Label><br />
                  <DatePicker className='datePickerForm form-control' selected={startDate} value={startDate} onChange={date => setStartDate(date)} />
                </Col>
              </Form.Row>
            </Form>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Text>
                  {info.name}
                </Card.Text>
                <Card.Text>
                  Country: {info.country}
                </Card.Text>
                <Card.Text>
                  Currency: {info.currency}
                </Card.Text>
                <Card.Text>
                  Exchange: {info.exchange}
                </Card.Text>
                <Card.Text>
                  Market Capitalisation: {info.marketCapitalization}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Text>
                  <p className="outstandingShareTitle">Number of oustanding shares</p>
                  <p className="outstandingShare">{info.shareOutstanding}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Jumbotron>
      <Row>
        <Col>
          <HighStocksChart />
        </Col>
      </Row>
      <Row>
        <Col>
          <PriceCards close={data.c} low={data.l} />
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Card>
            <a title={info.name} target="_blank" rel="noopener noreferrer" href={info.weburl}>
              <Card.Img variant="top" src={info.logo} />
            </a>
            <Card.Body>
              <Card.Text>
                Current price: {Math.round(quote.c)}
              </Card.Text>
              <Card.Text>
                High price of the day: {Math.round(quote.c)}
              </Card.Text>
              <Card.Text>
                Low price of the day: {Math.round(quote.c)}
              </Card.Text>
              <Card.Text>
                Previous close price: {Math.round(quote.c)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <NewsCarousel news={news} />
        </Col>
      </Row>
    </>
  );
}

export default SearchResults