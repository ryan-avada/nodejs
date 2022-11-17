import React, {useEffect, useState} from 'react';
import {
  Layout,
  Page,
} from '@shopify/polaris';
import NotificationList from "./NotificationList";
import Footer from "../Footer/Footer";
import useFetchApi from "../../hooks/api/useFetchApi";
import SettingsLoading from "../../components/SettingsLoading";

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [selectItems, setSelectItems] = useState([]);

  const {data: items, setData, loading, setLoading} = useFetchApi('/notifications')

  const resourceName = {
    singular: 'notification',
    plural: 'notifications',
  };

  return (
    loading ? (
      <SettingsLoading/>
    ) : (
      <Page
        title="Notifications"
        subtitle="List of sales notification from Shopify"
      >
        <Layout>
          <Layout.Section>
            <NotificationList resourceName={resourceName}
                              items={items}
                              selectItems={selectItems}
                              setSelectItems={setSelectItems}/>
          </Layout.Section>
          <Footer/>
        </Layout>
      </Page>
    ));
}
