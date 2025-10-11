// Ex5.js

// Lecturer-provided strict parser
let parse = (i) => {
  const o = parseInt(i);
  if (isNaN(o)) throw ("NaN");
  return o;
};

// Compute sum of multiples (for both modes)
function sumOfMultiples(factors, multiples) {
  if (factors.some(f => f === 0)) throw ("NaN"); // forbid 0 factor
  const matches = multiples.filter(m => factors.some(f => m % f === 0));
  return matches.reduce((acc, n) => acc + n, 0);
}

/* STRICT VERSION: any bad token -> corrupt */
function processInputStrict(raw) {
  const original = (raw || "").trim();
  try {
    if (!original.includes(":")) throw ("NaN");

    const [left, right] = original.split(":");
    const leftTokens = left.trim().split(/[,\s]+/).filter(Boolean);
    const rightTokens = right.trim().split(/[,\s]+/).filter(Boolean);

    const factors = leftTokens.map(parse);
    const multiples = rightTokens.map(parse);

    if (factors.length === 0 || multiples.length === 0) throw ("NaN");

    const ans = sumOfMultiples(factors, multiples);
    return `${ans} : ${original}`;
  } catch (_) {
    return `corrupt : ${original}`;
  }
}

/* LENIENT VERSION: drop bad tokens; if nothing usable -> corrupt */
function processInputLenient(raw) {
  const original = (raw || "").trim();
  if (!original.includes(":")) return `corrupt : ${original}`;

  const [left, right] = original.split(":");
  const leftTokens = left.trim().split(/[,\s]+/).filter(Boolean);
  const rightTokens = right.trim().split(/[,\s]+/).filter(Boolean);

  const safeInt = (t) => {
    const n = parseInt(t);
    return Number.isFinite(n) ? n : null;
  };

  const factors = leftTokens.map(safeInt).filter(n => n !== null && n !== 0);
  const multiples = rightTokens.map(safeInt).filter(n => n !== null);

  if (factors.length === 0 || multiples.length === 0) {
    return `corrupt : ${original}`;
  }

  const ans = sumOfMultiples(factors, multiples);
  return `${ans} : ${original}`;
}

// Hook to your page
function calculate5Strict() {
  const input = document.getElementById("inputStr").value;
  document.getElementById("output").textContent = processInputStrict(input);
   // alert(output); // 👈 popup result

}
function calculate5Lenient() {
  const input = document.getElementById("inputStr").value;
  document.getElementById("output").textContent = processInputLenient(input);
   // alert(output); // 👈 popup result

}
