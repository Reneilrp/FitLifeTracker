// Navigation Styles for Tab Bar and Headers

export const navigationStyles = {
  // Tab Bar Styles (Bottom Navigation)
  tabBar: {
    activeTintColor: '#45D9C8',      // Color when tab is selected
    inactiveTintColor: '#757575',     // Color when tab is not selected
    style: {
      backgroundColor: '#fff',        // Tab bar background color
      borderTopWidth: 1,              // Top border thickness
      borderTopColor: '#e0e0e0',      // Top border color
      height: 85,                     // Tab bar height
      paddingBottom: 8,               // Bottom padding
      paddingTop: 8,                  // Top padding
    },
  },

  // Header Styles (Top bar)
  header: {
    style: {
      backgroundColor: '#45D9C8',     // Header background color
    },
    tintColor: '#fff',                // Header text and icon color
    titleStyle: {
      fontWeight: 'bold',             // Header title font weight
    },
  },
};