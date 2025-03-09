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
          <li>Email: ${data.contactInformation?.email || 'Not found'}</li>
          <li>Phone: ${data.contactInformation?.phone || 'Not found'}</li>
          <li>LinkedIn: ${data.contactInformation?.socialMedia?.linkedin || 'Not found'}</li>
          <li>GitHub: ${data.contactInformation?.socialMedia?.github || 'Not found'}</li>
        </ul>
      `;
      contactInfoSection.innerHTML = contactInfoHtml;
    } else {
      console.error('Contact info section not found');
    }

    // Summary
    const summarySection = document.getElementById('summary');
    if (summarySection) {
      const summaryHtml = `
        <h2>Summary</h2>
        <p>${data.summary?.description || 'Not found'}</p>
        <h3>Specializations:</h3>
        <ul>
          ${data.summary?.specializations?.map(specialization => {
            return `<li>${specialization}</li>`;
          }).join('')}
        </ul>
      `;
      summarySection.innerHTML = summaryHtml;
    } else {
      console.error('Summary section not found');
    }

    // Experience
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      const experienceHtml = `
        <h2>Experience</h2>
        ${data.experience?.map(experience => {
          return `
            <h3>${experience.type || 'Not found'}</h3>
            <p>Date: ${experience.date || 'Not found'}</p>
            <p>Client: ${experience.client || 'Not found'}</p>
            <h4>Projects:</h4>
            <ul>
              ${experience.projects?.map(project => {
                return `
                  <li><strong>${project.title || 'Not found'}</strong>: ${project.description || 'Not found'}</li>
                `;
              }).join('')}
            </ul>
          `;
        }).join('')}
      `;
      experienceSection.innerHTML = experienceHtml;
    } else {
      console.error('Experience section not found');
    }
  }
}

new DataLoader();
