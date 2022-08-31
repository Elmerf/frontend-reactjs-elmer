/* eslint-disable no-unused-vars */
import { Container } from '@mui/system';
import { useState } from 'react';
import AppFilter from './components/AppFilter';
import AppHeader from './components/AppHeader';
import AppModal from './components/AppModal';
import Restaurantslist from './components/RestaurantsList';

export default function App() {
  let [priceFilter, setPriceFilter] = useState(0);
  let [openFilter, setOpenFilter] = useState(false);
  let [searchQuery, setSearchQuery] = useState('');
  let [modal, setModal] = useState(false);
  let [placeID, setPlaceID] = useState('');

  const openModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const filterPrice = (event) => {
    setPriceFilter(event.target.value);
  };

  const filterOpen = (event) => {
    setOpenFilter(event.target.checked);
  };

  const onTextChanged = (event) => {
    setSearchQuery(event.target.value);
  };

  const onClearButtonClicked = () => {
    setPriceFilter(0);
    setOpenFilter(false);
    setSearchQuery('');
  };

  return (
    <Container>
      <AppHeader />
      <AppFilter
        filterPrice={filterPrice}
        filterOpen={filterOpen}
        onTextChanged={onTextChanged}
        onClearButtonClicked={onClearButtonClicked}
        priceFilter={priceFilter}
        openFilter={openFilter}
        searchQuery={searchQuery}
      />
      <Restaurantslist
        priceFilter={priceFilter}
        openFilter={openFilter}
        searchQuery={searchQuery}
        openModal={openModal}
        setPlaceID={setPlaceID}
      />
      <AppModal modal={modal} hideModal={hideModal} place_id={placeID} />
    </Container>
  );
}
