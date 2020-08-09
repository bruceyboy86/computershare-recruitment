import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

const NewsCarousel = (props) => {

  const newsItems = () => {
    if (props.news.length) {
      // only map the latest 5 items of news
      return props.news.slice(0, 5).map(newsItem =>
        <Carousel.Item>
          <a target="_blank" rel="noopener noreferrer" href={newsItem.url}>
            <img
              className="d-block w-100"
              src={newsItem.image}
              alt={newsItem.source}
            />
            <Carousel.Caption>
              <h3>{newsItem.headline}</h3>
              <p>{newsItem.summary}</p>
            </Carousel.Caption>
          </a>
        </Carousel.Item>
      )
    }
  }

  return (
    <Carousel interval={8000}>
      {newsItems()}
    </Carousel>
  )
}

export default NewsCarousel;