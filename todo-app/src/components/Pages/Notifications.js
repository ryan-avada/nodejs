import {
    Page,
    TextStyle,
    Layout,
    Card,
    ResourceList,
    Thumbnail,
    ResourceItem,
    Stack,
    Pagination, TextContainer, Icon
} from "@shopify/polaris";
import {useCallback, useState} from "react";
import {TickSmallMinor} from "@shopify/polaris-icons";

function Notifications() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

    return (
        <Page title={"Notifications"} subtitle={"List of sales notification from Shopify"} fullWidth>
            <Layout>
                <Layout.Section>
                    <Card>
                        <Card.Section fullWidth>
                            <ResourceList
                                resourceName={{singular: 'product', plural: 'products'}}
                                sortValue={sortValue}
                                sortOptions={[
                                    {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                                    {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
                                ]}
                                onSortChange={(selected) => {
                                    setSortValue(selected);
                                    console.log(`Sort option changed to ${selected}.`);
                                }}
                                items={[
                                    {
                                        id: 1,
                                        url: 'produdcts/sport-sneaker',
                                        name: 'Sport Sneaker',
                                        sku: 'sport-sneaker',
                                        media: (
                                            <Thumbnail
                                                source="https://cdn-amz.woka.io/images/I/71HbJeSpJRL.jpg"
                                                alt="Sport sneaker"
                                            />
                                        ),
                                        purchase_qty: "1",
                                        purchase_location: "New York, United States",
                                        purchase_date: '2022/11/07 00:00:00'
                                    },
                                    {
                                        id: 2,
                                        url: 'produdcts/sport-sneaker',
                                        name: 'Sport Sneaker',
                                        sku: 'sport-sneaker',
                                        media: (
                                            <Thumbnail
                                                source="https://cdn-amz.woka.io/images/I/71HbJeSpJRL.jpg"
                                                alt="Sport sneaker"
                                            />
                                        ),
                                        purchase_qty: "1",
                                        purchase_location: "New York, United States",
                                        purchase_date: '2022/11/06 00:00:00'
                                    },
                                    {
                                        id: 3,
                                        url: 'produdcts/sport-sneaker',
                                        name: 'Sport Sneaker',
                                        sku: 'sport-sneaker',
                                        media: (
                                            <Thumbnail
                                                source="https://cdn-amz.woka.io/images/I/71HbJeSpJRL.jpg"
                                                alt="Sport sneaker"
                                            />
                                        ),
                                        purchase_qty: "1",
                                        purchase_location: "New York, United States",
                                        purchase_date: '2022/11/06 00:00:00'
                                    },
                                ]}
                                selectedItems={selectedItems}
                                onSelectionChange={setSelectedItems}
                                selectable
                                renderItem={(item) => {
                                    const {
                                        id,
                                        url,
                                        name,
                                        sku,
                                        media,
                                        purchase_qty,
                                        purchase_location,
                                        purchase_date
                                    } = item;

                                    return (
                                        <Stack alignment={"center"}>
                                            <Stack.Item fill>
                                                <ResourceItem
                                                    id={id}
                                                    url={url}
                                                    media={media}
                                                    accessibilityLabel={`View details for ${name}`}
                                                    name={name}
                                                >
                                                    <p className="noti-item">
                                                        <TextStyle variation={"subdued"}>Someone
                                                            in {purchase_location}</TextStyle>
                                                        <h3>
                                                            <TextStyle variation="strong">Purchased {name}</TextStyle>
                                                        </h3>
                                                        <p className="noti-info">
                                                            <TextStyle variation={"subdued"}>a day ago </TextStyle>
                                                            <p className="noti-author">
                                                                <Icon
                                                                    source={TickSmallMinor}
                                                                    color="base"
                                                                />
                                                                <TextStyle variation="positive">by Avada</TextStyle>
                                                            </p>
                                                        </p>
                                                    </p>
                                                </ResourceItem>
                                            </Stack.Item>
                                            <TextContainer spacing='tight'>
                                                <p className="noti-time">
                                                    <TextStyle variation={"subdued"}>From March 8,</TextStyle>
                                                </p>
                                                <p align="right" className="noti-time">
                                                    <TextStyle variation={"subdued"}>2021</TextStyle>
                                                </p>
                                            </TextContainer>
                                        </Stack>
                                    );
                                }}
                            />
                        </Card.Section>
                    </Card>
                    <p className="noti-navigation">
                        <Pagination
                            hasPrevious
                            onPrevious={() => {
                                console.log('Previous');
                            }}
                            hasNext
                            onNext={() => {
                                console.log('Next');
                            }}
                        />
                    </p>
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default Notifications;