export const convertTimeDuration = (minutes) => {
    const durationTextArray = [];
    let days = 0, hours = 0;

    // Time conversion
    days = Math.floor(minutes / 1440);
    hours = Math.floor(minutes % 1440 / 60);
    minutes = minutes % 1440 % 60;

    // Text creation
    if (days > 0) durationTextArray.push(days + "d");
    if (hours > 0) durationTextArray.push(hours + "h");
    durationTextArray.push(minutes + "m");

    return durationTextArray.join(":");
};