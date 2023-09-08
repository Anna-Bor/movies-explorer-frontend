const createPromise = (url, headers, method = 'GET', body = null) => fetch(url, {
  method,
  headers,
  body: body && JSON.stringify(body),
}).then((response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(
    new Error(
      `Ошибка при ${method}-запросе ${url}: ${response.status}.${
        (body && ` Тело запроса: ${JSON.stringify(body)}`) ?? ''
      }`,
    ),
  );
});

export default createPromise;
