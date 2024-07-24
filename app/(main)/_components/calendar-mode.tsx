import { useCalendarApp, Calendar } from '@schedule-x/react';
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createResizePlugin } from '@schedule-x/resize';
import '@schedule-x/theme-default/dist/index.css';
import './style.css';

import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEventForm } from '@/hooks/use-event-form';

const CalendarMode = () => {
  const { resolvedTheme } = useTheme();
  const eventsFromDb = useQuery(api.events.get) || [];
  const { events, setEvents } = useEventForm();

  // console.log("Fetched events from DB:", eventsFromDb);

  useEffect(() => {
    if (eventsFromDb.length) {
      const formattedEvents = eventsFromDb.map((event) => ({
        id: event._id,
        title: event.title,
        start: event.start,
        end: event.end,
        calendarId: event.calendarId,
      }));
      // console.log("Setting events in Zustand store:", formattedEvents);
      setEvents(formattedEvents);
    }
  }, [eventsFromDb, setEvents]);

  const config = {
    calendars: {
      personal: {
        colorName: 'personal',
        lightColors: {
          main: '#f9d71c',
          container: '#fff5aa',
          onContainer: '#594800',
        },
        darkColors: {
          main: '#fff5c0',
          onContainer: '#fff5de',
          container: '#a29742',
        },
      },
      work: {
        colorName: 'work',
        lightColors: {
          main: '#f91c45',
          container: '#ffd2dc',
          onContainer: '#59000d',
        },
        darkColors: {
          main: '#ffc0cc',
          onContainer: '#ffdee6',
          container: '#a24258',
        },
      },
      leisure: {
        colorName: 'leisure',
        lightColors: {
          main: '#1cf9b0',
          container: '#dafff0',
          onContainer: '#004d3d',
        },
        darkColors: {
          main: '#c0fff5',
          onContainer: '#e6fff5',
          container: '#42a297',
        },
      },
      school: {
        colorName: 'school',
        lightColors: {
          main: '#1c7df9',
          container: '#d2e7ff',
          onContainer: '#002859',
        },
        darkColors: {
          main: '#c0dfff',
          onContainer: '#dee6ff',
          container: '#426aa2',
        },
      },
    },
  };

  const calendar = useCalendarApp({
    defaultView: viewWeek.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      createEventsServicePlugin(),
      createResizePlugin(),
    ],
    events: [],
    calendars: config.calendars,
  });

  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  calendar.setTheme(theme);

  useEffect(() => {
    calendar.events.set(events);
    // console.log("Calendar Events:", calendar.events.getAll());
  }, [events, calendar]);

  return (
    <div className="h-screen">
      <Calendar calendarApp={calendar} />
    </div>
  );
};

export default CalendarMode;
