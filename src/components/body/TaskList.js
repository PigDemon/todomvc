import React from 'react';
import Item from './Item';

/**
 * Todo:
 *  1、展示任务
 *
 * @export
 * @class TaskList
 * @extends {React.Component}
 */
export default class TaskList extends React.Component {
    render() {
        const items = this.props.items.map((c, i) => {
            return <Item
                        id={i}
                        item={c}
                        key={i}
                        eventEmitter={this.props.eventEmitter}/>
        });

        return (
            <ul className={'list'}>
                {items}
            </ul>
        );
    }
}