import {Page, SettingToggle, TextStyle, Layout} from "@shopify/polaris";
import {useCallback, useState} from "react";

function HomePage () {
    const [appStatus, setAppStatus] = useState(false);

    const handleToggle = useCallback(() => setAppStatus((active) => !active), []);

    const contentStatus = appStatus ? 'Deactivate' : 'Activate';
    const textStatus = appStatus ? 'activated' : 'deactivated';

    return (
        <Page title="Home" fullWidth>
            <Layout>
                <Layout.Section>
                    <SettingToggle
                        action={{
                            content: contentStatus,
                            onAction: handleToggle,
                        }}
                        enabled={appStatus}
                    >
                        App status is <TextStyle variation="strong">{textStatus}</TextStyle>.
                    </SettingToggle>
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default HomePage;