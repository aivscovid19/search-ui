import axios from 'axios';
import { CLOUD_URL, CLOUD_DEEP_URL } from '../config';

const DEFAULT_QUERY_SIZE = 50;
const TIMEOUT_SEC = 35;

export const fetchDeepSearch = async ({ query, email, name,  modelSize, dataSize }) => {
  const { data } = await axios.post(CLOUD_DEEP_URL, { query, email, name, modelSize, dataSize });
  return data;
};

export const fetchData = async (
  query, {
    suggestion = false,
    size = DEFAULT_QUERY_SIZE,
}) => {
  const params = { query, size, suggestion };
  const res = await axios.get(CLOUD_URL+"/search", { params, timeout: TIMEOUT_SEC * 1000 });
  return res.data;
};

export const fetchPage = async (
  query, page,{
    suggestion = false,
    size = DEFAULT_QUERY_SIZE,
}) => {
  const params = { query, size, suggestion };
  const res = await axios.get(CLOUD_URL+`/search/page/${page}`, { params, timeout: TIMEOUT_SEC * 1000 });
  return res.data;
};

export const fetchDeepSearchResult = async (id) => {
  const res = await axios.get(CLOUD_URL + `/deepsearch/${id}`, { timeout: TIMEOUT_SEC * 1000 });
  return res.data;
}

export const findDocs = ({ groups = [], _doc = null }) => {
  let docs = _doc === null ? [] : [_doc];
  groups.forEach(g => docs = [ ...docs, ...findDocs(g) ]);
  return docs.sort((a, b) => b.score - a.score);
};
