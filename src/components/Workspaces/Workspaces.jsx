import { useEffect, useRef, useState } from "react"

const Workspaces = ({ currentWorkspaces, runCommand }) => {
    const [workspaces, setWorkspaces] = useState()
    const [currentWorkspace, setCurrentWorkspace] = useState()
    const selector = useRef(null)
    const [size, setSize] = useState()

    useEffect(() => {
        if (selector.current) {
            selector.current.style
        }
    }, [selector])

    useEffect(() => {
        const _currentWorkspaces = [...document.querySelectorAll(".workspace")]
        setWorkspaces(_currentWorkspaces)
        setCurrentWorkspace(currentWorkspaces.findIndex((tab) => tab.hasFocus))
    }, [currentWorkspaces])

    useEffect(() => {
        if (currentWorkspace >= 0) {
            setSize({
                height: workspaces[currentWorkspace].clientHeight,
                width: workspaces[currentWorkspace].clientWidth,
                offset: workspaces[currentWorkspace].getBoundingClientRect(),
            })
        }
    }, [currentWorkspace])

    useEffect(() => {
        if (selector.current && size?.width) {
            selector.current.style.left = `${
                size.offset.left - size.width / 2
            }px`
            selector.current.style.width = `${size.width}px`
            selector.current.style.height = `${size.height}px`
        }
    }, [size, selector])

    return (
        <div className="workspaces">
            <div className="workspace__selector" ref={selector}></div>
            {currentWorkspaces.map((workspace) => (
                <button
                    className={`workspace ${workspace.hasFocus && "focused"} ${
                        workspace.isDisplayed && "displayed"
                    }`}
                    onClick={() =>
                        runCommand(
                            `focus --workspace ${workspace.name}`
                        )
                    }
                    key={workspace.name}
                >
                    {workspace.displayName ?? workspace.name}
                </button>
            ))}
        </div>
    )
}

export default Workspaces
