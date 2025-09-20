// Application State
let appState = {
    isTracking: false,
    currentTrip: null,
    trips: [],
    user: {
        name: "Arjun Kumar",
        age: 28,
        occupation: "Software Engineer",
        location: "Thiruvananthapuram"
    },
    settings: {
        dataSharing: true,
        locationTracking: true,
        autoDetectSensitivity: "High"
    }
};

// Sample data from JSON
const sampleTrips = [
    {
        id: 1,
        date: "2025-09-20",
        startTime: "08:30",
        endTime: "09:15",
        origin: "Thiruvananthapuram Central",
        destination: "Technopark Phase 1",
        mode: "Bus",
        confidence: 92,
        distance: "15.2 km",
        duration: "45 min",
        purpose: "Work",
        companions: 0,
        status: "Auto-detected"
    },
    {
        id: 2,
        date: "2025-09-19",
        startTime: "18:45",
        endTime: "19:20",
        origin: "Technopark Phase 1",
        destination: "Spencer Plaza, MG Road",
        mode: "Auto-rickshaw",
        confidence: 89,
        distance: "12.8 km",
        duration: "35 min",
        purpose: "Shopping",
        companions: 1,
        status: "User-confirmed"
    },
    {
        id: 3,
        date: "2025-09-18",
        startTime: "07:00",
        endTime: "07:25",
        origin: "Pattom",
        destination: "Thiruvananthapuram Medical College",
        mode: "Walking",
        confidence: 95,
        distance: "2.1 km",
        duration: "25 min",
        purpose: "Medical",
        companions: 0,
        status: "Auto-detected"
    }
];

const transportModes = [
    {name: "Walking", icon: "🚶", color: "#4CAF50"},
    {name: "Bicycle", icon: "🚲", color: "#2196F3"},
    {name: "Motorcycle", icon: "🏍️", color: "#FF9800"},
    {name: "Car", icon: "🚗", color: "#9C27B0"},
    {name: "Auto-rickshaw", icon: "🛺", color: "#FF5722"},
    {name: "Bus", icon: "🚌", color: "#795548"},
    {name: "Train", icon: "🚆", color: "#607D8B"}
];

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load sample data
    appState.trips = [...sampleTrips];
    
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('natpac_consent');
    if (!hasConsent) {
        showConsentModal();
    } else {
        showMainApp();
        setupApp();
    }
    
    // Setup consent form validation
    setupConsentValidation();
}

// Consent Modal Functions
function showConsentModal() {
    document.getElementById('consentModal').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
}

function setupConsentValidation() {
    const checkboxes = document.querySelectorAll('#consentModal input[type="checkbox"]');
    const acceptBtn = document.getElementById('acceptBtn');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateConsent);
    });
    
    function validateConsent() {
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        acceptBtn.disabled = !allChecked;
    }
}

function acceptConsent() {
    localStorage.setItem('natpac_consent', 'true');
    document.getElementById('consentModal').classList.add('hidden');
    showMainApp();
    setupApp();
}

function declineConsent() {
    alert('You must provide consent to use this application for transportation research.');
}

function showMainApp() {
    document.getElementById('app').classList.remove('hidden');
}

// Main App Setup
function setupApp() {
    // Setup tab navigation
    setupTabNavigation();
    
    // Setup mode buttons
    setupModeButtons();
    
    // Setup trip history
    renderTripHistory();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Setup active trip simulation
    if (appState.isTracking) {
        startTripSimulation();
    }
    
    // Setup real-time updates
    setInterval(updateActiveTrip, 5000);
}

// Tab Navigation
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showTab(tabName);
        });
    });
}

function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab button
    const activeBtn = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Trip Tracking Functions
function toggleTracking() {
    const trackingBtn = document.getElementById('trackingBtn');
    const statusDot = document.getElementById('trackingStatus');
    const statusText = document.getElementById('statusText');
    
    if (!appState.isTracking) {
        // Start tracking
        appState.isTracking = true;
        appState.currentTrip = createNewTrip();
        
        trackingBtn.innerHTML = '<i class="fas fa-stop"></i><span>Stop Tracking</span>';
        trackingBtn.classList.add('active');
        
        statusDot.classList.add('active');
        statusText.textContent = 'Tracking Active';
        
        startTripSimulation();
        showTab('active-trip');
    } else {
        // Stop tracking
        stopTrip();
    }
}

