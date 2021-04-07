import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import EventList from '../components/EventList';

const useStyles = makeStyles({
  gridContainer: { height: '100%', alignItems: 'stretch' },
  paperBackground: { height: '100%' },
});

const EventView = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.gridContainer}>
      <Grid item xs={4}>
        <Paper className={classes.paperBackground}>
          <EventList />
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper className={classes.paperBackground}>Calendar</Paper>
      </Grid>
    </Grid>
  );
};

export default EventView;
