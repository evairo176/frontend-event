import { DateValue } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";

const standardTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};
const toDateStandard = (date: DateValue) => {
  const year = date?.year;
  const month = standardTime(date.month);
  const day = standardTime(date.day);

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${year}-${month}-${day} ${standardTime(hour)}:${standardTime(minute)}:${standardTime(second)}`;
  return result;
};

const toInputDate = (date: string) => {
  const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
  return formattedDate;
};

const convertUTCToLocal = (isoString: string, offsetHours: number = 0) => {
  const date = new Date(isoString);

  // Tambahkan offset waktu dalam milidetik
  const localTime = new Date(date.getTime() + offsetHours * 60 * 60 * 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = localTime.getFullYear();
  const month = pad(localTime.getMonth() + 1); // 0-based
  const day = pad(localTime.getDate());
  const hours = pad(localTime.getHours());
  const minutes = pad(localTime.getMinutes());
  const seconds = pad(localTime.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function formatDateTime(input: string): string {
  const date = new Date(input.replace(" ", "T")); // ubah ke ISO string

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

const diff = (a?: string | null, b?: string | null) => {
  if (!a || !b) return null;
  const ms = new Date(a).getTime() - new Date(b).getTime();
  if (Number.isNaN(ms)) return null;
  const sec = Math.floor(ms / 1000);
  const mins = Math.floor(sec / 60);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return `${days}d ${hrs % 24}h`;
  if (hrs > 0) return `${hrs}h ${mins % 60}m`;
  if (mins > 0) return `${mins}m`;
  return `${sec}s`;
};
export { toDateStandard, toInputDate, convertUTCToLocal, formatDateTime, diff };
