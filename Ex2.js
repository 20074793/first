// Standard Project Euler Problem 1 (3 or 5 below 1000)

function euler1() {
 let sum = 0;
for (let i = 1; i < 1000; i++) {
  if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  alert("Sum of multiples of 3 or 5 below 1000 is: " + sum);
}


// Custom multiples with user input A, B, N
function eulerCustom() {
  let a = parseInt(document.getElementById("a").value);
  let b = parseInt(document.getElementById("b").value);
  let n = parseInt(document.getElementById("n").value);

  if (isNaN(a) || isNaN(b) || isNaN(n)) {
    alert("Please enter valid numbers for A, B, and N.");
    return;
  }

  let sum = 0;
  for (let i = 1; i < n; i++) {
    if (i % a === 0 || i % b === 0) {
      sum += i;
    }
  }

  alert(`Sum of multiples of ${a} or ${b} below ${n} is: ${sum}`);
}
