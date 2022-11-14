import React from 'react';
import PropTypes from 'prop-types';
import {Badge, Button, Layout, ResourceItem} from "@shopify/polaris";

const TodoItem = ({activateTodo, deleteTodo, item}) => {
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
    );
};

TodoItem.propTypes = {};

export default TodoItem;