function createNewTrip() {
    return {
        id: Date.now(),
        startTime: new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'}),
        startDate: new Date().toISOString().split('T')[0],
        origin: "Current Location",
        destination: "Unknown",
        mode: "Bus",
        confidence: 92,
        distance: 0,
        duration: 0,
        speed: 0,
        companions: 0,
        purpose: "",
        status: "Active"
    };
}

function startTripSimulation() {
    // Simulate real-time trip updates
    const updateInterval = setInterval(() => {
        if (!appState.isTracking || !appState.currentTrip) {
            clearInterval(updateInterval);
            return;
        }
        
        // Update trip data
        appState.currentTrip.duration += 1;
        appState.currentTrip.distance += Math.random() * 0.5 + 0.2;
        appState.currentTrip.speed = Math.floor(Math.random() * 60 + 20);
        
        // Occasionally change detected mode
        if (Math.random() < 0.1) {
            const modes = ['Bus', 'Car', 'Auto-rickshaw', 'Walking'];
            appState.currentTrip.mode = modes[Math.floor(Math.random() * modes.length)];
            appState.currentTrip.confidence = Math.floor(Math.random() * 30 + 70);
        }
        
        updateActiveTrip();
    }, 1000);
}

function updateActiveTrip() {
    if (!appState.currentTrip) return;
    
    const trip = appState.currentTrip;
    
    // Update trip info display
    document.getElementById('tripStartTime').textContent = formatTime(trip.startTime);
    document.getElementById('tripDuration').textContent = `${trip.duration} min`;
    document.getElementById('currentSpeed').textContent = `${trip.speed} km/h`;
    document.getElementById('tripDistance').textContent = `${trip.distance.toFixed(1)} km`;
    
    // Update detected mode
    const mode = transportModes.find(m => m.name === trip.mode);
    if (mode) {
        document.getElementById('detectedModeIcon').textContent = mode.icon;
        document.getElementById('detectedMode').textContent = mode.name;
        
        // Update confidence bar
        const confidenceFill = document.querySelector('.confidence-fill');
        confidenceFill.style.width = `${trip.confidence}%`;
        document.querySelector('.confidence-text').textContent = `${trip.confidence}% Confidence`;
    }
    
    // Update companion count
    document.getElementById('companionCount').textContent = trip.companions;
}

function setupModeButtons() {
    const modeButtonsContainer = document.getElementById('modeButtons');
    
    transportModes.forEach(mode => {
        const button = document.createElement('button');
        button.className = 'mode-btn';
        button.innerHTML = `
            <span style="font-size: 24px;">${mode.icon}</span>
            <span>${mode.name}</span>
        `;
        button.addEventListener('click', () => selectMode(mode.name));
        modeButtonsContainer.appendChild(button);
    });
}

function selectMode(modeName) {
    if (appState.currentTrip) {
        appState.currentTrip.mode = modeName;
        appState.currentTrip.confidence = 100;
        appState.currentTrip.status = "User-confirmed";
        updateActiveTrip();
        
        // Update button states
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.closest('.mode-btn').classList.add('active');
    }
}

function changeCompanions(delta) {
    if (appState.currentTrip) {
        appState.currentTrip.companions = Math.max(0, appState.currentTrip.companions + delta);
        document.getElementById('companionCount').textContent = appState.currentTrip.companions;
    }
}

function pauseTrip() {
    // Simulate pausing trip
    alert('Trip paused. Tracking will resume when movement is detected.');
}

function stopTrip() {
    if (!appState.currentTrip) return;
    
    // Finalize current trip
    const trip = appState.currentTrip;
    trip.endTime = new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'});
    trip.destination = getRandomDestination();
    trip.purpose = document.getElementById('tripPurpose').value || 'Other';
    trip.status = trip.confidence === 100 ? 'User-confirmed' : 'Auto-detected';
    
    // Add to trips history
    appState.trips.unshift(trip);
    
    // Reset tracking state
    appState.isTracking = false;
    appState.currentTrip = null;
    
    // Update UI
    const trackingBtn = document.getElementById('trackingBtn');
    const statusDot = document.getElementById('trackingStatus');
    const statusText = document.getElementById('statusText');
    
    trackingBtn.innerHTML = '<i class="fas fa-play"></i><span>Start Trip Tracking</span>';
    trackingBtn.classList.remove('active');
    
    statusDot.classList.remove('active');
    statusText.textContent = 'Not Tracking';
    
    // Update displays
    renderTripHistory();
    updateDashboardStats();
    
    // Show completion message
    alert(`Trip completed! Traveled ${trip.distance.toFixed(1)} km in ${trip.duration} minutes.`);
    
    // Switch to history tab
    showTab('history');
}

