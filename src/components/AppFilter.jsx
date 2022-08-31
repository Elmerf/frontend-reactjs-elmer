import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography
} from '@mui/material';
import PropType from 'prop-types';

AppFilter.propType = {
  openFilter: PropType.func,
  priceFilter: PropType.func,
  onTextChanged: PropType.func,
  onClearButtonClicked: PropType.func,
  filterOpen: PropType.bool,
  filterPrice: PropType.number,
  searchQuery: PropType.string
};

export default function AppFilter({
  openFilter,
  priceFilter,
  onTextChanged,
  onClearButtonClicked,
  filterOpen,
  filterPrice,
  searchQuery
}) {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      borderTop={1}
      borderBottom={1}
      p={2}
      my={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="body1" component="span" mr={2}>
          Filter By:
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={openFilter}
              onChange={filterOpen}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Open Now"
        />
        <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
          <InputLabel id="price-label">Price</InputLabel>
          <Select
            labelId="price-label"
            id="price-label"
            value={priceFilter}
            onChange={filterPrice}
            label="Price">
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={-1}>Cheapest</MenuItem>
            <MenuItem value={1}>Expensive</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
          <InputLabel id="category-label">Categories</InputLabel>
          <Select
            labelId="category-label"
            id="category-label"
            value={searchQuery}
            onChange={onTextChanged}
            label="Categories">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Javanesse">Javanesse</MenuItem>
            <MenuItem value="Noodle Shop">Noodle Shop</MenuItem>
            <MenuItem value="Restaurant">Restaurant</MenuItem>
            <MenuItem value="Chinesse">Chinesse</MenuItem>
            <MenuItem value="Indonesian">Indonesian</MenuItem>
            <MenuItem value="Fast Food">Fast Food</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container item xs={12} md={4} justifyContent="flex-end">
        <Button variant="outlined" onClick={onClearButtonClicked}>
          Clear All
        </Button>
      </Grid>
    </Grid>
  );
}
