import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  outer: {
    flexGrow: 1,
    margin: 10,
  },
  agendaView: {
    flex: 1,
    textAlign: 'center',
  },
  calendarView: {
    flex: 1,
    textAlign: 'center',
  },
});

const Events = () => {
  const classes = useStyles();

  return (
    <div className={classes.outer}>
      <Grid container spacing={1}>
        <Grid item xs={4} spacing={1}>
          <Paper className={classes.agendaView}>Agenda</Paper>
        </Grid>
        <Grid item xs={8} spacing={1}>
          <Paper className={classes.calendarView}>Calendar</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Events;
