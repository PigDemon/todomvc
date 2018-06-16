import React from 'react';

/**
 * Todo:
 *  1、展示一条任务
 *  2、删除一条任务
 *  3、选中一条任务
 *  4、修改一条任务
 *
 * @export
 * @class Item
 * @extends {React.Component}
 */
export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditValue = this.handleEditValue.bind(this);
        this.submitValue = this.submitValue.bind(this);
        this.handleBlurEdit = this.handleBlurEdit.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);

        this.state = {
            isEdit: '*'
        };
    }

    handleChange(e) {
        this.props.eventEmitter.emit('completed_one', e.target.checked, this.props.id);
    }

    handleDelete() {
        this.props.eventEmitter.emit('delete_one', this.props.id);
    }

    handleEdit() {
        this.setState({
            isEdit: `${this.props.id}isEdit`
        });
    }

    handleEditValue(e) {
        e.keyCode === 13 && this.submitValue(e.target.value);
        e.keyCode === 27 && this.handleCancelEdit();
    }

    handleBlurEdit(e) {
        this.submitValue(e.target.value);
    }

    submitValue(val) {
        this.props.eventEmitter.emit('submit_value', val, this.props.id);
        this.handleCancelEdit();
    }

    handleCancelEdit() {
        this.setState({
            isEdit: '*'
        });
    }

    render() {
        const item = this.props.item;
        const isEdit = this.props.id + 'isEdit' !== this.state.isEdit;
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