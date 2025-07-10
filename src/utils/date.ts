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
export { toDateStandard, toInputDate, convertUTCToLocal };
