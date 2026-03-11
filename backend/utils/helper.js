
const responseFormat = (status, data,message) => {
    return { status: status, data: data, message: message }
}

export { responseFormat }