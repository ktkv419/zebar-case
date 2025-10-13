const Sound = ({ audio }) => {
    const source = audio.defaultPlaybackDevice

    const showIcon = () => {
        if (source.volume > 50) return ""
        if (source.volume > 0) return ""
        return ""
    }

    return <div className="sound">{showIcon()}</div>
}

export default Sound
