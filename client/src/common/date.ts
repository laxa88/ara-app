// https://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd

const getDateData = () => {
  const d = new Date();

  const year = d.getFullYear();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return { year, month, day };
};

/**
 * Returns current month, e.g. "2018-11"
 */
const getMonth = () => {
  const { year, month } = getDateData();
  const resultDate = [year, month].join('-');
  return resultDate;
};

/**
 * Returns today's date, e.g. "2018-11-16"
 */
const getDate = () => {
  const { year, month, day } = getDateData();
  const resultDate = [year, month, day].join('-');
  return resultDate;
};

/**
 * Returns current time, e.g. "23:42:09"
 */
const getTime = () => {
  const d = new Date();

  let h = d.getHours().toString();
  let m = d.getMinutes().toString();
  let s = d.getSeconds().toString();

  if (h.length < 2) {
    h = `0${h}`;
  }

  if (m.length < 2) {
    m = `0${m}`;
  }

  if (s.length < 2) {
    s = `0${s}`;
  }

  const resultTime = [h, m, s].join(':');

  return resultTime;
};

/**
 * Returns formatted date, e.g. "2018-11-16 23:42:09"
 */
const formatDate = () => {
  const result = `${getDate()} ${getTime()}`;
  return result;
};

/**
 * Parses data, e.g. "2018-12-01T15:00:00.000Z" to "2018-12-01"
 */
const parseDate = (date: string) => {
  return date.substr(0, 10);
};

export { getMonth, getDate, getTime, formatDate, parseDate };
