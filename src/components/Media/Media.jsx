import React, { act, useEffect } from "react"
import { useState } from "react"

const Media = ({ media, glazewm, host }) => {
    const {
        allSessions,
        pause,
        next,
        previous,
        play,
        // Todo: Make current playing position
        // position,
        // endTime,
    } = media
    const [focusedWindow, setFocusedWindow] = useState()
    const [currentSession, setCurrentSession] = useState(undefined)

    function getMedia() {
        if (currentSession) {
            return `󰝚 ${[currentSession.artist, currentSession.title].join(" - ")}`
        }
    }

    const handleStop = () => {
        setCurrentSession(undefined)
        pause()
    }

    useEffect(() => {
        setFocusedWindow(glazewm.allWindows.find((window) => window.hasFocus))
    }, [glazewm])

    useEffect(() => {
        const activeSession = allSessions.find((session) => session.isPlaying)
        setCurrentSession(activeSession)
    }, [allSessions])

    return currentSession && allSessions?.length > 0 ? (
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
