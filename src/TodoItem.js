import React from 'react'

class TodoItem extends React.Component {
    constructor (props) {
        super(props)
        this.handleDone = this.handleDone.bind(this)
    }
    handleDone (index) {
        this.props.operation(index)
    }
    render() {
        return (
            <li className='todo-li' style={{background: this.props.color}} onClick={() => {this.handleDone(this.props.index)}}>
                <span>{this.props.content}</span>
                <div className='input-radio'>
                    {/*如果想要获取当前事件event 还要再传别的参数 需要这样(e) => {this.handleDone(e, this.props.index)} 绑定event*/}
                    {/*<input type="checkbox" className='radio'  />*/}
                    <label className='input-checkbox-style'></label>
                </div>
            </li>
        )
    }
}
export default TodoItem
