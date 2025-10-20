const form = document.getElementById('form1');

const userFirstName = document.getElementById('fname');
const userLastName = document.getElementById('lname');
const userDateOfBirth = document.getElementById('dob');
const userEmail = document.getElementById('email');
const userGender = document.getElementById('gender');
const userCountry = document.getElementById('nationality');

form.addEventListener('submit', (e) => {
  // Prevents refreshing the page after submitting.
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

function renderUserInfo() {
  let content = '';
  
  const userInformation = JSON.parse(localStorage.getItem('userInformation'));
  if (!userInformation) {
    return;
  }

  userInformation.forEach((user, index) => {
    content += `
      <div>
        Name: ${user.firstName}<br>
        Last name: ${user.lastName}<br>
        Date of birth: ${user.dateOfBirth}<br>
        Email: ${user.email}<br>
        Gender: ${user.gender}<br>
        Country: ${user.country}<br>
        <button>Update</button>
        <button>Delete</button>
      </div>
    `;
  });
  const tableContainer = document.getElementById('table');
  tableContainer.innerHTML = content;
}

renderUserInfo();