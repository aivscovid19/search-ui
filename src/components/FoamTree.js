import React, { useState, useEffect } from 'react';

const FoamTree = ({
  style = {},
  searchTerm = ''
}) => {
  const [foamtree, setFoamtree] = useState(null)
  console.log('foamtree');

  useEffect(() => {
    const { CarrotSearchFoamTree } = window;

    console.log('create tree')

    const _foamtree = new CarrotSearchFoamTree({
      id: 'foamtree',
      maxGroupLevelsDrawn: 1, 
    });
    
    _foamtree.set({
      onGroupZoom: function(info) {
        console.log("onGroupZoom", info);
      }
    });

    _foamtree.set("onGroupDoubleClick", function(info) {
      console.log("onGroupDoubleClick.", info.group);
    });

    console.log('done creating tree')

    console.log('setting foamtree')
    setFoamtree(_foamtree)
    console.log('done setting foamtree')
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const CLOUD_URL = "https://us-central1-for-ivan.cloudfunctions.net/foamtree"
      
      const response = await fetch(CLOUD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          search_term: searchTerm
        })
      });

      const groups = await response.json();
      foamtree.set({ dataObject: { groups }});
    };

    if (foamtree) fetchData();
  }, [searchTerm]);

  return (
    <div id="foamtree" style={{ ...style, height: '800px' }}></div>
  );
}

export default FoamTree;
