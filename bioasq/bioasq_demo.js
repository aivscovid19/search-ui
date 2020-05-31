window.addEventListener("load", createFoamTree);

const pubmedUrl = "https://pubmed.ncbi.nlm.nih.gov/"

let foamtree = null;
const docList = document.querySelector('#docs');

function createFoamTree() {
  foamtree = new CarrotSearchFoamTree({
    id: "visualization",
    dataObject: {},
    maxGroupLevelsDrawn: 1, 
  });
  foamtree.set({
    onGroupZoom: function(info) {
      console.log("onGroupZoom.asdasd", info);
    }
  });
  foamtree.set("onGroupDoubleClick", function(info) {
    console.log("onGroupDoubleClick.", info.group);
    const docs = getDocList(info.group);
    console.log(docs);
    setDocList(docs);
  });
}

const getDocList = ({
  groups,
  _docs
}) => {
  let docs = _docs ? _docs.slice() : [];
  groups.forEach(g => docs = docs.concat(getDocList(g)));
  return docs;
}

const createDocNode = (doc) => {
  const maxAbstractLen = 250;
  const abstract = doc.abstract.slice(0, maxAbstractLen) + '...';
  const div = document.createElement('div');
  div.innerHTML = `
  <a href="${pubmedUrl + doc.pmid}" target="_blank">
  	<h4>${doc.title}</h4>
  </a>
  <p class="abstract">${abstract}</p>
  `
  return div;
}

const setDocList = (docs) => {
  docList.innerHTML = '';
  docs.map(d => createDocNode(d)).forEach(n => docList.appendChild(n));
};

function updateTree() {
  const cloudFnUrl = "https://us-central1-for-ivan.cloudfunctions.net/foamtree"
  const searchTerm = document.querySelector('#search').value;
  const size = parseInt(document.querySelector('#max').value);
  const depth = parseInt(document.querySelector('#depth').value);
  axios.post(
    cloudFnUrl, {
      search_term: searchTerm, size, depth,
    }, {
      headers: {
        'content-type': 'application/json'
      }
    }
  ).then((data) => {
    const {
      data: groups
    } = data;
    setDocList(getDocList({ groups }));
    foamtree.set({
      dataObject: {
        groups,
      }
    });
  });
}
