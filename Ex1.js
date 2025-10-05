  // max weight allowed
  const MAX_WEIGHT = 15;

  let check = () => {
    let w = parseInt(document.getElementById('weight').value);

    if (isNaN(w)) {
      alert("Please enter a valid weight!");
      return;
    }

    alert('Checking baggage weight: ' + w + " kg");

    if (w > MAX_WEIGHT) {
      alert("Overweight! Allowed max = " + MAX_WEIGHT + " kg");
      // Show removal inputs
      document.getElementById('removed').style.display = 'inline';
      document.getElementById('remB').style.display = 'inline';
      document.getElementById('removedLabel').style.display = 'inline';
    } else {
      alert("Weight is OK. You can proceed ✅");
    }
  }

  let remove = () => {
    let w = parseInt(document.getElementById('weight').value);
    let r = parseInt(document.getElementById('removed').value);

    if (isNaN(r)) {
      alert("Please enter a valid removal weight!");
      return;
    }

    let newWeight = w - r;
    document.getElementById('weight').value = newWeight; // update the input

    if (newWeight > MAX_WEIGHT) {
      alert("Still overweight! Current = " + newWeight + " kg. Remove more.");
    } else {
      alert("Weight is now OK (" + newWeight + " kg). You can proceed ✅");
      // Hide removal inputs again
      document.getElementById('removed').style.display = 'none';
      document.getElementById('remB').style.display = 'none';
      document.getElementById('removedLabel').style.display = 'none';
    }
  }