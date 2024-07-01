import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputBaseProps {
  onSearch: (searchTerm: string) => void;
  placehoder: string
}

interface FormValues {
  searchTerm: string;
}

const SearchInputBase: React.FC<SearchInputBaseProps> = ({ onSearch, placehoder }) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onSearch(data.searchTerm);
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placehoder}
        inputProps={{ 'aria-label': 'search products' }}
        {...register('searchTerm')}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
};

export default SearchInputBase;
