import React from 'react';
import Header from './components/header/Header';
import TodoBody from './components/body/TodoBody';

export default class TodoMVC extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <TodoBody />
            </div>
        );
    }
}