import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

  const [eventList, setEventList] = useState(['Events']);

  useEffect(() => {
    fetch('http://localhost:3000/events', { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEventList(data);
      });
  }, []);

  return (
    <div className={classes.outer}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <List component="nav" className={classes.eventList}>
            {eventList.map((event, index) => (
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
