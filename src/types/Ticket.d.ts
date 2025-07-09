export interface ITicket {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

export interface ITicketUpdate {
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
}
