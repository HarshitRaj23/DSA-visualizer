// Global variable to store the selected algorithm
let selectedAlgorithm = '';
// Function to show a specific section and hide others
function showSection(sectionId) {
    // List of all section ids
    const sections = ['sorting-options', 'searching-options', 'graph-options', 'dp-options', 'misc-options'];

    // Hide all sections
    sections.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Hide the visualization section
    document.getElementById('visualization-section').classList.add('hidden');
}

// Function to show visualization for the selected algorithm
function showVisualization(algorithm) {
    // Store the selected algorithm
    selectedAlgorithm = algorithm;

    // Hide all sections
    const sections = ['sorting-options', 'searching-options', 'graph-options', 'dp-options', 'misc-options'];
    sections.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    // Show the visualization section
    document.getElementById('visualization-section').classList.remove('hidden');

    // Clear any previous visualization content
    const visualizationSection = document.getElementById('visualization-section');
    visualizationSection.innerHTML = `<h2>Visualizing ${algorithm.replace('-', ' ').toUpperCase()}</h2>`;
    // Add input form for Bubble Sort
    visualizationSection.innerHTML += `
            <input type="text" id="array-input" placeholder="Enter numbers separated by commas">
            <select id="sort-order">
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
            <button onclick="startVisualization()">Start Visualization</button>
        `;
}

// Function to start the visualization
function startVisualization() {
    // Get the user input from the text field
    const input = document.getElementById("array-input").value;

    // Convert the input string to an array of numbers
    const array = input.split(',').map(Number).filter(d => !isNaN(d));

    // Get the selected sort order (optional, if you have this feature)
    const sortOrder = document.getElementById("sort-order").value;

    // Proof that startVisualization is called
    console.log("Start Visualization function called!");

    // Display a message on the page
    const visualizationSection = document.getElementById('visualization-section');
    visualizationSection.innerHTML = "<p>Start Visualization has been triggered! Processing your input...</p>";

    // Check if the array is not empty
    if (array.length > 0) {
        // Append to the existing content instead of clearing it entirely
        visualizationSection.innerHTML += "<p>Valid array received. Proceeding with visualization...</p>";

        // Display the array on the screen
        visualizationSection.innerHTML += `<p>Array: [${array.join(', ')}]</p>`;

        // Log the array to the console for additional proof
        console.log("Array:", array);
        console.log("Sort Order:", sortOrder);

        // Call the visualization function based on the stored algorithm type
        if (selectedAlgorithm === 'bubble-sort') {
            visualizeBubbleSort(array, sortOrder);
        } else if (selectedAlgorithm === 'selection-sort') {
            visualizeSelectionSort(array, sortOrder); // Ensure this function is correctly defined
        } else if (selectedAlgorithm === 'insertion-sort') {
            visualizeInsertionSort(array, sortOrder);
        } else if (selectedAlgorithm === 'quick-sort') {
            visualizeQuickSort(array, sortOrder);
        } else if (selectedAlgorithm === 'merge-sort') {
            visualizeMergeSort(array, sortOrder);
        } else if (selectedAlgorithm === 'heap-sort') {
            visualizeHeapSort(array, sortOrder);
        } else if (selectedAlgorithm === 'radix-sort') {
            visualizeRadixSort(array, sortOrder);
        } else if (selectedAlgorithm === 'bucket-sort') {
            visualizeBucketSort(array, sortOrder);
        } else if (selectedAlgorithm === 'counting-sort') {
            visualizeCountingSort(array, sortOrder);
        } else {
            alert("Please select a valid algorithm.");
        }
    } else {
        alert("Please enter a valid array of numbers.");
    }
}

