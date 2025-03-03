import React, { act, useEffect } from "react"
import { useState } from "react"
import Button from "../Button/Button"

const Media = ({ media, glazewm, host }) => {
    const {
        pause,
        next,
        previous,
        play,
        currentSession,
        // Todo: Make current playing position
        // position,
        // endTime,
    } = media
    const [focusedWindow, setFocusedWindow] = useState()

    function getMedia() {
        if (currentSession) {
            return `${[currentSession.artist, currentSession.title].join(" - ")}`
        }
    }

    useEffect(() => {
        setFocusedWindow(glazewm.allWindows.find((window) => window.hasFocus))
    }, [glazewm])

    return currentSession && currentSession.isPlaying ? (
        <div className="center media">
            <Button onClick={previous}>󰒮</Button>
            <Button onClick={() => pause()}>
                <span>󰝚</span>
                {getMedia()}
            </Button>
            <Button onClick={next}>󰒭</Button>
        </div>
    ) : (
        <div className="center title">
            <Button onClick={() => play()}>
                {focusedWindow ? focusedWindow.processName : host.hostname}
            </Button>
        </div>
    )
}

export default Media
