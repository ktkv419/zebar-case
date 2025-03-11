export const setLidClose = (runCommand, value) => {
    runCommand(`shell-exec powercfg -setacvalueindex SCHEME_CURRENT SUB_BUTTONS LIDACTION ${value}`)
    runCommand(`shell-exec powercfg -setdcvalueindex SCHEME_CURRENT SUB_BUTTONS LIDACTION ${value}`)
}

export const setScreenTimeout = (runCommand, value) => {
    runCommand(`shell-exec powercfg -change -standby-timeout-ac ${value}`)
    runCommand(`shell-exec powercfg -change -standby-timeout-dc ${value}`)
}