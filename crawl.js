const getURLsFromHTML = (htmlBody, baseURL) => {
    console.log("I will write")
}

const normalizeURL = (url) => {
    // Define regular expressions to remove from url
    const httpPatterns = [/^https:\/\//, /^http:\/\//]

    // If there is a slash at the end of url, remove it
    if (url.slice(-1) === "/") {
        url = url.slice(0, -1)
    }

    // Removing patterns from regex array
    for (const pattern of httpPatterns) {
        if (pattern.test(url)) {
            url = url.replace(pattern, "");
        }
    }
    return url
}

// Export the function. Test suites don't support ES so...
module.exports = {
    normalizeURL,
    getURLsFromHTML
}