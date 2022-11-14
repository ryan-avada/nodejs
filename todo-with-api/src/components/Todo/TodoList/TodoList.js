import React, {useState} from 'react';
import {Badge, Button, Layout, ResourceItem, ResourceList} from "@shopify/polaris";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({todos, loading, bulkComplete = null, bulkDelete = null, activateTodo = null, deleteTodo = null}) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const promotedBulkActions = [];
    if (bulkComplete) {
        promotedBulkActions.push(
            {
                content: 'Complete',
                onAction: () => {
                    bulkComplete(selectedItems)
                    setSelectedItems([])
                },
            }
        )
    }
    if (bulkDelete) {
        promotedBulkActions.push(
            {
                content: 'Delete',
                onAction: () => {
                    bulkDelete(selectedItems)
                    setSelectedItems([])
                },
            }
        )
    }

    return (
        <ResourceList
            loading={loading}
            resourceName={{singular: 'todo', plural: 'todos'}}
            items={todos}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            selectable
            promotedBulkActions={promotedBulkActions}
            renderItem={(item) => {

                return (
                    <TodoItem item={item} activateTodo={activateTodo} deleteTodo={deleteTodo} />
                )
            }}
        />
    );
};

export default TodoList;