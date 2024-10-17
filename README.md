# Graph Isomorphism

Devise an algorithm to determine whether two given graphs are isomorphic or not.
It takes two graphs as an argument and returns `true` or `false`, depending on
whether the graphs are isomorphic or not. Your algorithm needs to handle both
the case where the two graphs are isomorphic and where they are not isomorphic.

Hint: Your algorithm does not need to be the best possible algorithm, but should
avoid unnecessarily repeating work.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the worst-case big $\Theta$ time complexity of your algorithm?

Recall my code,
```js
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

    for (let i = 0; i < graph1.length; i++) { // This is $O(v)$
        dgs1.push(graph1[i].length);
        sum1 += graph1[i].length;
        dgs2.push(graph2[i].length);
        sum2 += graph2[i].length;
    }

    if (sum1 !== sum2) return false;
    if (!arraysEqual(dgs1.sort(), dgs2.sort())) return false; // Sorting has a complexity of $\Theta(v \log v)$

    function checkMapping(currentNode, mapping, visited) {
        if (mapping.length === graph1.length) return true;

        const currentDegree = dgs1[currentNode];
        for (let j = 0; j < graph2.length; j++) { // This is $O(v)$
            if (!visited[j] && dgs2[j] === currentDegree) {
                mapping.push(j);
                visited[j] = true;

                let validMapping = true;
                for (const neighbor of graph1[currentNode]) { // This is $O(v)$
                    const neighborMapping = mapping[neighbor];
                    if (neighborMapping === undefined || !graph2[neighborMapping].includes(j)) {
                        validMapping = false;
                        break;
                    }
                }
                if (validMapping) {
                    if (checkMapping(currentNode + 1, mapping, visited)) { // This is the recurence part which will check every possible permutation of the graph $\Theta(v!)$
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
    for (let node = 0; node < graph1.length; node++) { // This loop will run $O(v)$ times 
        if (checkMapping(node, [], visited)) {
            return true;
        }
    }
    return false; // not isomorphic
}
```

Combining all the complexities we have $\Theta(v) + \Theta(v \log v) + \Theta(v)* \Theta(v)* \Theta(v!) \in \Theta(v^2 v!)$.
This makes sense because my code will check every possible permutation of the vertices to see if the mapping works, this is $\Theta(v!)$. For each of those permutations it will iterate over all $v$ vertices and check all $\approx v$ neighbors to see if the mapping works $\Theta(v^2)$. $$\Theta(v!)* \Theta(v^2) = \Theta(v! \cdot v^2)$$
 
I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.

I used this to help me write ```arraysEqual```: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript

I created most of the code myself but I use this to help me figure out how to write my checkmapping function although I mainly used it conceptually. I also used it to check my complexity analysis results:
https://github.com/COSC3020/detecting-isomorphism-Assel-Aljazwe
