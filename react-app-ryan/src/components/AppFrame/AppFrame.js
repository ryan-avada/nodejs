// AppFrame.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Frame, Navigation, AppProvider } from "@shopify/polaris";
import Routes from "../Routes/Routes";
import {
    HomeMajor,
    NotificationMajor,
    SettingsMajor
} from '@shopify/polaris-icons';

function AppFrame() {
    const location = useLocation();
    const navigationMarkup = (
        <Navigation location={location.pathname}>
            <Navigation.Section
                separator
                items={[
                    {
                        url: "/home",
                        label: 'Home',
                        icon: HomeMajor,
                    },
                    {
                        url: "/products",
                        label: 'Notification',
                        icon: NotificationMajor,
                    },
                    {
                        url: "/settings",
                        label: 'Setting',
                        icon: SettingsMajor,
                    },
                ]}
            />
        </Navigation>
    );
    return (
        <div style={{height: '500px'}}>
            <AppProvider>
                <Frame
                    topBar=""
                    navigation={navigationMarkup}
                >
                    {/*<Routes />*/}
                </Frame>
            </AppProvider>
        </div>
    );
}

export default AppFrame;