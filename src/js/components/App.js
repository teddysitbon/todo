import React, { Component } from 'react';
import '../../App.css';
import Header from './Header';
import TodoApp from './TodoApp';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <TodoApp />
      </div>
    );
  }

}
export default App;
