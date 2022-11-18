import React, {useCallback, useState} from 'react';
import {Button, Frame, Page, Toast} from "@shopify/polaris";

const SettingToast = ({message, active, handleToast}) => {
  const toastMarkup = active ? (
    <Toast content={message} onDismiss={handleToast} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
};

export default SettingToast;
