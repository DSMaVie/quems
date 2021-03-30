import { ListItem, ListItemText } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow, isBefore } from 'date-fns';
import {
  selectEventById,
  selectEventIds,
  selectNumberOfEvents,
} from '../redux/events';
import {
  useAppWideSettingsContext,
  appWideSettingsContext,
} from '../contexts/appWideSettings';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../redux/events';

// helper
const enLocale = new Intl.Locale('en-US');
const deLocale = new Intl.Locale('de-DE');

const parseEventForList = (event, langDe) => {
  return {
    eventIndex: event.id,
    eventIsInPast: isBefore(event.start, Date.now()),
    eventName: langDe ? event.name_de : event.name_en,
    eventTillTime: formatDistanceToNow(event.start, {
      addSuffix: true,
      locale: langDe ? deLocale : enLocale,
    }),
  };
};

// components
const EventListItem = (eventId) => {
  if (!eventId) {
    return (
      <ListItem>
        <Skeleton animation="wave">
          <ListItemText />
        </Skeleton>
      </ListItem>
    );
  }

  const { langDe: langDe } = useAppWideSettingsContext(appWideSettingsContext);
  const event = useSelector((state) => selectEventById(state, eventId));
  const { eventName, eventTillTime, eventIsInPast } = parseEventForList(
    event,
    langDe,
  );
  const eventColor = eventIsInPast ? '#FF0000' : '#00FF00';

  return (
    <ListItem color={eventColor} button key={eventId}>
      <ListItemText primary={eventName} secondary={eventTillTime} />
    </ListItem>
  );
};

EventListItem.propTypes = {
  eventID: PropTypes.number,
};

const EventList = () => {
  const eventsLoaded = useSelector((state) => state.events.isLoaded);
  const dispatcher = useDispatch();
  if (!eventsLoaded) dispatcher(fetchEvents());
  const nDummyEvents = 20;
  const dummyEventIds = new Array(nDummyEvents).fill(null);
  const debugDummys = false;
  const nEvents = useSelector((state) => selectNumberOfEvents(state));
  const eventIds = useSelector((state) => selectEventIds(state));
  return (
    <AutoSizer>
      {({ height, width }) => {
        <FixedSizeList
          width={width}
          height={height}
          itemCount={nEvents}
          itemSize={35}
        >
          {(debugDummys ? eventIds : dummyEventIds).map((eventId) => {
            <EventListItem eventId={eventId} />;
          })}
        </FixedSizeList>;
      }}
    </AutoSizer>
  );
};

export default EventList;
