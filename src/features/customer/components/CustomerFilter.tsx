import { Box, Button, Grid, makeStyles, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import * as React from 'react';

export interface CustomerFilterProps {
  cityList: City[];
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

export function CustomerFilter ({ cityList, filter, onChange, onSearchChange }: CustomerFilterProps) {
  const classes = useStyles();
  const searchRef = React.useRef<HTMLInputElement>();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!onSearchChange) return
    const newFilter = {
      ...filter,
      name_like: e.target.value || undefined,
      _page: 1
    }
    onSearchChange(newFilter)
  }
  const handleFilterChange = (e: React.ChangeEvent<{name?: string, value: unknown}>) => {
    if(!onChange) return
    const newFilter = {
      ...filter,
      cityId: e.target.value || undefined,
      _page: 1
    }
    onChange(newFilter);
  }
  const handleSortChange = (e: React.ChangeEvent<{name?: string, value: unknown}>) => {
    if(!onChange) return
    const value = e.target.value
    const [_sort, _order] = (value as string).split('.')
    const newFilter = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    }
    onChange(newFilter);
  }
  const handleClearFilter = () => {
    if(!onChange) return
    const newFilter = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      name_like: undefined,
      name: undefined,
    }
    onChange(newFilter);

    if(searchRef.current) {
      searchRef.current.value = ''
    }
  }
  return (
    <Box>
      <Grid container spacing={3}>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="searchByName"
              endAdornment={<Search/>}
              onChange={handleSearchChange}
              defaultValue={filter.name_like || ''}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth variant="outlined" size="small" >
            <InputLabel id="filterByCity">Filter by City</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.cityId || ''}
              onChange={handleFilterChange}
              label="Filter by Account"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map(city => (
                <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth variant="outlined" size="small" >
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sort"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="age.asc">Age ASC</MenuItem>
              <MenuItem value="age.desc">Age DESC</MenuItem>
              <MenuItem value="memberScore.asc">Score ASC</MenuItem>
              <MenuItem value="memberScore.desc">Score DESC</MenuItem>
              
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Button variant="outlined" color="primary" onClick={handleClearFilter}>Clear all</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
