function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function are_isomorphic(graph1, graph2) {
    if (graph1.length !== graph2.length) {
        return false;
    }

    let dgs1 = [];
    let sum1 = 0;
    let dgs2 = [];
    let sum2 = 0;

    for (let i = 0; i < graph1.length; i++) {
        dgs1.push(graph1[i].length);
        sum1 += graph1[i].length;
        dgs2.push(graph2[i].length);
        sum2 += graph2[i].length;
    }

    if (sum1 !== sum2) return false;
    if (!arraysEqual(dgs1.sort(), dgs2.sort())) return false;

    function checkMapping(currentNode, mapping, visited) {
        if (mapping.length === graph1.length) return true;

        const currentDegree = dgs1[currentNode];
        for (let j = 0; j < graph2.length; j++) {
            if (!visited[j] && dgs2[j] === currentDegree) {
                mapping.push(j);
                visited[j] = true;

                let validMapping = true;
                for (const neighbor of graph1[currentNode]) {
                    const neighborMapping = mapping[neighbor];
                    if (neighborMapping === undefined || !graph2[neighborMapping].includes(j)) {
                        validMapping = false;
                        break;
                    }
                }

                if (validMapping) {
                    if (checkMapping(currentNode + 1, mapping, visited)) {
                        return true; // mapping works
                    }
                }
                visited[j] = false;
                mapping.pop();
            }
        }

        return false; // No valid mapping found
    }

    let visited = Array(graph2.length).fill(false);
    for (let node = 0; node < graph1.length; node++) {
        if (checkMapping(node, [], visited)) {
            return true;
        }
    }
    return false; // not isomorphic
}
