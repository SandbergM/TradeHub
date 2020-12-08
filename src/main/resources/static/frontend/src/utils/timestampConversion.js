export const timestampToMonth = (timestamp) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];
  return months[timestamp.getMonth()];
};

export const timestampToDay = (timestamp) => {
  let weekDays = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
  return weekDays[timestamp.getDay()];
};

export const timestampToHourAndMinutes = (timestamp) => {
  let hoursZero = timestamp.getHours() < 10 ? "0" : "";
  let minutesZero = timestamp.getMinutes() < 10 ? "0" : "";
  return `${hoursZero}${timestamp.getHours()}:${minutesZero}${timestamp.getMinutes()}`;
};

export const timestampToMinutesAndSeconds = (timestamp) => {
  let minutesZero = timestamp.getMinutes() < 10 ? "0" : "";
  let secondsZero = timestamp.getSeconds() < 10 ? "0" : "";
  return `${minutesZero}${timestamp.getMinutes()} min ${secondsZero}${timestamp.getSeconds()} sek`;
};

export const timestampConverter = (days) => {
  return Math.floor(new Date().getTime() / 1000) + days * 24 * 60 * 60;
};
