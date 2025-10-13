import { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { createProviderGroup } from "zebar"
import "./reset.css"
import "./main.css"
import UpChecker from "./components/UpChecker/UpChecker"
import Workspaces from "./components/Workspaces/Workspaces"
import Media from "./components/Media/Media"
import * as flags from "country-flag-icons/string/3x2"
import Button from "./components/Button/Button"
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
    // battery: { type: "battery" },
    // memory: { type: "memory" },
    // network: { type: 'network' },
    // media: { type: "media" },
    // cpu: { type: "cpu" },
})

createRoot(document.getElementById("root")).render(<App />)

function App() {
    const [output, setOutput] = useState(providers.outputMap)
    const checkUpTime = [{ name: undefined, url: "https://ktkv.dev" }]

    useEffect(() => {
        providers.onOutput(() => setOutput(providers.outputMap))
    }, [])

    // Get icon to show for current network status.
    // function getNetworkIcon(networkOutput) {
    //     switch (networkOutput.defaultInterface?.type) {
    //         case "ethernet":
    //             return <i className="nf nf-md-ethernet_cable"></i>
    //         case "wifi":
    //             if (networkOutput.defaultGateway?.signalStrength >= 80) {
    //                 return <i className="nf nf-md-wifi_strength_4"></i>
    //             } else if (networkOutput.defaultGateway?.signalStrength >= 65) {
    //                 return <i className="nf nf-md-wifi_strength_3"></i>
    //             } else if (networkOutput.defaultGateway?.signalStrength >= 40) {
    //                 return <i className="nf nf-md-wifi_strength_2"></i>
    //             } else if (networkOutput.defaultGateway?.signalStrength >= 25) {
    //                 return <i className="nf nf-md-wifi_strength_1"></i>
    //             } else {
    //                 return <i className="nf nf-md-wifi_strength_outline"></i>
    //             }
    //         default:
    //             return <i className="nf nf-md-wifi_strength_off_outline"></i>
    //     }
    // }

    // Get icon to show for how much of the battery is charged.
    // function getBatteryIcon(batteryOutput) {
    //     if (batteryOutput.chargePercent > 90)
    //         return <span className="icon"></span>
    //     if (batteryOutput.chargePercent > 70)
    //         return <span className="icon"></span>
    //     if (batteryOutput.chargePercent > 40)
    //         return <span className="icon"></span>
    //     if (batteryOutput.chargePercent > 20)
    //         return <span className="icon"></span>
    //     return <span className="icon"></span>
    // }

    return (
        <div className="app">
            <div className="left">
                {output.glazewm && output.host && <Menu {...output} />}
            </div>

            {/* {output.media && output.glazewm && output.host && (
                <Media {...output} />
            )} */}

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

                {/*                 {output.network && (
                    <div className="network">
                        {getNetworkIcon(output.network)}
                        {output.network.defaultGateway?.ssid}
                    </div>
                )} */}

                {checkUpTime.length > 0 &&
                    checkUpTime.map((machine) => <UpChecker {...machine} />)}

                {/* {output.glazewm && <Awake {...output.glazewm} />} */}

                {/* {output.memory && (
                    <div className="memory">
                        <span className="icon"></span>
                        {Math.round(output.memory.usage)}%
                    </div>
                )} */}

                {/* {output.cpu && (
                    <div className="cpu">
                        <span className="icon"></span>
                        <span
                            className={
                                output.cpu.usage > 85 ? "high-usage" : ""
                            }
                        >
                            {Math.round(output.cpu.usage)}%
                        </span>
                    </div>
                )} */}

                {/* {output.battery && (
                    <div className="battery">
                        {output.battery.isCharging && (
                            <span className="icon">󰚥</span>
                        )}
                        {getBatteryIcon(output.battery)}
                        {Math.round(output.battery.chargePercent)}%
                    </div>
                )} */}

                {output.audio && <Sound {...output} />}
                {output.keyboard && <Language {...output} />}
                {/* {output.keyboard && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: flags[output.keyboard.layout.slice(3, 5)],
                        }}
                        className="keyboard"
                    ></div>
                )} */}

                {output.date && <Time {...output} />}
                {/* {output.systray &&
                    output.systray.icons.map((icon) => <img src={icon.iconUrl} />)} */}
            </div>
        </div>
    )
}
