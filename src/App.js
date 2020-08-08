import React from 'react';
import SearchResults from './components/SearchResults'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';



function App() {
  return (
    <div className="App">
      <Container fluid="md">
        <SearchResults />
      </Container>
    </div>
  );
}

export default App;
