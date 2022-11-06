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

function FrameExample() {
    const skipToContentRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
    const [appStatus, setAppStatus] = useState(false);

    const handleToggle = useCallback(() => setAppStatus((active) => !active), []);


    const handleSearchResultsDismiss = useCallback(() => {
        setSearchActive(false);
        setSearchValue('');
    }, []);
    const handleSearchFieldChange = useCallback((value) => {
        setSearchValue(value);
        setSearchActive(value.length > 0);
    }, []);

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

    const searchResultsMarkup = (
        <ActionList
            items={[{content: 'Avada'}, {content: 'Mageplaza'}]}
        />
    );

    const searchFieldMarkup = (
        <TopBar.SearchField
            onChange={handleSearchFieldChange}
            value={searchValue}
            placeholder="Search"
        />
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            searchResultsVisible={searchActive}
            searchField={searchFieldMarkup}
            searchResults={searchResultsMarkup}
            onSearchResultsDismiss={handleSearchResultsDismiss}
            onNavigationToggle={toggleMobileNavigationActive}
        />
    );

    const navigationMarkup = (
        <Navigation location="/">
            <Navigation.Section
                separator
                items={[
                    {
                        label: 'Home',
                        icon: HomeMajor,
                        onClick: toggleIsLoading,
                    },
                    {
                        label: 'Notification',
                        icon: NotificationMajor,
                        onClick: toggleIsLoading,
                    },
                    {
                        label: 'Setting',
                        icon: SettingsMajor,
                        onClick: toggleIsLoading,
                    },
                ]}
            />
        </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const skipToContentTarget = (
        <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
    );


    const contentStatus = appStatus ? 'Deactivate' : 'Activate';
    const textStatus = appStatus ? 'activated' : 'deactivated';

    const actualPageMarkup = (
        <Page title="Home" fullWidth>
            <Layout>
                {skipToContentTarget}
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

    const logo = {
        width: 200,
        topBarSource: "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999"
    };

    return (
        <div style={{height: '500px'}}>
            <AppProvider
                i18n={{
                    Polaris: {
                        Avatar: {
                            label: 'Avatar',
                            labelWithInitials: 'Avatar with initials {initials}',
                        },
                        TextField: {
                            characterCount: '{count} characters',
                        },
                        TopBar: {
                            toggleMenuLabel: 'Toggle menu',

                            SearchField: {
                                clearButtonLabel: 'Clear',
                                search: 'Search',
                            },
                        },
                        Modal: {
                            iFrameTitle: 'body markup',
                        },
                        Frame: {
                            skipToContent: 'Skip to content',
                            navigationLabel: 'Navigation',
                            Navigation: {
                                closeMobileNavigationLabel: 'Close navigation',
                            },
                        },
                    },
                }}
            >
                <Frame
                    logo={logo}
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


export default FrameExample;