function getRandomDestination() {
    const destinations = [
        "Technopark Phase 1",
        "Spencer Plaza, MG Road",
        "Thiruvananthapuram Medical College",
        "University of Kerala",
        "Secretariat",
        "Kovalam Beach",
        "Neyyattinkara",
        "Attingal"
    ];
    return destinations[Math.floor(Math.random() * destinations.length)];
}

// Trip History Functions
function renderTripHistory() {
    const tripList = document.getElementById('tripList');
    if (!tripList) return;
    
    tripList.innerHTML = '';
    
    const filteredTrips = getFilteredTrips();
    
    if (filteredTrips.length === 0) {
        tripList.innerHTML = `
            <div class="no-trips">
                <i class="fas fa-route" style="font-size: 48px; color: var(--color-text-secondary); margin-bottom: 16px;"></i>
                <h3>No trips found</h3>
                <p>Start tracking to record your first trip!</p>
            </div>
        `;
        return;
    }
    
    filteredTrips.forEach(trip => {
        const tripElement = createTripElement(trip);
        tripList.appendChild(tripElement);
    });
}

function createTripElement(trip) {
    const tripDiv = document.createElement('div');
    tripDiv.className = 'trip-item';
    
    const mode = transportModes.find(m => m.name === trip.mode);
    const modeIcon = mode ? mode.icon : '🚶';
    
    tripDiv.innerHTML = `
        <div class="trip-header">
            <div class="trip-route">
                <span class="mode-icon">${modeIcon}</span>
                <div>
                    <div class="route-text">${trip.origin} → ${trip.destination || 'Unknown'}</div>
                    <small>${formatDate(trip.date || trip.startDate)} at ${formatTime(trip.startTime)}</small>
                </div>
            </div>
            <div class="trip-actions-history">
                <button class="btn btn--sm btn--outline" onclick="editTrip(${trip.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn--sm btn--outline" onclick="deleteTrip(${trip.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="trip-meta">
            <div><strong>Mode:</strong> ${trip.mode}</div>
            <div><strong>Duration:</strong> ${trip.duration || calculateDuration(trip.startTime, trip.endTime)}</div>
            <div><strong>Distance:</strong> ${trip.distance || 'N/A'}</div>
            <div><strong>Purpose:</strong> ${trip.purpose || 'Not specified'}</div>
            <div><strong>Companions:</strong> ${trip.companions}</div>
            <div><strong>Status:</strong> <span class="status status--${getStatusClass(trip.status)}">${trip.status}</span></div>
        </div>
    `;
    
    return tripDiv;
}

function getFilteredTrips() {
    const modeFilter = document.getElementById('modeFilter')?.value || '';
    
    return appState.trips.filter(trip => {
        if (modeFilter && trip.mode !== modeFilter) return false;
        return true;
    });
}

function filterTrips() {
    renderTripHistory();
}

function editTrip(tripId) {
    const trip = appState.trips.find(t => t.id === tripId);
    if (trip) {
        // Simple edit simulation
        const newPurpose = prompt('Enter trip purpose:', trip.purpose);
        if (newPurpose !== null) {
            trip.purpose = newPurpose;
            trip.status = 'User-edited';
            renderTripHistory();
        }
    }
}

function deleteTrip(tripId) {
    if (confirm('Are you sure you want to delete this trip?')) {
        appState.trips = appState.trips.filter(t => t.id !== tripId);
        renderTripHistory();
        updateDashboardStats();
    }
}

function getStatusClass(status) {
    switch (status) {
        case 'Auto-detected': return 'info';
        case 'User-confirmed': return 'success';
        case 'User-edited': return 'warning';
        default: return 'info';
    }
}

// Dashboard Functions
function updateDashboardStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayTrips = appState.trips.filter(trip => 
        (trip.date || trip.startDate) === today
    );
    
    // Update trip count
    document.getElementById('todayTrips').textContent = todayTrips.length;
    
    // Calculate total distance
    const totalDistance = todayTrips.reduce((sum, trip) => {
        const distance = typeof trip.distance === 'string' ? 
            parseFloat(trip.distance) : trip.distance || 0;
        return sum + distance;
    }, 0);
    document.getElementById('todayDistance').textContent = `${totalDistance.toFixed(1)} km`;
    
    // Find most used mode
    const modeCounts = {};
    appState.trips.forEach(trip => {
        modeCounts[trip.mode] = (modeCounts[trip.mode] || 0) + 1;
    });
    
    const topMode = Object.keys(modeCounts).reduce((a, b) => 
        modeCounts[a] > modeCounts[b] ? a : b, 'Bus'
    );
    document.getElementById('topMode').textContent = topMode || 'Bus';
}

