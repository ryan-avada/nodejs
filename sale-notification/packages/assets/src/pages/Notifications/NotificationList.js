import React, {useState} from 'react';
import {ResourceList} from "@shopify/polaris";
import NotificationItem from "./NotificationItem";

const NotificationList = ({resourceName, items, selectItems, setSelectItems, selectable=true}) => {
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  return (
    <ResourceList
      resourceName={resourceName}
      items={items}
      renderItem={(item) => {
        return (
          <NotificationItem item={item} />
        )
      }}
      sortValue={sortValue}
      selectable={selectable}
      selectedItems={selectItems}
      onSelectionChange={setSelectItems}
      sortOptions={[
        {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
        {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
      ]}
      onSortChange={(selected) => {
        setSortValue(selected);
      }}
    />
  );
};

export default NotificationList;
