import React from 'react';

/**
 * Todo:
 *  1、输入内容回车创建任务
 *  2、全选任务
 *  3、没有任务隐藏全选
 *
 * @export
 * @class CreateTask
 * @extends {React.Component}
 */
export default class CreateTask extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleCreateTask = this.handleCreateTask.bind(this);

        this.state = {
            value: ''
        };
    }

    /**
     * 全选/全不选
     * @param {String} checked 状态
     */
    handleChecked(e) {
        this.props.eventEmitter.emit('checked_all', e.target.checked);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleCreateTask(e) {
        e.keyCode === 13 && this.props.eventEmitter.emit('create_task', e.target.value) && this.setState({
            value: ''
        });
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
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleCreateTask}/>
            </div>
        );
    }
}