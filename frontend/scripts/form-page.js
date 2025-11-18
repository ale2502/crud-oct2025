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
      <div class="table-header w-full py-2 items-center">
        <div class="flex-1 min-w-[120px]">${user.firstName}</div>
        <div class="flex-1 min-w-[150px]">${user.lastName}</div>
        <div class="flex-1 min-w-[130px]">${user.dateOfBirth}</div>
        <div class="flex-1 min-w-[200px]">${user.email}</div>
        <div class="flex-1 min-w-[140px]">${user.gender}</div>
        <div class="flex-1 min-w-[150px]">${user.country}</div>
        <div class="buttons flex gap-2 min-w-[160px] justify-end ml-auto">
          <button 
            class="update-button inline-flex items-center gap-2 justify-center px-3 py-1.5 rounded-md border border-blue-600 text-sm hover:bg-blue-50 transition" 
            data-index="${index}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            Update
          </button>
          <button 
            class="delete-button inline-flex items-center gap-2 justify-center px-3 py-1.5 rounded-md border border-red-600 text-red-600 text-sm hover:bg-red-50 transition" 
            data-index="${index}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            Delete
          </button>
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