// Function to visualize Bubble Sort
function visualizeBubbleSort(array, sortOrder) {
    // Get the width and height of the viewport
    const width = 1000;
    const height = 500; // Leave some space for controls or margin
    const barWidth = width / array.length;
    const delayBetweenSteps = 1500; // Increased delay between steps for slower visualization
    const duration = 1500; // Duration of each transition

    // Create an SVG container to hold the visualization
    const svg = d3.select("#visualization-section").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Create bars for the initial array
    const bars = svg.selectAll("rect")
        .data(array)
        .enter().append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * (height / Math.max(...array))) // Adapt bar height
        .attr("width", barWidth - 1)
        .attr("height", d => d * (height / Math.max(...array))) // Adapt bar height
        .attr("fill", "steelblue");

    // Add index labels
    svg.selectAll("text.index")
        .data(array)
        .enter().append("text")
        .attr("class", "index")
        .attr("x", (d, i) => i * barWidth + barWidth / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text((d, i) => i);

    // Add axes
    const xAxis = d3.axisBottom(d3.scaleLinear().domain([0, array.length]).range([0, width]));
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, Math.max(...array)]).range([height, 0]));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    // Function to update the bars in the SVG with specific colors for swapping
    function updateBars(data, swapIndices) {
        bars.data(data)
            .transition()
            .duration(duration)
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / Math.max(...array))) // Adapt bar height
            .attr("height", d => d * (height / Math.max(...array))) // Adapt bar height
            .attr("fill", (d, i) => swapIndices.includes(i) ? "orange" : "steelblue");
    }

    // Bubble Sort Algorithm
    function bubbleSort(array, order) {
        let i, j;
        const n = array.length;
        let sortedArray = array.slice();

        function step() {
            let swapped = false;
            for (i = 0; i < n - 1; i++) {
                const condition = order === 'ascending' ?
                    sortedArray[i] > sortedArray[i + 1] :
                    sortedArray[i] < sortedArray[i + 1];

                if (condition) {
                    // Change color for the elements being compared
                    updateBars(sortedArray, [i, i + 1]);

                    // Swap elements
                    [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
                    swapped = true;

                    // Update bars with swapped color
                    setTimeout(() => updateBars(sortedArray, []), duration);
                }
            }
            if (swapped) {
                setTimeout(step, delayBetweenSteps); // Increased delay between steps
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

        step();
    }
    // Start the visualization
    bubbleSort(array, sortOrder);
}
// Function to visualize Selection Sort
function visualizeSelectionSort(array, sortOrder) {
    // Get the width and height of the viewport
    const width = 1000;
    const height = 500; // Leave some space for controls or margin
    const barWidth = width / array.length;
    const delayBetweenSteps = 1500; // Increased delay between steps for slower visualization
    const duration = 1000; // Duration of each transition

    // Create an SVG container to hold the visualization
    const svg = d3.select("#visualization-section").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Create bars for the initial array
    const bars = svg.selectAll("rect")
        .data(array)
        .enter().append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * (height / Math.max(...array))) // Adapt bar height
        .attr("width", barWidth - 1)
        .attr("height", d => d * (height / Math.max(...array))) // Adapt bar height
        .attr("fill", "steelblue");

    // Add index labels
    svg.selectAll("text.index")
        .data(array)
        .enter().append("text")
        .attr("class", "index")
        .attr("x", (d, i) => i * barWidth + barWidth / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text((d, i) => i);

    // Add axes
    const xAxis = d3.axisBottom(d3.scaleLinear().domain([0, array.length]).range([0, width]));
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, Math.max(...array)]).range([height, 0]));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    // Function to update the bars in the SVG with specific colors for swapping
    function updateBars(data, swapIndices) {
        bars.data(data)
            .transition()
            .duration(duration)
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / Math.max(...array))) // Adapt bar height
            .attr("height", d => d * (height / Math.max(...array))) // Adapt bar height
            .attr("fill", (d, i) => swapIndices.includes(i) ? "orange" : "steelblue");
    }

    // Selection Sort Algorithm
    function selectionSort(array, order) {
        let i, j, minIndex;
        const n = array.length;
        let sortedArray = array.slice();

        function step(index) {
            if (index >= n) {
                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height / 2)
                    .attr("text-anchor", "middle")
                    .attr("font-size", "24px")
                    .attr("fill", "green")
                    .text("Sorted!");
                return;
            }

            minIndex = index;
            for (j = index + 1; j < n; j++) {
                const condition = order === 'ascending' ?
                    sortedArray[j] < sortedArray[minIndex] :
                    sortedArray[j] > sortedArray[minIndex];

                if (condition) {
                    minIndex = j;
                }
            }

            if (minIndex !== index) {
                // Change color for the elements being compared
                updateBars(sortedArray, [index, minIndex]);

                // Swap elements
                [sortedArray[index], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[index]];

                // Update bars with swapped color
                setTimeout(() => updateBars(sortedArray, []), duration);
            }

            setTimeout(() => step(index + 1), delayBetweenSteps); // Increased delay between steps
        }

        step(0);
    }

    // Start the visualization
    selectionSort(array, sortOrder);
}

