async function main() {
    const {fetchHTML, removeScheme} = require("./crawl");
    url = "https://www.boot.dev/"

    sloppyResult = await fetchHTML(url, url, {});
    let refinedResult = {};

    for (let key in sloppyResult) {
        // Remove the schemes from urls
        let normalizedURL = removeScheme(key);
        refinedResult[normalizedURL] = sloppyResult[key];
    }

    console.log("Crawling is completed.");
    console.log("Total number of paths: ", Object.keys(refinedResult).length);
    console.log("Paths: ", refinedResult);
}

main()