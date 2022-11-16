import React, {useCallback, useEffect, useState} from 'react';
import {CalloutCard, FooterHelp, Layout, Link, Page, SettingToggle, TextStyle} from '@shopify/polaris';
import api from '../../helpers';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Deactivate' : 'Activate';
  const textStatus = active ? 'activated' : 'deactivated';
  return (
    <Page
      title="Home"
      fullWidth
    >
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: contentStatus,
              onAction: handleToggle,
            }}
            enabled={active}
          >
            This setting is{' '}
            <TextStyle variation="strong">{textStatus}</TextStyle>
            .
          </SettingToggle>
        </Layout.Section>
        <Layout.Section>
          <FooterHelp>
            Learn more about{' '}
            <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
              fulfilling orders
            </Link>
          </FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
