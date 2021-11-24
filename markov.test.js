const { MarkovMachine } = require("./markov");


describe("Test the Markov Machine", () => {

  test("Test that the machine returns a string.", () => {
    let mm = new MarkovMachine("The cat in the hat had a chat. Sat on a mat. Sat with a bat.");
    const output = mm.makeText();
    expect(output).toEqual(expect.any(String));
  });


  test('makes a lovely chain', function () {
    let mm = new MarkovMachine('one two one three four one three five one');
    let obj = {
      one: ['two', 'three', 'three', null],
      two: ['one'],
      three: ['four', 'five'],
      four: ['one'],
      five: ['one']
    }
    expect(mm.chains).toEqual(obj);
  });


  test("respects 'numWords'", function () {
    let mm = new MarkovMachine('one two one three four one three five one.');
    for (let i = 0; i < 5; i++) {
      let text = mm.makeText(3);
      expect(text.split(' ').length).toBeGreaterThanOrEqual(1);
      expect(text.split(' ').length).toBeLessThanOrEqual(3);
    }
  });


  test('makes valid texts', function () {
    let mm = new MarkovMachine('one two three');
    for (let i = 0; i < 5; i++) {
      let text = mm.makeText();
      expect(['one two three', 'two three', 'three']).toContain(text);
    }
  });
});

