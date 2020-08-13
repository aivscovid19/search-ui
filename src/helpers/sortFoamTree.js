
/*
    Function looking in data list and taking all documents where appears keyword
    in: word - array of 2 element, 1: keyword, 2: counter(how many appears). data: authentic search data with formated keywords
    out: arrray of articles where appears keyword`
*/
const findArticle = (word, data) => {
    let article = [];
    for (let key in data) {
        for (let i = 0; data[key].keywords.length > i; i++){
            if (data[key].keywords[i] === word[0]) {
                article.push(data[key]);
            }
        }
    }
    if (article) return article
    return;
}
/*
    Function creating groups for each keyword
    in: word - array of 2 element, 1: keyword, 2: counter(how many appears). data: authentic search data with formated keywords
    out: complete group with docs for keyword
*/
const createInnerData = (word, data) => {
    let format = {};
    let group = [];
    let weight = word[1];
    let article = findArticle(word, data);
    while (weight) {
        format.label = article[weight - 1].title;
        format._doc = article[weight - 1];
        group.push(format);
        format = {};
        weight--;
    }
    return group;
}
/*
    Function formating groups under "Others" label for specific FoamTree library format
    in: array of articles
    out: foramted array of articles
*/
const otherFormated = (others) => {
    let tmp = {};
    let format = [];
    for (let key of others) {
        tmp.label = key["title"];
        tmp._doc = key;
        format.push(tmp);
        tmp = {};
    }
    return format;
}
/*
    Function creating specific format for FoamTree library
    in: keywords - sorted array of all keywords, data: authentic search data with formated keywords
    out: array of all keyword with groups attached to it
*/
const makeGroups = (keywords, data) => {
    let groups = [];
    let others = [];
    let tmp = [];
    let top30 = keywords.filter((element, index) => index < 30);
    for (let i = 0; top30[i]; i++) {
        if (top30[i][0] === "")
            i++;
        groups.push({groups: createInnerData(top30[i], data), weight: top30[i][1], label: top30[i][0]});
    }
    for (let k in top30) { tmp.push(top30[k][0]); }
    const f1 = (x) => x.keywords.filter(el => tmp.includes(el)).length !== 0;
    others = data.filter(f1);
    others = otherFormated(others);
    groups.push({ label: "Others", groups: others });
    return groups;
}
/*
    Returning array of keywords in order of apperiance 
*/
const sortKeywords = (data) => {
    let tmp = {};
    let top = [];
    for (let k in data) {
        data[k].keywords.forEach(keyword => {
            tmp[keyword] = (tmp[keyword] || 0) + 1;
        });
    }
    for (let key in tmp) {
        top.push([key, tmp[key]]);
    }
    top.sort((a, b) => {
        return (b[1] - a[1]);
    })
    return top;
}

/*
    Split string of keywords and normalize each keyword
*/
const parseKeywords = (data) => {
    for (let k in data) {
        data[k].keywords = data[k].keywords.toLowerCase().split(';');
    }
    return data;
}

/*
    Main function
*/
export const FoamTreeDataSort = (data) => {
    let keywords = [];
    let result = {};
    data = data.filter(doc => doc.keywords !== "");
    if (data) {
        data = parseKeywords(data);
        keywords = sortKeywords(data);
        result.groups = makeGroups(keywords, data);
        return result;
    }
    return;
}