import create from 'zustand';

type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
  calendarId: string;
};

type EventFormStore = {
  isOpen: boolean;
  events: Event[];
  setEvents: (events: Event[]) => void;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

const useEventForm = create<EventFormStore>((set) => ({
  isOpen: false,
  events: [],
  setEvents: (events) => set({ events }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export { useEventForm };
