const form = document.getElementById('regForm');
const message = document.getElementById('message');
const marks12Fields = document.getElementById('marks12Fields');
const marks12Note = document.getElementById('marks12Note');
const statusPassed = document.getElementById('statusPassed');
const statusPursuing = document.getElementById('statusPursuing');

// Show Class 12 marks fields only when "Passed Out" is selected
function toggleMarks12() {
  const show = statusPassed.checked;
  marks12Fields.style.display = show ? 'flex' : 'none';
  marks12Note.style.display = show ? 'block' : 'none';
  
  // Toggle required attribute for Class 12 inputs
  const inputs = marks12Fields.querySelectorAll('input');
  inputs.forEach(input => input.required = show);
}
statusPassed.addEventListener('change', toggleMarks12);
statusPursuing.addEventListener('change', toggleMarks12);
toggleMarks12();

// ADDED FEATURE 1: Automatic Percentage Calculation
function setupAutoPercentage(totalId, scoredId, percentId) {
  const totalInput = document.getElementById(totalId);
  const scoredInput = document.getElementById(scoredId);
  const percentInput = document.getElementById(percentId);

  function calculate() {
    const total = parseFloat(totalInput.value);
    const scored = parseFloat(scoredInput.value);
    if (total > 0 && scored >= 0 && scored <= total) {
      percentInput.value = ((scored / total) * 100).toFixed(2);
    } else {
      percentInput.value = '';
    }
  }

  if (totalInput && scoredInput && percentInput) {
    totalInput.addEventListener('input', calculate);
    scoredInput.addEventListener('input', calculate);
  }
}
setupAutoPercentage('marks10Total', 'marks10Scored', 'marks10Percent');
setupAutoPercentage('marks12Total', 'marks12Scored', 'marks12Percent');

// Build the popup markup and add it to the page
const overlay = document.createElement('div');
overlay.className = 'overlay';
overlay.innerHTML = `
  <div class="popup">
    <h3>Registration Details</h3>
    <p><strong>Name:</strong> <span id="popupName"></span></p>
    <p><strong>Father Name:</strong> <span id="popupFather"></span></p>
    <p><strong>City/State:</strong> <span id="popupCityState"></span></p>
    <p><strong>Email:</strong> <span id="popupEmail"></span></p>
    <p><strong>Mobile:</strong> <span id="popupPhone"></span></p>
    <button id="popupClose">Close</button>
  </div>
`;
document.body.appendChild(overlay);

document.getElementById('popupClose').addEventListener('click', function () {
  overlay.style.display = 'none';
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const studentPhone = document.getElementById('studentPhone').value.trim();
  const guardianPhone = document.getElementById('guardianPhone').value.trim();
  if (!/^\d{10}$/.test(studentPhone) || !/^\d{10}$/.test(guardianPhone)) {
    message.textContent = 'Enter valid 10-digit mobile numbers.';
    return;
  }

  const identityInput = document.getElementById('identityNumber') || document.getElementById('aadhar');
  if (identityInput && !/^\d{12}$/.test(identityInput.value.trim())) {
    message.textContent = 'Enter a valid 12-digit identity number.';
    return;
  }

  // ADDED FEATURE 2: Validation to prevent duplicate Exam Center preferences
  const center1 = document.getElementById('centerChoice1')?.value;
  const center2 = document.getElementById('centerChoice2')?.value;
  const center3 = document.getElementById('centerChoice3')?.value;

  if (center1 && center2 && center3) {
    if (center1 === center2 || center1 === center3 || center2 === center3) {
      message.textContent = 'Please select three different exam center preferences.';
      return;
    }
  }

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  if (password !== confirmPassword) {
    message.textContent = 'Passwords do not match.';
    return;
  }

  // All checks passed - fill popup with main details and show it
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const fatherName = document.getElementById('fatherName').value.trim();
  const city = document.getElementById('city').value.trim();
  const state = document.getElementById('state').value;
  const email = document.getElementById('email').value.trim();

  document.getElementById('popupName').textContent = `${firstName} ${lastName}`;
  document.getElementById('popupFather').textContent = fatherName;
  document.getElementById('popupCityState').textContent = `${city}, ${state}`;
  document.getElementById('popupEmail').textContent = email;
  document.getElementById('popupPhone').textContent = studentPhone;

  overlay.style.display = 'flex';

  message.textContent = '';
  form.reset();
  toggleMarks12();
});
