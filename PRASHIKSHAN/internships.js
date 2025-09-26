// Internships page specific functionality

// Sample internship data
const internshipsData = [
    {
        id: 1,
        title: "Software Development Intern",
        company: "Tech Mahindra",
        location: "Mumbai, Delhi, Bangalore",
        type: "Full-time",
        duration: "6 months",
        stipend: "15000-20000",
        category: "technology",
        description: "Work on cutting-edge software projects with experienced developers",
        requirements: ["Computer Science background", "Basic programming knowledge", "Good communication skills"],
        skills: ["JavaScript", "Python", "React"],
        posted: "2 days ago",
        actively_hiring: true,
        remote: false
    },
    {
        id: 2,
        title: "Business Development Intern",
        company: "Flipkart",
        location: "Pune",
        type: "Full-time",
        duration: "3 months",
        stipend: "800000",
        category: "business",
        description: "Drive business growth through strategic partnerships and market analysis",
        requirements: ["MBA or Business background", "Analytical skills", "Market research experience"],
        skills: ["Business Analysis", "Market Research", "Communication"],
        posted: "3 days ago",
        actively_hiring: true,
        remote: false
    },
    {
        id: 3,
        title: "Digital Marketing Intern",
        company: "Zomato",
        location: "Work from home",
        type: "Part-time",
        duration: "4 months",
        stipend: "750000-1000000",
        category: "marketing",
        description: "Create engaging digital marketing campaigns and analyze performance metrics",
        requirements: ["Marketing background", "Social media knowledge", "Creative thinking"],
        skills: ["Digital Marketing", "Social Media", "Analytics"],
        posted: "1 week ago",
        actively_hiring: false,
        remote: true
    },
    {
        id: 4,
        title: "Data Science Intern",
        company: "Amazon",
        location: "Hyderabad",
        type: "Full-time",
        duration: "6 months",
        stipend: "25000-30000",
        category: "technology",
        description: "Work with big data to derive insights and build predictive models",
        requirements: ["Statistics/Computer Science background", "Python/R knowledge", "Machine learning basics"],
        skills: ["Python", "Machine Learning", "Statistics"],
        posted: "5 days ago",
        actively_hiring: true,
        remote: false
    },
    {
        id: 5,
        title: "UI/UX Design Intern",
        company: "Adobe",
        location: "Bangalore",
        type: "Full-time",
        duration: "4 months",
        stipend: "18000-22000",
        category: "design",
        description: "Design intuitive user interfaces and enhance user experience",
        requirements: ["Design background", "Figma/Adobe Creative Suite", "Portfolio required"],
        skills: ["UI Design", "UX Research", "Prototyping"],
        posted: "1 week ago",
        actively_hiring: true,
        remote: false
    },
    {
        id: 6,
        title: "Finance Intern",
        company: "ICICI Bank",
        location: "Mumbai",
        type: "Full-time",
        duration: "5 months",
        stipend: "12000-15000",
        category: "finance",
        description: "Assist in financial analysis and reporting activities",
        requirements: ["Finance/Commerce background", "Excel proficiency", "Analytical mindset"],
        skills: ["Financial Analysis", "Excel", "Financial Modeling"],
        posted: "4 days ago",
        actively_hiring: true,
        remote: false
    },
    {
        id: 7,
        title: "HR Intern",
        company: "Tata Consultancy Services",
        location: "Chennai",
        type: "Full-time",
        duration: "3 months",
        stipend: "10000-12000",
        category: "hr",
        description: "Support recruitment activities and employee engagement programs",
        requirements: ["HR/Psychology background", "Communication skills", "People-oriented"],
        skills: ["Recruitment", "Employee Relations", "Communication"],
        posted: "6 days ago",
        actively_hiring: true,
        remote: false
    },
    {
        id: 8,
        title: "Content Writing Intern",
        company: "Byju's",
        location: "Work from home",
        type: "Part-time",
        duration: "3 months",
        stipend: "8000-12000",
        category: "marketing",
        description: "Create engaging educational content for various platforms",
        requirements: ["English/Journalism background", "Writing skills", "Research abilities"],
        skills: ["Content Writing", "Research", "SEO"],
        posted: "3 days ago",
        actively_hiring: true,
        remote: true
    }
];

let filteredInternships = [...internshipsData];
let currentPage = 1;
const itemsPerPage = 6;

// Initialize internships page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('internships.html')) {
        initializeFilters();
        renderInternships();
        setupLoadMore();
        handleURLParams();
    }
});

