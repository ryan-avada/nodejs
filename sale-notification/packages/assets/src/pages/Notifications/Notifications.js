import React, {useEffect, useState} from 'react';
import {Avatar, CalloutCard, FooterHelp, Layout, Link, Page, ResourceItem, ResourceList} from '@shopify/polaris';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };
  const items = [
    {
      id: 106,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 206,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ];

  const renderItem = (item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <span>{name}</span>
        <div>{location}</div>
      </ResourceItem>
    )
  }

  return (
    <Page
      title="Notifications"
      subtitle="List of sales notification from Shopify"
      primaryAction={{
        content: 'Noti',
        url: '/notifications'
      }}
    >
      <Layout>
        <Layout.Section>
          <ResourceList
            resourceName={resourceName}
            items={items}
            renderItem={renderItem}
            sortValue={sortValue}
            selectable
            sortOptions={[
              {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
              {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
            ]}
            onSortChange={(selected) => {
              setSortValue(selected);
              console.log(`Sort option changed to ${selected}.`);
            }}
          />
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
