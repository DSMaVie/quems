import React from 'react';
import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import EventList from '../components/EventList';

const useStyles = makeStyles({
  root: {
    height: '80vh',
  },
});

const EventView = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container spacing={1} className={classes.root} alignItems="stretch">
        <Grid item xs={4}>
          <Paper>
            <EventList />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>Calendar</Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventView;
