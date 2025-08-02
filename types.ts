export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  transactionId: string;
  serialNumber: string;
  purchaseDate: string;
  status: 'pending' | 'confirmed' | 'rejected';
}
