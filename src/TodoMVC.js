import React from 'react';
import Header from './components/header/Header';
import TodoBody from './components/body/TodoBody';

const EventEmitter = require('events').EventEmitter;

export default class TodoMVC extends React.Component {
    constructor(props) {
        super(props);

        this.eventEmitter = new EventEmitter();
    }

    render() {
        return (
            <div>
                <Header />
                <TodoBody
                    eventEmitter={this.eventEmitter}/>
            </div>
        );
    }
}