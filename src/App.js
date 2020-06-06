import React, { Component } from 'react';


import ProtectedRouter from './components/ProtectedRouter';

class App extends Component {
  render() {
    return (
        <ProtectedRouter />
    );
  }
}

export default App;
