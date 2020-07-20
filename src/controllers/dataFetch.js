import axios from 'axios';
import { CLOUD_URL, CLOUD_DEEP_URL } from '../config';

export const fetchDeepSearch = async ({ query, email, name, type }) => {
  const { data } = await axios.post(CLOUD_DEEP_URL, { query, email, name, type });
  return data;
};

export const fetchData = async search_term => {
  const { data } = await axios.get(CLOUD_URL, { search_term, group: true });
  return data;
};

export const findDocs = ({ groups = [], _docs = [] }) => {
  let docs = [ ..._docs ];
  groups.forEach(g => docs = [ ...docs, ...findDocs(g) ]);
  return docs;
};
