var keywords= {};
var counter = {};
var sorted = [];
var res = {};

// Parssing keywords string
// Creating one obj for each article with all keywords and pmid in it
const parseKeywords = (str, i, id) => {
    let w = 1;
    let k = 0;
    keywords[i] = {};
    while (str[k]) {
        if (str[k] === ";") {
            // counting how much each word appers in search
            counter[keywords[i][w]] = (counter[keywords[i][w]] || 0) + 1;
            k++;
            w++;
        }
        // saving each keyword
        keywords[i][w] = (keywords[i][w] || '') + str[k];
        k++;
    }
    // adding id to each group of keywords
    keywords[i]["id"] = id;

}
// Sorting counted keywords in descending order
const Sort = (counter) => {    
    for (let w in counter) {
        sorted.push([w, counter[w]]);
        }
        sorted.sort((a, b) => {
            return b[1] - a[1];
        });
}

// taking id from obj with keywords
const findIds = (str) => {
    let tmp = [];
    for (let k in keywords) {
        for (let j in keywords[k]) {
            if (keywords[k][j] === str) {
                tmp.push(keywords[k]['id']);
            }
        }
    }
    return tmp
}

// Finding specific article in recived data from search
const findArticle = (id, data) => {
    let tmp = {};
    for (let k in data) {
        if (data[k]["pmid"] === id) {
            tmp = data[k];
            return tmp;
        }
    }
}

// Creating inside step for keywords
const createInnerData = (id, data) => {
    let format = {};
    let article = findArticle(id, data);
    if (article) {
        format.label = article.title;
        format._doc = article;
        return format;
    }
}

// Checking does doubles apper in returning result
// arr is return data
const checkForDoubles = (arr, id) => {
    // console.log( "ID",id, "ID")
    let i = 0;
    // for (let k in arr) {
        // console.log(arr[k])
        while (i < arr.length) {
            for (let j in arr[i]["groups"]) {
                if (arr[i]["groups"][j]["_doc"].pmid === id)
                    return false;
            }
            i++;
        }
    // }
    return true;
}

const checkOtherForDoubles = (arr, id) => {
    for (let k in arr) {
        for (let j in arr[k]) {
            if (arr[k][j]["pmid"] === id)
                return false;
        }
    }
    return true;
}
// Formated data for each keyword
// word is array with 2 values, first: keyword, second: counter(how many repeats)
// res is returning array wich we are cheking for repeats
const FormatedData = (word, res, data) => {
    let weight = word[1];
    let i = 0;
    let format = {};
    if (weight >= 1) {
        format.groups = [];
    }
    format.label = word[0];
    format.weight = weight;
    // finding array of all ids with current keyword
    let ids = findIds(word[0]);
    while (ids[i]) {
        if (checkForDoubles(res, ids[i])) {
            // adding inside elements to keyword
            format.groups.push(createInnerData(ids[i], data))
        }
        weight--;
        i++;
    }
    return format;
}

// Everything we didnt take in top 30
// word is array with 2 values, first: keyword, second: counter(how many repeats)
// res is returning array wich we are cheking for repeats
const OtherFormatedData = (word, res, data, id, other) => {
    let format = {};
    let doub = checkForDoubles(res, id);
    let checkOther = checkOtherForDoubles(other, id)
    // taking direct article
    let article = findArticle(id, data);
    if (doub && checkOther) {
            format.label = article.title;
            format._doc = article;
            return format;
        }
    return null;
}

const makeGroups = (sorted, data) => {
    let i = 0;
    let groups = [];
    let other = [];
    let tmp = {};
    let ids;
    let j = 0;
    //Taking only top 30 sorted(in descending order) keywords
    while (sorted[i] && i < 30) {
        groups.push(FormatedData(sorted[i], groups,data))
        i++;
    }
    // Taking rest of articles to Others group
    while (sorted[i]) {
        // finding array of all ids with current keyword
        ids = findIds(sorted[i][0])
        // console.log(sorted[i], "sort")
        // console.log(ids)
        while (ids[j]) {
            tmp = OtherFormatedData(sorted[i], groups, data, ids[j], other);
            if (tmp) {
                other.push(tmp);
            }
            j++;
            tmp = {};
        }
        j = 0;
        i++;
    }
    console.log(groups);
    // console.log(other.length)
    groups.push({ label: "Others", groups: other });
    return groups
}

// Function main
// Data in all functions is json from search
export const FoamTreeDataSort = (data) => {
    if (data) {
        let i = 1;
        for (let k of data) {
            parseKeywords((k["keywords"]).toLowerCase(), i, k["pmid"]);
            i++;
        }
        Sort(counter);
        res.groups = makeGroups(sorted, data);
        return res;
    }
    return;
}