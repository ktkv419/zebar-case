import { useCallback, useEffect } from "react"
import { useState } from "react"

const UpChecker = ({ name, url, interval = 300000 }) => {
    const [isUp, setIsUp] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const check = useCallback(async () => {
        setIsLoading(true)
        try {
            await fetch(url, {
                method: "HEAD",
                mode: "no-cors",
                cache: "no-store",
            })
            setIsUp(true)
        } catch {
            setIsUp(false)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        check()
        const timer = setInterval(() => {
            check()
        }, interval)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div onClick={check} className="up-checker">
            <div
                className={`icon${isLoading ? " icon--loading" : ""}${!isUp ? " icon--offline" : ""}`}
            ></div>
            {name && <span className="up-checker__name">{name}</span>}
        </div>
    )
}

export default UpChecker
