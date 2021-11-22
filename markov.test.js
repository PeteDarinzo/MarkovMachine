const { MarkovMachine } = require("./markov");


describe("Test the Markov Machine", () => {

  let mm;

  beforeAll(() => {
    mm = new MarkovMachine("The cat in the hat");
  })

  test("Test that the machine returns a string.", () => {
    const output = mm.makeText();
    expect(output).toEqual(expect.any(String));
  })

  test("Test the last word is 'hat'", () => {
    const output = mm.makeText();
    expect(output.slice(-3)).toEqual("hat")
  })

})

