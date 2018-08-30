export function splitToCreateRow(arrayData, nbItemsByRow) {
    const nbRows = Math.ceil(arrayData.length / nbItemsByRow);
    const newArray = [];
    for(let i = 0; i < nbRows; i++) {
        const subArray = arrayData.slice((i * nbItemsByRow), (i * nbItemsByRow) + nbItemsByRow);
        newArray.push(subArray);
    }
    return newArray;
}
