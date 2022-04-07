function formatParameter(data) {
    return Object.keys(data).map(key=>(`${key}=${data[key]}`)).join('&')
}

export default formatParameter