// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("location-form");
    const mapDiv = document.getElementById("map");
    const clearMarkersBtn = document.getElementById("clear-markers");
    let map;
    let markers = [];
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission
  
      const address = document.getElementById("address").value;
  
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

          // Click event to the map
          map.addListener("click", (event) => {
            addMarker(event.latLng);
          });
        } else {
          map.setCenter({ lat, lng });
        }
  
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

    // Adding marker fuction

  function addMarker(location, title = "Marker") {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: title,
    });
  }


  