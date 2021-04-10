import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectAll } from '../redux/events';
import {
  Scheduler,
  MonthView,
  Appointments,
  AppointmentTooltip,
  TodayButton,
  DateNavigator,
  CurrentTimeIndicator,
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { AppWideSettingsContext } from '../contexts/appWideSettings';

// helper
const currentDate = Date.now();

const parseEventForCalendar = (event, langDe) => {
  let parsedEvent = {
    id: event.id,
    title: !langDe && event.name_en ? event.name_en : event.name_de,
    startDate: new Date(event.start),
  };
  if (event.end) {
    parsedEvent.endDate = new Date(event.end);
  }
  return parsedEvent;
};

//components

const EventCalendar = () => {
  const { langDe: langDe } = useContext(AppWideSettingsContext);
  const events = useSelector((state) =>
    selectAll(state).map((event) => parseEventForCalendar(event, langDe)),
  );

  return (
    <Scheduler data={events}>
      <ViewState
        currentDate={currentDate}
        locale={langDe ? 'de-DE' : 'en-US'}
      />
      <MonthView />
      <Toolbar />

      <TodayButton />
      <DateNavigator />
      <Appointments />
      <AppointmentTooltip />
      <CurrentTimeIndicator
        shadePreviousCells={true}
        shadePreviousAppointments={true}
        updateInterval={100000}
      />
    </Scheduler>
  );
};

export default EventCalendar;
