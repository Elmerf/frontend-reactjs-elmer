/* eslint-disable no-unused-vars */
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import AppCard from './AppCard';
import { Box } from '@mui/system';
import PropType from 'prop-types';

let service;
let getNextPage;

Restaurantslist.propType = {
  openFilter: PropType.bool,
  priceFilter: PropType.number,
  searchQuery: PropType.string,
  openModal: PropType.func,
  setPlaceID: PropType.func
};

export default function Restaurantslist({
  openFilter,
  priceFilter,
  searchQuery,
  openModal,
  setPlaceID
}) {
  let [restaurants, setRestaurants] = useState([]);
  let [showedRestaurants, setShowedRestaurants] = useState([]);
  let [countClick, setCountClick] = useState(0);
  let [buttonDisabled, setButtonDisabled] = useState(false);

  const onButtonClicked = () => {
    if (getNextPage) {
      getNextPage();
    }
    setCountClick(countClick + 1);
  };

  const searchNearby = () => {
    const malangCityCenter = new window.google.maps.LatLng(-7.982354184702362, 112.63090785675077);

    const request = {
      location: malangCityCenter,
      radius: '10000',
      type: 'restaurant'
    };

    service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, (data, status, pagination) => {
      let restos = data.filter(
        (el) => el.business_status === 'OPERATIONAL' && el.types[0] === 'restaurant'
      );

      setRestaurants(restos);

      if (pagination && pagination.hasNextPage) {
        getNextPage = () => {
          pagination.nextPage();
        };
      }
    });
  };

  useEffect(() => {
    searchNearby();
  }, []);

  useEffect(() => {
    setShowedRestaurants([...showedRestaurants, ...restaurants]);
  }, [JSON.stringify(restaurants)]);

  useEffect(() => {
    if (countClick >= 2) return setButtonDisabled(true);
    return setButtonDisabled(false);
  }, [countClick]);

  useEffect(() => {
    setShowedRestaurants([]);
    setCountClick(0);
    if (!searchQuery) return searchNearby();

    const malangCityCenter = new window.google.maps.LatLng(-7.982354184702362, 112.63090785675077);

    const request = {
      location: malangCityCenter,
      radius: '10000',
      type: 'restaurant',
      query: searchQuery
    };

    service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.textSearch(request, (data, status, pagination) => {
      let restos = data.filter(
        (el) => el.business_status === 'OPERATIONAL' && el.types[0] === 'restaurant'
      );

      setRestaurants(restos);
      if (pagination && pagination.hasNextPage) {
        getNextPage = () => {
          pagination.nextPage();
        };
      }
    });
  }, [searchQuery]);

  return (
    <>
      <Grid container alignItems="stretch" columnSpacing={1} rowSpacing={1} mb={3}>
        {showedRestaurants
          .filter((resto) => {
            if (openFilter) return resto.opening_hours?.open_now;
            else return true;
          })
          .sort((a, b) => {
            if (priceFilter === -1) return (a?.price_level || 5) - (b?.price_level || 5);
            if (priceFilter === 1) return (b?.price_level || 0) - (a?.price_level || 0);
            else return true;
          })
          .map((resto) => {
            return (
              <Grid item md={3} key={resto.place_id} style={{ display: 'flex' }}>
                <AppCard {...resto} openModal={openModal} setPlaceID={setPlaceID}></AppCard>
              </Grid>
            );
          })}
        ;
      </Grid>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="contained"
          style={{ margin: 'auto' }}
          onClick={onButtonClicked}
          disabled={buttonDisabled}>
          Load More
        </Button>
      </Box>
    </>
  );
}
