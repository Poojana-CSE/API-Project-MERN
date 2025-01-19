document.addEventListener("DOMContentLoaded", () => {
    const getMatchBtn = document.getElementById("get-match-btn");
    const userProfileContainer = document.getElementById("user-profile");
    const dogImage = document.getElementById("dog-image");
    const dogBreed = document.getElementById("dog-breed");
    const dogAdvice = document.getElementById("dog-advice");
    const locationSelect = document.getElementById("location-select");
    const filterBreedsBtn = document.getElementById("filter-breeds-btn");
  
    // Fetch random user profile
    const fetchUserProfile = async () => {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      return data.results[0]; // Return the first user
    };
  
    // Fetch random dog image
    const fetchDogImage = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      return data.message; // Dog image URL
    };
  
    // Fetch random dog care advice
    const fetchDogCareAdvice = async () => {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      return data.slip.advice; // Dog care advice
    };
  
    // Fetch popular dog breeds based on location
    const fetchDogBreedsByLocation = async (location) => {
      const breeds = {
        us: ["Labrador", "Golden Retriever", "Bulldog", "Beagle", "Poodle"],
        gb: ["Bulldog", "Labrador", "Poodle", "Beagle", "German Shepherd"],
        ca: ["Labrador", "Golden Retriever", "German Shepherd", "Bulldog", "Poodle"],
        au: ["Labrador", "Golden Retriever", "Bulldog", "Poodle", "Beagle"]
      };
      return breeds[location] || breeds["us"]; // Default to US breeds
    };
  
    // Generate a new match
    const generateMatch = async () => {
      const user = await fetchUserProfile();
      const dogImageUrl = await fetchDogImage();
      const advice = await fetchDogCareAdvice();
      const location = locationSelect.value;
      const breeds = await fetchDogBreedsByLocation(location);
  
      // Display user profile details
      userProfileContainer.innerHTML = `
        <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
        <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
        <img src="${user.picture.large}" alt="User Picture" style="border-radius: 50%; width: 100px; height: 100px;" />
      `;
  
      // Display dog image and breed
      dogImage.src = dogImageUrl;
      dogBreed.textContent = `Matched Dog Breed: ${breeds[Math.floor(Math.random() * breeds.length)]}`;
  
      // Display dog care advice
      dogAdvice.textContent = advice;
    };
  
    // Load the first match when the page loads
    generateMatch();
  
    // Event listener for getting a new match
    getMatchBtn.addEventListener("click", () => {
      userProfileContainer.innerHTML = '';
      dogImage.src = '';
      dogBreed.textContent = '';
      dogAdvice.textContent = '';
      generateMatch();
    });
  
    // Event listener for filtering dog breeds based on location
    filterBreedsBtn.addEventListener("click", async () => {
      const location = locationSelect.value;
      const breeds = await fetchDogBreedsByLocation(location);
      alert(`Popular dog breeds in ${location}: ${breeds.join(", ")}`);
    });
  });
  