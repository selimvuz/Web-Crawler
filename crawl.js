const fetchHTML = async (baseURL) => {
    try {
        const response = await fetch(baseURL);
        const html = await response.text();
        let urls = getURLsFromHTML(html, baseURL)
        return urls
    } catch (error) {
        console.error(`Error fetching HTML: `, error)
    }
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    // Link parts of a tags will be stored in this array.
    const urls = []
    // JSDOM
    const {JSDOM} = require("jsdom");
    // Create an object model from html
    const dom = new JSDOM(htmlBody);
    // Select all `a` tags
    const a = dom.window.document.querySelectorAll("a");
    // Push the links to url array
    for (const tag of a) {
        urls.push(baseURL.slice(0, -1) + tag.href)
    }
    for (let i = 0; i < urls.length; i++) {
        // Normalize the element at index i
        let normalized = normalizeURL(urls[i]);
        urls[i] = normalized;
      }
    return urls
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
module.exports = fetchHTML;