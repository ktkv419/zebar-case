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
        position,
        endTime,
    } = media
    const [isPlaying, setIsPlaying] = useState(false)
    const [focusedWindow, setFocusedWindow] = useState()

    function getMedia() {
        if (currentSession) {
            return `${currentSession.artist} - ${currentSession.title}`
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
        if (allSessions.some((session) => session.isPlaying)) setIsPlaying(true)
    }, [allSessions])

    return isPlaying && allSessions?.length > 0 ? (
        <div className="center">
            <div className="media__btn-box">
                <span
                    className="media__btn media__btn--prev"
                    onClick={async () => previous()}
                >
                    󰒮
                </span>
                <span
                    onClick={async () => handleStop()}
                    className={`media__btn media__title${
                        currentSession.isPlaying ? "" : " media__title--stopped"
                    }`}
                >
                    {getMedia()}
                </span>
                <span
                    className="media__btn media__btn--next"
                    onClick={async () => next()}
                >
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
            <span className={`media__btn`}>{focusedWindow.processName}</span>
        </div>
    ) : (
        <div
            className="center title"
            onClick={async () => {
                play()
            }}
        >
            <span className={`media__btn`}>{host.hostname}</span>
        </div>
    )
}

export default Media
