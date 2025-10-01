  <script>
    function eulerCustom() {
      let a = parseInt(document.getElementById("a").value);
      let b = parseInt(document.getElementById("b").value);
      let n = parseInt(document.getElementById("n").value);

      let sum = 0;

      for (let i = 1; i < n; i++) {
        if (i % a === 0 || i % b === 0) {
          sum += i;
        }
      }

      document.getElementById("result").innerText = 
        `The sum of multiples of ${a} or ${b} below ${n} is: ${sum}`;
    }
  </script>