import axios from 'axios';

export const promiseHandler = async (promise) => {
  try {
    const response = await promise;
    return { response };
  } catch (err) {
    return { error: err };
  }
};

export const requestHandler = async ({ url, method, data, headers, params }) => {
  const config = { url, headers, method: method || 'GET' };

  if (data) {
    Object.assign(config, { data });
    if (!(data instanceof FormData)) {
      Object.assign(config.headers, { 'Content-Type': 'application/json' });
    }
  }
  if (params) {
    Object.assign(config, { params });
  }

  const { response, error } = await promiseHandler(axios(config));
  if (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      return { error: error.response.data.message, status: error.response.status };
    }

    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return { error: 'Time out' }; // TODO: handle errors
    }

    // Something happened in setting up the request that triggered an Error
    return { error: error.message };
  }

  return { data: response.data, status: response.status };
};
