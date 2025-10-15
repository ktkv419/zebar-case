import { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { createProviderGroup } from "zebar"
import "./reset.css"
import "./main.css"
import UpChecker from "./components/UpChecker/UpChecker"
import Workspaces from "./components/Workspaces/Workspaces"
import Menu from "./components/Menu/Menu"
import Language from "./components/Language/Language"
import Time from "./components/Time/Time"
import Sound from "./components/Sound/Sound"

const providers = createProviderGroup({
    glazewm: { type: "glazewm" },
    audio: { type: "audio" },
    keyboard: { type: "keyboard" },
    date: { type: "date", formatting: "EEE d MMM HH:mm" },
    host: { type: "host" },
    systray: { type: "systray" },
})

createRoot(document.getElementById("root")).render(<App />)

function App() {
    const [output, setOutput] = useState(providers.outputMap)
    const checkUpTime = [{ name: undefined, url: "https://ktkv.dev" }]

    useEffect(() => {
        providers.onOutput(() => setOutput(providers.outputMap))
    }, [])

    return (
        <div className="app">
            <div className="left">
                {output.glazewm && output.host && <Menu {...output} />}
            </div>

            <div className="right">
                {output.glazewm && <Workspaces {...output.glazewm} />}
                {output.glazewm && (
                    <>
                        {output.glazewm.bindingModes.map((bindingMode) => (
                            <button
                                className="binding-mode"
                                key={bindingMode.name}
                                onClick={() =>
                                    output.glazewm.runCommand(
                                        `wm-disable-binding-mode --name ${bindingMode.name}`,
                                    )
                                }
                            >
                                {bindingMode.displayName ?? bindingMode.name}
                            </button>
                        ))}
                    </>
                )}

                {checkUpTime.length > 0 &&
                    checkUpTime.map((machine) => <UpChecker {...machine} />)}

                {output.audio && <Sound {...output} />}
                {output.keyboard && <Language {...output} />}

                {output.date && <Time {...output} />}
            </div>
        </div>
    )
}
