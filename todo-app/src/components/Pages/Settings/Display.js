import {
    Page,
    Card,
    TextContainer,
    Heading,
    TextStyle,
    Checkbox,
    Layout,
    ResourceList,
    Thumbnail, Stack, ResourceItem, Tabs, RangeSlider, Tag, SkeletonThumbnail
} from "@shopify/polaris";
import {useCallback, useState} from "react";

function Display() {
    const [hideTime, setHideTime] = useState(false);
    const [truncate, setTruncate] = useState(false);

    const [displayDuration, setDisplayDuration] = useState(0);
    const [gapTime, setGapTime] = useState(0);
    const [timeBeforeFirstPop, setTimeBeforeFirstPop] = useState(0);
    const [maxPops, setMaxPops] = useState(0);

    return (
        <Page fullWidth>
            <TextContainer spacing='tight'>
                <TextStyle variation="strong">APPEARANCE</TextStyle>
                <p>Desktop Position</p>
                <SkeletonThumbnail size="medium" />
                <Checkbox
                    label="Hide time ago"
                    checked={hideTime}
                    onChange={setHideTime}
                />
                <Checkbox
                    label="Truncate content text"
                    helpText="If your product name is long for one line, it will be truncated to 'Product na...'"
                    checked={truncate}
                    onChange={setTruncate}
                />
            </TextContainer>
            <TextContainer spacing='tight'>
                <TextStyle variation="strong">TIMING</TextStyle>
                <Layout>
                    <Layout.Section oneHalf>
                        <TextContainer spacing='loose'>
                            <RangeSlider
                                output
                                label="Display duration"
                                helpText="How long each pop will display on your page."
                                min={0}
                                max={120}
                                value={displayDuration}
                                onChange={setDisplayDuration}
                                suffix={(
                                    <Tag spacing="tight">{displayDuration} second(s)</Tag>
                                )}
                            />
                            <RangeSlider
                                output
                                label="Gap time between two pops"
                                helpText="The time interval between two popup notifications."
                                min={0}
                                max={120}
                                value={gapTime}
                                onChange={setGapTime}
                                suffix={(
                                    <Tag spacing="tight">{gapTime} second(s)</Tag>
                                )}
                            />
                        </TextContainer>
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <TextContainer spacing='loose'>
                            <RangeSlider
                                output
                                label="Time before the first pop"
                                helpText="The delay time before the first notification."
                                min={0}
                                max={120}
                                value={timeBeforeFirstPop}
                                onChange={setTimeBeforeFirstPop}
                                suffix={(
                                    <Tag spacing="tight">{timeBeforeFirstPop} second(s)</Tag>
                                )}
                            />
                            <RangeSlider
                                output
                                label="Maximum of popups"
                                helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80."
                                min={0}
                                max={80}
                                value={maxPops}
                                onChange={setMaxPops}
                                suffix={(
                                    <Tag spacing="tight">{maxPops} second(s)</Tag>
                                )}
                            />
                        </TextContainer>
                    </Layout.Section>
                </Layout>
            </TextContainer>
        </Page>
    );
}

export default Display;