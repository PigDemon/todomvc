import React from 'react';
import './TodoBody.css'
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import Footer from './Footer';

let items = [{
    text: 'xx',
    completed: false
}, {
    text: 'xxx',
    completed: false
}];

function checkedItem(checked, id) { // 单条选中
    items[id].completed = checked;
    return items;
}

function checkedAllItem(checked) { // 选中所有
    return items.map(c => {
        c.completed = checked;
        return c;
    });
}

function deleteItem(id) { // 删除单条
    items.splice(id, 1);
    return items;
}

function clearCompleted() { // 清除所有已完成
    return items = items.filter(c => !c.completed);
}

function addItem(value) { // 添加一条
    items.push({text: value, completed: false});
    return items;
}

function filterItem(filter) { // 筛选
    if(filter === '#All') {
        return items;
    } else if(filter === '#Active') {
        return items.filter(c => !c.completed);
    } else if(filter === '#Completed') {
        return items.filter(c => c.completed);
    }
}

function updateItem(value, id) { // 修改一条的内容
    items[id].text = value;
    return items;
}

export default class TodoBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items,
            value: '',
            filter: window.location.hash ? window.location.hash : '#All',
            isEdit: ''
        };
    }

    handleChange = (checked, id) => { // 选中/不选中单条
        this.setState({
            items: checkedItem(checked, id),
        });
    }

    handleCheckedAll = checked => { // 选中/不选中 所有
        this.setState({
            items: checkedAllItem(checked)
        });
    }

    handleDelete = id => { // 删除一条
        this.setState({
            items: deleteItem(id)
        });
    }

    handleClearCompleted = () => { // 清除已完成
        this.setState({
            items: clearCompleted()
        });
    }

    handleInput = value => { // 修改内容
        this.setState({
            value
        });
    }

    handleCreateTask = value => { // 创建一条新的
        this.setState({
            items: addItem(value),
            value: ''
        });
    }

    handleFilter = (hash) => { // all active completed 过滤
        this.setState({
            filter: hash
        });
    }

    handleEdit = match => { // 是否修改内容
        this.setState({
            isEdit: match
        });
    }

    handleEditValue = (value, id) => {
        this.setState({
            items: value.trim() === '' ? deleteItem(id) : updateItem(value, id), // 如果没有值，删除这一条
            isEdit: ''
        });
    }

    handleCancelEdit = () => { // 按Esc 的时候取消修改,重置状态
        this.setState({
            isEdit: ''
        });
    }

    componentDidMount = () => {
        window.addEventListener('hashchange', () => this.handleFilter(window.location.hash));
    };

    componentWillUnmount = () => {
        window.removeEventListener('hashchange', () => this.handleFilter(window.location.hash));
    }

    render() {
        const items = this.state.items;
        const filterItems = filterItem(this.state.filter); // 筛选后
        const isHidden = items.length === 0; // 没有项目 隐藏全选按钮
        const unCompleteNum = items.filter(c => !c.completed).length;
        // 没有项目 isCheckedAll = false  不选中
        const isCheckedAll = isHidden ? false : unCompleteNum === 0;

        return (
            <div>
                <div className={'container'}>
                    <CreateTask
                        isHidden={isHidden} // 是否隐藏全选按钮
                        isCheckedAll={isCheckedAll} // 是否全选中
                        onCheckedAll={this.handleCheckedAll} // 处理点击全选按钮
                        value={this.state.value} // input输入框的内容
                        onInput={this.handleInput} // 输入的时候
                        onCreateTask={this.handleCreateTask}/>
                    <TaskList
                        items={filterItems} // 过滤后的items
                        onCheckedChange={this.handleChange} // 选中某一条
                        onDelete={this.handleDelete} // 删除一条
                        isEdit={this.state.isEdit} // 是否在修改某条的内容
                        onEdit={this.handleEdit} // 正在修改某一条的内容
                        onEditValue={this.handleEditValue} // 保存修改
                        onCancelEdit={this.handleCancelEdit} // 按Esc重置 isEdit的值，取消修改
                        />
                    {!isHidden ? <Footer
                        number={unCompleteNum} // 未完成的项目数
                        onClearCompleted={this.handleClearCompleted} // 清除已完成 // filter 过滤的规则并且当前a链接进入选中状态
                        filter={this.state.filter}/> : ''}
                </div>
            </div>
        );
    }
}