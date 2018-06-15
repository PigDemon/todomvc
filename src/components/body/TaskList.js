import React from 'react';
import Item from './Item';

export default class TaskList extends React.Component {
    handleChange = (checked, id) => { // 选中、不选中 一条项目
        this.props.onCheckedChange(checked, id);
    }

    handleDelete = id => { // 删除一条项目
        this.props.onDelete(id);
    }

    handleEdit = match => {
        this.props.onEdit(match); // 进入修改状态
    }

    handleEditValue = (value, id) => { // 保存修改
        this.props.onEditValue(value, id);
    }

    handleCancelEdit = () => { // 取消修改
        this.props.onCancelEdit();
    }

    render() {
        const items = this.props.items.map((c, i) => {
            return <Item
                        id={i}
                        item={c}
                        key={i}
                        onCheckedChange={this.handleChange} // 处理是否选中
                        onDelete={this.handleDelete} // 点击删除的时候
                        isEdit={this.props.isEdit} // 是否处于修改的状态
                        onEdit={this.handleEdit} // 处理修改
                        onEditValue={this.handleEditValue} // 提交修改
                        onCancelEdit={this.handleCancelEdit}/>
        });
        return (
            <ul className={'list'}>
                {items}
            </ul>
        );
    }
}