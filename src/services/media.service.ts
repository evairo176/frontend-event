import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IFileUrl } from "@/types/File";

const mediaServices = {
  uploadFile: async (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/upload-single`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteFile: async (payload: IFileUrl) =>
    instance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default mediaServices;
