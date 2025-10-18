async function loadCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
    const data = await response.json();

    const select = document.getElementById('nationality');
    const countries = data
      .map(c => c.name.common)
      .sort((a, b) => a.localeCompare(b, 'en', {sensitivity: 'base'}));
    
    countries.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading countries', error);
  }
}

loadCountries();