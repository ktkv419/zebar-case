import { useEffect, useState } from "react"

const Language = ({ keyboard }) => {
    const [shownLanguage, setShownLanguage] = useState("")
    useEffect(() => {
        if (keyboard.layout.includes("US")) {
            setShownLanguage("A")
        } else if (keyboard.layout.includes("RU")) {
            setShownLanguage("РУ")
        } else {
            setShownLanguage(output.keyboard.layout.slice(3, 5))
        }
    }, [keyboard])
    return (
        <span
            className={`language${shownLanguage === "A" ? "" : " language--secondary"}`}
        >
            {shownLanguage}
        </span>
    )
}

export default Language