// Export Functions
function previewData() {
    const startDate = document.querySelector('input[type="date"]').value;
    const endDate = document.querySelectorAll('input[type="date"]')[1].value;
    
    const filteredTrips = appState.trips.filter(trip => {
        const tripDate = trip.date || trip.startDate;
        return tripDate >= startDate && tripDate <= endDate;
    });
    
    alert(`Preview: ${filteredTrips.length} trips found in the selected date range.`);
}

function exportData() {
    const format = document.querySelector('input[name="format"]:checked').value;
    const startDate = document.querySelector('input[type="date"]').value;
    const endDate = document.querySelectorAll('input[type="date"]')[1].value;
    
    const filteredTrips = appState.trips.filter(trip => {
        const tripDate = trip.date || trip.startDate;
        return tripDate >= startDate && tripDate <= endDate;
    });
    
    let exportData;
    let filename;
    let mimeType;
    
    switch (format) {
        case 'csv':
            exportData = generateCSV(filteredTrips);
            filename = 'natpac_travel_data.csv';
            mimeType = 'text/csv';
            break;
        case 'json':
            exportData = JSON.stringify(filteredTrips, null, 2);
            filename = 'natpac_travel_data.json';
            mimeType = 'application/json';
            break;
        case 'pdf':
            // Simulate PDF generation
            alert('PDF report generation initiated. You will receive an email when ready.');
            return;
        default:
            return;
    }
    
    // Create download link
    const blob = new Blob([exportData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Data exported successfully as ${filename}`);
}

function generateCSV(trips) {
    const headers = [
        'Date', 'Start Time', 'End Time', 'Origin', 'Destination', 
        'Mode', 'Distance', 'Duration', 'Purpose', 'Companions', 'Status'
    ];
    
    const rows = trips.map(trip => [
        trip.date || trip.startDate,
        trip.startTime,
        trip.endTime || '',
        trip.origin,
        trip.destination || '',
        trip.mode,
        typeof trip.distance === 'string' ? trip.distance : `${trip.distance} km`,
        trip.duration || '',
        trip.purpose || '',
        trip.companions,
        trip.status
    ]);
    
    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
    
    return csvContent;
}

// Utility Functions
function formatTime(timeString) {
    if (!timeString) return '';
    
    // Handle both 24-hour and 12-hour formats
    try {
        const time = new Date(`2000-01-01 ${timeString}`);
        return time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    } catch (e) {
        return timeString;
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
}

function calculateDuration(startTime, endTime) {
    if (!startTime || !endTime) return 'N/A';
    
    try {
        const start = new Date(`2000-01-01 ${startTime}`);
        const end = new Date(`2000-01-01 ${endTime}`);
        const diffMs = end - start;
        const diffMins = Math.floor(diffMs / 60000);
        
        return `${diffMins} min`;
    } catch (e) {
        return 'N/A';
    }
}

// Global event handlers (called from HTML onclick attributes)
window.showTab = showTab;
window.toggleTracking = toggleTracking;
window.selectMode = selectMode;
window.changeCompanions = changeCompanions;
window.pauseTrip = pauseTrip;
window.stopTrip = stopTrip;
window.filterTrips = filterTrips;
window.editTrip = editTrip;
window.deleteTrip = deleteTrip;
window.previewData = previewData;
window.exportData = exportData;
window.acceptConsent = acceptConsent;
window.declineConsent = declineConsent;

// Initialize notification system
function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: var(--color-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'});
        color: white;
        border-radius: 8px;
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Auto-save functionality
setInterval(() => {
    if (appState.currentTrip) {
        // Auto-save current trip state
        localStorage.setItem('natpac_current_trip', JSON.stringify(appState.currentTrip));
    }
}, 10000); // Save every 10 seconds

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // App went to background
        if (appState.isTracking) {
            showNotification('Tracking continues in background', 'info');
        }
    } else {
        // App came to foreground
        if (appState.isTracking) {
            showNotification('Welcome back! Tracking is active', 'success');
        }
    }
});

// Add styles for no-trips message
const style = document.createElement('style');
style.textContent = `
    .no-trips {
        text-align: center;
        padding: 60px 20px;
        color: var(--color-text-secondary);
    }
    
    .no-trips h3 {
        margin: 16px 0 8px 0;
        color: var(--color-text);
    }
    
    .no-trips p {
        margin: 0;
    }
`;
document.head.appendChild(style);