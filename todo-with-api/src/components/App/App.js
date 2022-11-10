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

    const {data: products, loading} = useFetchApi({url: 'http://localhost:5000/api/products'});

    const statusData = [
        {id: 1, label: 'Active', className: 'success'},
        {id: 2, label: 'InActive', className: 'complete'}
    ]

    const handleCreateModel = () => {
        setCreateModel(prev => !prev);
    }

    const promotedBulkActions = [
        {
            content: 'Active',
            onAction: ""
        },
        {
            content: 'Delete',
            onAction: "",
        }
    ];

    async function ActiveOne(id) {
        try {
            setIsLoading(true)
            await fetch('http://localhost:5000/api/products/' + id, {
                method: 'PUT',
                body: JSON.stringify({
                    status: 1
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

    const createButton = (
        <Button primary onClick={handleCreateModel}>
            Create todo
        </Button>
    );

    const pageContent = (
        <Page
            title="Products"
            primaryAction={createButton}
        >
            <Card>
                {(loading || isLoading) ? (
                    <p style={{textAlign: "center", padding: "2%"}}>
                        <Spinner accessibilityLabel="Spinner example" size="large"/>
                    </p>
                ) : (
                    <ResourceList
                        resourceName={{singular: 'product', plural: 'products'}}
                        items={products}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        selectable
                        promotedBulkActions={promotedBulkActions}
                        renderItem={(item, renderId, index) => {
                            const {id, name, price, status: sttId, description, product, color, image, createAt} = item;
                            const statusRes = statusData.filter(status => {
                                return status.id === sttId;
                            });
                            return (
                                <ResourceItem
                                    id={id}
                                    media={(
                                        <Thumbnail
                                            source={image}
                                            alt={name}
                                        />
                                    )}
                                >
                                    <Layout>
                                        <Layout.Section oneHalf>
                                            <h1 style={{'font-weight': 'bold',"margin-bottom":"1%"}}>{name}</h1>
                                            <div>
                                                <span style={{'font-weight': 'bold'}}>Price: </span>
                                                {price}
                                            </div>
                                            <div>
                                                <span style={{'font-weight': 'bold'}}>Color: </span>
                                                {product}
                                            </div>
                                            <div>
                                                <span style={{'font-weight': 'bold'}}>Description: </span>
                                                {description}
                                            </div>
                                        </Layout.Section>
                                        <Layout.Section oneThird>
                                        <span className="right-item">
                                            <Badge status={statusRes[0].className}>{statusRes[0].label}</Badge>
                                            <Button onClick={() => ActiveOne(id)}>Active</Button>
                                            <Button destructive onClick={() => alert('231312')}>Delete</Button>
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
