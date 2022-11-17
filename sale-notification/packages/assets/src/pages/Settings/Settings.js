import React, {useCallback, useEffect, useState} from 'react';
import {
  Layout,
  Page,
  Card,
  Tabs,
} from '@shopify/polaris';
import NotificationItem from "../Notifications/NotificationItem";
import Footer from "../Footer/Footer";
import Triggers from "./Triggers";
import Display from "./Display";
import useFetchApi from "../../hooks/api/useFetchApi";
import SettingsLoading from "../../components/SettingsLoading";
import {api} from "../../helpers";

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);

  const defaultSettings = {
    position: 'top-left',
    hideTimeAgo: false,
    truncateProductName: true,
    displayDuration: 5,
    popsInterval: 2,
    firstDelay: 10,
    maxPopsDisplay: 20,
    allowShow: 'all',
    includedUrls: '',
    excludedUrls: ''
  };

  const {data, setData, loading, setLoading} = useFetchApi('/settings', defaultSettings);

  const handleChangeFormData = (key, value) => {
    setData(prevData => {
      return {
        ...prevData,
        [key]: value
      }
    })
  }

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const items = {
    id: 1,
    firstName: 'Ryan',
    city: 'Ha Noi',
    productName: 'Sport Sneaker Sport Sneaker Sport Sneaker Sport Sneaker Sport Sneaker',
    country: 'Viet Nam',
    productId: 1,
    productImage: 'http://img.websosanh.vn/v2/users/root_product/images/giay-golf-nu-heal-creek/50xlf78whwjvl.jpg',
    timestamp: '2022-11-15 13:10:11'
  };

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      accessibilityLabel: 'Appearance',
      panelID: 'display',
      component: <Display
        data={data}
        setData={handleChangeFormData}
      />
    },
    {
      id: 'triggers',
      content: 'Triggers',
      accessibilityLabel: 'Page Restriction',
      panelID: 'triggers',
      component: <Triggers
        data={data}
        setData={handleChangeFormData}
      />
    }
  ];

  async function handleSaveAction(){
    try {
      setLoading(true);
      const updateSettings = await api('/settings', 'PUT', data);
      console.log(updateSettings)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }

  }

  return (
    loading ? (
      <SettingsLoading/>
    ) : (
      <Page
        title="Settings"
        fullWidth
        primaryAction={{
          content: 'Save',
          onAction() {
            handleSaveAction()
          }
        }}
      >
        <Layout>
          <Layout.Section oneThird>
            <NotificationItem item={items} page="setting" hideTimeAgo={data.hideTimeAgo}/>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <Card.Section title={tabs[selected].accessibilityLabel}>
                  {tabs[selected].component}
                </Card.Section>
              </Tabs>
            </Card>
          </Layout.Section>
          <Footer/>
        </Layout>
      </Page>
    ));
}
