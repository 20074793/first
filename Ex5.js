// Ex5.js

let parse = (i) => {
  const o = parseInt(i);
  if (isNaN(o)) throw ("NaN");
  return o;
};

function sumOfMultiples(factors, multiples) {
  // Disallow 0 as a factor (m % 0 is invalid)
  if (factors.some(f => f === 0)) throw ("NaN");
  const matches = multiples.filter(m => factors.some(f => m % f === 0));
  return matches.reduce((acc, n) => acc + n, 0);
}

function processInputStrict(raw) {
  const original = (raw || "").trim();
  try {
    if (!original.includes(":")) throw ("NaN");

    const [left, right] = original.split(":");
    const leftTokens = left.trim().split(/[,\s]+/).filter(Boolean);
    const rightTokens = right.trim().split(/[,\s]+/).filter(Boolean);

    // Parse with the strict parse(i) that throws on NaN
    const factors = leftTokens.map(parse);
    const multiples = rightTokens.map(parse);

    if (factors.length === 0 || multiples.length === 0) throw ("NaN");

    const ans = sumOfMultiples(factors, multiples);
    // Echo original input after the answer (as per lecturer examples)
    return `${ans} : ${original}`;
  } catch (_) {
    return `corrupt : ${original}`;
  }
}


function processInputLenient(raw) {
  const original = (raw || "").trim();

  if (!original.includes(":")) return `corrupt : ${original}`;

  const [left, right] = original.split(":");
  const leftTokens = left.trim().split(/[,\s]+/).filter(Boolean);
  const rightTokens = right.trim().split(/[,\s]+/).filter(Boolean);

  // Keep only valid integers; ignore bad tokens
  const toIntSafe = (t) => {
    const n = parseInt(t);
    return Number.isFinite(n) ? n : null;
  };

  let factors = leftTokens.map(toIntSafe).filter(n => n !== null && n !== 0);
  let multiples = rightTokens.map(toIntSafe).filter(n => n !== null);

  if (factors.length === 0 || multiples.length === 0) {
    return `corrupt : ${original}`;
  }

  const ans = sumOfMultiples(factors, multiples);
  return `${ans} : ${original}`;
}

function calculate5Strict() {
  const input = document.getElementById("inputStr").value;
  document.getElementById("output").textContent = processInputStrict(input);
}

function calculate5Lenient() {
  const input = document.getElementById("inputStr").value;
  document.getElementById("output").textContent = processInputLenient(input);
}
