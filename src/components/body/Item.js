import React from 'react';

export default class Item extends React.Component {
    handleChange = e => {
        this.props.onCheckedChange(e.target.checked, this.props.id);
    }

    handleDelete = () => {
        this.props.onDelete(this.props.id);
    }

    handleEdit = () => {
        this.props.onEdit(`${this.props.id}isEdit`);
    }

    handleEditValue = e => {
        e.keyCode === 13 && this.submitEditValue(e.target.value, this.props.id);
        e.keyCode === 27 && this.handleCancelEdit();
    }

    handleBlurEdit = e => {
        this.submitEditValue(e.target.value, this.props.id);
    }

    submitEditValue = (value, id) => {
        this.props.onEditValue(value, id);
    }

    handleCancelEdit = () => {
        this.props.onCancelEdit();
    }

    render() {
        const item = this.props.item;
        const isEdit = this.props.id + 'isEdit' !== this.props.isEdit;
        const domNode = isEdit ?
            <li className={'item'}>
                <div>
                    <input
                        type='checkbox'
                        checked={item.completed} // 是否选中
                        onChange={this.handleChange}/>
                    <div onDoubleClick={this.handleEdit}>{item.text}</div>
                    <button onClick={this.handleDelete}></button>
                </div>
            </li> :
            <li className={'item editing'}>
                <input
                    type='text'
                    className={'edit'}
                    defaultValue={item.text}
                    autoFocus={true}
                    onKeyDown={this.handleEditValue} // 按Enter保存、按下Esc取消保存
                    onBlur={this.handleBlurEdit}/>
            </li>;

        return (domNode);
    }
}