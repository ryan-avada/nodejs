import {
    ActionList,
    AppProvider, Badge, Button, ButtonGroup,
    Card,
    ContextualSaveBar,
    FormLayout,
    Frame,
    Layout,
    Loading,
    Modal,
    Navigation,
    Page, ResourceItem, ResourceList,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    TextContainer,
    TextField,
    Toast,
    TopBar,
} from '@shopify/polaris';
import {useState, useCallback, useRef} from 'react';

function FrameExample() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [todos, setTodos] = useState([
        {id: 1, statusId: 1, text: "Learn about React"},
        {id: 2, statusId: 2, text: "Meet friend for lunch"},
        {id: 3, statusId: 2, text: "Build really cool todo app"}
    ]);

    const setStatus = index => {
        const newTodos = [...todos];
        newTodos[index].statusId = 1;
        setTodos(newTodos);
    }

    const deleteTodo = id => {
        const newTodos = [...todos]
        setTodos(newTodos.filter(todo => {
            return todo.id !== id
        }))
    }

    const bulkDelete = e => {

    }

    const bulkComplete = e => {

    }

    const promotedBulkActions = [
        {
            content: 'Complete',
            onAction: () => console.log('Todo: implement bulk add tags'),
        },
        {
            content: 'Delete',
            onAction: () => console.log('Todo: implement bulk remove tags'),
        }
    ];

    const statusData = [
        {id: 1, label: 'Done', className: 'success'},
        {id: 2, label: 'Pending', className: 'complete'}
    ]

    const pageContent = (
        <Page
            title="Todoes"
            primaryAction={
                <Button primary>
                    Create todo
                </Button>
            }
        >
            <Card>
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

                        return (
                            <ResourceItem id={id}>
                                <Layout>
                                    <Layout.Section oneHalf>
                                        {text}
                                    </Layout.Section>
                                    <Layout.Section oneThird>
                                        <span className="right-item">
                                            <Badge size="small" status={status[0].className}>{status[0].label}</Badge>
                                            <Button onClick={() => setStatus(index)}>Complete</Button>
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
                </Frame>
            </AppProvider>
        </div>
    );
}


export default FrameExample;