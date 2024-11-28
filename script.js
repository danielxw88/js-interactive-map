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

// Add marker for restaurant
const addRestaurantMarker = (place) => {
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        });
        const infoWindow = new google.maps.InfoWindow({
            content: `
            <div>
                <h3> ${place.name}</h3>
                <p><strong>Adrress:</strong> ${place.vicinity || "N/A"}</p>
                <p><strong>Rating:</strong> ${place.rating || "N/A"}</p>
                <p><strong>Phone:</strong> ${place.formatted_phone_number || "N/A"}</p>
                <p><strong>Price Level:</strong> ${
                place.price_level ? "$" .repeat(place.price_level) : "N/A" 
        }</p>
        <p><strong>Hours:</strong> ${
        place.opening_hours?.open_now
        ? "Open"
        : "Closed"
        }</p>
        <a href="${place.website || "#"}"target=" blank">Visit Website</a>
        <div>
        `
    });

    marker.addListener("click", () => {
        infowWindow.open(map, marker);
    });

    restaurantMarkers.push(marker);
};   

// Function to clear restaurant markers
const clearMarkers = () => {
    restaurantMarkers.forEach((marker) => marker.setMap(null));
    restaurantMarkers.length = 0;
};
};
  
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