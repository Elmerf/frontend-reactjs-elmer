/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography
} from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/system';
import PropType from 'prop-types';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

AppCard.propTypes = {
  place_id: PropType.string,
  photos: PropType.array,
  name: PropType.string,
  opening_hours: PropType.object,
  price_level: PropType.number,
  vicinity: PropType.string,
  rating: PropType.number,
  user_ratings_total: PropType.number,
  formatted_address: PropType.string,
  openModal: PropType.func,
  setPlaceID: PropType.func
};

export default function AppCard({
  place_id,
  photos,
  name,
  opening_hours,
  price_level,
  vicinity,
  rating,
  user_ratings_total,
  formatted_address,
  openModal,
  setPlaceID
}) {
  const imgUrl = photos && photos[0].getUrl();
  const dollarSigns = [];

  if (price_level) {
    for (let i = 0; i <= price_level; i++) {
      dollarSigns.push(<AttachMoneyIcon fontSize="small" key={i} />);
    }
  } else {
    dollarSigns.push(<Typography variant="body1">No Data</Typography>);
  }

  return (
    <Card
      sx={{ boxShadow: 3, flexGrow: 1 }}
      variant="outlined"
      style={{ position: 'relative', height: '450px' }}>
      <CardMedia
        component="img"
        height="200"
        image={imgUrl ? imgUrl : '/static/images/gray-background.png'}></CardMedia>
      <CardContent sx={{ pb: 1 }}>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {name}
        </Typography>
        <Grid container alignItems="center" columnGap={1} mb={1}>
          <Rating name="read-only" value={rating} precision={0.1} readOnly />
          <Grid container item md={3} alignItems="center">
            <Typography sx={{ fontSize: 14 }} component="span">
              {user_ratings_total}
            </Typography>
            <PersonPinIcon fontSize="medium" />
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-between" mb={1}>
          <Box>{dollarSigns}</Box>
          <Grid container item md={6} alignItems="center" justifyContent="flex-end" columnGap={1}>
            {opening_hours?.open_now ? (
              <CheckCircleIcon style={{ fill: 'green' }} fontSize="small"></CheckCircleIcon>
            ) : (
              <CheckCircleIcon fontSize="small"></CheckCircleIcon>
            )}
            <Typography component="span">{opening_hours?.open_now ? 'Open' : 'Close'}</Typography>
          </Grid>
        </Grid>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {vicinity || formatted_address}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          position: 'absolute',
          bottom: 0,
          margin: 'auto',
          right: '50%',
          transform: 'translateX(50%)'
        }}>
        <Button
          size="medium"
          onClick={() => {
            openModal();
            setPlaceID(place_id);
          }}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
