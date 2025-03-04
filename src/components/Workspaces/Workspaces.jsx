import { useMemo } from "react"
import Button from "../Button/Button"

const Workspaces = ({ allWorkspaces, runCommand }) => {
    const mainRes = useMemo(() => allWorkspaces[0].width, [])

    return (
        <div className="workspaces">
            {allWorkspaces
                .sort((a, b) => a.name - b.name)
                .map((workspace) => (
                    <Button
                        key={workspace.name}
                        onClick={() =>
                            runCommand(`focus --workspace ${workspace.name}`)
                        }
                        className={`workspace ${workspace.hasFocus && "focused"} ${
                            workspace.isDisplayed && "displayed"
                        } ${workspace.width !== mainRes && "workspace--secondary"}`}
                    >
                        {workspace.displayName ?? workspace.name}
                    </Button>
                ))}
        </div>
    )
}

export default Workspaces
