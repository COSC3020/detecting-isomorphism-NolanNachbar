
const graphA = [
    [1, 2],
    [0, 3],
    [0, 3],
    [1, 2]
];

const graphB = [
    [1, 2],
    [0, 3],
    [0, 3],
    [1, 2]
];

const graphC = [
    [1, 2],
    [0, 3],
    [0, 3],
    [1, 2]
];

const graphD = [
    [2, 3],
    [1, 3],
    [0, 1],
    [0, 2]
];

const graphE = [
    [1, 2],
    [0],
    [0],
    [4],
    [3]
];

const graphF = [
    [1, 2, 3],
    [0],
    [0],
    [0]
];

// Test cases
const tests = [
    { func: are_isomorphic, graph1: graphA, graph2: graphB, result: true, name: 'Isomorphic Test 1' },
    { func: are_isomorphic, graph1: graphC, graph2: graphD, result: false, name: 'Isomorphic Test 2' },
    { func: are_isomorphic, graph1: graphE, graph2: graphF, result: false, name: 'Non-Isomorphic Test 1' },
];

tests.forEach(test => {
    const output = test.func(test.graph1, test.graph2);
    if (output === test.result) {
        console.log(`${test.name} successful`);
    } else {
        console.error(`${test.name} failed: ${output} != ${test.result}`);
    }
});
