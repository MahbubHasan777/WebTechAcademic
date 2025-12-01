// Feature 1: Form Validation
function validateForm() {
  const firstName = document.getElementById("firstname").value.trim();
  const lastName = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const address1 = document.getElementById("address1").value.trim();
  const city = document.getElementById("city").value.trim();
  const stateSelect = document.querySelector('.state select');
  const countrySelect = document.querySelector('.country select');
  const zipcode = document.getElementById("zipcode").value.trim();
  const donationAmount = document.querySelector('input[name="donationAmount"]:checked');
 
  if (!firstName || !lastName || !email || !address1 || !city || !zipcode) {
    alert("Please fill in all required fields.");
    return false;
  }

  if (stateSelect.value === "Select a State") {
    alert("Please select a state.");
    return false;
  }

  if (countrySelect.value === "Select a Country") {
    alert("Please select a country.");
    return false;
  }

  if (!donationAmount || donationAmount.value === "None") {
    alert("Please select a donation amount.");
    return false;
  }

  if (donationAmount.value === "Other") {
    const otherAmount = document.getElementById("otherAmount").value.trim();
    if (!otherAmount || parseFloat(otherAmount) <= 0) {
      alert("Please enter a valid donation amount.");
      return false;
    }
  }
 
  // Feature 2: Email Validation
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
 
  return true;
}
 
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}
 
// Feature 3: Donation Amount Check - Show/Hide Other Amount Field
document.querySelectorAll('input[name="donationAmount"]').forEach((radioButton) => {
  radioButton.addEventListener('change', function() {
    const otherAmountField = document.getElementById('otherAmount').parentElement;
    if (this.value === 'Other') {
      otherAmountField.style.display = 'block';
      document.getElementById('otherAmount').focus();
    } else {
      otherAmountField.style.display = 'none';
      document.getElementById('otherAmount').value = '';
    }
  });
});

window.addEventListener('DOMContentLoaded', function() {
  const otherAmountField = document.getElementById('otherAmount').parentElement;
  otherAmountField.style.display = 'none';
});
 
// Feature 4: Recurring Donation Fields
document.getElementById('recurringDonation').addEventListener('change', function() {
  const recurringFields = document.querySelectorAll('.recurringDonation')[1];
  if (this.checked) {
    recurringFields.style.display = 'block';
  } else {
    recurringFields.style.display = 'none';
    const recurringInputs = recurringFields.querySelectorAll('input[type="number"]');
    recurringInputs.forEach(input => input.value = '');
    const totalElement = document.querySelector('.recurring-total');
    if (totalElement) totalElement.remove();
  }
});

window.addEventListener('DOMContentLoaded', function() {
  const recurringFields = document.querySelectorAll('.recurringDonation')[1];
  if (recurringFields) {
    recurringFields.style.display = 'none';
  }
});
 
// Feature 5: Select State and Country Default Options
window.addEventListener('DOMContentLoaded', function() {
  const stateSelect = document.querySelector('.state select');
  const countrySelect = document.querySelector('.country select');
  if (stateSelect) stateSelect.value = "Dhaka";
  if (countrySelect) countrySelect.value = "Bangladesh";
});
 
// Feature 7: Reset Button Logic
const resetButton = document.querySelector('input[type="reset"]');
if (resetButton) {
  resetButton.addEventListener('click', function(event) {
    const confirmation = confirm("Are you sure you want to reset the form?");
    if (!confirmation) {
      event.preventDefault();
    } else {
      setTimeout(function() {
        const otherAmountField = document.getElementById('otherAmount').parentElement;
        otherAmountField.style.display = 'none';
        const recurringFields = document.querySelectorAll('.recurringDonation')[1];
        if (recurringFields) recurringFields.style.display = 'none';
        const totalElement = document.querySelector('.recurring-total');
        if (totalElement) totalElement.remove();
      }, 10);
    }
  });
}
 
// Feature 8: Show/Hide Additional Fields - Change placeholder based on purpose
document.querySelectorAll('input[name="purpose"]').forEach((radioButton) => {
  radioButton.addEventListener('change', function() {
    const nameField = document.getElementById('acknowledgeeName');
    const labelText = this.nextSibling.textContent.trim();
    if (labelText.includes('To Honor')) {
      nameField.placeholder = "Name to honor";
    } else if (labelText.includes('In memory of')) {
      nameField.placeholder = "Name in memory of";
    }
  });
});
 
// Feature 9: Character Limit on Comments
document.getElementById("comments").addEventListener('input', function() {
  const charLimit = 200;
  const currentLength = this.value.length;
  if (currentLength > charLimit) {
    alert("Character limit reached! Maximum 200 characters allowed.");
    this.value = this.value.substring(0, charLimit);
  }
});
 
// Feature 10: Calculate Recurring Donation Total
const recurringInputs = document.querySelectorAll('.recurringDonation input[type="number"]');
if (recurringInputs.length >= 2) {
  recurringInputs[0].addEventListener('input', calculateTotal);
  recurringInputs[1].addEventListener('input', calculateTotal);
}

function calculateTotal() {
  const monthlyAmount = parseFloat(recurringInputs[0].value) || 0;
  const months = parseInt(recurringInputs[1].value) || 0;
  const total = monthlyAmount * months;
  
  let totalElement = document.querySelector('.recurring-total');
  if (!totalElement) {
    totalElement = document.createElement('p');
    totalElement.className = 'recurring-total';
    totalElement.style.fontWeight = 'bold';
    totalElement.style.color = 'green';
    totalElement.style.marginTop = '10px';
    document.querySelectorAll('.recurringDonation')[1].appendChild(totalElement);
  }
  
  if (monthlyAmount > 0 && months > 0) {
    totalElement.textContent = `Total donation for ${months} months: $${total.toFixed(2)}`;
  } else {
    totalElement.textContent = '';
  }
}

// Form submission handler
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  if (validateForm()) {
    alert("Form validated successfully! Ready to submit.")
  }
});