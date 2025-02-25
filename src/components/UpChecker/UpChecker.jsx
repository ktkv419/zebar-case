import { useEffect } from "react"
import { useState } from "react"

const UpChecker = ({ name, url, interval = 300000 }) => {
    const [isUp, setIsUp] = useState(true)

    useEffect(() => {
        const check = async () => {
            try {
                await fetch(url, {
                    method: "HEAD",
                    mode: "no-cors",
                    cache: "no-store",
                })
                setIsUp(true)
            } catch {
                setIsUp(false)
            }
        }

        check()
        const timer = setInterval(() => {
            check()
        }, interval)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const renderStatus = () => {
        if (!isUp) return "icon--offline"
    }

    return (
        <div className="up-checker">
            <div className={`icon ${renderStatus()}`}></div>
            <span className="up-checker__name">{name}</span>
        </div>
    )
}

export default UpChecker
