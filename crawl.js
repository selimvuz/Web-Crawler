const fetchHTML = async (baseURL, currentURL, pages) => {
    try {
        const currentUrlObj = new URL(currentURL)
        const baseUrlObj = new URL(baseURL)
        if (currentUrlObj.hostname !== baseUrlObj.hostname){
            console.log("Hostname is different, skipping...");
            return pages
        }
        const response = await fetch(currentURL);
        if (response.status > 399){
            console.log("Got HTTP error, skipping. Please wait...");
            return pages
        }
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log("Got non-html response, skipping...");
            return pages
        }
        if (pages[currentURL]) {
            pages[currentURL]++;
            return pages;
        } else if (currentURL !== baseURL) {
            pages[currentURL] = 1;
        } else {
            pages[currentURL] = 0;
        }
        // Test
        console.log("Fetching the URL: ", currentURL)
        // console.log(pages)
        const html = await response.text();
        let urls = getURLsFromHTML(html, currentURL);
        for (const url of urls) {
            pages = await fetchHTML(baseURL, url, pages)
        }
        return pages
    } catch (error) {
        console.error(`Error fetching HTML: `, currentURL, error.message)
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
        if (tag.href !== baseURL && tag.href !== "/") {
            if (baseURL.slice(-1) === "/") {
                urls.push(baseURL.slice(0, -1) + tag.href)
            } else {
                urls.push(baseURL + tag.href)
            }
        }
    }
    for (let i = 0; i < urls.length; i++) {
        // Remove the last slash for index i
        let normalized = slashRemover(urls[i]);
        urls[i] = normalized;
    }
    return urls
}

const slashRemover = (url) => {
    // If there is a slash at the end of url, remove it
    if (url.slice(-1) === "/") {
        url = url.slice(0, -1)
    }
    return url
}

const removeScheme = (url) => {
    // Define regular expressions to remove from url
    const httpPatterns = [/^https:\/\//, /^http:\/\//]

    // Remove the patterns from url
    for (const pattern of httpPatterns) {
        if (pattern.test(url)) {
            url = url.replace(pattern, "");
        }
    }
    return url
}

// Export the function. Test suites don't support ES so...
module.exports = {
    fetchHTML,
    removeScheme
}