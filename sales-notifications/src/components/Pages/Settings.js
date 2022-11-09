import {
    Page,
    SettingToggle,
    TextStyle,
    Layout,
    Card,
    ResourceList,
    Thumbnail,
    Stack,
    ResourceItem, Tabs
} from "@shopify/polaris";
import {useCallback, useState} from "react";
import Display from './Settings/Display';
import Triggers from "./Settings/Triggers";

function Settings () {
    const [selected, setSelected] = useState(0);
    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'display',
            content: 'Display',
            tab_content: (<Display />),
            accessibilityLabel: 'Display',
            panelID: 'display',
        },
        {
            id: 'triggers',
            content: 'Triggers',
            tab_content: (<Triggers />),
            panelID: 'triggers',
        }
    ];

    return (
        <Page
            fullWidth
            title="Settings"
            subtitle={"Decide how your notifications will display"}
            primaryAction={{content: 'Save'}}
        >
            <Layout>
                <Layout.Section oneThird>
                    <Card>
                        <Card.Section>
                            <ResourceList
                                resourceName={{ singular: "product", plural: "products" }}
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
                                ]}
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
                                                    <TextStyle variation={"subdued"}>Someone
                                                        in {purchase_location}</TextStyle>
                                                    <h3>
                                                        <TextStyle variation="strong">Purchased {name}</TextStyle>
                                                    </h3>
                                                    <TextStyle variation={"subdued"}>a day ago </TextStyle>
                                                    <TextStyle variation={"positive"}>by Avada</TextStyle>
                                                </ResourceItem>
                                            </Stack.Item>
                                        </Stack>
                                    );
                                }}
                            />
                        </Card.Section>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card>
                        <Card.Section>
                            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                                <Card.Section>
                                    <p>{tabs[selected].tab_content}</p>
                                </Card.Section>
                            </Tabs>
                        </Card.Section>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default Settings;