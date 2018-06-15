import React from 'react';

export default class CreateTask extends React.Component {
    handleChecked = e => { // 选中全部 or 全部不选中
        this.props.onCheckedAll(e.target.checked);
    }

    handleChange = e => {
        this.props.onInput(e.target.value);
    }

    handleCreateTask = e => {
        e.keyCode === 13 && this.props.onCreateTask(e.target.value);
    }

    render() {
        return (
            <div className={'createTask'}>
                {!this.props.isHidden && <input
                    type='checkbox'
                    checked={this.props.isCheckedAll}
                    className={'downArrow'}
                    onChange={this.handleChecked}/>}
                <input
                    placeholder='What needs to be done?'
                    value={this.props.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleCreateTask}/>
            </div>
        );
    }
}