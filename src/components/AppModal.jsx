/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Rating,
  Slide,
  Typography
} from '@mui/material';
import PropType from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import PersonPinIcon from '@mui/icons-material/PersonPin';

AppModal.propType = {
  modal: PropType.bool,
  hideModal: PropType.func,
  place_id: PropType.string
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let service;

export default function AppModal({ modal, hideModal, place_id }) {
  let [detail, setDetail] = useState([]);

  useEffect(() => {
    if (!place_id) return;
    const request = {
      placeId: place_id
    };

    service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(request, (data, status) => {
      setDetail(data);
    });
  }, [place_id]);

  let imgUrl = detail.photos && detail.photos?.[0].getUrl();
  let openHours = [];
  let reviewsList = [];

  detail.opening_hours?.weekday_text.forEach((day, index) =>
    openHours.push(
      <Typography variant="subtitle1" sx={{ fontSize: 14 }} key={index}>
        {day}
      </Typography>
    )
  );

  detail.reviews?.forEach((review, index) => {
    reviewsList.push(
      <Box sx={{ my: 1 }} key={index}>
        <Rating value={review.rating} precision={0.1} readOnly></Rating>
        <br />
        <Typography variant="caption">{review.text}</Typography>
        <Grid container justifyContent="space-between">
          <Typography variant="caption">{review.relative_time_description}</Typography>
          <Typography variant="caption">
            <em>- {review.author_name}</em>
          </Typography>
        </Grid>
      </Box>
    );
  });

  return (
    <div>
      <Dialog
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={hideModal}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth>
        <Grid container justifyContent="space-evenly" sx={{ my: 3 }}>
          <Grid item md={5}>
            <img
              src={imgUrl ? imgUrl : '/static/images/gray-background.png'}
              style={{ height: '200px', width: '100%', objectFit: 'cover' }}
            />
            <Typography variant="h6" color="text.primary" gutterBottom>
              {detail.name}
            </Typography>
            <Grid container alignItems="center" columnGap={1} mb={1}>
              <Rating name="read-only" value={detail.rating} precision={0.1} readOnly />
              <Grid container item md={3} alignItems="center">
                <Typography sx={{ fontSize: 14 }} component="span">
                  {detail.user_ratings_total}
                </Typography>
                <PersonPinIcon fontSize="medium" />
              </Grid>
            </Grid>
            {openHours}
          </Grid>
          <Grid item md={5}>
            <Typography variant="h6">Reviews</Typography>
            {reviewsList}
          </Grid>
        </Grid>
        <DialogActions>
          <Button size="medium" onClick={hideModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
