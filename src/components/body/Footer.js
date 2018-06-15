import React from 'react';

export default class Footer extends React.Component {
    handleClear = () => {
        this.props.onClearCompleted();
    }

    render() {
        const num = this.props.number;
        const filter = this.props.filter;

        return (
            <div className={'footer'}>
                <font>{num === 1 ? '1 item' : `${num} items`} left</font>
                <div>
                    {filter === '#All' ?
                        <a href='#All' className={'selected'}>All</a> :
                        <a href='#All'>All</a>}
                    {filter === '#Active' ?
                        <a href='#Active' className={'selected'}>Active</a> :
                        <a href='#Active'>Active</a>}
                    {filter === '#Completed' ?
                        <a href='#Completed' className={'selected'}>Completed</a> :
                        <a href='#Completed'>Completed</a>}
                </div>
                <button onClick={this.handleClear}>Clear completed</button>
            </div>
        );
    }
}