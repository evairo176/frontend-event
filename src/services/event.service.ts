import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent, IEventForm, IEventUpdate } from "@/types/Event";

const eventServices = {
  getEvents: async (params?: string) =>
    instance.get(`${endpoint.EVENT}?${params}`),
  addEvent: async (payload: IEventForm) =>
    instance.post(`${endpoint.EVENT}`, payload),
  searchLocationByRegency: async (name: string) =>
    instance.get(`${endpoint.REGION}/search?name=${name}`),
  deleteEvent: async (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),
  getEventById: async (id: string) => instance.get(`${endpoint.EVENT}/${id}`),
  updateEvent: async (id: string, payload: IEventUpdate) =>
    instance.put(`${endpoint.EVENT}/${id}`, payload),
  getRegencyById: async (id: string) =>
    instance.get(`${endpoint.REGION}/regency/${id}`),
};

export default eventServices;
