// The following code defines a utility function 'useCountries' that provides functions to retrieve information about countries.
// It uses data from the 'world-countries' library to create a formatted list of countries with specific properties.

// Importing the 'world-countries' library which contains data about countries.
import countries from 'world-countries';

// Creating an array of formatted country objects, each with specific properties.
const formattedCountries = countries.map((country) => ({
  value: country.cca2,        // The ISO 3166-1 alpha-2 country code (2-letter code).
  label: country.name.common, // The common name of the country.
  flag: country.flag,         // The URL to the SVG image of the country's flag.
  latlng: country.latlng,     // An array containing latitude and longitude coordinates.
  region: country.region,     // The geographical region the country belongs to (e.g., Asia, Europe).
}));

// Defining a custom hook 'useCountries' that provides functions to interact with the formatted country data.
const useCountries = () => {
  // Function to get all formatted countries.
  const getAll = () => formattedCountries;

  // Function to get a country object by its ISO 3166-1 alpha-2 code.
  const getByValue = (value: string) => {
    // Using the 'find' method to search for a country with the given value (2-letter code).
    // It returns the first country object that matches the condition.
    return formattedCountries.find((item) => item.value === value);
  }

  // Returning an object with the functions as properties, which can be accessed when the hook is used.
  return {
    getAll,
    getByValue
  }
};

// Exporting the 'useCountries' hook to make it available for other parts of the application.
export default useCountries;
