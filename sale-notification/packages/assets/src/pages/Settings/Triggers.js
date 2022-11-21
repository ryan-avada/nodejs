import React from 'react';
import {FormLayout, Select, TextField, Card} from "@shopify/polaris";

const Triggers = ({data, setData}) => {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];

  return (
    <Card.Section>
      <FormLayout>
        <Select
          options={options}
          value={data.allowShow}
          onChange={(value) => setData('allowShow', value)}
        />
        {data.allowShow === 'specific'
          ? (
            <TextField
              label="Included pages"
              helpText="Page URLs to show the pop-up (separated by new lines)"
              value={data.includedUrls}
              onChange={(value) => setData('includedUrls', value)}
              multiline={4}
              autoComplete="off"
            />
          )
          : ""}
        <TextField
          label="Excluded pages"
          helpText="Page URLs NOT to show the pop-up (separated by new lines)"
          value={data.excludedUrls}
          onChange={(value) => setData('excludedUrls', value)}
          multiline={4}
          autoComplete="off"
        />
      </FormLayout>
    </Card.Section>

  );
};

export default Triggers;
