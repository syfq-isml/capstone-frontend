import { format } from "date-fns";

// format date for sending to backend
const formatDate = (date) => {
  return format(date, "y-MM-dd'T'HH:mm");
};

export default formatDate;
