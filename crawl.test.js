import {test, expect  from '@jest/globals';
import {normalizeURL} from './crawl.js';

test("Normalize the url...", () => {
    expect(normalizeURL("https://github.com/selimvuz/")).toBe("github.com/selimvuz");
});