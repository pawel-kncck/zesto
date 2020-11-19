export const getInitialsFromDisplayName = (displayName) => {
    const firstName = displayName.substring(0, displayName.indexOf(' '))
    const lastName = displayName.substring(displayName.lastIndexOf(' ') + 1, displayName.length)

    const initials = firstName.substr(0, 1).toUpperCase() + lastName.substr(0, 1).toUpperCase()

    return initials
}