import React, {useCallback, useState} from 'react';
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
import {api} from "../../helpers/helpers";
import defaultSettings from "../../../../functions/src/default/defaultSettings";
import {store} from "../../index";
import {setToast} from "../../actions/layout/setToastAction";
import {
  TAB_DISPLAY_ID,
  TAB_DISPLAY_LABEL,
  TAB_TRIGGERS_ID,
  TAB_TRIGGERS_LABEL
} from "../../const/const";

/**
 * Render a setting for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false)
  const {data, setData, loading, handleChangeInput: handleChangeFormData} = useFetchApi('/settings', defaultSettings);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: TAB_DISPLAY_ID,
      content: TAB_DISPLAY_LABEL,
      component: <Display
        data={data}
        setData={handleChangeFormData}
      />
    },
    {
      id: TAB_TRIGGERS_ID,
      content: TAB_TRIGGERS_LABEL,
      component: <Triggers
        data={data}
        setData={handleChangeFormData}
      />
    }
  ];

  async function handleSaveAction() {
    try {
      setLoadingButton(true);
      await api('/settings', 'PUT', data);
      store.dispatch(setToast({
        content: "Setting saved successfully"
      }))
    } catch (e) {
      console.log(e)
    } finally {
      setLoadingButton(false);
    }
  }

  if (loading) return <SettingsLoading/>

  return (
    <Page
      title="Settings"
      fullWidth
      primaryAction={{
        content: 'Save',
        loading: !!loadingButton,
        onAction() {
          handleSaveAction()
        }
      }}
    >
      <Layout>
        <Layout.Section secondary>
          <NotificationItem
            page="setting"
            hideTimeAgo={data.hideTimeAgo}
            truncateProductName={data.truncateProductName}
          />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              {tabs[selected].component}
            </Tabs>
          </Card>
        </Layout.Section>
        <Footer/>
      </Layout>
    </Page>
  )
}
