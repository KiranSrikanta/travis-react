import React from 'react';

class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page container">
        <h1 style={{'textAlign': 'center'}}>react-redux</h1>
        <br />
        <br />
        <br />
        <p className="lead" style={{'textAlign': 'center'}}>
          The experimental react-redux app for learning all things react
        </p>
      </div>
    );
  }
}

export default HomePage;