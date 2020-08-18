import React, { useState, useEffect } from 'react';

import debounce from '../../../helpers/debounce';
import { findDocs } from '../../../controllers/dataFetch';

const FoamTree = ({
  style = {},
  groups = {},
  setDocs,
  setResultCount,
  resultCount
}) => {
  const [foamtree, setFoamtree] = useState(null);
  const [,totalCount] = resultCount;

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
      } else if (group) {
        const docsList = findDocs(group);
        setResultCount([docsList.length, totalCount]);
        setDocs(docsList);
      }
    });

    setFoamtree(_foamtree);
  }, [setDocs, setResultCount, totalCount]);

  useEffect(() => {
    if (foamtree) {
      foamtree.set({ dataObject: groups });
    }
  }, [foamtree, groups]);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      if (foamtree) foamtree.resize();
    }, 200);

    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  });

  return (
    <div id="foamtree" style={{ ...style }}></div>
  );
}

export default FoamTree;
