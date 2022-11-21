import React from 'react';
import {ResourceItem} from "@shopify/polaris";
import moment from "moment";
import {NotificationPopup} from "../../components/NotificationPopup/NotificationPopup";

const NotificationItem = ({item = {}, page = 'notification', hideTimeAgo = false, truncateProductName = false}) => {
  const {id, city, productName, country, productImage, timestamp, firstName} = item;

  return (
    <ResourceItem
      id={id}
    >
      <div className={page + "-wrapper"}>
        <NotificationPopup
          firstName={firstName}
          country={country}
          city={city}
          productName={productName}
          productImage={productImage}
          timestamp={timestamp}
          settings={{
            hideTimeAgo: hideTimeAgo,
            truncateProductName: truncateProductName
          }}
        />
        <div className={page + "-additional"}>
          <div>{moment(timestamp).format('MMMM DD,')}</div>
          <span>{moment(timestamp).format('YYYY')}</span>
        </div>
      </div>
    </ResourceItem>
  )
};

export default NotificationItem;
