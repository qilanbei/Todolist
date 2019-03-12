import React, { Component } from 'react';
import TodoItem from './TodoItem'
import './App.css';
import './style.css'

class TodoList extends Component {

    constructor (props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString('zh'),
            todoList: [],
            finishedList: [],
            inputValue: ''
        };
        // A: 普通函数绑定this 执行性能来说这种绑定方法比较好
        this.handleAddNum = this.handleAddNum.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getCurrTime = this.getCurrTime.bind(this)
        this.handleDone = this.handleDone.bind(this)
        this.onEnter = this.onEnter.bind(this)
    }
    componentDidMount () {
        this.getCurrTime()
    }
    // 箭头函数本身没有this ,但是它会捕捉其所在上下文的this来作为自己的this
    // ES6中的箭头函数会直接调用的this是继承父级的this
    // setNewNumber = () => {
    //     this.setState({data: this.state.data + 1})
    // }
    // 如果写成普通函数的时候  必须在constructor里面绑定this(绑定方法 例如A或者B)，否则会丢失上下文
    // handleAddNum () {
    //     // 如果不在constructor中绑定this  丢失了this
    //     // （也有说指向的是 有click事件的button 不对的 就是丢失了 打印this 为 undefined）
    //     console.log(this.state);
    // }
    handleAddNum = () => {
        // 添加方法 为了让页面及时更新 react 提供setState
        // 用法1：
        // this.state.list.push('hello word')
        // this.setState({})
        // 用法2：
        if (this.state.inputValue !== '') {
            this.setState({
                // ...this.state.list 相当于 之前的数据 'learn english', 'learn react', 'learn vue'
                // 下面这句等价于list: ['learn english', 'learn react', 'learn vue', 'hello word']
                todoList: [...this.state.todoList, this.state.inputValue],
                inputValue: ''
            })
        } else {
            alert('no value input')
        }
    };
    handleInput = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    };
    handleDelete (index) {
        // 尽量不要直接操作state的数据, 以后测试工具会变得复杂？
        // this.state.list.splice(index, 1)
        // let item = [...this.state.list]
        // item.splice(index, 1)
        // this.setState({
        //     list: item
        // })
        // 如果你的变量名和state的参数一致 可以直接这样写:
        const finishedList = [...this.state.finishedList];
        finishedList.splice(index, 1);
        this.setState({finishedList})
    }

    getCurrTime () {
        let self = this;
        setInterval(function () {
            self.setState({
                time: new Date().toLocaleString('zh')
            })
        }, 1000)
    }
    getTodoItems (list, doneFun ,color) {
        return (
            list.map((item, index) => {
                // react 强调循环遍历之后 一定要在标签内绑定key不一样的值 否则会有warning
                // return <li key={index} onClick={this.handleDelete.bind(this, index)}>{item}</li>
                // 父组件通过属性的方式传递参数
                // 子组件通过this.props接收参数
                return (
                    <TodoItem
                        operation={doneFun}
                        key={index}
                        content={item}
                        index={index}
                        color={color}
                    />
                )
            })
        )
    }
    handleDone (index) {
        let todoList = [...this.state.todoList];
        let finishedList = [...this.state.finishedList]
        finishedList = [...finishedList, todoList[index]]
        todoList.splice(index, 1);
        this.setState({
            todoList: todoList,
            finishedList: finishedList
        })
    }
    onEnter(e) {
        // 键盘回车操作
        if (e.keyCode === 13) {
            this.handleAddNum();
        }
    }
    render() {
        return (
            // return 里面的html只能有一个顶级标签
            // 外层有个div, 可以换成React.Fragment 这样浏览器解析外层就不是两层div包裹了
            <div className='todo-list container'>
                <p className='curr-time'>{this.state.time}</p>
                <p className='title'>TODO TASKS</p>
                <input type="text" className='input' value={this.state.inputValue} onChange={this.handleInput} onKeyDown={this.onEnter}/>
                {/* B: 普通函数绑定this*/}
                {/*<button onClick={this.handleAddNum.bind(this)}>add</button>*/}
                {/*如果想要写行内样式 style接收一个对象 */}
                {/*<button style={{background: 'red'}} onClick={this.handleAddNum}>add</button>*/}
                <button className='todo-btn' onClick={this.handleAddNum}>add</button>
                <p>TASKS: </p>
                <ul className='todo-ul'>
                    {this.getTodoItems(this.state.todoList, this.handleDone, '#ff6943')}
                </ul>
                <p className='line'></p>
                <p>FINISHED TASKS: </p>
                <ul className='todo-ul'>
                    {this.getTodoItems(this.state.finishedList, this.handleDelete, '#00D3FD')}
                </ul>
            </div>
        );
    }
}

export default TodoList;
