import axios from 'axios';
import { CLOUD_URL, CLOUD_DEEP_URL } from '../config';

export const fetchDeepSearch = async ({ query, email, name, type }) => {
  const url = CLOUD_DEEP_URL;
  const { data } = await axios.post(url, { query, email, name, type });
  return data;
};

export const fetchData = async search_term => {
  const url = CLOUD_URL;
  const { data } = await axios.get(url, { search_term, group: true });
  return data;
};

export const findDocs = ({ groups = [], _docs = [] }) => {
  let docs = [ ..._docs ];
  groups.forEach(g => docs = [ ...docs, ...findDocs(g) ]);
  return docs;
};
