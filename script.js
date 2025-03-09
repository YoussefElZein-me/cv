class DataLoader {
  constructor() {
    this.loadData()
      .then(data => this.renderData(data))
      .catch(error => console.error('Error loading data:', error));
  }

  async loadData() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Loaded JSON:', data); // Check what's being loaded
      return data;
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return {};
    }
  }

  renderData(data) {
    console.log('Received JSON data:', data);

    // Contact Information
    const contactInfoSection = document.getElementById('contact-info');
    if (contactInfoSection) {
      const contactInfoHtml = `
        <h2>Contact Information</h2>
        <ul>
          <li>Name: ${data.name || 'Not found'}</li>
          <li>Email: ${data.email || 'Not found'}</li>
          <li>Phone: ${data.phone || 'Not found'}</li>
        </ul>
      `;
      contactInfoSection.innerHTML = contactInfoHtml;
    } else {
      console.error('Contact info section not found');
    }
  }
}

new DataLoader();
