import { useEffect, useState } from "react"
import { toTitleCase } from "../../utils/strings"

const Menu = ({ glazewm, host }) => {
    const [focusedWindow, setFocusedWindow] = useState()

    useEffect(() => {
        setFocusedWindow(glazewm.allWindows.find((window) => window.hasFocus))
    }, [glazewm])

    return (
        <div className="menu">
            <span className="menu__icon icon"></span>
            <span className="menu__name">
                {focusedWindow
                    ? toTitleCase(focusedWindow.processName)
                    : toTitleCase(host.hostname)}
            </span>
        </div>
    )
}

export default Menu
