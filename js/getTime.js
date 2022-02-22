const formatTime = (time) => time < 10 ? '0' + time : time;

export const getTime = () => {
    const date = new Date();
    const hours = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
}