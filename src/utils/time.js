const formatTime = (seconds) => {
    if (seconds < 0) return "0";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let result = [];

    if (hours > 0) result.push(hours);
    if (minutes > 0 || hours > 0) result.push(String(minutes).padStart(2, '0'));
    result.push(String(secs).padStart(2, '0'));

    return result.join(":");
}

export default formatTime