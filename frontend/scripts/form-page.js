const form = document.getElementById('form1');

const userFirstName = document.getElementById('fname');
const userLastName = document.getElementById('lname');
const userDateOfBirth = document.getElementById('dob');
const userEmail = document.getElementById('email');
const userGender = document.getElementById('gender');
const userCountry = document.getElementById('nationality');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let userInformation = JSON.parse(localStorage.getItem('userInformation')) || [];

  const newUser = {
    firstName: userFirstName.value,
    lastName: userLastName.value,
    dateOfBirth: userDateOfBirth.value,
    email: userEmail.value,
    gender: userGender.value,
    country: userCountry.value
  };

  userInformation.push(newUser);
  localStorage.setItem('userInformation', JSON.stringify(userInformation));
  console.log(userInformation);
});
