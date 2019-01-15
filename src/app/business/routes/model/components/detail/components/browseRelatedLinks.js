import React from 'react';
import PropTypes from 'prop-types';

import {
    BrowseRelatedLink,
    BrowseRelatedLinksWrapper,
} from '../../../../../common/components/detail/components/browseRelatedLinks';

const BrowseRelatedLinks = ({item}) => {
    const algoFilter = `algo:name:${item.algo.name}`;
    const challengeFilter = `challenge:key:${item.challenge.hash}`;

    return (
        <BrowseRelatedLinksWrapper>
            <BrowseRelatedLink model="algo" label="algorithm" filter={algoFilter} />
            <BrowseRelatedLink model="challenge" label="challenge" filter={challengeFilter} />
            <BrowseRelatedLink model="dataset" label="dataset" filter={challengeFilter} />
        </BrowseRelatedLinksWrapper>
    );
};

BrowseRelatedLinks.propTypes = {
    item: PropTypes.shape(),
};

BrowseRelatedLinks.defaultProps = {
    item: {},
};

export default BrowseRelatedLinks;
