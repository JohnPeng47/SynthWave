export function convertPXtoNum(px) {
    return parseFloat(px.slice(0, px.indexOf("px")))
}

export function objKeys(obj) {
    const keys = [];
    for(const prop in obj) {
        keys.push(prop);
    }
    return keys;
}

export function isReactComponent(comp) {
    return typeof comp.type == "function" ? true : false; 
}