import { format, parseISO } from "date-fns";

// format date for sending to backend
export const formatDate = (date) => {
  return format(date, "y-MM-dd'T'HH:mm");
};

// format date for front end
export const formatDateDisplay = (date) => {
  return format(parseISO(date), "dd/MM/y HH:mm");
};

// format date for cards
export const formatDateCard = (date) => {
  return format(parseISO(date), "dd MMM E y HH:mm");
};

export * from "./formatDate";
