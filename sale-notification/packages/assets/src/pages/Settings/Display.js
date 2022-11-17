import React, {useState} from 'react';
import DesktopPositionInput from "../../components/DesktopPositionInput/DesktopPositionInput";
import {Card, Checkbox, FormLayout, RangeSlider, Layout} from "@shopify/polaris";

const Display = ({data, setData}) => {
  const suffixStyles = {
    width: '110px',
    padding: '7px',
    backgroundColor: 'white',
    border: '1px solid var(--p-override-transparent, #c4cdd5)',
    textAlign: 'center'
  };

  const suffixNumberStyles = {
    fontWeight: 'bold'
  };

  return (
    <FormLayout>
      <DesktopPositionInput
        label="Desktop Position"
        helpText="The display position of the pop on your website."
        onChange={(value) => setData('position', value)}
        value={data.position}
      />
      <Checkbox
        label="Hide time ago"
        checked={data.hideTimeAgo}
        onChange={(value) => setData('hideTimeAgo', value)}
      />
      <Checkbox
        label="Truncate content text"
        helpText="If your product name is long for one line, it will be truncated to 'Product na...'"
        checked={data.truncateProductName}
        onChange={(value) => setData('truncateProductName', value)}
      />
      <Card.Section title="Timing">
        <Layout>
          <Layout.Section oneHalf>
            <RangeSlider
              label="Display duration"
              helpText="How long each pop will display on your page."
              value={data.displayDuration}
              onChange={(value) => setData('displayDuration', value)}
              output
              min={0}
              max={60}
              suffix={<div style={suffixStyles}><span style={suffixNumberStyles}>{data.displayDuration}</span> second(s)
              </div>}
            />
            <br/>
            <RangeSlider
              label="Gap time between two popup notifications"
              helpText="The time interval between two popup notifications."
              value={data.popsInterval}
              onChange={(value) => setData('popsInterval', value)}
              output
              min={0}
              max={60}
              suffix={<div style={suffixStyles}><span style={suffixNumberStyles}>{data.popsInterval}</span> second(s)
              </div>}
            />
          </Layout.Section>
          <Layout.Section oneHalf>
            <RangeSlider
              label="Time before the first pop"
              helpText="The delay time before the first notification."
              value={data.firstDelay}
              onChange={(value) => setData('firstDelay', value)}
              output
              min={0}
              max={60}
              suffix={<div style={suffixStyles}><span
                style={suffixNumberStyles}>{data.firstDelay}</span> second(s)
              </div>}
            />
            <br/>
            <RangeSlider
              label="Maximum of popups"
              helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80"
              value={data.maxPopsDisplay}
              onChange={(value) => setData('maxPopsDisplay', value)}
              output
              min={0}
              max={80}
              suffix={<div style={suffixStyles}><span style={suffixNumberStyles}>{data.maxPopsDisplay}</span> pop(s)
              </div>}
            />
          </Layout.Section>
        </Layout>
      </Card.Section>

    </FormLayout>
  );
};

export default Display;
