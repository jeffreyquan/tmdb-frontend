const apiURL = process.env.REACT_APP_API_URL;

export interface RequestConfig extends RequestInit {
  data?: any;
  token?: string;
}

async function client(
  endpoint: string,
  { data, token, headers: customHeaders, ...customConfig }: RequestConfig = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : null,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        return Promise.reject({
          message: "Please re-authenticate",
        });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
