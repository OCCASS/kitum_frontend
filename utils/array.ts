export function removeTrailingEmptyStrings(arr: string[]): string[] {
    let filteredArray = [...arr];

    while (filteredArray.length > 0 && filteredArray[filteredArray.length - 1] === '') {
        filteredArray.pop();
    }

    return filteredArray;
}

