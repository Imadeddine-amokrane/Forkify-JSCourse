import { TIMEOUT_SEC } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchData = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
    // Will become the resolve value of the return promise
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     //Return the 1st resolved promise between getJSON and timeout
//     const fetchData = fetch(url);
//     const res = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} ${res.status}`);
//     return data;
//     // Will become the resolve value of the return promise
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     //Return the 1st resolved promise between getJSON and timeout
//     console.log(uploadData);
//     const fetchData = fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(uploadData),
//     });
//     const res = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} ${res.status}`);
//     return data;
//     // Will become the resolve value of the return promise
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
