import { ListItem, ListItemText, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import { formatDistanceToNow, isBefore } from 'date-fns';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import { selectEventById, selectEventIds } from '../redux/events';
import {
  useAppWideSettingsContext,
  appWideSettingsContext,
} from '../contexts/appWideSettings';
import { Virtuoso } from 'react-virtuoso';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../redux/events';

// helper
// const enLocale = new Intl.Locale('en-US');
// const deLocale = new Intl.Locale('de-DE');

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

// components
const EventListItem = ({ eventID }) => {
  const { langDe: langDe } = useAppWideSettingsContext(appWideSettingsContext);
  const event = useSelector((state) => selectEventById(state, eventID));
  console.log(`event`, event);
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
