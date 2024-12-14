window.onload = () => {
    // Map center coordinates for Toronto, Ontario
    const mapCenter = { lat: 43.65107, lng: -79.347015 };
  
    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
      center: mapCenter,
      zoom: 12,
    });
  
    // API service
    const service = new google.maps.places.PlacesService(map);
  
    // Search box
    const searchBox = document.getElementById("search-box");
  
    // Array to store restaurant markers
    const restaurantMarkers = [];
  
    // Handle search box input
    searchBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const searchInput = searchBox.value;
  
        if (!searchInput) {
          alert("Please enter a search...");
          return;
        }
  
        const request = {
          location: mapCenter,
          radius: 50000, // km radius
          keyword: searchInput,
          type: "restaurant",
        };
  
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers();
            results.forEach((place) => {
              if (place.geometry && place.geometry.location) {
                addRestaurantMarker(place);
              }
            });
          } else {
            console.error("Service failed due to: " + status);
            alert("No results found for your search!");
          }
        });
      }
    });
  
    // Add a marker for a restaurant
    const addRestaurantMarker = (place) => {
      const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
      });
  
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h3>${place.name}</h3>
            <p><strong>Address:</strong> ${place.vicinity || "N/A"}</p>
            <p><strong>Rating:</strong> ${place.rating || "N/A"}</p>
            <p><strong>Price Level:</strong> ${place.price_level ? "$".repeat(place.price_level) : "N/A"}</p>
            <p><strong>Hours:</strong> ${place.opening_hours?.open_now ? "Open Now!" : "Currently Closed"}</p>
            <a href="${place.website || "#"}" target="_blank">Visit Website</a>
            <button id="save-btn" data-name="${place.name}" data-address="${place.vicinity}" data-rating="${place.rating || 'null'}" data-price-level="${place.price_level || 'null'}">Save this restaurant</button>
          </div>
        `,
      });
  
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
  
      restaurantMarkers.push(marker);
    };
  
    // Save restaurant details to localStorage
    const saveRestaurant = (name, address, rating, priceLevel) => {
      const savedRestaurants = JSON.parse(localStorage.getItem("savedRestaurants")) || [];
  
      const newRestaurant = {
        name,
        address,
        rating,
        priceLevel,
      };
  
      savedRestaurants.push(newRestaurant);
  
      // Save updated list to localStorage
      localStorage.setItem("savedRestaurants", JSON.stringify(savedRestaurants));
  
      alert(`${name} has been saved!`);
      showSavedRestaurants(); // Refresh the sidebar with updated saved restaurants
    };
  
    // Show saved restaurants in the sidebar
    const showSavedRestaurants = () => {
      const savedRestaurants = JSON.parse(localStorage.getItem("savedRestaurants")) || [];
      const resultsList = document.getElementById("results-list");
  
      // Clear the existing list
      resultsList.innerHTML = "";
  
      savedRestaurants.forEach((restaurant) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <strong>${restaurant.name}</strong><br>
          Address: ${restaurant.address}<br>
          Rating: ${restaurant.rating || "N/A"}<br>
          Price Level: ${restaurant.priceLevel ? "$".repeat(restaurant.priceLevel) : "N/A"}<br>
          <button onclick="removeRestaurant('${restaurant.name}')">Remove</button>
        `;
        resultsList.appendChild(listItem);
      });
    };
  
    // Remove a restaurant from saved list
    const removeRestaurant = (name) => {
      let savedRestaurants = JSON.parse(localStorage.getItem("savedRestaurants")) || [];
      savedRestaurants = savedRestaurants.filter(restaurant => restaurant.name !== name);
  
      // Save updated list back to localStorage
      localStorage.setItem("savedRestaurants", JSON.stringify(savedRestaurants));
  
      // Re-render the saved restaurants list
      showSavedRestaurants();
    };
  
    // Text-to-speech feature
    const triggerTextToSpeech = (text) => {
      const msg = new SpeechSynthesisUtterance(text);
      speechSynthesis.lang = "en-US";
      window.speechSynthesis.speak(msg); // Fixed here, using the correct variable 'msg'
    };
  
    // Function to clear restaurant markers
    const clearMarkers = () => {
      restaurantMarkers.forEach((marker) => marker.setMap(null));
      restaurantMarkers.length = 0;
    };
  
    // Event listener for save button (dynamically added)
    document.addEventListener("click", (e) => {
      if (e.target && e.target.id === "save-btn") {
        const name = e.target.getAttribute("data-name");
        const address = e.target.getAttribute("data-address");
        const rating = e.target.getAttribute("data-rating");
        const priceLevel = e.target.getAttribute("data-price-level");
        saveRestaurant(name, address, rating, priceLevel);
      }
    });
  
    // Call the function on page load to show saved restaurants
    showSavedRestaurants();
  };

  
