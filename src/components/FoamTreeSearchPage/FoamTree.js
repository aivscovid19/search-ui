import React, { useState, useEffect } from 'react';

import { findDocs } from '../../controllers/dataFetch';

const FoamTree = ({
  style = {},
  groups = {},
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
    if (foamtree) {
      foamtree.set({ dataObject: { groups }});
    }
  }, [foamtree, groups]);

  return (
    <div id="foamtree" style={{ ...style, height: '650px' }}></div>
  );
}

export default FoamTree;
