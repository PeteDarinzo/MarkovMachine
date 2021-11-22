/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/); // A string of characters enclosed in square brackets ([]) matches any one character in that string.
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // get distinct words
    let distinctWords = [];
    this.distinctWords = distinctWords;
    for (let word of this.words) {
      if (!(this.distinctWords.includes(word))) {
        this.distinctWords.push(word);
      }
    }


    let chains = {};
    this.chains = chains;

    for (let word of this.distinctWords) {
      this.chains[word] = []; // populate chains object with each distinct word, and an empty array
    }

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      if (i === (this.words.length - 1)) { // if at the last word, push null, since no words follow
        (chains[word]).push(null);
      } else {
        let nextWord = this.words[i + 1]; // get next word
        if (!((this.chains[word]).includes(nextWord))) { // if the next word isn't part of the current word's chain
          (this.chains[word]).push(nextWord); // push the next word onto the chain
          if(word[word.length - 1] === '.' ) {
            (this.chains[word]).push(null); // if word ends in a period, also push null
          }
        }
      }
    }
    // console.log("Chains: ", chains);
  }


  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  getNextWord(currentWord) {
    let nextWord = "";
    if ((this.chains[currentWord]).length > 1) { // if the word has more than one word in its chain
      let nextIndex = this.getRandomInt((this.chains[currentWord]).length)
      nextWord = (this.chains[currentWord])[nextIndex];  // randomly select one
    } else {
      nextWord = (this.chains[currentWord])[0]; // otherwise just select the next word
    }
    return nextWord;
  }

  isCapital(char) {
    const caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return caps.indexOf(char) !== -1;
  }


  /** return random text from chains */

  makeText(numWords = 100) {

    let text = []; // empty array for result
    let wordCount = 0;

    let startingWord = "start";

    // randomly select words until a capitalized one is found, that will be the starting word
    while(!(this.isCapital(startingWord[0]))) {
      let startIndex = this.getRandomInt(this.distinctWords.length)
      startingWord = this.distinctWords[startIndex]; // pick a random word
    }

    text.push(startingWord); // push the starting word onto the output text array
    let word = startingWord;
    let nextWord = this.getNextWord(word);



    while ((nextWord !== null) && (wordCount <= numWords)) { // at some point the next word will be null, or the max number of words will be reached
      text.push(nextWord); // add the next word and increment word count
      wordCount++;
      word = nextWord;
      nextWord = this.getNextWord(word);
    }
    return text.join(' ');
  }
}

module.exports = { MarkovMachine }