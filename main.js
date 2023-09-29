async function main() {
    const fetchHTML = require("./crawl");
    url = "https://garmoth.com"
    result =  await fetchHTML(url, url, {});
    console.log(result)
}

main()