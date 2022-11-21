import React, {useCallback, useEffect, useState} from 'react';
import {CalloutCard, FooterHelp, Layout, Link, Page, SettingToggle, TextStyle} from '@shopify/polaris';
import api from '../../helpers/helpers';
import Footer from "../Footer/Footer";
import {STATUS_ACTIVATED, STATUS_DEACTIVATED} from "../../const/const";

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [active, setActive] = useState(false);

  const handleToggle = () => setActive((active) => !active);

  const statusButton = active ? STATUS_DEACTIVATED : STATUS_ACTIVATED;
  const statusText = active ? STATUS_ACTIVATED : STATUS_DEACTIVATED;
  return (
    <Page
      title="Home"
      fullWidth
    >
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: statusButton.toUpperCase(),
              onAction: handleToggle,
            }}
            enabled={active}
          >
            This setting is{' '}
            <TextStyle variation="strong">{statusText}</TextStyle>
            .
          </SettingToggle>
        </Layout.Section>
        <Footer />
      </Layout>
    </Page>
  );
}
