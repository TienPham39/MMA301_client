// minhduc : http://192.168.1.16:8080/api
// tuankiet: http://192.168.1.12:8080/api
// hoangphuc: http://192.168.1.21:8080/api

import accounting from "accounting";
import { format } from "date-fns-tz";
import { parseISO } from "date-fns"; // Import parseISO directly from date-fns

export const port = () => {
  return "http://192.168.1.8:8080/api";
};



export const converMoney = (price) => {
  return accounting.formatMoney(price, "", 0, ".", ",") + " VNĐ";
};

export const converTimeZone = (deliveredAt) => {
  console.log(
    format(parseISO(deliveredAt), "dd/MM/yyyy HH:mm:ss", {
      timeZone: "Asia/Ho_Chi_Minh",
    })
  );
  return format(parseISO(deliveredAt), "dd/MM/yyyy HH:mm:ss", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
};
