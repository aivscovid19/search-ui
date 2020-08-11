import React, { useState } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import QUESTIONS from '../../questionSuggestions.json';

const SearchBox = ({ initialValue, onSearch }) => {
  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState('');
  return (
    <form onSubmit={onSearch(value)}>
    <Autocomplete
      freeSolo
      fullWidth
      placeholder="search"
      variant="outlined"
      size="small"
      options={QUESTIONS}
      value={value}
      inputValue={inputValue}
      onChange={(e) => {setValue(e.target.value);}}
      renderInput={params => (
        <TextField {...params} placeholder="search" variant="outlined" />
      )}
      />
      </form>
  );
};

export default SearchBox;
