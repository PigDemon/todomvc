import React from 'react';
import './TodoBody.css'
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import Footer from './Footer';
import {
    allItems,
    checkedItem,
    checkedAllItem,
    deleteItem,
    clearCompleted,
    addItem,
    filterItem,
    updateItem
} from './Utils';

export default class TodoBody extends React.Component {
    constructor(props) {
        super(props);

        this.eventEmitter = this.props.eventEmitter;

        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            items: [],
            filter: window.location.hash ? window.location.hash : '#All'
        };
    }

    componentDidMount() {
        this.setState({
            items: allItems()
        });

        /**
         * 订阅清除已完成动作事件
         * @param {null}
         */
        this.eventEmitter.on('clear_completed', () => {
            this.setState({
                items: clearCompleted()
            });
        });

        /**
         * 处理hash变化的时候过滤操作
         * @param {String} 路径的hash值
         */
        this.eventEmitter.on('hash_change', () => this.setState({
            filter: window.location.hash
        }));

        /**
         * 处理全选操作
         * @param {null}
         */
        this.eventEmitter.on('checked_all', checked => this.setState({
            items: checkedAllItem(checked)
        }));

        /**
         * 创建任务
         * @param {String} 任务内容
         */
        this.eventEmitter.on('create_task', val => {
            this.setState({
                items: addItem(val)
            });
        });

        /**
         * 完成（选中）/取消一条任务
         * @param {Boolean, String/Number}  状态   任务id
         */
        this.eventEmitter.on('completed_one', (isCompleted, id) => this.setState({
            items: checkedItem(isCompleted, id),
        }));

        /**
         * 删除一条任务
         * @param {String/Number} id   任务id
         */
        this.eventEmitter.on('delete_one', id => this.setState({
            items: deleteItem(id)
        }));

        /**
         * 提交保存修改
         * @param {String, String/Number}  value, 任务id
         */
        this.eventEmitter.on('submit_value', (val, id) => {
            this.setState({
                items: val.trim() === '' ? deleteItem(id) : updateItem(val, id) // 如果没有值，删除这一条
            });
        });
    };

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
                        eventEmitter={this.eventEmitter}/>
                    <TaskList
                        items={filterItems} // 过滤后的items
                        eventEmitter={this.eventEmitter}/>
                    {!isHidden ? <Footer
                        number={unCompleteNum} // 未完成的项目数
                        eventEmitter={this.eventEmitter}/> : ''}
                </div>
            </div>
        );
    }
}