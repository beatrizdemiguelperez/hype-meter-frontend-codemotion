const buildUrl = (path, search) => {
  const url = new URL(path);

  url.search = new URLSearchParams(search);

  return url;
};

const crud = (adapter, resource) => ({
  findAll(search) {
    const url = buildUrl(adapter.getPath(resource), search);
    const request = adapter.request(url, {
      method: 'GET'
    });
    return adapter.fetch(request);
  },

  find(id, search) {
    const url = buildUrl(adapter.getPath(`${resource}/${id}`), search);
    const request = adapter.request(url, {
      method: 'GET'
    });
    return adapter.fetch(request);
  },

  create(body) {
    const url = buildUrl(adapter.getPath(resource));
    const request = adapter.request(url, {
      method: 'POST',
      body
    });
    return adapter.fetch(request);
  },

  update(id, body) {
    const url = buildUrl(adapter.getPath(`${resource}/${id}`));
    const request = adapter.request(url, {
      method: 'PATCH',
      body
    });
    return adapter.fetch(request);
  },

  remove(id) {
    const url = buildUrl(adapter.getPath(`${resource}/${id}`));
    const request = adapter.request(url, {
      method: 'DELETE'
    });
    return adapter.fetch(request);
  }
});

export {
  buildUrl,
  crud
};

