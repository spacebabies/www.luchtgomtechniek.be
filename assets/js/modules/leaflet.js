import L from 'leaflet';

export function initLeaflet() {
  const container = document.getElementById('pageportfolioindex');
  if (!container) return;

  const portfolioList = container.querySelector('.realisations');
  if (!portfolioList) return;

  const postArticle = container.querySelector('.post');

  // Create map element
  const mapElement = document.createElement('div');
  mapElement.id = 'portfolio-map';
  mapElement.style.height = '80vh';
  mapElement.style.width = '100%';

  // Insert directly into the container (escaping .post constraints)
  container.appendChild(mapElement);

  // Initialize the map and set view to a central location
  const map = L.map('portfolio-map', {
    scrollWheelZoom: false
  }).setView([50.8, 5.5], 9); // Centered roughly on BE/NL border

  // Add a privacy-conscious, clean tile layer (CartoDB Positron - Light)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      subdomains: 'abcd',
      maxZoom: 20
  }).addTo(map);

  const items = container.querySelectorAll('.portfolio-item');
  let hasCoordinates = false;

  items.forEach(item => {
      const lat = item.getAttribute('data-lat');
      const lng = item.getAttribute('data-lng');

      if (lat && lng && lat !== "null" && lng !== "null" && lat !== "" && lng !== "") {
          hasCoordinates = true;
          const marker = L.marker([parseFloat(lat), parseFloat(lng)]).addTo(map);

          const title = item.querySelector('h3') ? item.querySelector('h3').innerText : '';
          const description = item.querySelector('p') ? item.querySelector('p').innerText : '';
          const picture = item.querySelector('picture') ? item.querySelector('picture').outerHTML : '';

          // Bind a popup with project details
          marker.bindPopup(`
              <div class="map-popup">
                  ${picture}
                  <p><strong>${title}</strong><br>${description}</p>
              </div>
          `, {
              minWidth: 250,
              maxWidth: 300,
              keepInView: true // forces auto pan
          });
      }
  });

  // When a popup opens, wait for its image to load and then update the popup.
  // This prevents the popup from overflowing the map container if the image height changes after auto-pan.
  map.on('popupopen', function(e) {
      const popup = e.popup;
      const img = popup.getElement().querySelector('img');
      if (img) {
          // If the image is already complete, update immediately
          if (img.complete) {
              popup.update();
          } else {
              // Otherwise, wait for it to load
              img.addEventListener('load', () => {
                  popup.update();
              });
          }
      }
  });

  if (hasCoordinates) {
      if (postArticle) postArticle.style.display = 'none';
      container.style.padding = '0';
  } else {
      mapElement.remove();
  }
}
