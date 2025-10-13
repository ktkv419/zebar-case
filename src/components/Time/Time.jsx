const Time = ({ date }) => {
    return (
        <div className="time">
            <span className="time__date">
                {date.formatted.split(" ").slice(0, 3).join(" ")}
            </span>
            <span className="time__clock">{date.formatted.split(" ")[3]}</span>
        </div>
    )
}

export default Time
