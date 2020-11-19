
const snakeToCamel = str => str.replace(/"[A-Za-z0-9_]*":/g, match => {
    return match.replace(/([-_]\w)/g, g => g[1].toUpperCase());
});

const camelToSnake = str => str.replace(/"[A-Za-z0-9_]*":/g, match => {
    return match.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
});

export const jsonToObject = (json) => {
    return JSON.parse(snakeToCamel(json));
}

export const objectToJson = (object) => {
    return camelToSnake(JSON.stringify(object));
}
