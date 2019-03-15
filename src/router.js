import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import App from './App';

import TodoList from './TodoList';

import About from './about';

export default class Routers extends React.Component{
    render () {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={App} />
                    <Route path='/todo' exact component={TodoList} />
                    <Route path='/about' component={About} />
                </Switch>
            </Router>
        )
    }
}
