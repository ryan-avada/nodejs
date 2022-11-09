import {Page, Select, TextContainer, TextField} from "@shopify/polaris";
import {useCallback, useState} from "react";

function Triggers() {
    const [pageRestriction, setPageRestriction] = useState('today');
    const [excludedPage, setExcludedPage] = useState('');
    const [includedPage, setIncludedPage] = useState('');

    const handleSelectChange = useCallback((value) => setPageRestriction(value), []);
    const handleExcludedPage = useCallback((value) => setExcludedPage(value), []);
    const handleIncludedPage = useCallback((value) => setIncludedPage(value), []);

    const options = [
        {label: 'All pages', value: '1'},
        {label: 'Specific pages', value: '2'},
    ];

    const includePages = (
        <TextField
            label="Included pages"
            helpText="Page URLs to show the pop-up (separated by new lines)"
            value={includedPage}
            onChange={handleIncludedPage}
            multiline={3}
            autoComplete="off"
        />
    );
    return (
        <Page fullWidth>
            <TextContainer spacing='loose'>
                <Select
                    label="PAGE RESTRICTION"
                    options={options}
                    onChange={handleSelectChange}
                    value={pageRestriction}
                />
                {pageRestriction === '2' && includePages}
                <TextField
                    label="Excluded pages"
                    helpText="Page URLs NOT to show the pop-up (separated by new lines)"
                    value={excludedPage}
                    onChange={handleExcludedPage}
                    multiline={3}
                    autoComplete="off"
                />
            </TextContainer>
        </Page>
    );
}

export default Triggers;