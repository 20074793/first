
function eulerlist() {
  const a = parseInt(document.getElementById("a1").value);
  const b = parseInt(document.getElementById("b1").value);
  const l = document.getElementById("l").value.split(" ").map(Number);

  const sum = l.filter(x => x % a === 0 || x % b === 0)
               .reduce((acc, x) => acc + x, 0);

  alert("Sum = " + sum);
}


function euler2Lists() {
  const aList = document.getElementById("aList").value.split(" ").map(Number);
  const mList = document.getElementById("mList").value.split(" ").map(Number);

  const sum = mList.filter(x => aList.some(a => x % a === 0))
                   .reduce((acc, x) => acc + x, 0);

  alert("Sum = " + sum);
}

function euler2Lists1() {
  const aList = document.getElementById("aList").value.split(" ").map(Number);
  const mList = document.getElementById("mList").value.split(" ").map(Number);

  let sum = 0;
  for (let x of mList) {
    for (let a of aList) {
      if (x % a === 0) {
        sum += x;
        break;
      }
    }
  }

  alert("Sum = " + sum);
}