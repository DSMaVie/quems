import { ListItem, ListItemText, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { formatDistanceToNow, isBefore } from 'date-fns';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import { range } from 'lodash';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import { AppWideSettingsContext } from '../contexts/appWideSettings';
import { fetchEvents, selectEventById, selectEventIds } from '../redux/events';

// helper

const parseEventForList = (event, langDe) => {
  return {
    eventIndex: event.id,
    eventIsInPast: isBefore(new Date(event.start), Date.now()),
    eventName: !langDe && event.name_en ? event.name_en : event.name_de,
    eventTillTime: formatDistanceToNow(new Date(event.start), {
      addSuffix: true,
      locale: langDe ? deLocale : enLocale,
    }),
  };
};

const useStyles = makeStyles({
  skeletonEventListItems: {
    color: 'grey',
    width: '100%',
  },
});

// components
const DummyEventListItem = () => {
  const classes = useStyles();

  return (
    <ListItem>
      <Skeleton
        className={classes.skeletonEventListItems}
        variant="rect"
        animation="wave"
      ></Skeleton>
    </ListItem>
  );
};

const EventListItem = ({ eventID }) => {
  const { langDe: langDe } = useContext(AppWideSettingsContext);
  const event = useSelector((state) => selectEventById(state, eventID));

  const { eventName, eventTillTime, eventIsInPast } = parseEventForList(
    event,
    langDe,
  );
  const eventColor = eventIsInPast ? '#FF0000' : '#00FF00';

  return (
    <ListItem color={eventColor} button key={eventID}>
      <ListItemText primary={eventName} secondary={eventTillTime} />
    </ListItem>
  );
};

EventListItem.propTypes = {
  eventID: PropTypes.number.isRequired,
};

const EventList = () => {
  const eventsLoaded = useSelector((state) => state.events.isLoaded);
  const dispatcher = useDispatch();
  if (!eventsLoaded) {
    dispatcher(fetchEvents());
  }

  const dummyEventIds = range(300);
  const eventIds = useSelector((state) => selectEventIds(state));

  return (
    <Virtuoso
      data={eventsLoaded ? eventIds : dummyEventIds}
      itemContent={(_, eventID) => {
        if (eventsLoaded) {
          return <EventListItem eventID={eventID} />;
        } else {
          return <DummyEventListItem />;
        }
      }}
    />
  );
};

export default EventList;
