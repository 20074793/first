function parseList(str) {
      return str.trim().split(/\s+/).map(Number);
    }

    function computeSum(factors, multiples) {
      return multiples
        .filter(m => factors.some(f => m % f === 0))
        .reduce((sum, n) => sum + n, 0);
    }

    function processInput(input) {
      let [factorStr, multipleStr] = input.split(":").map(s => s.trim());
      let factors = parseList(factorStr);
      let multiples = parseList(multipleStr);
      let result = computeSum(factors, multiples);
      return `${result} : ${factors.join(" ")} : ${multiples.join(" ")}`;
    }

    function calculate() {
      let input = document.getElementById("inputStr").value;
      let output = processInput(input);
      document.getElementById("output").textContent = output;
    }