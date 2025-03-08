import { useEffect, useState } from "react"
import formatTime from "../../utils/time"

const Timer = ({ endTime, position }) => {
    const [time, setTime] = useState(position)
    const [intervalId, setIntervalId] = useState()

    // BUG: shouldn't work like that
    useEffect(() => {
        setIntervalId(
            setInterval(() => {
                setTime((v) => v + 1)
            }, 1000),
        )

        return () => {
            clearInterval(intervalId)
        }
    }, [position, endPosition])

    return (
        <span className="media__playtime">
            {`[${formatTime(time)} / ${formatTime(endTime)}]`}
        </span>
    )
}

export default Timer
