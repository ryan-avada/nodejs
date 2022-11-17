import React from 'react';
import {Button, Icon, ResourceItem, TextStyle, Thumbnail} from "@shopify/polaris";
import {TickSmallMinor} from "@shopify/polaris-icons";
import {formatDateOnly} from "@avada/functions/src/helpers/formatFullTime";

const NotificationItem = ({item, page = 'notification', hideTimeAgo = false}) => {
  const {id, city, productName, country, productImage, timestamp, firstName} = item;
  const buyDate = new Date(timestamp);
  let calDay = Math.floor((new Date().getTime() - buyDate.getTime()) / (1000 * 3600 * 24));
  calDay = calDay === 1 ? "a" : calDay;

  const formatBuyDate = formatDateOnly(timestamp);
  const dm = formatBuyDate.slice(0, formatBuyDate.indexOf(",") + 1);
  const y = formatBuyDate.slice(formatBuyDate.indexOf(",") + 1, formatBuyDate.length);

  return (
    <ResourceItem
      id={id}
      accessibilityLabel={`View details for ${productName}`}
    >
      <div className={page+"-wrapper"}>
        <div className={page+"-item"}>
          <div className="image">
            <Thumbnail source={productImage} alt={productName}/>
          </div>
          <div className="content">
            <div>{firstName} in {city}, {country}</div>
            <TextStyle variation="strong">{productName}</TextStyle>
            <div className='bottom'>
              {!hideTimeAgo ? (
                <span className="buy-time">{calDay} day ago</span>
              ) : ""}

              <span className="author">
                  <Icon
                    source={TickSmallMinor}
                    color="highlight"
                  />
                  by AVADA</span>
            </div>
          </div>
          <div className="button">
            <Button plain onClick={() => {
              alert('remove item '+id)
            }}></Button>
          </div>
        </div>
        <div className={page+"-additional"}>
          <div>{dm}</div>
          <span>{y}</span>
        </div>
      </div>
    </ResourceItem>
  )
};

export default NotificationItem;
