import React from 'react';

/**
 * Todo:
 *  1、hash切换
 *  2、清空已完成
 *  3、显示未完成的数量
 *  4、hash状态标注，表示现在处于哪种过滤状态下
 *
 * @export
 * @class Footer
 * @extends {React.Component}
 */
export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.handleClear = this.handleClear.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    /**
     * 处理点击清除已完成的按钮的事件
     * @memberof Footer
     * @param {null}
     */
    handleClear() {
        this.props.eventEmitter.emit('clear_completed');
    }

    componentDidMount() {
        /**
         * 监听hash变化，即监听过滤操作
         * @param {null} 当前路径的hash值,可以到事件执行的时候才去获取
         */
        window.addEventListener('hashchange', () => this.props.eventEmitter.emit('hash_change'));
    }

    componentWillUnmount() {
        /**
         * 解除监听
         * @param {null}
         */
        window.removeEventListener('hashchange', () => this.props.eventEmitter.emit('hash_change'));
    }

    render() {
        const num = this.props.number;
        const filter = window.location.hash; // 老师我这里对于这个特殊的hash值，全部直接取，不通过props、emit来发送没问题吧

        return (
            <div className={'footer'}>
                <font>{num === 1 ? '1 item' : `${num} items`} left</font>
                <div>
                    <a href='#All' className={filter === '#All' ? 'selected' : ''}>All</a>
                    <a href='#Active' className={filter === '#Active' ? 'selected' : ''}>Active</a>
                    <a href='#Completed' className={filter === '#Completed' ? 'selected' : ''}>Completed</a>
                </div>
                <button onClick={this.handleClear}>Clear completed</button>
            </div>
        );
    }
}