const BASE_URL = "https://hackthon-squad15.herokuapp.com";

async function Post(resource, data, token) {
  const response = await fetch(BASE_URL + resource, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function Get(url, token) {
  const response = await fetch(
    BASE_URL + url,
    {
      method: "GET",
      headers: {
        token,
      },
    },
  );

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function Put(resource, token, data) {
  const response = await fetch(BASE_URL + resource, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

export {
  Get,
  Post,
  Put,
};
