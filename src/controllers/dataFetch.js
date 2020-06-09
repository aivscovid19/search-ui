export const fetchData = async search_term => {
  const CLOUD_URL = "https://us-central1-for-ivan.cloudfunctions.net/foamtree"
  
  const response = await fetch(CLOUD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search_term })
  });
  
  return response.json();
};

export const findDocs = ({ groups, _docs = [] }) => {
  let docs = [ ..._docs ];
  groups.forEach(g => docs = [ ...docs, ...findDocs(g) ]);
  return docs;
};
