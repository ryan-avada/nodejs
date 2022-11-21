import React from 'react';
import {FormLayout, Select, TextField, Card} from "@shopify/polaris";
import {
  OPTION_ALL_PAGES,
  OPTION_ALL_PAGES_LABEL,
  OPTION_SPECIFIC_PAGE,
  OPTION_SPECIFIC_PAGE_LABEL
} from "../../const/const";

const Triggers = ({data, setData}) => {
  const options = [
    {label: OPTION_ALL_PAGES_LABEL, value: OPTION_ALL_PAGES},
    {label: OPTION_SPECIFIC_PAGE_LABEL, value: OPTION_SPECIFIC_PAGE}
  ];

  return (
    <Card.Section>
      <FormLayout>
        <Select
          options={options}
          value={data.allowShow}
          onChange={(value) => setData('allowShow', value)}
        />
        {data.allowShow === OPTION_SPECIFIC_PAGE
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
