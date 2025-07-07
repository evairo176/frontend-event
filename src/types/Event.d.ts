export interface IEvent {
  name: string;
  categoryId: string;
  startDate: string | DateValue;
  endDate: string | DateValue;
  banner: FileList | string;
  description: string;
  isPublished: string;
  isFeatured: string;
  isOnline: string;
  region: string;
  latitude: string;
  longitude: string;
}

export interface IEventForm {
  name: string;
  categoryId: string;
  startDate: string;
  endDate: string;
  banner?: string | FileList;
  description: string;
  isPublished: boolean;
  isFeatured: boolean;
  isOnline: boolean;
  region: number;
  latitude: number;
  longitude: number;
}
