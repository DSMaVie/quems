import React from 'react';
import { Grid, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../redux/events';
const useStyles = makeStyles({
  outer: {
    flexGrow: 1,
    margin: 10,
  },
  listItem: {
    background: 'grey',
  },
  calendarView: {
    flex: 1,
    textAlign: 'center',
  },
});

const Events = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const eventsLoaded = useSelector((state) => state.events.isLoaded);
  const eventsList = useSelector((state) => state.events.entities);

  if (!eventsLoaded) {
    dispatch(fetchEvents());
    return <h1>Event is still loading</h1>;
  }

  return (
    <div className={classes.outer}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <List component="nav" className={classes.eventList}>
            {Object.values(eventsList).map((event, index) => (
              <ListItem button key={'item' + index} className={classes.listItem}>
                <ListItemText primary={event.name_de} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.calendarView}>Calendar</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Events;
