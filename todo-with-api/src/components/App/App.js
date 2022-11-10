import React from "react";
import {
    ActionList,
    AppProvider, Badge, Button, ButtonGroup,
    Card,
    ContextualSaveBar, Form,
    FormLayout,
    Frame,
    Layout,
    Loading,
    Modal,
    Navigation,
    Page, ResourceItem, ResourceList,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage, Spinner,
    TextContainer,
    TextField, Thumbnail,
    Toast,
    TopBar,
} from '@shopify/polaris';
import {useState, useCallback, useRef, useEffect} from 'react';
import useFetchApi from "../hooks/useFetchApi";

function TodoApp() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [createModel, setCreateModel] = useState(false);
    const [todoText, setTodoText] = useState('');
    const [dataReceived, setDataReceived] = useState([]);

    const {data: todos, loading} = useFetchApi({url: 'http://localhost:5000/api/todos'});
    const handleCreateModel = () => {
        setCreateModel(prev => !prev);
    }

    const promotedBulkActions = [
        {
            content: 'Complete',
            onAction: () => bulkComplete(),
        },
        {
            content: 'Delete',
            onAction: () => bulkDelete(),
        }
    ];

    const bulkComplete = () => {
        selectedItems.map(id => {
            return activeOne(id)
        })
        setSelectedItems([]);
    }

    const bulkDelete = () => {
        deleteTodo(selectedItems.toString());
    }

    async function activeOne(id) {
        try {
            setIsLoading(true)
            await fetch('http://localhost:5000/api/todo/' + id, {
                method: 'PUT',
                body: JSON.stringify({
                    status: {
                        id: 1,
                        label: "Done",
                        className: "success"
                    }
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteTodo(id) {
        try {
            setIsLoading(true)
            await fetch('http://localhost:5000/api/todo/' + id, {
                method: 'DELETE'
            })
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    async function createTodo() {
        try {
            setIsLoading(true)
            await fetch('http://localhost:5000/api/todo', {
                method: 'POST',
                body: JSON.stringify({
                    "value": todoText,
                    "status": {
                        "id": 2,
                        "label": "Pending",
                        "className": "complete"

                    }
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            setTodoText("");
            handleCreateModel();
            setIsLoading(false)
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }

    const createButton = (
        <Button primary onClick={handleCreateModel}>
            Create todo
        </Button>
    );

    const pageContent = (
        <Page
            title="Todos"
            primaryAction={createButton}
        >
            <Card>
                <ResourceList
                    loading={loading || isLoading}
                    resourceName={{singular: 'todo', plural: 'todos'}}
                    items={todos}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    selectable
                    promotedBulkActions={promotedBulkActions}
                    renderItem={(item) => {
                        const {id, value, status} = item;
                        return (
                            <ResourceItem id={id}>
                                <Layout>
                                    <Layout.Section oneHalf>
                                        {value}
                                    </Layout.Section>
                                    <Layout.Section oneThird>
                                        <span className="right-item">
                                            <Badge size="small" status={status.className}>{status.label}</Badge>
                                            <Button onClick={() => activeOne(id)}>Complete</Button>
                                            <Button destructive onClick={() => deleteTodo(id)}>Delete</Button>
                                        </span>
                                    </Layout.Section>
                                </Layout>
                            </ResourceItem>
                        );
                    }}
                />
            </Card>
        </Page>
    );

    const userMenuMarkup = (
        <TopBar.UserMenu
            name="Avada"
            initials="A"
        />
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
        />
    );

    const themeConfig = {
        logo: {
            width: 124,
            topBarSource:
                'https://cdn1.avada.io/media/site/avada_logo_final_color.svg',
            url: 'http://jadedpixel.com',
        },
        colors: {
            topBar: {
                'background': '#fff'
            }
        },
    };

    const modelCreate = (
        <div style={{height: '500px'}}>
            <Modal
                open={createModel}
                onClose={handleCreateModel}
                title="Create a new todo"
                primaryAction={{
                    content: 'Create',
                    onAction: () => createTodo()
                }}
                secondaryActions={{
                    content: 'Cancel',
                    onAction: handleCreateModel,
                }}
            >
                <Modal.Section>
                    <TextField
                        type="text"
                        value={todoText}
                        onChange={(e) => {
                            setTodoText(e)
                        }}
                    />
                </Modal.Section>
            </Modal>
        </div>
    );

    return (
        <div style={{height: '500px'}}>
            <AppProvider
                i18n=""
                theme={themeConfig}
            >
                <Frame
                    topBar={topBarMarkup}
                >
                    {pageContent}
                    {modelCreate}
                </Frame>
            </AppProvider>
        </div>
    );
}


export default TodoApp;
