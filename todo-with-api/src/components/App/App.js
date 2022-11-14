import React from "react";
import {
    AppProvider,
    Button,
    Card,
    Frame,
    Modal,
    Page,
    TextField,
    TopBar,
} from '@shopify/polaris';
import {useState} from 'react';
import useFetchApi from "../../hooks/useFetchApi";
import TodoList from "../Todo/TodoList/TodoList";
import ShowToast from "../Todo/TodoList/ShowToast";

function TodoApp() {
    const [todoText, setTodoText] = useState('');
    const [createModal, setCreateModal] = useState(false);
    const [activeToast, setActiveToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const toggleToast = (content) => {
        setActiveToast(prev => !prev)
        setToastMessage(() => content ? content : "");
    }

    const handleCreateModal = () => {
        setCreateModal(prev => !prev);
    }

    const {
        data: todos,
        loading,
        setLoading,
        fetchData
    } = useFetchApi({url: 'http://localhost:5000/api/todos'});

    const bulkComplete = async (selectedItems) => {
        try {
            setLoading(true)
            await Promise.all(selectedItems.map(id => {
                // todo: use bulk API
                return activateTodo(id, true)
            }))
            toggleToast("Update success!");
        } catch (e) {
            toggleToast(e)
        } finally {
            await fetchData('http://localhost:5000/api/todos')
            setLoading(false)
        }
    }

    const bulkDelete = async (selectedItems) => {
        try {
            await deleteTodo(selectedItems.toString(), true);
            toggleToast("Delete success!");
        } catch (e) {
            // todo: toast here, and loading
            toggleToast(e);
        } finally {
            await fetchData('http://localhost:5000/api/todos')
        }
    }

    async function activateTodo(id, bulk = false) {
        try {
            setLoading(true)
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
            if (!bulk) {
                toggleToast("Update success!");
            }
        } catch (e) {
            toggleToast(e);
        } finally {
            await fetchData('http://localhost:5000/api/todos')
            setLoading(false)
        }
    }

    async function deleteTodo(id, bulk = false) {
        try {
            setLoading(true)
            await fetch('http://localhost:5000/api/todo/' + id, {
                method: 'DELETE'
            })
            // todo: Them toast
            if (!bulk) {
                toggleToast("Delete success!");
            }

        } catch (e) {
            toggleToast(e);
        } finally {
            await fetchData('http://localhost:5000/api/todos')
            setLoading(false)
        }
    }

    async function createTodo() {
        try {
            setLoading(true)
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
            handleCreateModal();
            toggleToast("Create success!");
        } catch (e) {
            toggleToast(e);
        } finally {
            await fetchData('http://localhost:5000/api/todos')
            setLoading(false)
        }
    }

    const createButton = (
        <Button primary onClick={handleCreateModal}>
            Create todo
        </Button>
    );

    const pageContent = (
        <Page
            title="Todos"
            primaryAction={createButton}
        >
            <Card>
                <TodoList bulkComplete={bulkComplete} bulkDelete={bulkDelete} activateTodo={activateTodo}
                          deleteTodo={deleteTodo} todos={todos} loading={loading}/>
            </Card>
        </Page>
    );

    const userMenuMarkup = (
        <TopBar.UserMenu
            name="Avada"
            initials="A"
            onToggle={handleCreateModal}
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
                open={createModal}
                onClose={handleCreateModal}
                title="Create a new todo"
                primaryAction={{
                    content: 'Create',
                    onAction: () => createTodo()
                }}
                secondaryActions={{
                    content: 'Cancel',
                    onAction: handleCreateModal,
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
                    {activeToast ? (<ShowToast message={toastMessage} handleToast={toggleToast}/>) : null}
                </Frame>
            </AppProvider>
        </div>
    );
}


export default TodoApp;
