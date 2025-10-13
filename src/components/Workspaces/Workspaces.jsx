import { useEffect, useMemo, useState } from "react"
import Button from "../Button/Button"

const Workspaces = ({ allWorkspaces, runCommand, tilingDirection }) => {
    const [monitors, setMonitors] = useState()
    const mainRes = useMemo(() => allWorkspaces[0].width, [])
    const [activeWorkspace, setActiveWorkspace] = useState()
    const [inactiveWorkspaces, setInactiveWorkspaces] = useState()

    useEffect(() => {
        setActiveWorkspace(allWorkspaces.find((ws) => ws.isDisplayed))
        setInactiveWorkspaces(allWorkspaces.filter((ws) => !ws.isDisplayed))
    }, [allWorkspaces])

    return (
        <>
            <div className="workspaces">
                {activeWorkspace && (
                    <span className="workspace workspace--active">
                        {activeWorkspace.name}
                    </span>
                )}
                <span className="workspace__divider"></span>
                {inactiveWorkspaces &&
                    inactiveWorkspaces.map((ws) => (
                        <span
                            className="workspace"
                            onClick={() =>
                                runCommand(
                                    `focus --workspace ${ws.name}`,
                                )
                            }
                        >
                            {ws.name}
                        </span>
                    ))}
                {/* {allWorkspaces
                    .sort((a, b) => a.name - b.name)
                    .map((workspace) => (
                        <Button
                            key={workspace.name}
                            onClick={() =>
                                runCommand(
                                    `focus --workspace ${workspace.name}`,
                                )
                            }
                            className={`workspace ${workspace.hasFocus && "focused"}
                        ${workspace.isDisplayed && "displayed"}
                        ${workspace.width !== mainRes && "workspace--secondary"}`}
                        >
                            {workspace.displayName ?? workspace.name}
                        </Button>
                    ))} */}
            </div>
            {/* <div className="tiling-direction">
                <Button
                    onClick={() =>
                        runCommand("toggle-tiling-direction")
                    }
                >
                    {tilingDirection === "horizontal"
                        ? "󰓡"
                        : "󰓢"}
                </Button>
            </div> */}
        </>
    )
}

export default Workspaces
