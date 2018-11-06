// https://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd

const formatDate = () => {
  const d = new Date();

  const year = d.getFullYear();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  let h = d.getHours().toString();
  let m = d.getMinutes().toString();
  let s = d.getSeconds().toString();

  if (h.length < 2) {
    h = "0" + h;
  }

  if (m.length < 2) {
    m = "0" + m;
  }

  if (s.length < 2) {
    s = "0" + s;
  }

  const resultDate = [year, month, day].join("-");
  const resultTime = [h, m, s].join(":");

  return `${resultDate} ${resultTime}`;
};

export { formatDate };
