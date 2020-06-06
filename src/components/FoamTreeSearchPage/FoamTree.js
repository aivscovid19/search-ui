import React, { useState, useEffect } from 'react';

const fetchData = async (searchTerm) => {
  const CLOUD_URL = "https://us-central1-for-ivan.cloudfunctions.net/foamtree"
  
  const response = await fetch(CLOUD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      search_term: searchTerm
    })
  });

  const groups = await response.json();
  return groups;
};

const findDocs = ({ groups, _docs = [] }) => {
  let docs = [ ..._docs ];
  groups.forEach(g => docs = [ ...docs, ...findDocs(g) ]);
  return docs;
};

const FoamTree = ({
  style = {},
  searchTerm = '',
  setDocs
}) => {
  const [foamtree, setFoamtree] = useState(null);

  useEffect(() => {
    const { CarrotSearchFoamTree } = window;

    const _foamtree = new CarrotSearchFoamTree({
      id: 'foamtree',
      maxGroupLevelsDrawn: 1,
    });

    _foamtree.set('onGroupClick', (event) => {
      const { group } = event;
      if (group && group.unselectable) {
        event.preventDefault();
      } else if (group && group.groups) {
        const docs = findDocs(group);
        setDocs(docs);
      }
    });

    setFoamtree(_foamtree);
  }, [setDocs]);

  useEffect(() => {
    const fetch = async () => {
      if (foamtree) {
        const groups = await fetchData(searchTerm);
        const docs = findDocs({ groups });
        
        foamtree.set({ dataObject: { groups }});
        setDocs(docs);
      }
    };

    fetch();
  }, [foamtree, searchTerm, setDocs]);

  return (
    <div id="foamtree" style={{ ...style, height: '650px' }}></div>
  );
}

export default FoamTree;
