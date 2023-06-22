import React from 'react'
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const FilterOptions = ({
  filterTypes,
  selectedFilterType,
  options,
  selectedOption,
  onFilterTypeChange,
  onOptionChange,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
      <Typography variant="h6" sx={{ marginRight: 'auto' }}>
        Find Pokemons
      </Typography>

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Select Filter</InputLabel>
        <Select
          value={selectedFilterType}
          onChange={(event) => onFilterTypeChange(event.target.value)}
          label="Select Filter"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="random" onClick={() => onFilterTypeChange('random')}>
            <em>Random</em>
          </MenuItem>
          {filterTypes.map((filterType) => (
            <MenuItem key={filterType} value={filterType}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant='standard' sx={{ minWidth: 180 }} disabled={!options || options.length === 0}>
        {options && options.length > 0 ? (
          <Autocomplete
            disableClearable
            value={selectedOption || null}
            onChange={(event, newValue) => onOptionChange(newValue)}
            options={options}
            getOptionLabel={(option) => option.name || ""}
            isOptionEqualToValue={(option, value) => option.name === value?.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label={selectedOption ? "" : "Filter"}
                value={selectedOption?.name || ""}
              />
            )}
          />
        ) : (
          <TextField disabled label="Filter" />
        )}
      </FormControl>
    </Box>
  )
}

export default FilterOptions