// Initialize filter functionality
function initializeFilters() {
    const locationFilter = document.getElementById('locationFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const durationFilter = document.getElementById('durationFilter');
    const stipendFilter = document.getElementById('stipendFilter');
    const sortBy = document.getElementById('sortBy');
    const searchInput = document.getElementById('searchInput');

    // Add event listeners to all filters
    [locationFilter, categoryFilter, durationFilter, stipendFilter, sortBy].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });

    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
}

// Apply all filters
function applyFilters() {
    const locationFilter = document.getElementById('locationFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const durationFilter = document.getElementById('durationFilter')?.value || '';
    const stipendFilter = document.getElementById('stipendFilter')?.value || '';
    const sortBy = document.getElementById('sortBy')?.value || 'latest';
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';

    // Reset to first page when filtering
    currentPage = 1;

    // Start with all internships
    filteredInternships = internshipsData.filter(internship => {
        // Location filter
        if (locationFilter) {
            if (locationFilter === 'remote' && !internship.remote) return false;
            if (locationFilter !== 'remote' && !internship.location.toLowerCase().includes(locationFilter)) return false;
        }

        // Category filter
        if (categoryFilter && internship.category !== categoryFilter) return false;

        // Duration filter
        if (durationFilter) {
            const duration = parseInt(internship.duration);
            switch(durationFilter) {
                case '1-3':
                    if (duration > 3) return false;
                    break;
                case '3-6':
                    if (duration <= 3 || duration > 6) return false;
                    break;
                case '6+':
                    if (duration <= 6) return false;
                    break;
            }
        }

        // Stipend filter
        if (stipendFilter) {
            const stipend = parseInt(internship.stipend.replace(/[^\d]/g, ''));
            switch(stipendFilter) {
                case '0-10000':
                    if (stipend > 10000) return false;
                    break;
                case '10000-25000':
                    if (stipend <= 10000 || stipend > 25000) return false;
                    break;
                case '25000+':
                    if (stipend <= 25000) return false;
                    break;
            }
        }

        // Search filter
        if (searchQuery) {
            const searchableText = `${internship.title} ${internship.company} ${internship.location} ${internship.skills.join(' ')}`.toLowerCase();
            if (!searchableText.includes(searchQuery)) return false;
        }

        return true;
    });

    // Apply sorting
    switch(sortBy) {
        case 'stipend':
            filteredInternships.sort((a, b) => {
                const stipendA = parseInt(a.stipend.replace(/[^\d]/g, ''));
                const stipendB = parseInt(b.stipend.replace(/[^\d]/g, ''));
                return stipendB - stipendA;
            });
            break;
        case 'company':
            filteredInternships.sort((a, b) => a.company.localeCompare(b.company));
            break;
        default: // latest
            filteredInternships.sort((a, b) => {
                const dateA = new Date(a.posted);
                const dateB = new Date(b.posted);
                return dateB - dateA;
            });
    }

    renderInternships();
    updateResultsCount();
}

// Render internships
function renderInternships() {
    const internshipGrid = document.getElementById('internshipGrid');
    if (!internshipGrid) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const internshipsToShow = filteredInternships.slice(0, endIndex);

    internshipGrid.innerHTML = internshipsToShow.map(internship => createInternshipCard(internship)).join('');

    // Update load more button visibility
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = endIndex >= filteredInternships.length ? 'none' : 'block';
    }
}

// Create internship card HTML
function createInternshipCard(internship) {
    const stipendText = internship.stipend.length > 6 ? 
        `₹${parseInt(internship.stipend).toLocaleString()} /year` : 
        `₹${internship.stipend} /month`;

    return `
        <div class="internship-card" data-id="${internship.id}">
            <div class="card-header">
                <span class="${internship.actively_hiring ? 'actively-hiring' : 'work-from-home'}">
                    ${internship.actively_hiring ? '🟢 Actively hiring' : internship.remote ? '🏠 Work from home' : '📍 On-site'}
                </span>
            </div>
            <h4>${internship.title}</h4>
            <p class="company">${internship.company}</p>
            <div class="internship-details">
                <span class="location">
                    <i class="fas ${internship.remote ? 'fa-home' : 'fa-map-marker-alt'}"></i> 
                    ${internship.location}
                </span>
                <span class="duration">
                    <i class="fas fa-clock"></i> 
                    ${internship.duration}
                </span>
                <span class="stipend">
                    <i class="fas fa-rupee-sign"></i> 
                    ${stipendText}
                </span>
            </div>
            <div class="skills-tags">
                ${internship.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="card-footer">
                <span class="posted-time">${internship.posted}</span>
                <button class="view-details" onclick="showInternshipDetails(${internship.id})">
                    View details >
                </button>
            </div>
        </div>
    `;
}

