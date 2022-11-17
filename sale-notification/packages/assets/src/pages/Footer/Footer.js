import React from 'react';
import {FooterHelp, Layout, Link} from "@shopify/polaris";

const Footer = () => {
  return (
    <Layout.Section>
      <FooterHelp>
        Learn more about{' '}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          fulfilling orders
        </Link>
      </FooterHelp>
    </Layout.Section>
  );
};

export default Footer;
