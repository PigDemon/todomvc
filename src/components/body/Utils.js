let items = [{
    text: 'xx',
    completed: false
}, {
    text: 'xxx',
    completed: false
}];

/**
 * 获取任务
 * @return 所有任务
 */
function allItems() {
    return items;
}

/**
 * Todo:
 *  1、勾选一条任务
 *
 * @param {Boolean} checked
 * @param {String/Number} id 任务的位置或者id
 * @returns 返回所有的任务
 */
function checkedItem(checked, id) {
    items[id].completed = checked;
    return items;
}

/**
 * Todo:
 *  1、选中所有的任务
 *
 * @param {Boolean} checked
 * @returns 所有任务
 */
function checkedAllItem(checked) {
    return items.map(c => {
        c.completed = checked;
        return c;
    });
}

/**
 * Todo:
 *  1、删除一条任务
 *
 * @param {String/Number} id 任务的位置或者id
 * @returns 所有的任务
 */
function deleteItem(id) {
    items.splice(id, 1);
    return items;
}

/**
 * Todo:
 *  1、清除已完成的任务
 *
 * @returns 所有未完成的任务
 */
function clearCompleted() {
    return items = items.filter(c => !c.completed);
}

/**
 * Todo:
 *  1、创建一条任务
 *
 * @param {String} value 任务内容
 * @returns 所有的任务
 */
function addItem(value) {
    items.push({
        text: value,
        completed: false
    });
    return items;
}

/**
 * Todo:
 *  1、任务过滤
 *
 * @param {String} filter 过滤条件
 * @returns
 */
function filterItem(filter) {
    if (filter === '#All') {
        return items;
    } else if (filter === '#Active') {
        return items.filter(c => !c.completed);
    } else if (filter === '#Completed') {
        return items.filter(c => c.completed);
    }
}

/**
 * Todo:
 *  1、修改一条任务的内容
 *
 * @param {String} value 任务的内容
 * @param {String/Number} id 任务的位置或者id
 * @returns
 */
function updateItem(value, id) { // 修改一条的内容
    items[id].text = value;
    return items;
}

export {
    allItems,
    checkedItem,
    checkedAllItem,
    deleteItem,
    clearCompleted,
    addItem,
    filterItem,
    updateItem
};