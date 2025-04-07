const formatDuration = (duration) => {
    if (!duration) return "N/A";
    const seconds = parseInt(duration.replace("s", ""));  // Extract seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours}h ${minutes}m ${secs}s`;
};

export default formatDuration;