const snakeToCamel = str => str.replace(/"([-_]\w)":/g, g => g[1].toUpperCase());

const camelToSnake = field => field.split(/"(?=[A-Z])":/).join('_').toLowerCase();

export const jsonToObject = (json) => {
    return JSON.parse(snakeToCamel(json));
}

export const objectToJson = (object) => {
    return camelToSnake(JSON.stringify(object));
}
