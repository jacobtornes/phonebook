import { getAccessToken } from '../utils/oidcConfig';

const API_BASE_URL = 'https://test-api.softrig.com/api/biz/contacts';

const fetchWithToken = async (url, options = {}) => {
  const token = await getAccessToken();
  const headers = new Headers();
  // headers.append('x-apikey', '4416193a-304b-4535-a6f6-aea0a4f15832');
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("CompanyKey", "bf503871-ac06-4d8d-bea8-8a1f605c15cf");
  const response = await fetch(url, {
    ...options,
    headers,
  });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

export const getOneContact = async (id) =>
  fetchWithToken(`${API_BASE_URL}/${id}`);

export const getContacts = async (search) => {
  let filter = ""
  if (search) {
    filter = `&filter=contains(Info.Name',${search}')`
  }
  return fetchWithToken(`${API_BASE_URL}?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false${filter}`);
}

export const createContact = async (contact) =>
  fetchWithToken(`${API_BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify(contact),
  });

export const updateContact = async (id, updatedContact) =>
  fetchWithToken(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedContact),
  });

export const deleteContact = async (id) =>
  fetchWithToken(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
