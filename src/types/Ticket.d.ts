export interface ITicketForm {
  name?: string;
  price?: string;
  quantity?: string;
  description?: string;
}

export interface ITicket {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  eventId: string;
}

export interface ITicketUpdate {
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  eventId?: string;
}

export interface ICart {
  events: string;
  ticket: string;
  quantity: number;
}
