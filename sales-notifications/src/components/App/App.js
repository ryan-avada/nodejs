import {
    ActionList,
    AppProvider,
    Card,
    ContextualSaveBar,
    FormLayout,
    Frame,
    Layout,
    Loading,
    Modal,
    Navigation,
    Page, SettingToggle,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    TextContainer,
    TextField, TextStyle,
    Toast,
    TopBar,
} from '@shopify/polaris';
import {
    HomeMajor,
    NotificationMajor,
    SettingsMajor
} from '@shopify/polaris-icons';
import {useState, useCallback, useRef} from 'react';
import React from "react";
import Routes from "../Routes/Routes";

function App() {
    const skipToContentRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

    const toggleMobileNavigationActive = useCallback(
        () =>
            setMobileNavigationActive(
                (mobileNavigationActive) => !mobileNavigationActive,
            ),
        [],
    );
    const toggleIsLoading = useCallback(
        () => setIsLoading((isLoading) => !isLoading),
        [],
    );

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions=""
            name="Avada"
            detail=""
            initials="A"
            open=""
            onToggle=""/>
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            onNavigationToggle={toggleMobileNavigationActive}
        />
    );

    const navigationMarkup = (
        <Navigation location="/">
            <Navigation.Section
                separator
                items={[
                    {
                        url: '/home',
                        label: 'Home',
                        icon: HomeMajor,
                        onClick: toggleIsLoading,
                    },
                    {
                        url: '/notifications',
                        label: 'Notifications',
                        icon: NotificationMajor,
                        onClick: toggleIsLoading,
                    },
                    {
                        url: '/settings',
                        label: 'Settings',
                        icon: SettingsMajor,
                        onClick: toggleIsLoading,
                    },
                ]}
            />
        </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
        <Routes />
    );

    const loadingPageMarkup = (
        <SkeletonPage>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <TextContainer>
                            <SkeletonDisplayText size="small" />
                            <SkeletonBodyText lines={9} />
                        </TextContainer>
                    </Card>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
    );

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

    const themeConfig ={
        logo: {
            width: 100,
            topBarSource: "https://cdn1.avada.io/media/site/avada_logo_final_color.svg"
        },
        colors: {
            topBar: {
                'background': '#fff'
            }
        },
    }

    return (
        <div>
            <AppProvider theme={themeConfig} i18n="">
                <Frame
                    topBar={topBarMarkup}
                    navigation={navigationMarkup}
                    showMobileNavigation={mobileNavigationActive}
                    onNavigationDismiss={toggleMobileNavigationActive}
                    skipToContentTarget={skipToContentRef.current}
                >
                    {loadingMarkup}
                    {pageMarkup}
                </Frame>
            </AppProvider>
        </div>
    );
}


export default App;