import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITicket, ITicketUpdate } from "@/types/Ticket";

const ticketServices = {
  getTicketsByEvent: async (id: string, params?: string) =>
    instance.get(`${endpoint.TICKET}/${id}/event?${params}`),
  addTicket: async (payload: ITicket) =>
    instance.post(`${endpoint.TICKET}`, payload),
  deleteTicket: async (id: string) =>
    instance.delete(`${endpoint.TICKET}/${id}`),
  updateTicket: async (id: string, payload: ITicketUpdate) =>
    instance.put(`${endpoint.TICKET}/${id}`, payload),
};

export default ticketServices;
