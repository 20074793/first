function checkBaggageWeight(weight) {
  const limit = 15; // weight limit in kg
  if (weight > limit) {
    alert("⚠️ Your baggage is overweight! The limit is " + limit + "kg.");
  } else {
    alert("✅ Your baggage is within the allowed limit.");
  }
}