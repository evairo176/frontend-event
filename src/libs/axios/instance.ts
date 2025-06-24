import environment from "@/config/environment";
import { ISessionExtended } from "@/types/Auth";
import axios from "axios";
import { get } from "http";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

const headers = {};
export interface CustomSession extends Session {
  accessToken?: string;
}

const instance = axios.create({
  baseURL: environment.API_URL,
  headers: {
    "Content-Type": "application/json",
    ...headers,
  },
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    const session = (await getSession()) as ISessionExtended | null;

    if (session && session.user && session.user.accessToken) {
      request.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
