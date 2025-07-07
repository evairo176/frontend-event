import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent, IEventForm } from "@/types/Event";

const eventServices = {
  getEvents: async (params?: string) =>
    instance.get(`${endpoint.EVENT}?${params}`),
  addEvent: async (payload: IEventForm) =>
    instance.post(`${endpoint.EVENT}`, payload),
  searchLocationByRegency: async (name: string) =>
    instance.get(`${endpoint.REGION}/search?name=${name}`),
};

export default eventServices;
