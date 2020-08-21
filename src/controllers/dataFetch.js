import axios from 'axios';
import { CLOUD_URL, CLOUD_DEEP_URL } from '../config';

const DEFAULT_QUERY_SIZE = 50;
const DOCUMENT_PROCESS_SPEED_MS = 500
const TIMEOUT = DEFAULT_QUERY_SIZE * DOCUMENT_PROCESS_SPEED_MS;

export const fetchDeepSearch = async ({ query, email, name, type }) => {
  const { data } = await axios.post(CLOUD_DEEP_URL, { query, email, name, type });
  return data;
};

export const fetchData = async (
  query, {
    suggestion = false,
    size = DEFAULT_QUERY_SIZE,
}) => {
  const params = { query, size, suggestion };
  const res = await axios.get(CLOUD_URL, { params, timeout: TIMEOUT });
  return res.data;
};

export const findDocs = ({ groups = [], _doc = null }) => {
  let docs = _doc === null ? [] : [_doc];
  groups.forEach(g => docs = [ ...docs, ...findDocs(g) ]);
  return docs.sort((a, b) => b.score - a.score);
};
