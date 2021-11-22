/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios').default;
const { MarkovMachine } = require("./markov");
const argv = process.argv
var striptags = require('striptags');

const file = argv[2];


// put a file's contents into a Markov Machine then print the output
function markovFile(path) {
    try {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error reading ${path}`, err);
                process.kill(1);
            }
            let mm = new MarkovMachine(data);
            console.log(mm.makeText());
        })
    } catch (err) {
        console.log(`Error reading path ${path}`, err);
        process.kill(1);
    }
}

// print the content of a web page
async function markovUrl(url) {
    try {
        const res = await axios.get(url)
        let mm = new MarkovMachine(striptags(res.data));
        console.log(mm.makeText());
    } catch (err) {
        console.log(`Error fetching ${url}`, err);
        process.kill(1);
    }
}

// get the file/url flag, and source path from the command line
// arguments come after the path to node, and the path to the script, therefore start at index 2 to retrieve the first argument
const fileOrUrl = argv[2]
const source = argv[3];


if (fileOrUrl === "file") {
    markovFile(source);
} else if (fileOrUrl === "url") {
    markovUrl(source);
} else {
    console.log("Can only read from file or url.")
    process.kill(1);
}
