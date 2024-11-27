window.onload = () => {
    // Map center coordinates for Toronto,Ont
    const mapCenter = {lat: 43.65107. lng: -79.347015};

    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: mapCenter,
        zoom: 12,
    });

    // API service
    const service = new google.maps.places.PlacesService(map);

    // Search Box
    const searchBox = document.getElementById("search-Box");

    // Restaurant markers
    const restaurantMarkers = [];

    // Search Box Input

    searchBox.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const searchInput = searchBox.value;

            if (!searchInput) {
                alert("Please enter a search term...");
                return;
            }

            const request = {
                location: mapCenter,
                radius: 50000, // km radius
                keyword: searchInput,
                type: "restaurant",
            };

            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServicesStatus.OK){
                    clearMarkers();
                    results.forEach((place) => {
                        if (place.geometry && place.geometry.location) {{
                            addRestaurantMarker(place);
                        }
            });
        } else {
            console.error("Failed due to: " + status);
            alert("Please try new search");
        }
    });
}
});

     /* if (!address) {
        alert("Please enter a valid address or postal code.");
        return;
      }*/
  
      try {
        // Use the Geocoding API to get coordinates for the address
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=AIzaSyAocdQS4fgY016FzJX-P6JfMAagjdhHnjs`
        );
        const data = await response.json();
  
        if (data.status === "OK") {
          const { lat, lng } = data.results[0].geometry.location;
  
          // Display the map and center it on the coordinates
          mapDiv.style.display = "block";
          const map = new google.maps.Map(mapDiv, {
            center: { lat, lng },
            zoom: 15,
          });
  
          // Add a marker to the map
          new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: address,
          });
        } else {
          alert("Unable to find the location. Please try again!");
        }
      } catch (error) {
        console.error("Error fetching geolocation:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  });