// Setup load more functionality
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            renderInternships();
        });
    }
}

// Update results count
function updateResultsCount() {
    const resultsHeader = document.querySelector('.results-header h2');
    if (resultsHeader) {
        resultsHeader.textContent = `Available Internships (${filteredInternships.length})`;
    }
}

// Show internship details modal
function showInternshipDetails(internshipId) {
    const internship = internshipsData.find(i => i.id === internshipId);
    if (!internship) return;

    const stipendText = internship.stipend.length > 6 ? 
        `₹${parseInt(internship.stipend).toLocaleString()} /year` : 
        `₹${internship.stipend} /month`;

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal internship-modal">
            <div class="modal-header">
                <h3>${internship.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="internship-details-full">
                    <div class="company-info">
                        <h4>${internship.company}</h4>
                        <div class="internship-meta">
                            <span><i class="fas ${internship.remote ? 'fa-home' : 'fa-map-marker-alt'}"></i> ${internship.location}</span>
                            <span><i class="fas fa-clock"></i> ${internship.duration}</span>
                            <span><i class="fas fa-rupee-sign"></i> ${stipendText}</span>
                            <span><i class="fas fa-briefcase"></i> ${internship.type}</span>
                        </div>
                    </div>
                    
                    <div class="internship-description">
                        <h5>About the Internship</h5>
                        <p>${internship.description}</p>
                    </div>
                    
                    <div class="internship-requirements">
                        <h5>Requirements</h5>
                        <ul>
                            ${internship.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="internship-skills">
                        <h5>Skills You'll Learn</h5>
                        <div class="skills-list">
                            ${internship.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="application-section">
                        <button class="btn-apply">Apply Now</button>
                        <button class="btn-save">Save for Later</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    // Close modal functionality
    const closeBtn = modalOverlay.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });

    // Apply button functionality
    const applyBtn = modalOverlay.querySelector('.btn-apply');
    applyBtn.addEventListener('click', () => {
        showNotification('Application submitted successfully!', 'success');
        document.body.removeChild(modalOverlay);
    });

    // Save button functionality
    const saveBtn = modalOverlay.querySelector('.btn-save');
    saveBtn.addEventListener('click', () => {
        showNotification('Internship saved to your favorites!', 'success');
    });
}

// Handle URL parameters (for search from other pages)
function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
            applyFilters();
        }
    }
}

// Filter internships function (called from main script.js)
function filterInternships(query) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = query;
        applyFilters();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { filterInternships, showInternshipDetails };
}

// This check prevents the "redeclare" error if the script is loaded multiple times.
if (typeof internshipsData === 'undefined') {

    const internshipsData = [
        {
            id: 1,
            title: "Frontend Intern — React",
            company: "TechSprout • Remote",
            duration: 6, // Duration in weeks
        },
        {
            id: 2,
            title: "Data Analytics Intern",
            company: "Green Analytics • Hyderabad",
            duration: 8,
        },
        {
            id: 3,
            title: "Agritech Research Intern",
            company: "FarmFuture • Pune",
            duration: 12,
        },
        {
            id: 4,
            title: "Cloud DevOps Intern",
            company: "InfraCloud • Bangalore",
            duration: 8,
        }
    ];

    /**
     * Creates the HTML for a single internship card.
     * @param {object} internship - The internship data object.
     * @returns {string} HTML string for the card.
     */
    function createInternshipCard(internship) {
        // Example: Assume 2 weeks have been completed for progress calculation
        const weeksCompleted = 2; 
        const progressPercentage = Math.min((weeksCompleted / internship.duration) * 100, 100); // Ensure it doesn't exceed 100%

        return `
            <div class="internship-card" data-id="${internship.id}">
                <h4>${internship.title}</h4>
                <p class="company">${internship.company}</p>
                <div class="internship-details">
                    <span class="duration">Duration: ${internship.duration}w</span>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${progressPercentage}%;"></div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renders all internship cards into the grid.
     */
    function renderInternships() {
        const internshipGrid = document.getElementById('internshipGrid');
        if (!internshipGrid) {
            console.error('Internship grid not found!');
            return;
        }
        internshipGrid.innerHTML = internshipsData.map(internship => createInternshipCard(internship)).join('');
    }

    // Run the render function once the page content has loaded.
    document.addEventListener('DOMContentLoaded', function() {
        renderInternships();
    });

} // End of the check