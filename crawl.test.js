const {test, expect} = require('@jest/globals')
const {normalizeURL} = require('./crawl.js')

test("Normalize the url...", () => {
    expect(normalizeURL("https://github.com/selimvuz/")).toBe("github.com/selimvuz");
});