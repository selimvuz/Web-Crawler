async function main() {
    const fetchHTML = require("./crawl");
    url = "https://www.boot.dev/"
    result =  await fetchHTML(url, url, {});
    console.log(result)
}

main()