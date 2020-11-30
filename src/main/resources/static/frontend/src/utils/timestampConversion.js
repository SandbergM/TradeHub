
export const timestampToMonth = (timestamp) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    return months[timestamp.getMonth()]
}

export const timestampToDay = (timestamp) => {
    let weekDays = ["Sön","Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
    return weekDays[timestamp.getDay()]
}

export const timestampToHourAndMinutes = (timestamp) => {
    return `${timestamp.getHours()} : ${timestamp.getMinutes()}`
}

export const timestampToMinutesAndSeconds = (timestamp) => {
    return `${timestamp.getMinutes()} min ${timestamp.getSeconds()} sek`
}

export const timestampConverter = (days) => {
    return Math.floor( new Date().getTime() / 1000 ) + ( days * 24 * 60 * 60 )
}