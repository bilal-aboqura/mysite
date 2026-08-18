async function request(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'same-origin',
    headers: options.body ? { 'Content-Type': 'application/json', ...options.headers } : options.headers,
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || 'The dashboard API request failed.');
    error.status = response.status;
    throw error;
  }
  return payload;
}

export const adminApi = {
  session: () => request('/api/auth/session'),
  login: (password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  dashboard: (days = 30) => request(`/api/dashboard?days=${days}`),
  analytics: (days = 30) => request(`/api/analytics?days=${days}`),
  list: (entity) => request(`/api/${entity}`),
  create: (entity, record) => request(`/api/${entity}`, { method: 'POST', body: JSON.stringify(record) }),
  update: (entity, id, record) => request(`/api/${entity}/${id}`, { method: 'PATCH', body: JSON.stringify(record) }),
  remove: (entity, id) => request(`/api/${entity}/${id}`, { method: 'DELETE' }),
};