// Function to visualize Insertion Sort
function visualizeInsertionSort(array, sortOrder) {
    const width = 1000;
    const height = 500;
    const barWidth = width / array.length;
    const delayBetweenSteps = 1500;
    const duration = 1000;

    const svg = d3.select("#visualization-section").append("svg")
        .attr("width", width)
        .attr("height", height);

    const bars = svg.selectAll("rect")
        .data(array)
        .enter().append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * (height / Math.max(...array)))
        .attr("width", barWidth - 1)
        .attr("height", d => d * (height / Math.max(...array)))
        .attr("fill", "steelblue");

    svg.selectAll("text.index")
        .data(array)
        .enter().append("text")
        .attr("class", "index")
        .attr("x", (d, i) => i * barWidth + barWidth / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text((d, i) => i);

    const xAxis = d3.axisBottom(d3.scaleLinear().domain([0, array.length]).range([0, width]));
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, Math.max(...array)]).range([height, 0]));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    function updateBars(data, highlightedIndices) {
        bars.data(data)
            .transition()
            .duration(duration)
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / Math.max(...array)))
            .attr("height", d => d * (height / Math.max(...array)))
            .attr("fill", (d, i) => highlightedIndices.includes(i) ? "orange" : "steelblue");
    }

    function insertionSort(array, order) {
        let i, j;
        const n = array.length;
        let sortedArray = array.slice();

        function step(k) {
            if (k >= n) {
                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height / 2)
                    .attr("text-anchor", "middle")
                    .attr("font-size", "24px")
                    .attr("fill", "green")
                    .text("Sorted!");
                return;
            }

            let key = sortedArray[k];
            let l = k - 1;

            while (l >= 0 && (order === 'ascending' ? sortedArray[l] > key : sortedArray[l] < key)) {
                sortedArray[l + 1] = sortedArray[l];
                l--;
                updateBars(sortedArray, [l + 1, l + 2]);
                setTimeout(() => updateBars(sortedArray, []), duration);
            }

            sortedArray[l + 1] = key;
            updateBars(sortedArray, [l + 1]);
            setTimeout(() => step(k + 1), delayBetweenSteps);
        }

        step(0);
    }

    insertionSort(array, sortOrder);
}
// Function to visualize Merge Sort
function visualizeMergeSort(array, sortOrder) {
    const width = 1000;
    const height = 500;
    const barWidth = width / array.length;
    const delayBetweenSteps = 1500;
    const duration = 1000;

    const svg = d3.select("#visualization-section").append("svg")
        .attr("width", width)
        .attr("height", height);

    const bars = svg.selectAll("rect")
        .data(array)
        .enter().append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * (height / Math.max(...array)))
        .attr("width", barWidth - 1)
        .attr("height", d => d * (height / Math.max(...array)))
        .attr("fill", "steelblue");

    svg.selectAll("text.index")
        .data(array)
        .enter().append("text")
        .attr("class", "index")
        .attr("x", (d, i) => i * barWidth + barWidth / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text((d, i) => i);

    const xAxis = d3.axisBottom(d3.scaleLinear().domain([0, array.length]).range([0, width]));
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, Math.max(...array)]).range([height, 0]));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    function updateBars(data, highlightedIndices) {
        bars.data(data)
            .transition()
            .duration(duration)
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / Math.max(...array)))
            .attr("height", d => d * (height / Math.max(...array)))
            .attr("fill", (d, i) => highlightedIndices.includes(i) ? "orange" : "steelblue");
    }

    function mergeSort(array, order) {
        const merge = (left, right) => {
            let result = [],
                i = 0,
                j = 0;
            while (i < left.length && j < right.length) {
                if ((order === 'ascending' ? left[i] <= right[j] : left[i] >= right[j])) {
                    result.push(left[i++]);
                } else {
                    result.push(right[j++]);
                }
            }
            return result.concat(left.slice(i)).concat(right.slice(j));
        };

        function sort(array) {
            if (array.length <= 1) return array;
            const middle = Math.floor(array.length / 2);
            const left = array.slice(0, middle);
            const right = array.slice(middle);

            const sortedLeft = sort(left);
            const sortedRight = sort(right);

            return merge(sortedLeft, sortedRight);
        }

        const steps = [];

        function generateSteps(array) {
            if (array.length <= 1) {
                steps.push(array);
                return;
            }
            const middle = Math.floor(array.length / 2);
            const left = array.slice(0, middle);
            const right = array.slice(middle);
            generateSteps(left);
            generateSteps(right);
            steps.push(merge(left, right));
        }

        generateSteps(array);

        let index = 0;

        function step() {
            if (index >= steps.length) {
                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height / 2)
                    .attr("text-anchor", "middle")
                    .attr("font-size", "24px")
                    .attr("fill", "green")
                    .text("Sorted!");
                return;
            }
            updateBars(steps[index], []);
            index++;
            setTimeout(step, delayBetweenSteps);
        }

        step();
    }

    mergeSort(array, sortOrder);
}
// Function to visualize Quick Sort
function visualizeQuickSort(array, sortOrder) {
    const width = 1000;
    const height = 500;
    const barWidth = width / array.length;
    const delayBetweenSteps = 1500;
    const duration = 1000;

    const svg = d3.select("#visualization-section").append("svg")
        .attr("width", width)
        .attr("height", height);

    const bars = svg.selectAll("rect")
        .data(array)
        .enter().append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * (height / Math.max(...array)))
        .attr("width", barWidth - 1)
        .attr("height", d => d * (height / Math.max(...array)))
        .attr("fill", "steelblue");

    svg.selectAll("text.index")
        .data(array)
        .enter().append("text")
        .attr("class", "index")
        .attr("x", (d, i) => i * barWidth + barWidth / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text((d, i) => i);

    const xAxis = d3.axisBottom(d3.scaleLinear().domain([0, array.length]).range([0, width]));
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, Math.max(...array)]).range([height, 0]));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    function updateBars(data, highlightedIndices) {
        bars.data(data)
            .transition()
            .duration(duration)
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / Math.max(...array)))
            .attr("height", d => d * (height / Math.max(...array)))
            .attr("fill", (d, i) => highlightedIndices.includes(i) ? "orange" : "steelblue");
    }

    function quickSort(array, low, high, order) {
        if (low < high) {
            const pi = partition(array, low, high, order);
            updateBars(array, [pi]);
            setTimeout(() => {
                quickSort(array, low, pi - 1, order);
                quickSort(array, pi + 1, high, order);
            }, delayBetweenSteps);
        }

        function partition(array, low, high, order) {
            const pivot = array[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                const condition = order === 'ascending' ?
                    array[j] <= pivot :
                    array[j] >= pivot;

                if (condition) {
                    i++;
                    [array[i], array[j]] = [array[j], array[i]];
                    updateBars(array, [i, j]);
                    setTimeout(() => updateBars(array, []), duration);
                }
            }

            [array[i + 1], array[high]] = [array[high], array[i + 1]];
            updateBars(array, [i + 1]);
            setTimeout(() => updateBars(array, []), duration);

            return i + 1;
        }
    }

    quickSort(array, 0, array.length - 1, sortOrder);
}
// Function to visualize Heap Sort
function visualizeHeapSort(array, sortOrder) {
    const width = 1000;
    const height = 500;
    const barWidth = width / array.length;
    const delayBetweenSteps = 1500;
    const duration = 1000;

    const svg = d3.select("#visualization-section").append("svg")
        .attr("width", width)
        .attr("height", height);

    const bars = svg.selectAll("rect")
        .data(array)
        .enter().append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * (height / Math.max(...array)))
        .attr("width", barWidth - 1)
        .attr("height", d => d * (height / Math.max(...array)))
        .attr("fill", "steelblue");

    svg.selectAll("text.index")
        .data(array)
        .enter().append("text")
        .attr("class", "index")
        .attr("x", (d, i) => i * barWidth + barWidth / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text((d, i) => i);

    const xAxis = d3.axisBottom(d3.scaleLinear().domain([0, array.length]).range([0, width]));
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, Math.max(...array)]).range([height, 0]));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    function updateBars(data, highlightedIndices) {
        bars.data(data)
            .transition()
            .duration(duration)
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / Math.max(...array)))
            .attr("height", d => d * (height / Math.max(...array)))
            .attr("fill", (d, i) => highlightedIndices.includes(i) ? "orange" : "steelblue");
    }

    function heapSort(array, order) {
        function heapify(array, n, i) {
            let largest = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n && (order === 'ascending' ? array[left] > array[largest] : array[left] < array[largest])) {
                largest = left;
            }

            if (right < n && (order === 'ascending' ? array[right] > array[largest] : array[right] < array[largest])) {
                largest = right;
            }

            if (largest !== i) {
                [array[i], array[largest]] = [array[largest], array[i]];
                updateBars(array, [i, largest]);
                setTimeout(() => updateBars(array, []), duration);
                heapify(array, n, largest);
            }
        }

        function sort() {
            const n = array.length;

            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                heapify(array, n, i);
            }

            for (let i = n - 1; i >= 0; i--) {
                [array[0], array[i]] = [array[i], array[0]];
                updateBars(array, [0, i]);
                setTimeout(() => updateBars(array, []), duration);
                heapify(array, i, 0);
            }

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height / 2)
                .attr("text-anchor", "middle")
                .attr("font-size", "24px")
                .attr("fill", "green")
                .text("Sorted!");
        }

        sort();
    }

    heapSort(array, sortOrder);
}
// Function to visualize Radix Sort// Function to visualize Radix Sort
function visualizeRadixSort(array, sortOrder) {
    const width = 1000;
    const height = 500;
    const barWidth = width / array.length;
    const delayBetweenSteps = 1500;
    const duration = 1000;

    const svg = d3.select("#visualization-section").append("svg")
        .attr("width", width)
        .attr("height", height);

    const bars = svg.selectAll("rect")
        .data(array)
        .enter().append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * (height / Math.max(...array)))
        .attr("width", barWidth - 1)
        .attr("height", d => d * (height / Math.max(...array)))
        .attr("fill", "steelblue");

    svg.selectAll("text.index")
        .data(array)
        .enter().append("text")
        .attr("class", "index")
        .attr("x", (d, i) => i * barWidth + barWidth / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text((d, i) => i);

    const xAxis = d3.axisBottom(d3.scaleLinear().domain([0, array.length]).range([0, width]));
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, Math.max(...array)]).range([height, 0]));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    function updateBars(data, highlightedIndices) {
        bars.data(data)
            .transition()
            .duration(duration)
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / Math.max(...array)))
            .attr("height", d => d * (height / Math.max(...array)))
            .attr("fill", (d, i) => highlightedIndices.includes(i) ? "orange" : "steelblue");
    }

    function radixSort(array) {
        const getDigit = (num, digit) => Math.floor(num / Math.pow(10, digit)) % 10;
        const maxDigits = Math.max(...array).toString().length;

        let sortedArray = array.slice();

        for (let digit = 0; digit < maxDigits; digit++) {
            const buckets = Array.from({ length: 10 }, () => []);
            sortedArray.forEach(num => {
                const bucketIndex = getDigit(num, digit);
                buckets[bucketIndex].push(num);
            });

            sortedArray = [].concat(...buckets);
            updateBars(sortedArray, []);
            setTimeout(() => updateBars(sortedArray, []), duration);
        }

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .attr("fill", "green")
            .text("Sorted!");
    }

    radixSort(array);
}
// Function to visualize Bucket Sort
function visualizeBucketSort(array, sortOrder) {
    const width = 1000;
    const height = 500;
    const barWidth = width / array.length;
    const delayBetweenSteps = 1500;
    const duration = 1000;

    const svg = d3.select("#visualization-section").append("svg")
        .attr("width", width)
        .attr("height", height);

    const bars = svg.selectAll("rect")
        .data(array)
        .enter().append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * (height / Math.max(...array)))
        .attr("width", barWidth - 1)
        .attr("height", d => d * (height / Math.max(...array)))
        .attr("fill", "steelblue");

    svg.selectAll("text.index")
        .data(array)
        .enter().append("text")
        .attr("class", "index")
        .attr("x", (d, i) => i * barWidth + barWidth / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text((d, i) => i);

    const xAxis = d3.axisBottom(d3.scaleLinear().domain([0, array.length]).range([0, width]));
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, Math.max(...array)]).range([height, 0]));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    function updateBars(data, highlightedIndices) {
        bars.data(data)
            .transition()
            .duration(duration)
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / Math.max(...array)))
            .attr("height", d => d * (height / Math.max(...array)))
            .attr("fill", (d, i) => highlightedIndices.includes(i) ? "orange" : "steelblue");
    }

    function bucketSort(array) {
        const numBuckets = Math.ceil(Math.sqrt(array.length));
        const buckets = Array.from({ length: numBuckets }, () => []);

        array.forEach(num => {
            const bucketIndex = Math.floor(num / (Math.max(...array) / numBuckets));
            buckets[bucketIndex].push(num);
        });

        let sortedArray = [];

        buckets.forEach(bucket => {
            bucket.sort((a, b) => a - b);
            sortedArray = sortedArray.concat(bucket);
        });

        updateBars(sortedArray, []);
        setTimeout(() => updateBars(sortedArray, []), duration);

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .attr("fill", "green")
            .text("Sorted!");
    }

    bucketSort(array);
}
// Function to visualize Counting Sort
function visualizeCountingSort(array, sortOrder) {
    const width = 1000;
    const height = 500;
    const barWidth = width / array.length;
    const delayBetweenSteps = 1500;
    const duration = 1000;

    const svg = d3.select("#visualization-section").append("svg")
        .attr("width", width)
        .attr("height", height);

    const bars = svg.selectAll("rect")
        .data(array)
        .enter().append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", d => height - d * (height / Math.max(...array)))
        .attr("width", barWidth - 1)
        .attr("height", d => d * (height / Math.max(...array)))
        .attr("fill", "steelblue");

    svg.selectAll("text.index")
        .data(array)
        .enter().append("text")
        .attr("class", "index")
        .attr("x", (d, i) => i * barWidth + barWidth / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text((d, i) => i);

    const xAxis = d3.axisBottom(d3.scaleLinear().domain([0, array.length]).range([0, width]));
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, Math.max(...array)]).range([height, 0]));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    function updateBars(data, highlightedIndices) {
        bars.data(data)
            .transition()
            .duration(duration)
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d * (height / Math.max(...array)))
            .attr("height", d => d * (height / Math.max(...array)))
            .attr("fill", (d, i) => highlightedIndices.includes(i) ? "orange" : "steelblue");
    }

    function countingSort(array) {
        const max = Math.max(...array);
        const min = Math.min(...array);
        const range = max - min + 1;
        const count = Array(range).fill(0);
        const output = Array(array.length);

        array.forEach(num => count[num - min]++);

        for (let i = 1; i < count.length; i++) {
            count[i] += count[i - 1];
        }

        for (let i = array.length - 1; i >= 0; i--) {
            output[count[array[i] - min] - 1] = array[i];
            count[array[i] - min]--;
        }

        updateBars(output, []);
        setTimeout(() => updateBars(output, []), duration);

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .attr("fill", "green")
            .text("Sorted!");
    }

    countingSort(array);
}