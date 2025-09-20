# NATPAC Travel Data Collection System

A comprehensive mobile application for capturing trip-related information to support transportation planning and research by NATPAC (National Transportation Planning and Research Centre), Government of Kerala.

## 🎯 Problem Statement

Traditional household data collection using manual surveys is time-consuming and covers only a small percentage of the population, making transportation planning exercises inadequate. This application addresses the need for:

- **Automated trip data collection** from mobile phones
- **Comprehensive travel information** including origins, destinations, modes, and timings  
- **Trip chain establishment** to understand travel patterns
- **User consent-based data collection** ensuring privacy compliance
- **Scalable data collection** for transportation planning purposes

## 📱 Live Demo

🔗 **[Try the NATPAC Travel Data Collection App](https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/2d45d774b37041fd67a209723b3dca9e/a9bc1389-02d1-4b4e-8a1b-ef1c16efd6ff/index.html)**

## ✨ Features

### Core Functionality
- **🛣️ Automatic Trip Detection**: GPS-based tracking with intelligent start/end detection
- **🚌 Transport Mode Recognition**: AI-powered detection of walking, cycling, bus, car, auto-rickshaw, train
- **📍 Origin-Destination Capture**: Precise location logging with address resolution
- **⏱️ Trip Timing & Duration**: Automatic recording of trip timestamps and durations
- **👥 Companion Tracking**: Ability to record accompanying travelers
- **🎯 Trip Purpose Classification**: Work, school, shopping, medical, social, and other purposes

### User Experience
- **🔐 Privacy-First Design**: Comprehensive consent management and data control
- **✏️ Trip Validation**: User ability to review and correct auto-detected trips
- **📱 Mobile-Responsive**: Optimized for smartphones and tablets
- **🌐 Offline Support**: Local data storage with cloud synchronization
- **🇮🇳 India-Specific**: Tailored for Indian transportation modes and locations

### Data Management
- **📊 Export Capabilities**: CSV, JSON, and PDF formats for researchers
- **📈 Analytics Dashboard**: Trip statistics and usage patterns
- **🔒 Data Anonymization**: Privacy-preserving data export options
- **📋 Trip History**: Comprehensive logging and filtering capabilities

## 🏛️ About NATPAC

The **National Transportation Planning and Research Centre (NATPAC)** is a premier R&D institution under the Kerala State Council for Science, Technology and Environment (KSCSTE), established in 1976. NATPAC works on multi-modal transportation systems covering road, rail, water, and air transport, focusing on:

- Traffic and Transportation Planning
- Highway Engineering  
- Road Safety Research
- Transport Economics and Management
- Public Transport Studies
- Environmental Impact Assessment

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- GPS-enabled device for location tracking
- Internet connection for initial setup

### Installation
1. **Web App**: Access the live demo link above
2. **Mobile**: Add to home screen for app-like experience
3. **Development**: Clone this repository for local development

### First Time Setup
1. Open the application
2. Review and accept data collection consent
3. Grant location permissions
4. Complete user profile setup
5. Start your first trip tracking

## 🔧 Technical Architecture

### Frontend Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Responsive design with CSS Grid and Flexbox
- **Vanilla JavaScript**: Modern ES6+ features
- **Web APIs**: Geolocation, LocalStorage, Notification

### Key Components
- **Trip Tracking Engine**: GPS monitoring and trip detection
- **Mode Detection Algorithm**: Transportation mode classification
- **Data Storage Layer**: Local storage with sync capabilities
- **Privacy Manager**: Consent and permission handling
- **Export System**: Multi-format data export functionality

