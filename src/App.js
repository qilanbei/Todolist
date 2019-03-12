import React, { Component } from 'react';
import './App.css';

// 定义一个react组件 - App  必须继承于一个组件
class App extends Component {
  render() {
    // jsx 语法
    return (
      <div className="App">
        {/*只支持写js表达式 不能写js语句*/}
         例如： { 2 + 3 }
         这是一个栗子！！！
      </div>
    );
  }
}

export default App;
