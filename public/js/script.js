document.addEventListener('DOMContentLoaded', () => {
    // Global variable to store the selected algorithm
    let selectedAlgorithm = '';

    // Data for algorithms (code and YouTube links)
    const algorithmsInfo = {
        'bubble-sort': {
            description: 'Bubble sort is a simple comparison-based sorting algorithm where the largest element bubbles up to the end of the array in each iteration.',
            code: `
                function bubbleSort(arr) {
                    let n = arr.length;
                    for (let i = 0; i < n - 1; i++) {
                        for (let j = 0; j < n - i - 1; j++) {
                            if (arr[j] > arr[j + 1]) {
                                // Swap arr[j] and arr[j + 1]
                                let temp = arr[j];
                                arr[j] = arr[j + 1];
                                arr[j + 1] = temp;
                            }
                        }
                    }
                    return arr;
                }`,
            youtube: 'https://www.youtube.com/watch?v=HGk_ypEuS24'
        },
        'selection-sort': {
            description: 'Selection sort repeatedly finds the minimum element from the unsorted part of the array and places it at the beginning.',
            code: `
                function selectionSort(arr) {
                    let n = arr.length;
                    for (let i = 0; i < n - 1; i++) {
                        let minIndex = i;
                        for (let j = i + 1; j < n; j++) {
                            if (arr[j] < arr[minIndex]) {
                                minIndex = j;
                            }
                        }
                        // Swap the found minimum element with the first element
                        let temp = arr[minIndex];
                        arr[minIndex] = arr[i];
                        arr[i] = temp;
                    }
                    return arr;
                }`,
            youtube: 'https://www.youtube.com/watch?v=HGk_ypEuS24'
        },
        'insertion-sort': {
            description: 'Insertion sort is a simple sorting algorithm that builds a sorted array one element at a time by repeatedly taking the next element from the unsorted part and inserting it into the correct position in the sorted part.',
            code: `
                function insertionSort(arr) {
                    for (let i = 1; i < arr.length; i++) {
                        let key = arr[i];
                        let j = i - 1;
                        while (j >= 0 && arr[j] > key) {
                            arr[j + 1] = arr[j];
                            j--;
                        }
                        arr[j + 1] = key;
                    }
                    return arr;
                }`,
            youtube: 'https://www.youtube.com/watch?v=HGk_ypEuS24'
        },
        'merge-sort': {
            description: 'Merge sort is a divide-and-conquer algorithm that divides the array into halves, sorts each half, and then merges them back together. It is efficient for large datasets.',
            code: `
                function mergeSort(arr) {
                    if (arr.length <= 1) return arr;
                    const mid = Math.floor(arr.length / 2);
                    const left = mergeSort(arr.slice(0, mid));
                    const right = mergeSort(arr.slice(mid));
                    return merge(left, right);
                }
                
                function merge(left, right) {
                    let result = [];
                    let i = 0, j = 0;
                    while (i < left.length && j < right.length) {
                        if (left[i] < right[j]) {
                            result.push(left[i]);
                            i++;
                        } else {
                            result.push(right[j]);
                            j++;
                        }
                    }
                    return result.concat(left.slice(i)).concat(right.slice(j));
                }`,
            youtube: 'https://www.youtube.com/watch?v=ogjf7ORKfd8'
        },
        'quick-sort': {
            description: 'Quick sort is a highly efficient sorting algorithm that uses a divide-and-conquer strategy to select a "pivot" element, partition the array around the pivot, and recursively sort the partitions.',
            code: `
                function quickSort(arr) {
                    if (arr.length <= 1) return arr;
                    const pivot = arr[arr.length - 1];
                    const left = [];
                    const right = [];
                    for (let i = 0; i < arr.length - 1; i++) {
                        if (arr[i] < pivot) {
                            left.push(arr[i]);
                        } else {
                            right.push(arr[i]);
                        }
                    }
                    return [...quickSort(left), pivot, ...quickSort(right)];
                }`,
            youtube: 'https://www.youtube.com/watch?v=WIrA4YexLRQ'
        },
        'heap-sort': {
            description: 'Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max heap from the input array, then repeatedly extracts the maximum element from the heap and rebuilds the heap until sorted.',
            code: `
                function heapSort(arr) {
                    const n = arr.length;
    
                    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                        heapify(arr, n, i);
                    }
    
                    for (let i = n - 1; i > 0; i--) {
                        [arr[0], arr[i]] = [arr[i], arr[0]];
                        heapify(arr, i, 0);
                    }
                    return arr;
                }
    
                function heapify(arr, n, i) {
                    let largest = i;
                    const left = 2 * i + 1;
                    const right = 2 * i + 2;
    
                    if (left < n && arr[left] > arr[largest]) {
                        largest = left;
                    }
    
                    if (right < n && arr[right] > arr[largest]) {
                        largest = right;
                    }
    
                    if (largest !== i) {
                        [arr[i], arr[largest]] = [arr[largest], arr[i]];
                        heapify(arr, n, largest);
                    }
                }`,
            youtube: 'https://www.youtube.com/watch?v=UVW0NfG_YWA'
        },
        'radix-sort': {
            description: 'Radix sort is a non-comparison-based sorting algorithm that sorts numbers by processing individual digits. It works by distributing the numbers into buckets based on their digits and sorting them iteratively.',
            code: `
                function getDigit(num, place) {
                    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
                }
    
                function digitCount(num) {
                    if (num === 0) return 1;
                    return Math.floor(Math.log10(Math.abs(num))) + 1;
                }
    
                function mostDigits(nums) {
                    let maxDigits = 0;
                    for (let num of nums) {
                        maxDigits = Math.max(maxDigits, digitCount(num));
                    }
                    return maxDigits;
                }
    
                function radixSort(arr) {
                    const maxDigits = mostDigits(arr);
                    for (let k = 0; k < maxDigits; k++) {
                        const buckets = Array.from({ length: 10 }, () => []);
                        for (let num of arr) {
                            const digit = getDigit(num, k);
                            buckets[digit].push(num);
                        }
                        arr = [].concat(...buckets);
                    }
                    return arr;
                }`,
            youtube: 'https://www.youtube.com/watch?v=6du1LrLbDpA'
        },
        'bucket-sort': {
            description: 'Bucket sort distributes the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm or recursively applying the bucket sort.',
            code: `
                function bucketSort(arr, numBuckets) {
                    if (arr.length === 0) return arr;
                    const buckets = Array.from({ length: numBuckets }, () => []);
                    const maxVal = Math.max(...arr);
                    const minVal = Math.min(...arr);
                    const range = (maxVal - minVal) / numBuckets;
    
                    for (let num of arr) {
                        const bucketIndex = Math.floor((num - minVal) / range);
                        buckets[Math.min(bucketIndex, numBuckets - 1)].push(num);
                    }
    
                    return buckets.reduce((sorted, bucket) => {
                        return sorted.concat(bucket.sort((a, b) => a - b));
                    }, []);
                }`,
            youtube: 'https://www.youtube.com/watch?v=7mahJ1axrR8'
        },
        'counting-sort': {
            description: 'Counting sort is a non-comparison-based sorting algorithm that works by counting the occurrences of each unique element in the input array and then calculating the positions of each element in the sorted output.',
            code: `
                function countingSort(arr, maxVal) {
                    const count = new Array(maxVal + 1).fill(0);
                    const output = new Array(arr.length);
                    
                    for (let num of arr) {
                        count[num]++;
                    }
    
                    for (let i = 1; i <= maxVal; i++) {
                        count[i] += count[i - 1];
                    }
    
                    for (let i = arr.length - 1; i >= 0; i--) {
                        output[count[arr[i]] - 1] = arr[i];
                        count[arr[i]]--;
                    }
                    return output;
                }`,
            youtube: 'https://www.youtube.com/watch?v=imqr13aIBAY'
        },
        'linear-search': {
            description: 'Linear search is a simple searching algorithm that checks each element of the array sequentially until the desired element is found or the end of the array is reached.',
            code: `
                function linearSearch(arr, target) {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === target) {
                            return i; // Return the index of the target element
                        }
                    }
                    return -1; // Target not found
                }`,
            youtube: 'https://www.youtube.com/watch?v=C46QfTjVCNU'
        },
        'binary-search': {
            description: 'Binary search is a highly efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the portion of the list that could contain the item in half until you narrow down the possible locations to just one.',
            code: `
                function binarySearch(arr, target) {
                    let left = 0;
                    let right = arr.length - 1;
                    
                    while (left <= right) {
                        const mid = Math.floor((left + right) / 2);
                        
                        if (arr[mid] === target) {
                            return mid; // Return the index of the target element
                        } else if (arr[mid] < target) {
                            left = mid + 1;
                        } else {
                            right = mid - 1;
                        }
                    }
                    return -1; // Target not found
                }`,
            youtube: 'https://www.youtube.com/watch?v=MHf6awe89xw'
        },

        'jump-search': {
            description: 'Jump search is a searching algorithm for sorted arrays that works by dividing the array into blocks and jumping ahead by a fixed number of steps to find the target element more quickly than linear search.',
            code: `
                function jumpSearch(arr, target) {
                    const n = arr.length;
                    const jump = Math.floor(Math.sqrt(n));
                    let prev = 0;

                    while (arr[Math.min(jump, n) - 1] < target) {
                        prev = jump;
                        jump += Math.floor(Math.sqrt(n));
                        if (prev >= n) return -1; // Target not found
                    }

                    while (arr[prev] < target) {
                        prev++;
                        if (prev === Math.min(jump, n)) return -1; // Target not found
                    }
                    return arr[prev] === target ? prev : -1; // Return the index of the target element
                }`,
            youtube: 'https://www.youtube.com/watch?v=Va2UraOqeHQ'
        },
        'exponential-search': {
            description: 'Exponential search is a searching algorithm that finds the range where the target element may be present and then uses binary search on that range. It is particularly useful for unbounded or infinite lists.',
            code: `
                function exponentialSearch(arr, target) {
                    if (arr[0] === target) return 0; // Target found at index 0
                    let i = 1;

                    while (i < arr.length && arr[i] <= target) {
                        i *= 2; // Exponentially increase the index
                    }

                    return binarySearch(arr.slice(i / 2, Math.min(i, arr.length)), target); // Use binary search in the identified range
                }`,
            youtube: 'https://www.youtube.com/watch?v=PaGRX7llaWU'
        },
        'interpolation-search': {
            description: 'Interpolation search is an improved variant of binary search that works on the principle of predicting the position of the target element based on the value of the element. It performs better for uniformly distributed arrays.',
            code: `
                function interpolationSearch(arr, target) {
                    let low = 0;
                    let high = arr.length - 1;

                    while (low <= high && target >= arr[low] && target <= arr[high]) {
                        if (low === high) {
                            if (arr[low] === target) return low; // Target found
                            return -1; // Target not found
                        }

                        // Estimate the position of the target
                        const pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (target - arr[low]));

                        if (arr[pos] === target) {
                            return pos; // Target found
                        } else if (arr[pos] < target) {
                            low = pos + 1; // Target is on the right
                        } else {
                            high = pos - 1; // Target is on the left
                        }
                    }
                    return -1; // Target not found
                }`,
            youtube: 'https://www.youtube.com/watch?v=iMVKo1vXVsw'
        },
        'dfs': {
            description: 'Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the root (or an arbitrary node) and explores as far as possible along each branch before backtracking.',
            code: `
                function dfs(graph, start, visited = new Set()) {
                    visited.add(start);
                    console.log(start); // Process the node
                    
                    for (const neighbor of graph[start]) {
                        if (!visited.has(neighbor)) {
                            dfs(graph, neighbor, visited);
                        }
                    }
                }`,
            youtube: 'https://www.youtube.com/watch?v=Qzf1a--rhp8'
        },
        'bfs': {
            description: 'Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the root (or an arbitrary node) and explores all of the neighbor nodes at the present depth before moving on to nodes at the next depth level.',
            code: `
                function bfs(graph, start) {
                    const visited = new Set();
                    const queue = [start];

                    visited.add(start);
                    while (queue.length > 0) {
                        const node = queue.shift();
                        console.log(node); // Process the node

                        for (const neighbor of graph[node]) {
                            if (!visited.has(neighbor)) {
                                visited.add(neighbor);
                                queue.push(neighbor);
                            }
                        }
                    }
                }`,
            youtube: 'https://www.youtube.com/watch?v=-tgVpUgsQ5k'
        },
        'dijkstra': {
            description: 'Dijkstra’s Algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights. It finds the shortest path from a starting node to all other nodes in the graph.',
            code: `
                function dijkstra(graph, start) {
                    const distances = {};
                    const visited = new Set();
                    const pq = new PriorityQueue(); // Priority Queue to hold the nodes
                    
                    for (const node in graph) {
                        distances[node] = Infinity; // Set all distances to Infinity
                    }
                    distances[start] = 0; // Distance to the start node is 0
                    pq.enqueue(start, 0); // Enqueue the start node

                    while (!pq.isEmpty()) {
                        const currentNode = pq.dequeue();
                        visited.add(currentNode);
                        
                        for (const neighbor in graph[currentNode]) {
                            const distance = graph[currentNode][neighbor];
                            const newDistance = distances[currentNode] + distance;

                            if (newDistance < distances[neighbor] && !visited.has(neighbor)) {
                                distances[neighbor] = newDistance;
                                pq.enqueue(neighbor, newDistance); // Enqueue the neighbor with updated distance
                            }
                        }
                    }
                    return distances; // Return the shortest distances from the start node
                }`,
            youtube: 'https://www.youtube.com/watch?v=V6H1qAeB-l4'
        },
        'bellman-ford': {
            description: 'The Bellman-Ford Algorithm is a graph search algorithm that finds the shortest path from a single source node to all other nodes in a graph, allowing for negative weight edges.',
            code: `
                function bellmanFord(graph, start) {
                    const distances = {};
                    
                    for (const node in graph) {
                        distances[node] = Infinity; // Set all distances to Infinity
                    }
                    distances[start] = 0; // Distance to the start node is 0

                    for (let i = 1; i < Object.keys(graph).length; i++) {
                        for (const node in graph) {
                            for (const neighbor in graph[node]) {
                                const distance = graph[node][neighbor];
                                if (distances[node] + distance < distances[neighbor]) {
                                    distances[neighbor] = distances[node] + distance; // Update distance
                                }
                            }
                        }
                    }
                    return distances; // Return the shortest distances from the start node
                }`,
            youtube: 'https://www.youtube.com/watch?v=0vVofAhAYjc'
        },
        'floyd-warshall': {
            description: 'The Floyd-Warshall Algorithm is a dynamic programming algorithm used to find the shortest paths in a weighted graph with positive or negative edge weights (but with no negative cycles).',
            code: `
                function floydWarshall(graph) {
                    const dist = JSON.parse(JSON.stringify(graph)); // Copy the graph

                    for (const k in graph) {
                        for (const i in graph) {
                            for (const j in graph) {
                                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                                    dist[i][j] = dist[i][k] + dist[k][j]; // Update distance
                                }
                            }
                        }
                    }
                    return dist; // Return the matrix of shortest distances
                }`,
            youtube: 'https://www.youtube.com/watch?v=YbY8cVwWAvw'
        },
        'a-star': {
            description: 'The A* (A-star) Algorithm is a popular pathfinding and graph traversal algorithm that is used to find the shortest path from a start node to a target node while considering the cost and heuristic distance.',
            code: `
                function aStar(graph, start, goal) {
                    const openSet = new Set([start]);
                    const cameFrom = {};
                    const gScore = {};
                    const fScore = {};

                    for (const node in graph) {
                        gScore[node] = Infinity; // Initial cost from start to node
                        fScore[node] = Infinity; // Estimated total cost from start to goal through node
                    }
                    gScore[start] = 0; // Cost to start is 0
                    fScore[start] = heuristic(start, goal); // Heuristic estimate

                    while (openSet.size > 0) {
                        const current = getLowestFScoreNode(openSet, fScore); // Get the node with lowest fScore

                        if (current === goal) {
                            return reconstructPath(cameFrom, current); // Return the reconstructed path
                        }
                        openSet.delete(current);
                        
                        for (const neighbor in graph[current]) {
                            const tentativeGScore = gScore[current] + graph[current][neighbor];
                            if (tentativeGScore < gScore[neighbor]) {
                                cameFrom[neighbor] = current; // Record the best path
                                gScore[neighbor] = tentativeGScore;
                                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal);
                                openSet.add(neighbor); // Add to open set if not already present
                            }
                        }
                    }
                    return []; // Return an empty path if no path exists
                }`,
            youtube: 'https://www.youtube.com/watch?v=PzEWHH2v3TE'
        },
        'kruskal': {
            description: 'Kruskal’s Algorithm is a minimum spanning tree algorithm that finds an edge set that connects all vertices in a graph while minimizing the total edge weight.',
            code: `
                function kruskal(graph) {
                    const edges = getAllEdges(graph);
                    const parent = {};
                    const rank = {};
                    const mst = [];

                    edges.sort((a, b) => a.weight - b.weight); // Sort edges by weight

                    for (const edge of edges) {
                        const { u, v } = edge;
                        if (find(parent, u) !== find(parent, v)) {
                            mst.push(edge); // Include edge in the MST
                            union(parent, rank, u, v);
                        }
                    }
                    return mst; // Return the edges of the minimum spanning tree
                }`,
            youtube: 'https://www.youtube.com/watch?v=DMnDM_sxVig'
        },
        'prim': {
            description: 'Prim’s Algorithm is another minimum spanning tree algorithm that builds the MST one vertex at a time, starting from an arbitrary vertex and expanding to the nearest unconnected vertex.',
            code: `
                function prim(graph) {
                    const mst = [];
                    const visited = new Set();
                    const minHeap = new MinHeap(); // Min-Heap to hold edges
                    
                    const start = Object.keys(graph)[0];
                    visited.add(start);
                    for (const neighbor in graph[start]) {
                        minHeap.insert({ weight: graph[start][neighbor], u: start, v: neighbor });
                    }

                    while (!minHeap.isEmpty()) {
                        const { u, v, weight } = minHeap.extractMin(); // Get the edge with minimum weight
                        if (!visited.has(v)) {
                            visited.add(v);
                            mst.push({ u, v, weight }); // Add to the MST
                            for (const neighbor in graph[v]) {
                                if (!visited.has(neighbor)) {
                                    minHeap.insert({ weight: graph[v][neighbor], u: v, v: neighbor });
                                }
                            }
                        }
                    }
                    return mst; // Return the edges of the minimum spanning tree
                }`,
            youtube: 'https://www.youtube.com/watch?v=mJcZjjKzeqk'
        },
        'topological-sort': {
            description: 'Topological Sort is a linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge u -> v, vertex u comes before v in the ordering.',
            code: `
                function topologicalSort(graph) {
                    const visited = new Set();
                    const result = [];

                    function visit(node) {
                        if (!visited.has(node)) {
                            visited.add(node);
                            for (const neighbor of graph[node]) {
                                visit(neighbor);
                            }
                            result.push(node); // Push the node to the result stack
                        }
                    }

                    for (const node in graph) {
                        visit(node);
                    }
                    return result.reverse(); // Return the reverse order
                }`,
            youtube: 'https://www.youtube.com/watch?v=5lZ0iJMrUMk'
        },
        'tarjan': {
            description: 'Tarjan’s Algorithm is used to find the strongly connected components (SCCs) in a directed graph. It performs a depth-first search and maintains indices and low-link values to find the components.',
            code: `
                function tarjan(graph) {
                    const index = {};
                    const lowLink = {};
                    const onStack = {};
                    const stack = [];
                    const sccs = [];
                    let idx = 0;

                    function strongconnect(node) {
                        index[node] = lowLink[node] = idx++;
                        stack.push(node);
                        onStack[node] = true;

                        for (const neighbor of graph[node]) {
                            if (!(neighbor in index)) {
                                strongconnect(neighbor);
                                lowLink[node] = Math.min(lowLink[node], lowLink[neighbor]); // Update low link
                            } else if (onStack[neighbor]) {
                                lowLink[node] = Math.min(lowLink[node], index[neighbor]); // Update low link
                            }
                        }

                        if (lowLink[node] === index[node]) {
                            const scc = [];
                            let w;
                            do {
                                w = stack.pop();
                                onStack[w] = false;
                                scc.push(w);
                            } while (w !== node);
                            sccs.push(scc); // Store the strongly connected component
                        }
                    }

                    for (const node in graph) {
                        if (!(node in index)) {
                            strongconnect(node);
                        }
                    }
                    return sccs; // Return the strongly connected components
                }`,
            youtube: 'https://www.youtube.com/watch?v=qrAub5z8FeA'
        },
        'kahn': {
            description: 'Kahn’s Algorithm is used for topological sorting of a directed acyclic graph (DAG) using in-degree (number of incoming edges) of vertices.',
            code: `
                function kahn(graph) {
                    const inDegree = {};
                    const result = [];
                    const queue = [];

                    for (const node in graph) {
                        inDegree[node] = 0; // Initialize in-degree
                    }

                    for (const node in graph) {
                        for (const neighbor of graph[node]) {
                            inDegree[neighbor] += 1; // Calculate in-degree
                        }
                    }

                    for (const node in inDegree) {
                        if (inDegree[node] === 0) {
                            queue.push(node); // Add nodes with zero in-degree to the queue
                        }
                    }

                    while (queue.length > 0) {
                        const node = queue.shift();
                        result.push(node); // Process the node

                        for (const neighbor of graph[node]) {
                            inDegree[neighbor] -= 1; // Decrease in-degree
                            if (inDegree[neighbor] === 0) {
                                queue.push(neighbor); // Add to queue if in-degree becomes zero
                            }
                        }
                    }
                    return result; // Return the topological order
                }`,
            youtube: 'https://www.youtube.com/watch?v=73sneFXuTEg'
        },
        'hamiltonian-path': {
            description: 'The Hamiltonian Path/Cycle Problem involves finding a path in a graph that visits each vertex exactly once. If the path ends at the starting vertex, it is called a Hamiltonian Cycle. This problem is NP-complete, meaning there is no known efficient solution for all graphs.',
            code: `
                function hamiltonian(graph) {
                    const path = [];

                    function isHamiltonianUtil(v, visited, pos) {
                        if (pos === graph.length) {
                            return graph[path[pos - 1]].includes(path[0]); // Check if last vertex connects to first for cycle
                        }

                        for (let neighbor of graph[v]) {
                            if (!visited[neighbor]) {
                                visited[neighbor] = true;
                                path.push(neighbor);

                                if (isHamiltonianUtil(neighbor, visited, pos + 1)) {
                                    return true; // Continue the path
                                }

                                visited[neighbor] = false; // Backtrack
                                path.pop();
                            }
                        }
                        return false; // No Hamiltonian path found
                    }

                    for (let i = 0; i < graph.length; i++) {
                        const visited = new Array(graph.length).fill(false);
                        visited[i] = true;
                        path.push(i);
                        if (isHamiltonianUtil(i, visited, 1)) {
                            return path; // Return the Hamiltonian path
                        }
                        path.pop();
                    }
                    return []; // Return empty if no path found
                }`,
            youtube: 'https://www.youtube.com/watch?v=dQr4wZCiJJ4'
        },
        'fibonacci': {
            description: 'The Fibonacci Sequence is a series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1. This algorithm can be solved using dynamic programming to avoid redundant calculations.',
            code: `
                function fibonacci(n) {
                    if (n <= 1) return n;
                    const fib = [0, 1];
                    for (let i = 2; i <= n; i++) {
                        fib[i] = fib[i - 1] + fib[i - 2];
                    }
                    return fib[n];
                }`,
            youtube: 'https://www.youtube.com/watch?v=YkBch12jNE0'
        },
        'knapsack': {
            description: 'The Knapsack Problem is a classic optimization problem where the goal is to maximize the total value of items placed in a knapsack without exceeding its weight capacity. This implementation uses dynamic programming to find the optimal solution.',
            code: `
                function knapsack(weights, values, capacity) {
                    const n = values.length;
                    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

                    for (let i = 1; i <= n; i++) {
                        for (let w = 0; w <= capacity; w++) {
                            if (weights[i - 1] <= w) {
                                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
                            } else {
                                dp[i][w] = dp[i - 1][w];
                            }
                        }
                    }
                    return dp[n][capacity];
                }`,
            youtube: 'https://www.youtube.com/watch?v=GqOmJHQZivw'
        },
        'lcs': {
            description: 'The Longest Common Subsequence (LCS) problem seeks to find the longest subsequence that is common to two sequences. This dynamic programming approach builds a matrix to track lengths of common subsequences.',
            code: `
                function lcs(x, y) {
                    const m = x.length, n = y.length;
                    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

                    for (let i = 1; i <= m; i++) {
                        for (let j = 1; j <= n; j++) {
                            if (x[i - 1] === y[j - 1]) {
                                dp[i][j] = dp[i - 1][j - 1] + 1;
                            } else {
                                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                            }
                        }
                    }
                    return dp[m][n];
                }`,
            youtube: 'https://www.youtube.com/watch?v=NPZn9jBrX8U'
        },
        'lis': {
            description: 'The Longest Increasing Subsequence (LIS) problem finds the longest subsequence of a given sequence in which the elements are in sorted order. This dynamic programming solution has a time complexity of O(n^2).',
            code: `
                function lis(arr) {
                    const n = arr.length;
                    const dp = Array(n).fill(1);

                    for (let i = 1; i < n; i++) {
                        for (let j = 0; j < i; j++) {
                            if (arr[i] > arr[j]) {
                                dp[i] = Math.max(dp[i], dp[j] + 1);
                            }
                        }
                    }
                    return Math.max(...dp);
                }`,
            youtube: 'https://www.youtube.com/watch?v=ekcwMsSIzVc'
        },
        'edit-distance': {
            description: 'The Edit Distance (Levenshtein distance) problem measures the minimum number of edits (insertions, deletions, substitutions) required to transform one string into another. This dynamic programming approach builds a matrix to calculate the distance.',
            code: `
                function editDistance(str1, str2) {
                    const m = str1.length, n = str2.length;
                    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

                    for (let i = 0; i <= m; i++) {
                        for (let j = 0; j <= n; j++) {
                            if (i === 0) {
                                dp[i][j] = j; // Min. operations = j
                            } else if (j === 0) {
                                dp[i][j] = i; // Min. operations = i
                            } else if (str1[i - 1] === str2[j - 1]) {
                                dp[i][j] = dp[i - 1][j - 1];
                            } else {
                                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                            }
                        }
                    }
                    return dp[m][n];
                }`,
            youtube: 'https://www.youtube.com/watch?v=fJaKO8FbDdo'
        },
        'matrix-chain': {
            description: 'The Matrix Chain Multiplication problem aims to determine the most efficient way to multiply a given sequence of matrices. This dynamic programming solution minimizes the total number of scalar multiplications.',
            code: `
                function matrixChainOrder(p) {
                    const n = p.length - 1;
                    const dp = Array(n).fill().map(() => Array(n).fill(0));

                    for (let length = 2; length <= n; length++) {
                        for (let i = 0; i < n - length + 1; i++) {
                            const j = i + length - 1;
                            dp[i][j] = Infinity;

                            for (let k = i; k < j; k++) {
                                const q = dp[i][k] + dp[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
                                if (q < dp[i][j]) {
                                    dp[i][j] = q;
                                }
                            }
                        }
                    }
                    return dp[0][n - 1]; // Return minimum cost
                }`,
            youtube: 'https://www.youtube.com/watch?v=vRVfmbCFW7Y'
        },
        'union-find': {
            description: 'The Union-Find (Disjoint Set) data structure is used to keep track of a partition of a set into disjoint subsets. It supports two primary operations: union (joining two subsets) and find (finding the subset a particular element belongs to).',
            code: `
                class UnionFind {
                    constructor(size) {
                        this.parent = Array.from({ length: size }, (_, index) => index);
                        this.rank = Array(size).fill(1);
                    }

                    find(x) {
                        if (this.parent[x] !== x) {
                            this.parent[x] = this.find(this.parent[x]); // Path compression
                        }
                        return this.parent[x];
                    }

                    union(x, y) {
                        const rootX = this.find(x);
                        const rootY = this.find(y);
                        if (rootX !== rootY) {
                            // Union by rank
                            if (this.rank[rootX] > this.rank[rootY]) {
                                this.parent[rootY] = rootX;
                            } else if (this.rank[rootX] < this.rank[rootY]) {
                                this.parent[rootX] = rootY;
                            } else {
                                this.parent[rootY] = rootX;
                                this.rank[rootX]++;
                            }
                        }
                    }
                }`,
            youtube: 'https://www.youtube.com/watch?v=aBxjDBC4M1U'
        },
        'reservoir-sampling': {
            description: 'Reservoir Sampling is a randomized algorithm for selecting a simple random sample of `k` items from a list of `n` items, where `n` is either a very large or unknown number. It ensures that each item has an equal probability of being selected.',
            code: `
                function reservoirSampling(stream, k) {
                    const reservoir = [];

                    for (let i = 0; i < k; i++) {
                        reservoir[i] = stream[i];
                    }

                    for (let i = k; i < stream.length; i++) {
                        const j = Math.floor(Math.random() * (i + 1));
                        if (j < k) {
                            reservoir[j] = stream[i];
                        }
                    }
                    return reservoir;
                }`,
            youtube: 'https://www.youtube.com/watch?v=r_Wxym8Q5TY'
        },
        'kmp': {
            description: 'The Knuth-Morris-Pratt (KMP) algorithm is a string matching algorithm that searches for occurrences of a pattern within a text string in linear time. It uses a preprocessing phase to create a partial match table (also known as the "prefix table") to skip unnecessary comparisons.',
            code: `
                function KMP(text, pattern) {
                    const m = pattern.length;
                    const n = text.length;
                    const lps = Array(m).fill(0);
                    let j = 0; // index for pattern
                    
                    computeLPSArray(pattern, m, lps);
                    
                    let i = 0; // index for text
                    while (n > i) {
                        if (pattern[j] === text[i]) {
                            i++;
                            j++;
                        }
                        if (j === m) {
                            console.log('Pattern found at index ' + (i - j));
                            j = lps[j - 1];
                        } else if (i < n && pattern[j] !== text[i]) {
                            if (j !== 0) {
                                j = lps[j - 1];
                            } else {
                                i++;
                            }
                        }
                    }
                }

                function computeLPSArray(pattern, m, lps) {
                    let len = 0; // length of previous longest prefix suffix
                    lps[0] = 0; // lps[0] is always 0
                    let i = 1;

                    while (i < m) {
                        if (pattern[i] === pattern[len]) {
                            len++;
                            lps[i] = len;
                            i++;
                        } else {
                            if (len !== 0) {
                                len = lps[len - 1];
                            } else {
                                lps[i] = 0;
                                i++;
                            }
                        }
                    }
                }`,
            youtube: 'https://www.youtube.com/watch?v=lhhqbGH7Pao'
        },
        'boyer-moore': {
            description: 'The Boyer-Moore algorithm is a highly efficient string searching algorithm that skips sections of the text based on mismatched characters. It utilizes pre-processing to create two tables: the bad character table and the good suffix table.',
            code: `
                function boyerMoore(text, pattern) {
                    const m = pattern.length;
                    const n = text.length;
                    const badChar = Array(256).fill(-1);

                    for (let i = 0; i < m; i++) {
                        badChar[pattern.charCodeAt(i)] = i;
                    }

                    let s = 0; // shift of the pattern
                    while (s <= n - m) {
                        let j = m - 1;

                        while (j >= 0 && pattern[j] === text[s + j]) {
                            j--;
                        }

                        if (j < 0) {
                            console.log('Pattern found at index ' + s);
                            s += (s + m < n) ? m - badChar[text.charCodeAt(s + m)] : 1;
                        } else {
                            s += Math.max(1, j - badChar[text.charCodeAt(s + j)]);
                        }
                    }
                }`,
            youtube: 'https://www.youtube.com/watch?v=4Xyhb72LCX4'
        }
        // Add similar details for other algorithms (insertion-sort, quick-sort, merge-sort, etc.)
    };

    // Function to show a specific section and hide others
    function showSection(sectionId) {
        const sections = ['sorting-options', 'searching-options', 'graph-options', 'dp-options', 'misc-options'];

        // Hide all sections
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.classList.add('hidden');
            }
        });

        // Show the selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.remove('hidden');
        }

        // Hide the visualization section when switching sections
        const visualizationSection = document.getElementById('visualization-section');
        if (visualizationSection) {
            visualizationSection.classList.add('hidden');
        }
    }

    // Function to show visualization for the selected algorithm
    function showVisualization(algorithm) {
        selectedAlgorithm = algorithm;

        // Hide all sections
        const sections = ['sorting-options', 'searching-options', 'graph-options', 'dp-options', 'misc-options'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.classList.add('hidden');
            }
        });

        const visualizationSection = document.getElementById('visualization-section');
        const algorithmDetails = document.getElementById('algorithm-details');

        if (visualizationSection) {
            visualizationSection.classList.remove('hidden');
            visualizationSection.innerHTML = `
                <h2>Visualizing ${algorithm.replace('-', ' ').toUpperCase()}</h2>
                <input type="text" id="array-input" placeholder="Enter numbers separated by commas">
                <select id="sort-order">
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
                <button onclick="startVisualization()">Start Visualization</button>
            `;

            // Show algorithm details
            const details = algorithmsInfo[algorithm];
            algorithmDetails.innerHTML = `
                <h3>Algorithm Details</h3>
                <p><strong>Description:</strong> ${details.description}</p>
                <h3>Code:</h3>
                <pre>${details.code}</pre>
                <h3>Video Tutorial:</h3>
                <iframe width="560" height="315" src="${details.youtube.replace('watch?v=', 'embed/')}" 
                frameborder="0" allowfullscreen></iframe>
            `;
            algorithmDetails.classList.remove('hidden');
        }
    }

    // Function to start the visualization
    window.startVisualization = function() {
        const input = document.getElementById("array-input").value;
        const array = input.split(',').map(Number).filter(d => !isNaN(d));
        const sortOrder = document.getElementById("sort-order").value;

        const visualizationSection = document.getElementById('visualization-section');
        visualizationSection.innerHTML = "<p>Start Visualization has been triggered! Processing your input...</p>";

        setTimeout(() => {
            if (array.length > 0) {
                visualizationSection.innerHTML += "<p>Valid array received. Proceeding with visualization...</p>";
                visualizationSection.innerHTML += `<p>Array: [${array.join(', ')}]</p>`;

                // Call the appropriate visualization function based on the selected algorithm
                switch (selectedAlgorithm) {
                    // Sorting Algorithms
                    case 'bubble-sort':
                        visualizeBubbleSort(array, sortOrder);
                        break;
                    case 'selection-sort':
                        visualizeSelectionSort(array, sortOrder);
                        break;
                    case 'insertion-sort':
                        visualizeInsertionSort(array, sortOrder);
                        break;
                    case 'quick-sort':
                        visualizeQuickSort(array, sortOrder);
                        break;
                    case 'merge-sort':
                        visualizeMergeSort(array, sortOrder);
                        break;
                    case 'heap-sort':
                        visualizeHeapSort(array, sortOrder);
                        break;
                    case 'radix-sort':
                        visualizeRadixSort(array, sortOrder);
                        break;
                    case 'bucket-sort':
                        visualizeBucketSort(array, sortOrder);
                        break;
                    case 'counting-sort':
                        visualizeCountingSort(array, sortOrder);
                        break;
                    // Searching Algorithms
                    case 'linear-search':
                        visualizeLinearSearch(array, searchValue);
                        break;
                    case 'binary-search':
                        visualizeBinarySearch(array, searchValue);
                        break;
                    case 'jump-search':
                        visualizeJumpSearch(array, searchValue);
                        break;
                    case 'exponential-search':
                        visualizeExponentialSearch(array, searchValue);
                        break;
                    case 'interpolation-search':
                        visualizeInterpolationSearch(array, searchValue);
                        break;
                    // Graph Algorithms
                    case 'dfs':
                        visualizeDFS(graph);
                        break;
                    case 'bfs':
                        visualizeBFS(graph);
                        break;
                    case 'dijkstra':
                        visualizeDijkstra(graph, startNode);
                        break;
                    case 'bellman-ford':
                        visualizeBellmanFord(graph, startNode);
                        break;
                    case 'floyd-warshall':
                        visualizeFloydWarshall(graph);
                        break;
                    case 'a-star':
                        visualizeAStar(graph, startNode, endNode);
                        break;
                    case 'kruskal':
                        visualizeKruskal(graph);
                        break;
                    case 'prim':
                        visualizePrim(graph);
                        break;
                    case 'topological-sort':
                        visualizeTopologicalSort(graph);
                        break;
                    case 'tarjan':
                        visualizeTarjan(graph);
                        break;
                    case 'kahn':
                        visualizeKahn(graph);
                        break;
                    case 'hamiltonian-path':
                        visualizeHamiltonianPath(graph);
                        break;
                    // Dynamic Programming Algorithms
                    case 'fibonacci':
                        visualizeFibonacci(n);
                        break;
                    case 'knapsack':
                        visualizeKnapsack(weights, values, capacity);
                        break;
                    case 'lcs':
                        visualizeLCS(string1, string2);
                        break;
                    case 'lis':
                        visualizeLIS(array);
                        break;
                    case 'edit-distance':
                        visualizeEditDistance(string1, string2);
                        break;
                    case 'matrix-chain':
                        visualizeMatrixChain(dimensions);
                        break;
                    // Miscellaneous Algorithms
                    case 'union-find':
                        visualizeUnionFind(sets);
                        break;
                    case 'reservoir-sampling':
                        visualizeReservoirSampling(array);
                        break;
                    case 'kmp':
                        visualizeKMP(text, pattern);
                        break;
                    case 'boyer-moore':
                        visualizeBoyerMoore(text, pattern);
                        break;
                    default:
                        alert("Please select a valid algorithm.");
                        break;
                }
            } else {
                alert("Please enter a valid array of numbers.");
            }
        }, 1000); // Show the valid array message after a 1 second delay
    };

    function visualizeBubbleSort(array, sortOrder = 'ascending') {
        const width = 1000;
        const height = 500;
        const barWidth = width / array.length;
        const delayBetweenSteps = 1500;
        const duration = 1000;
        
        // Create the SVG canvas for visualization
        const svg = d3.select("#visualization-section").html('')  // Clear any previous visualizations
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    
        const maxValue = Math.max(...array); // To avoid recalculating max in every step
    
        // Draw the initial bars
        const bars = svg.selectAll("rect")
            .data(array)
            .enter().append("rect")
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / maxValue))  // Consistent height calculation
            .attr("width", barWidth - 1)
            .attr("height", d => d * (height / maxValue))  // Consistent height calculation
            .attr("fill", "steelblue");
    
        // Create text labels for the bar values
        const textLabels = svg.selectAll("text.value")
            .data(array)
            .enter().append("text")
            .attr("class", "value")
            .attr("x", (d, i) => i * barWidth + barWidth / 2)
            .attr("y", d => height - d * (height / maxValue) - 5)  // Consistent position calculation
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black")
            .text(d => d);
    
        // Bubble sort algorithm with visualization
        function bubbleSort(array, order) {
            const n = array.length;
            let sortedArray = array.slice();
            let i = 0, j = 0;
    
            function step() {
                if (i < n - 1) {
                    if (j < n - i - 1) {
                        // Determine whether to swap based on sortOrder
                        const condition = order === 'ascending'
                            ? sortedArray[j] > sortedArray[j + 1]
                            : sortedArray[j] < sortedArray[j + 1];
    
                        // Highlight the bars being compared (before swapping)
                        updateBars(sortedArray, [j, j + 1], true);
    
                        if (condition) {
                            // Swap the bars
                            [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
    
                            // Update bars with a transition effect after swapping
                            setTimeout(() => updateBars(sortedArray, [j, j + 1], false), duration);
                        }
    
                        j++;
                        setTimeout(step, delayBetweenSteps);  // Proceed to the next comparison step
                    } else {
                        j = 0;
                        i++;
                        setTimeout(step, delayBetweenSteps);  // Move to the next pass of the algorithm
                    }
                } else {
                    svg.append("text")
                        .attr("x", width / 2)
                        .attr("y", height / 2)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "24px")
                        .attr("fill", "green")
                        .text("Sorted!");
                }
            }
    
            step();  // Start the sorting steps
        }
    
        // Function to update the bars and text positions after each step
        function updateBars(data, swapIndices, isComparing) {
            bars.data(data)
                .transition()
                .duration(duration)
                .attr("y", d => height - d * (height / maxValue))
                .attr("height", d => d * (height / maxValue))
                // Yellow for comparing, orange for swapping, steelblue for normal
                .attr("fill", (d, i) => isComparing && swapIndices.includes(i) 
                    ? "yellow" : swapIndices.includes(i) 
                    ? "orange" : "steelblue");
    
            // Update the text labels to reflect the new values
            textLabels.data(data)
                .transition()
                .duration(duration)
                .attr("y", d => height - d * (height / maxValue) - 5)
                .text(d => d);
        }
    
        // Call the bubble sort with visualization
        bubbleSort(array, sortOrder);
    }    

    // Function to visualize Selection Sort
    function visualizeSelectionSort(array, sortOrder = 'ascending') {
        const width = 1000;
        const height = 500;
        const barWidth = width / array.length;
        const delayBetweenSteps = 1500;
        const duration = 1000;
    
        // Create the SVG canvas for visualization
        const svg = d3.select("#visualization-section").html('')  // Clear any previous visualizations
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    
        const maxValue = Math.max(...array); // To avoid recalculating max in every step
    
        // Draw the initial bars
        const bars = svg.selectAll("rect")
            .data(array)
            .enter().append("rect")
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / maxValue))  // Consistent height calculation
            .attr("width", barWidth - 1)
            .attr("height", d => d * (height / maxValue))  // Consistent height calculation
            .attr("fill", "steelblue");
    
        // Create text labels for the bar values
        const textLabels = svg.selectAll("text.value")
            .data(array)
            .enter().append("text")
            .attr("class", "value")
            .attr("x", (d, i) => i * barWidth + barWidth / 2)
            .attr("y", d => height - d * (height / maxValue) - 5)  // Consistent position calculation
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black")
            .text(d => d);
    
        // Selection sort algorithm with visualization
        function selectionSort(array, order) {
            const n = array.length;
            let sortedArray = array.slice();
            let i = 0;
    
            function step() {
                if (i < n - 1) {
                    let minIndex = i;
    
                    // Find the minimum element's index in the remaining unsorted array
                    for (let j = i + 1; j < n; j++) {
                        // Determine whether to update the minimum index based on sortOrder
                        const condition = order === 'ascending'
                            ? sortedArray[j] < sortedArray[minIndex]
                            : sortedArray[j] > sortedArray[minIndex];
    
                        if (condition) {
                            minIndex = j;
                        }
                    }
    
                    // Highlight the bars being compared
                    updateBars(sortedArray, [i, minIndex], true);
    
                    // Swap the found minimum element with the first element
                    if (minIndex !== i) {
                        [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
                        // Update bars with a transition effect after swapping
                        setTimeout(() => updateBars(sortedArray, [i, minIndex], false), duration);
                    }
    
                    i++;
                    setTimeout(step, delayBetweenSteps);  // Proceed to the next iteration
                } else {
                    svg.append("text")
                        .attr("x", width / 2)
                        .attr("y", height / 2)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "24px")
                        .attr("fill", "green")
                        .text("Sorted!");
                }
            }
    
            step();  // Start the sorting steps
        }
    
        // Function to update the bars and text positions after each step
        function updateBars(data, swapIndices, isComparing) {
            bars.data(data)
                .transition()
                .duration(duration)
                .attr("y", d => height - d * (height / maxValue))
                .attr("height", d => d * (height / maxValue))
                // Yellow for comparing, orange for swapping, steelblue for normal
                .attr("fill", (d, i) => isComparing && swapIndices.includes(i) 
                    ? "yellow" : swapIndices.includes(i) 
                    ? "orange" : "steelblue");
    
            // Update the text labels to reflect the new values
            textLabels.data(data)
                .transition()
                .duration(duration)
                .attr("y", d => height - d * (height / maxValue) - 5)
                .text(d => d);
        }
    
        // Call the selection sort with visualization
        selectionSort(array, sortOrder);
    }
    

    // Function to visualize Insertion Sort
    function visualizeInsertionSort(array, sortOrder = 'ascending') {
        const width = 1000;
        const height = 500;
        const barWidth = width / array.length;
        const delayBetweenSteps = 1500;
        const duration = 1000;
    
        // Create the SVG canvas for visualization
        const svg = d3.select("#visualization-section").html('')  // Clear any previous visualizations
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    
        const maxValue = Math.max(...array); // To avoid recalculating max in every step
    
        // Draw the initial bars using the array values as heights
        const bars = svg.selectAll("rect")
            .data(array)
            .enter().append("rect")
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / maxValue))  // Set y position based on the value
            .attr("width", barWidth - 1)
            .attr("height", d => d * (height / maxValue))  // Set height based on the value
            .attr("fill", "steelblue");
    
        // Create text labels for the bar values
        const textLabels = svg.selectAll("text.value")
            .data(array)
            .enter().append("text")
            .attr("class", "value")
            .attr("x", (d, i) => i * barWidth + barWidth / 2)
            .attr("y", d => height - d * (height / maxValue) - 5)  // Set position based on the value
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black")
            .text(d => d);
    
        // Insertion sort algorithm with visualization
        function insertionSort(array, order) {
            const n = array.length;
            let sortedArray = array.slice();
    
            function step(i) {
                if (i < n) {
                    let key = sortedArray[i];
                    let j = i - 1;
    
                    // Move elements of sortedArray[0..i-1], that are greater than key, to one position ahead of their current position
                    function innerStep() {
                        if (j >= 0 && ((order === 'ascending' && sortedArray[j] > key) || (order === 'descending' && sortedArray[j] < key))) {
                            // Highlight the bars being compared
                            updateBars(sortedArray, [j, j + 1], true);
    
                            // Move the element to the right
                            sortedArray[j + 1] = sortedArray[j];
    
                            // Update the bars after moving
                            setTimeout(() => updateBars(sortedArray, [j, j + 1], false), duration);
                            j--;
                            setTimeout(innerStep, duration);  // Proceed to the next comparison step
                        } else {
                            sortedArray[j + 1] = key; // Place the key at the correct position
    
                            // Update bars with a transition effect after inserting
                            setTimeout(() => {
                                updateBars(sortedArray, [j + 1], false);
                                setTimeout(() => step(i + 1), delayBetweenSteps);  // Move to the next iteration
                            }, duration);
                        }
                    }
    
                    innerStep();  // Start the inner loop
                } else {
                    svg.append("text")
                        .attr("x", width / 2)
                        .attr("y", height / 2)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "24px")
                        .attr("fill", "green")
                        .text("Sorted!");
                }
            }
    
            step(1);  // Start the sorting steps
        }
    
        // Function to update the bars and text positions after each step
        function updateBars(data, swapIndices, isComparing) {
            bars.data(data)
                .transition()
                .duration(duration)
                .attr("y", d => height - d * (height / maxValue)) // Set y position based on the value
                .attr("height", d => d * (height / maxValue))  // Set height based on the value
                // Yellow for comparing, orange for moving, steelblue for normal
                .attr("fill", (d, i) => isComparing && swapIndices.includes(i) 
                    ? "yellow" : swapIndices.includes(i) 
                    ? "orange" : "steelblue");
    
            // Update the text labels to reflect the new values
            textLabels.data(data)
                .transition()
                .duration(duration)
                .attr("y", d => height - d * (height / maxValue) - 5) // Set position based on the value
                .text(d => d);
        }
    
        // Call the insertion sort with visualization
        insertionSort(array, sortOrder);
    }
    
    // Function to visualize Quick Sort
    
    
    

    // Function to visualize Merge Sort    

    // Function to visualize Heap Sort
   
    // Function to visualize Radix Sort
    
    
    // Function to visualize Bucket Sort
    
    // Function to visualize Counting Sort
    

    // Attach showSection to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetSection = event.target.getAttribute('data-section');
            if (targetSection) {
                showSection(targetSection);
            } else {
                const algorithm = event.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                if (algorithm) {
                    showVisualization(algorithm);
                }
            }
        });
    });
});
