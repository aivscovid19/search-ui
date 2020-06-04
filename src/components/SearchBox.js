import React from 'react';
import { SearchBox as ElasticSearchBox } from '@elastic/react-search-ui';

const SearchBox = () => (
  <ElasticSearchBox
    autocompleteMinimumCharacters={3}
    autocompleteResults={{
      linkTarget: "_blank",
      sectionTitle: "Results",
      titleField: "title",
      urlField: "link",
    }}
    autocompleteSuggestions={true}
  />
);

export default SearchBox;
