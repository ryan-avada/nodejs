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
    TextField,
    Toast,
    TopBar,
} from '@shopify/polaris';
import {useState, useCallback, useRef} from 'react';
import {v4 as uuidv4} from "uuid";

function TodoApp() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [todos, setTodos] = useState([
        // todo: Chỗ này lưu luôn status vào đây là đc ạ
        {id: 1, statusId: 1, text: "Learn about React"},
        {id: 2, statusId: 2, text: "Meet friend for lunch"},
    ]);
    const [createModel, setCreateModel] = useState(false);
    const [todoText, setTodoText] = useState('');

    const statusData = [
        {id: 1, label: 'Done', className: 'success'},
        {id: 2, label: 'Pending', className: 'complete'}
    ]

    const setStatus = index => {
        setIsLoading(true);
        const newTodos = [...todos];
        newTodos[index].statusId = 1;
        setTodos(newTodos);
        // todo: Mình sẽ dùng là setState dạng func như thế này ạ
        // setTodos(prevTodos => {
        //     // prevTodos ở đây sẽ luôn là todos state ở lúc mới nhất, realtime nhất. Phải luôn dùng cái cú pháp này ạ.
        //     return prevTodos.map((todo, todoIndex) => {
        //         if (todoIndex === index) return {...todo, statusId: 1}
        //         return todo
        //     })
        // })
        setIsLoading(false);
    }

    const deleteTodo = id => {
        setIsLoading(true);
        const newTodos = [...todos]
        setTodos(newTodos.filter(todo => {
            return todo.id !== id
        }))
        setIsLoading(false);
    }

    const bulkDelete = () => {
        setIsLoading(true);
        // todo: cái này cũng chuyển qua cú pháp setState(prev => prev) ạ
        const res = todos.filter(todo => !selectedItems.includes(todo.id))
        setTodos(res);
        setIsLoading(false);
    }

    const bulkComplete = () => {
        setIsLoading(true);
        // todo: cái này cũng chuyển qua cú pháp setState(prev => prev) ạ
        const newTodos = todos.map(todo => {
            if (selectedItems.includes(todo.id))
                todo.statusId = 1;
            return todo;
        })

        setTodos(newTodos)
        setSelectedItems([]);
        setIsLoading(false);
    }

    const handleCreateModel = () => {
        setCreateModel(prev => !prev);
    }

    const addTodo = () => {
        setIsLoading(true);
        handleCreateModel();
        // cái việc unique ra ID phải ở backend, nên tạm thời ko cần ạ. chỉ cần tí lắp backend vào là đc ạ
        const todo = {id: uuidv4(), statusId: 2, text: todoText};
        const newTodosArr = [...todos, todo];
        setTodos(newTodosArr);
        setIsLoading(false);
        setTodoText('');
    }

    const createButton = (
        <Button primary onClick={handleCreateModel}>
            Create todo
        </Button>
    );

    const promotedBulkActions = [
        {
            content: 'Complete',
            onAction: () => bulkComplete()
        },
        {
            content: 'Delete',
            onAction: () => bulkDelete(),
        }
    ];

    const pageContent = (
        <Page
            title="Todoes"
            primaryAction={createButton}
        >
            <Card>
                {isLoading ? (
                    <p style={{textAlign: "center", padding: "2%"}}>
                        <Spinner accessibilityLabel="Spinner example" size="large"/>
                    </p>
                ) : (
                    <ResourceList
                        resourceName={{singular: 'todo post', plural: 'todo posts'}}
                        items={todos}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        selectable
                        promotedBulkActions={promotedBulkActions}
                        renderItem={(item, renderId, index) => {
                            const {id, text, statusId} = item;
                            const status = statusData.filter(stt => {
                                return stt.id === statusId;
                            })
                            const isDisabled = statusId === 1 ? true : false;

                            return (
                                <ResourceItem id={id}>
                                    <Layout>
                                        <Layout.Section oneHalf>
                                            {text}
                                        </Layout.Section>
                                        <Layout.Section oneThird>
                                        <span className="right-item">
                                            <Badge size="small" status={status[0].className}>{status[0].label}</Badge>
                                            <Button disabled={isDisabled} onClick={() => setStatus(index)}>Complete</Button>
                                            <Button destructive onClick={() => deleteTodo(id)}>Delete</Button>
                                        </span>
                                        </Layout.Section>
                                    </Layout>
                                </ResourceItem>
                            );
                        }}
                    />
                )
                }
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
                    onAction: addTodo,
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
