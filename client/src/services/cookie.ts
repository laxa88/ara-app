const getCookie = (cname: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cname}=`);

  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift();
  }

  return undefined;
};

const setCookie = (cname: string, cvalue: string, expiryInSeconds: number) => {
  const d = new Date();
  d.setTime(d.getTime() + expiryInSeconds * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export { getCookie, setCookie };
