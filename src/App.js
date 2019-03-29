import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

// 定义一个react组件 - App  必须继承于一个组件
class App extends Component {
  render() {
    // jsx 语法
    return (
      <div className="App">
         <h1>TODOLIST MENU text</h1>
          <p>我就是试试这个Router!!!! text</p>
          <ul className='nav-ul'>
              <li className='nav-li'><Link to="/todo">TODO</Link></li>
              <li className='nav-li'><Link to="/about">ABOUT</Link></li>
          </ul>
      </div>
    );
  }
}

export default App;
