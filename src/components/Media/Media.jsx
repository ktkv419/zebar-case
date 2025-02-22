import React, { useEffect } from "react"
import { useState } from "react"

const Media = ({ media, glazewm, host }) => {
    const {
        allSessions,
        pause,
        currentSession,
        next,
        previous,
        play,
        // Todo: Make current playing position
        // position,
        // endTime,
    } = media
    const [isPlaying, setIsPlaying] = useState(false)
    const [focusedWindow, setFocusedWindow] = useState()

    function getMedia() {
        if (currentSession) {
            return `󰝚 ${[currentSession.artist, currentSession.title].join(
                " - "
            )}`
        }
    }

    const handleStop = () => {
        setIsPlaying(false)
        pause()
    }

    useEffect(() => {
        setFocusedWindow(glazewm.allWindows.find((window) => window.hasFocus))
    }, [glazewm])

    useEffect(() => {
        console.log(allSessions)

        if (allSessions.some((session) => session.isPlaying)) {
            setIsPlaying(true)
        } else {
            setIsPlaying(false)
        }
    }, [allSessions])

    return isPlaying && allSessions?.length > 0 ? (
        <div className="center">
            <div className="media__btn-box">
                <span className="btn" onClick={async () => previous()}>
                    󰒮
                </span>
                <span onClick={async () => handleStop()} className="btn">
                    {getMedia()}
                </span>
                <span className="btn" onClick={async () => next()}>
                    󰒭
                </span>
            </div>
        </div>
    ) : focusedWindow ? (
        <div
            className="center title"
            onClick={async () => {
                play()
            }}
        >
            <span className={`btn`}>{focusedWindow.processName}</span>
        </div>
    ) : (
        <div
            className="center title"
            onClick={async () => {
                play()
            }}
        >
            <span className={`btn`}>{host.hostname}</span>
        </div>
    )
}

export default Media
