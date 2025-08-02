import type { Event, Ticket } from './types';

// Helper to check if localStorage is available (to avoid server-side errors)
const isBrowser = typeof window !== 'undefined';

const initialEvents: Event[] = [
  {
    id: 'evt001',
    name: 'Artcell: Reloaded',
    description: 'The legendary rock band Artcell returns to the stage for a one-night-only concert. Experience their classic hits and new tracks live.',
    date: '2024-09-15T19:00:00.000Z',
    location: 'ICCB Expo Zone, Dhaka',
    price: 1200,
    image: 'https://placehold.co/600x400.png',
    category: 'Concert',
  },
  {
    id: 'evt002',
    name: 'Indalo: Live in Chattogram',
    description: 'Indalo brings their unique blend of rock and psychedelic music to Chattogram. A must-see for all music lovers in the port city.',
    date: '2024-09-22T19:00:00.000Z',
    location: 'Radisson Blu, Chattogram',
    price: 1000,
    image: 'https://placehold.co/600x400.png',
    category: 'Concert',
  },
  {
    id: 'evt003',
    name: 'Dhaka Lit Fest 2024',
    description: 'The premier literary festival of Bangladesh. Join authors, poets, and thinkers from around the world for three days of talks, panels, and performances.',
    date: '2024-11-07T10:00:00.000Z',
    location: 'Bangla Academy, Dhaka',
    price: 500,
    image: 'https://placehold.co/600x400.png',
    category: 'Festival',
  },
  {
    id: 'evt004',
    name: 'Nemesis: Unplugged Night',
    description: 'Experience the raw power of Nemesis in an intimate, unplugged setting. A unique opportunity to hear your favorite songs like never before.',
    date: '2024-10-05T20:00:00.000Z',
    location: 'Jamuna Future Park, Dhaka',
    price: 1500,
    image: 'https://placehold.co/600x400.png',
    category: 'Concert',
  },
  {
    id: 'evt005',
    name: 'Chobi Mela International Photography Festival',
    description: 'The largest photography festival in Asia, showcasing groundbreaking work from photographers across the globe.',
    date: '2025-02-01T11:00:00.000Z',
    location: 'Multiple Venues, Dhaka',
    price: 300,
    image: 'https://placehold.co/600x400.png',
    category: 'Exhibition',
  },
  {
    id: 'evt006',
    name: 'Startup Summit 2024',
    description: 'Connect with the brightest minds in the Bangladeshi startup ecosystem. A day of networking, learning, and inspiration for entrepreneurs.',
    date: '2024-10-19T09:00:00.000Z',
    location: 'BICC, Dhaka',
    price: 2000,
    image: 'https://placehold.co/600x400.png',
    category: 'Conference',
  },
];

const initialTickets: Ticket[] = [
    { id: 'tkt_1_123', eventId: 'evt001', userName: 'Ashraful Islam', userEmail: 'ash@example.com', phoneNumber: '01712345678', transactionId: 'TXN12345', serialNumber: 'A1B2C3D4', purchaseDate: '2024-08-01', status: 'pending' },
    { id: 'tkt_2_456', eventId: 'evt003', userName: 'Fatima Ahmed', userEmail: 'fatima@example.com', phoneNumber: '01812345678', transactionId: 'TXN12346', serialNumber: 'E5F6G7H8', purchaseDate: '2024-08-02', status: 'confirmed' },
    { id: 'tkt_3_789', eventId: 'evt004', userName: 'Rahim Sheikh', userEmail: 'rahim@example.com', phoneNumber: '01912345678', transactionId: 'TXN12347', serialNumber: 'I9J0K1L2', purchaseDate: '2024-08-03', status: 'rejected' },
];


function getData<T>(key: string, initialData: T[]): T[] {
    if (!isBrowser) return initialData;
    try {
        const item = window.localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        } else {
            window.localStorage.setItem(key, JSON.stringify(initialData));
            return initialData;
        }
    } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error);
        return initialData;
    }
}

function setData<T>(key: string, value: T[]): void {
    if (!isBrowser) return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
    }
}


// Functions to interact with the "database"
export function events() {
  return getData<Event>('eventsData', initialEvents);
}

export function tickets() {
  return getData<Ticket>('ticketsData', initialTickets);
}

// Function to update ticket status
export function updateTicketStatus(ticketId: string, newStatus: 'confirmed' | 'rejected') {
  const currentTickets = tickets();
  const ticketIndex = currentTickets.findIndex(t => t.id === ticketId);
  if (ticketIndex !== -1) {
    currentTickets[ticketIndex].status = newStatus;
    setData('ticketsData', currentTickets);
  }
}

// Function to add a new ticket
export function addTicket(newTicket: Omit<Ticket, 'id'>) {
  const currentTickets = tickets();
  const id = `tkt_${currentTickets.length + 1}_${Math.random().toString(36).substring(7)}`;
  const ticketToAdd = { ...newTicket, id };
  const updatedTickets = [...currentTickets, ticketToAdd];
  setData('ticketsData', updatedTickets);
  return ticketToAdd;
}

// Function to add a new event
export function addEvent(newEvent: Omit<Event, 'id'>) {
  const currentEvents = events();
  const newId = `evt${Math.random().toString(16).slice(2, 6)}`;
  const eventToAdd: Event = { ...newEvent, id: newId };
  const updatedEvents = [...currentEvents, eventToAdd];
  setData('eventsData', updatedEvents);
  return eventToAdd;
}

// Function to update an existing event
export function updateEvent(updatedEvent: Event) {
  const currentEvents = events();
  const eventIndex = currentEvents.findIndex(e => e.id === updatedEvent.id);
  if (eventIndex !== -1) {
    currentEvents[eventIndex] = updatedEvent;
    setData('eventsData', currentEvents);
  }
}

// Function to delete an event
export function deleteEvent(eventId: string) {
  let currentEvents = events();
  let currentTickets = tickets();
  
  currentEvents = currentEvents.filter(e => e.id !== eventId);
  currentTickets = currentTickets.filter(t => t.eventId !== eventId);
  
  setData('eventsData', currentEvents);
  setData('ticketsData', currentTickets);
}
