const fs = require('fs');
const jsc = require('jsverify');
eval(fs.readFileSync('code.js') + '');

const graphA = {
    0: [[1, 1], [2, 2]],
    1: [[0, 1], [2, 1]],
    2: [[0, 2], [1, 1]],
};

const graphB = {
    0: [[1, 1], [2, 2]],
    1: [[0, 1], [2, 1]],
    2: [[0, 2], [1, 1]],
};

const graphC = {
    0: [[1, 1]],
    1: [[0, 1], [2, 1]],
    2: [[1, 1]],
};

const isoTests = [
    { graph1: graphA, graph2: graphB, expected: true, name: "Graphs A and B isomorphism test" },
    { graph1: graphA, graph2: graphC, expected: false, name: "Graphs A and C isomorphism test" },
];

isoTests.forEach(test => {
    const output = are_isomorphic(test.graph1, test.graph2);
    if (output === test.expected) {
        console.log(`${test.name} successful`);
    } else {
        console.error(`${test.name} failed: ${output} != ${test.expected}`);
    }
});
