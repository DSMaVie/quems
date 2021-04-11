import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Paper,
  Grid,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import { deselectEvent, selectEventById } from '../redux/events';
import PropTypes from 'prop-types';

const DraggablePaper = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const DetailsView = () => {
  const [display, setDisplay] = useState(false);
  const selectedEventID = useSelector((state) => state.events.selected);
  const eventIsSelected = selectedEventID !== null;
  const selectedEvent = useSelector((state) =>
    selectEventById(state, selectedEventID),
  );
  const dispatch = useDispatch();

  //open on new event selection
  useEffect(() => {
    if (eventIsSelected) {
      setDisplay(true);
    } else {
      return;
    }
  }, [selectedEvent]);

  const handleClose = () => {
    dispatch(deselectEvent());
    setDisplay(false);
  };

  return (
    <Dialog
      PaperComponent={DraggablePaper}
      open={display}
      onClose={handleClose}
      fullWidth
      maxWidth="md" //should be responsive
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Event Details
      </DialogTitle>
      <DialogContent>
        <Grid container justify-content="center" direction="column" spacing={2}>
          <Grid
            container
            item
            justify="space-between"
            direction="row"
            spacing={2}
          >
            <EventTextDataDisplay event={selectedEvent} lang="de" />
            <EventTextDataDisplay event={selectedEvent} lang="en" />
          </Grid>
          <Grid container item justify="center">
            <EventModalDataDisplay event={selectedEvent} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EventTextDataDisplay = ({ event, lang }) => {
  console.log('event :>> ', event);
  return (
    <Grid container item direction="column" xs={6}>
      <Grid item>
        <Typography variant="h6">{event[`name_${lang}`]}</Typography>
      </Grid>
      <Grid>
        <Typography variant="body2">{event[`desc_${lang}`]}</Typography>
      </Grid>
    </Grid>
  );
};
EventTextDataDisplay.propTypes = {
  event: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
};

const EventModalDataDisplay = ({ event }) => {
  const modes = ['calendar', 'insta', 'fb', 'discord', 'nl', 'twitter'];
  return (
    <Grid item>
      <RadioGroup row>
        {modes.map((mode) => {
          return (
            <FormControlLabel
              labelPlacement="bottom"
              key={mode}
              label={mode}
              control={<Radio checked={event[mode]} disableRipple />}
            />
          );
        })}
      </RadioGroup>
    </Grid>
  );
};
EventModalDataDisplay.propTypes = { event: PropTypes.object.isRequired };

export default DetailsView;
