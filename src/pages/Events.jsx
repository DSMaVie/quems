import React from 'react';
import { Paper } from '@material-ui/core';
const styles = React.makeStyles({
  outer: {
    flexGrow: 1,
  },
  agendaView: {
    flex: 1,
  },
  calendarView: {
    flex: 1,
  },
});

const Events = () => {
  const classes = React.useStyles(styles);
  return (
    <div className={classes.outer}>
      <Paper className={classes.agendaView} />
      <Paper className={classes.calendarView} />
    </div>
  );
};

export default Events;
