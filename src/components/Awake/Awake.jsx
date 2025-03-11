import { useEffect, useState } from "react"
import { setLidClose, setScreenTimeout } from "../../commands/awake"

const Awake = ({ runCommand }) => {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (isActive) {
            setLidClose(runCommand, 0)
            setScreenTimeout(runCommand, 0)
        } else {
            setLidClose(runCommand, 1)
            setScreenTimeout(runCommand, 3)
        }
    }, [isActive])

    return (
        <div onClick={() => setIsActive((val) => !val)} className="awake">
            <span className="icon">{isActive ? "" : ""}</span>
        </div>
    )
}

export default Awake