### Data Structure
```json
{
  "trip": {
    "id": "unique_trip_id",
    "startTime": "ISO_timestamp",
    "endTime": "ISO_timestamp", 
    "origin": {
      "lat": "latitude",
      "lng": "longitude",
      "address": "resolved_address"
    },
    "destination": {
      "lat": "latitude", 
      "lng": "longitude",
      "address": "resolved_address"
    },
    "mode": "detected_transport_mode",
    "confidence": "detection_confidence_0_to_100",
    "purpose": "trip_purpose",
    "companions": "number_of_companions",
    "distance": "trip_distance_km",
    "duration": "trip_duration_minutes"
  }
}
```

## 📊 Data Collection & Privacy

### Data Collected
- **Location Data**: GPS coordinates for trip tracking
- **Trip Information**: Start/end times, duration, distance
- **Transportation Modes**: Method of travel
- **Trip Purposes**: Reason for travel
- **Companion Details**: Number of accompanying travelers

### Privacy Features
- **Informed Consent**: Clear explanation before data collection
- **Granular Controls**: User control over data sharing preferences  
- **Local Storage**: Data stored locally first, synced with permission
- **Anonymization**: Personal identifiers removed in research exports
- **Data Retention**: User-controlled data retention periods

### Compliance
- Designed for compliance with Indian data protection regulations
- GDPR-ready architecture for international users
- Transparent privacy policies and user rights

## 🎨 User Interface

The application features:
- **Kerala Government Branding**: Official color scheme and logos
- **Accessibility**: High contrast, readable fonts, touch-friendly design
- **Responsive Layout**: Adapts to different screen sizes
- **Intuitive Navigation**: Tab-based interface for easy access
- **Visual Feedback**: Loading states, animations, and status indicators

## 📈 Use Cases

### For Transportation Planners
- Understand travel patterns across Kerala
- Identify transportation gaps and opportunities
- Plan infrastructure investments based on actual usage
- Analyze mode choice behavior

### For Researchers
- Study travel behavior patterns
- Transportation mode preferences
- Trip chaining and activity patterns
- Social and economic impact analysis

### For Policy Makers
- Evidence-based transportation policies
- Public transport route planning
- Urban development guidance
- Environmental impact assessment

## 🛣️ Implementation Roadmap

### Phase 1: Web Application (Current)
- ✅ Core trip tracking functionality
- ✅ User interface and experience design
- ✅ Privacy and consent management
- ✅ Data export capabilities

### Phase 2: Native Mobile Apps
- 📱 Android application development
- 🍎 iOS application development
- 🔋 Battery optimization
- 📡 Enhanced offline capabilities

### Phase 3: Advanced Features
- 🤖 Machine learning improvements
- 🗺️ Real-time traffic integration
- 👥 Social features and gamification
- 📊 Advanced analytics dashboard

### Phase 4: System Integration
- 🌐 API for third-party integration
- 🏛️ Government system connectivity
- 📋 Automated reporting systems
- 🔄 Real-time data streaming

## 🤝 Contributing

We welcome contributions from the community! Areas where you can help:

- **Bug Reports**: Found an issue? Please report it
- **Feature Requests**: Suggest new functionality  
- **Code Contributions**: Submit pull requests
- **Documentation**: Improve guides and documentation
- **Testing**: Help test on different devices and scenarios

### Development Setup
```bash
git clone https://github.com/your-org/travel-and-tourism.git
cd travel-and-tourism
# Open index.html in your browser or serve with a local server
python -m http.server 8000  # Or use your preferred method
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📞 Contact & Support

**KSCSTE-National Transportation Planning and Research Centre (NATPAC)**
- **Address**: K.Karunakaran Transpark, Akkulam, Thuruvikkal P.O, Thiruvananthapuram - 695 011, Kerala, India
- **Email**: contactus.natpac@kerala.gov.in
- **Website**: https://www.natpac.kerala.gov.in
- **Phone**: +91 471 – 2779200

## 🙏 Acknowledgments

- Kerala State Council for Science, Technology and Environment (KSCSTE)
- Government of Kerala
- Transportation planning and research community
- Open source contributors and libraries used

---

**Built with ❤️ for better transportation planning in Kerala and beyond**