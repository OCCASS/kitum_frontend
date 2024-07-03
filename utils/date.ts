function rjust(str: string, length: number, char: string = " ") {
    if (str.length < length) {
        return Array(length - str.length).fill(char).join("") + str
    }
    return str
}

export function formattedDatetime(date: Date) {
    const day = rjust(date.getDate().toString(), 2, "0")
    const month = rjust((date.getMonth() + 1).toString(), 2, "0")
    const hours = rjust(date.getHours().toString(), 2, "0")
    const minutes = rjust(date.getMinutes().toString(), 2, "0")
    const seconds = rjust(date.getSeconds().toString(), 2, "0")
    return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}:${seconds}`
}

export function formattedDate(date: Date) {
    const day = rjust(date.getDate().toString(), 2, "0")
    const month = rjust((date.getMonth() + 1).toString(), 2, "0")
    return `${day}.${month}.${date.getFullYear()}`
}

export function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
};

export function getFirstDayOfMonth(year: number, month: number) {
    return (new Date(year, month, 1).getDay() + 6) % 7; // Adjust to make Monday the first day
};
