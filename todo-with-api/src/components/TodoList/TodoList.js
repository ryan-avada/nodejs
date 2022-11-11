import React, {useState} from 'react';
import {Badge, Button, Layout, ResourceItem, ResourceList} from "@shopify/polaris";

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
                const {id, value, status} = item
                return (
                    <ResourceItem id={id}>
                        <Layout>
                            <Layout.Section oneHalf>
                                {value}
                            </Layout.Section>
                            <Layout.Section oneThird>
                                        <span className="right-item">
                                            <Badge size="small" status={status.className}>{status.label}</Badge>
                                            <Button onClick={() => activateTodo(id)}>Complete</Button>
                                            <Button destructive onClick={() => deleteTodo(id)}>Delete</Button>
                                        </span>
                            </Layout.Section>
                        </Layout>
                    </ResourceItem>
                )
            }}
        />
    );
};

export default TodoList;