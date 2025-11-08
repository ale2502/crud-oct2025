const form = document.getElementById('form1');
const submitBtn = form.querySelector('button[type="submit"]');

const userFirstName = document.getElementById('fname');
const userLastName = document.getElementById('lname');
const userDateOfBirth = document.getElementById('dob');
const userEmail = document.getElementById('email');
const userGender = document.getElementById('gender');
const userCountry = document.getElementById('nationality');

const deleteAllUsersBtn = document.getElementById('delete-all-btn');
const tableContainer = document.getElementById('table');

let editIndex = null;

const getData = () => JSON.parse(localStorage.getItem('userInformation')) || [];
const setData = (arr) => localStorage.setItem('userInformation', JSON.stringify(arr));

form.addEventListener('submit', (e) => {
  // Prevents refreshing the page after submitting.
  e.preventDefault();
  
  const data = getData();

  const newUser = {
    firstName: userFirstName.value,
    lastName: userLastName.value,
    dateOfBirth: userDateOfBirth.value,
    email: userEmail.value,
    gender: userGender.value,
    country: userCountry.value
  };

  if (editIndex !== null) {
    // Update path: replace the existing record
    data[editIndex] = newUser;
  } else {
    data.push(newUser);
  }

  setData(data);
  renderUserInfo();
  form.reset();
  editIndex = null;
  if (submitBtn) submitBtn.textContent = 'Submit';
});

function renderUserInfo() {
  const data = getData();
  let content = '';

  // Delete all users button logic
  if (deleteAllUsersBtn) {
    deleteAllUsersBtn.disabled = data.length === 0;
  };
  
  if (!data) {
    return;
  }

  data.forEach((user, index) => {
    content += `
      <div class="table-header">
        <div class="col-fname">${user.firstName}</div>
        <div class="col-lname">${user.lastName}</div>
        <div class="col-dob">${user.dateOfBirth}</div>
        <div class="col-email">${user.email}</div>
        <div class="col-gender">${user.gender}</div>
        <div class="col-country">${user.country}</div>
        <div class="buttons">
          <button class="update-button" data-index="${index}">Update</button>
          <button class="delete-button" data-index="${index}">Delete</button>
        </div>
      </div>
    `;
  });
  tableContainer.innerHTML = content;

  const allDeleteButtons = document.querySelectorAll('.delete-button');

  allDeleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      const data = getData();
      const user = data[index];

      // Ask for confirmation
      const ok = confirm(`Are you sure you want to delete user: "${user.firstName} ${user.lastName}"?`);
      if (!ok) return;
      
      // Proceed with deletion
      data.splice(index, 1);
      setData(data);
      renderUserInfo();
    });
  });

  const allUpdateButtons = document.querySelectorAll('.update-button');

  allUpdateButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      const data = getData();

      userFirstName.value = data[index].firstName;
      userLastName.value = data[index].lastName;
      userDateOfBirth.value = data[index].dateOfBirth;
      userEmail.value = data[index].email;
      userGender.value = data[index].gender;
      userCountry.value = data[index].country;

      editIndex = index;
      if (submitBtn) submitBtn.textContent = 'Save changes';
    });
  });
};

if (deleteAllUsersBtn) {
  deleteAllUsersBtn.addEventListener('click', () => {
    const count = getData().length;
    if (count === 0) return;

    const ok = confirm(`This will delete all ${count} user(s). Continue?`);
    if (!ok) return;

    // Clear storage UI
    localStorage.removeItem('userInformation');
    tableContainer.innerHTML = '';

    // Reset editing state/UI
    editIndex = null;
    if (submitBtn) submitBtn.textContent = 'Submit';
    form.reset()

    // Disable the button now that everything is gone
    deleteAllUsersBtn.disabled = true;
  });
}

renderUserInfo();