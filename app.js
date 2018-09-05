//listen for submit
document.querySelector('#loan-form').addEventListener('submit', calculateResults);

//calculate results
function calculateResults(e){
  console.log("calculating");
  //UI vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");  
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  //forumlas
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //monthly forumlas
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);
  
  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
  } else {
      showError(' Please check your numbers');
  }
  e.preventDefault();
}

function showError(error){
  //create div
  const errorDiv = document.createElement('div');

  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading ');

  //add class
  errorDiv.className = 'alert alert-danger';

  //create text node and append to errorDiv
  errorDiv.appendChild(document.createTextNode(error));

  //insert error
  card.insertBefore(errorDiv, heading);

  //clear error aftr 3 seconds
  setTimeout(clearError, 3000);

}

function clearError(){
  document.querySelector('.alert').remove();
}