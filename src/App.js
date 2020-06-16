import React, { Component } from 'react';


import ProtectedRouter from './components/ProtectedRouter';

class App extends Component {
  render() {
    return (
      <div className="background_container">
        <ProtectedRouter />
      </div>
    );
  }
}

export default App;
