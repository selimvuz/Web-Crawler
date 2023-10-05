import {fetchHTML, removeScheme} from "./crawl.js";
import {errorGetter} from "./crawl.js";
import readline from 'readline';

async function main() {
    // Create readline interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

    // Function to get user input
    const question = (prompt) => {
        return new Promise((resolve) => {
          rl.question(prompt, (answer) => {
            resolve(answer);
          });
        });
      };

    // Get user input
    const url = await question('Enter url to be crawled: ');
    console.log(`Starting to crawl ${url}...`);

    // Close readline interface
    rl.close();

    // Crawl the url
    let sloppyResult = await fetchHTML(url, url, {}, 0);
    let refinedResult = {};

    
    for (let key in sloppyResult) {
        // Remove the schemes from urls
        let normalizedURL = removeScheme(key);
        refinedResult[normalizedURL] = sloppyResult[key];
    }

    // Get the total number of errors
    let errorCount = errorGetter()

    console.log("Crawling is completed.");
    console.log("Total number of paths: ", Object.keys(refinedResult).length);
    console.log("Invalid path count: ", errorCount);
    console.log("Paths: ", refinedResult);
}

main()