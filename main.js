async function main() {
    const fetchHTML = require("./crawl");
    result =  await fetchHTML(`https://leetcode.com/`);
    console.log(result)
}

main()