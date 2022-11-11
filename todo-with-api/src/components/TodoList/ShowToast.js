import React from 'react';
import {Toast} from "@shopify/polaris";

const ShowToast = ({message = null, handleToast = null}) => {
    return (
        <Toast content={message} onDismiss={handleToast} />
    );
};


export default ShowToast;