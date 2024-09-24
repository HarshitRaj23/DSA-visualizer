document.addEventListener('DOMContentLoaded', () => {
    // Global variable to store the selected algorithm
    let selectedAlgorithm = '';

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
        }
    }

    // Function to start the visualization
    window.startVisualization = function() {
        const input = document.getElementById("array-input").value;
        const array = input.split(',').map(Number).filter(d => !isNaN(d));
        const sortOrder = document.getElementById("sort-order").value;


        const visualizationSection = document.getElementById('visualization-section');
        visualizationSection.innerHTML = "<p>Start Visualization has been triggered! Processing your input...</p>";

        if (array.length > 0) {
            visualizationSection.innerHTML += "<p>Valid array received. Proceeding with visualization...</p>";
            visualizationSection.innerHTML += `<p>Array: [${array.join(', ')}]</p>`;

            // Call the appropriate visualization function based on the selected algorithm
            if (selectedAlgorithm === 'bubble-sort') {
                visualizeBubbleSort(array, sortOrder);
            } else if (selectedAlgorithm === 'selection-sort') {
                visualizeSelectionSort(array, sortOrder);
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
                visualizeCountingSort(array, sortOrder); // Add 
            } else {
                alert("Please select a valid algorithm.");
            }
        } else {
            alert("Please enter a valid array of numbers.");
        }
    };

    // Function to visualize Bubble Sort
    function visualizeBubbleSort(array, sortOrder) {
        const width = 1000;
        const height = 500;
        const barWidth = width / array.length;
        const delayBetweenSteps = 1500;
        const duration = 1500;

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

        function updateBars(data, swapIndices) {
            bars.data(data)
                .transition()
                .duration(duration)
                .attr("y", d => height - d * (height / Math.max(...array)))
                .attr("height", d => d * (height / Math.max(...array)))
                .attr("fill", (d, i) => swapIndices.includes(i) ? "orange" : "steelblue");
        }

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
                        updateBars(sortedArray, [i, i + 1]);
                        [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
                        swapped = true;

                        setTimeout(() => updateBars(sortedArray, []), duration);
                    }
                }
                if (swapped) {
                    setTimeout(step, delayBetweenSteps);
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

        bubbleSort(array, sortOrder);
    }

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
