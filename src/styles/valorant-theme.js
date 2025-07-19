// Valorant-inspired theme configuration for Ant Design
export const valorantTheme = {
  token: {
    // Primary Colors - Valorant Red
    colorPrimary: '#ff4655',
    colorPrimaryHover: '#ff6b75',
    colorPrimaryActive: '#e63946',
    
    // Background Colors - Dark Theme
    colorBgBase: '#0f1419',
    colorBgContainer: '#1a1f26',
    colorBgElevated: '#232a33',
    colorBgLayout: '#0a0e13',
    colorBgSpotlight: '#2a3441',
    
    // Text Colors
    colorText: '#ffffff',
    colorTextSecondary: '#b8c5d1',
    colorTextTertiary: '#8a9ba8',
    colorTextQuaternary: '#5c6b7a',
    
    // Border Colors
    colorBorder: '#2a3441',
    colorBorderSecondary: '#1a1f26',
    
    // Success/Error Colors - Valorant Style
    colorSuccess: '#00d4aa',
    colorSuccessHover: '#1ae6b8',
    colorError: '#ff4655',
    colorErrorHover: '#ff6b75',
    colorWarning: '#ffb800',
    colorWarningHover: '#ffc933',
    colorInfo: '#00d4aa',
    
    // Component specific
    colorFillAlter: '#1a1f26',
    colorFillSecondary: '#232a33',
    colorFillTertiary: '#2a3441',
    colorFillQuaternary: '#3a4551',
    
    // Typography
    fontFamily: '"Rajdhani", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    
    // Border Radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    
    // Box Shadow - Valorant Glow Effect
    boxShadow: '0 2px 8px rgba(255, 70, 85, 0.15)',
    boxShadowSecondary: '0 4px 16px rgba(255, 70, 85, 0.1)',
    
    // Motion
    motionDurationSlow: '0.3s',
    motionDurationMid: '0.2s',
    motionDurationFast: '0.1s',
  },
  
  components: {
    // Button Component
    Button: {
      colorPrimary: '#ff4655',
      colorPrimaryHover: '#ff6b75',
      colorPrimaryActive: '#e63946',
      primaryShadow: '0 2px 8px rgba(255, 70, 85, 0.3)',
      defaultShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      fontWeight: 600,
      borderRadius: 6,
    },
    
    // Table Component
    Table: {
      colorBgContainer: '#1a1f26',
      colorFillAlter: '#232a33',
      colorBorderSecondary: '#2a3441',
      headerBg: '#232a33',
      headerColor: '#ffffff',
      rowHoverBg: '#2a3441',
    },
    
    // Card Component
    Card: {
      colorBgContainer: '#1a1f26',
      colorBorderSecondary: '#2a3441',
      boxShadowTertiary: '0 4px 16px rgba(0, 0, 0, 0.2)',
    },
    
    // Modal Component
    Modal: {
      colorBgElevated: '#1a1f26',
      colorBgMask: 'rgba(0, 0, 0, 0.7)',
    },
    
    // Input Component
    Input: {
      colorBgContainer: '#232a33',
      colorBorder: '#2a3441',
      colorBorderHover: '#ff4655',
      colorBgContainerDisabled: '#1a1f26',
    },
    
    // Select Component
    Select: {
      colorBgContainer: '#232a33',
      colorBgElevated: '#1a1f26',
      colorBorder: '#2a3441',
      colorBorderHover: '#ff4655',
    },
    
    // Menu Component
    Menu: {
      colorBgContainer: '#1a1f26',
      itemBg: 'transparent',
      itemHoverBg: '#2a3441',
      itemSelectedBg: '#ff4655',
      itemSelectedColor: '#ffffff',
    },
    
    // Tag Component
    Tag: {
      colorFillSecondary: '#2a3441',
      colorBorderSecondary: '#3a4551',
    },
    
    // Typography Component
    Typography: {
      colorText: '#ffffff',
      colorTextSecondary: '#b8c5d1',
      colorTextTertiary: '#8a9ba8',
      titleMarginBottom: 16,
      titleMarginTop: 0,
    },
    
    // Layout Component
    Layout: {
      bodyBg: '#0f1419',
      headerBg: '#1a1f26',
      triggerBg: '#2a3441',
    },
    
    // Divider Component
    Divider: {
      colorSplit: '#2a3441',
    },
    
    // Notification Component
    Notification: {
      colorBgElevated: '#1a1f26',
      colorIcon: '#ff4655',
      colorIconHover: '#ff6b75',
    },
    
    // Message Component
    Message: {
      colorBgElevated: '#1a1f26',
    },
    
    // Drawer Component
    Drawer: {
      colorBgElevated: '#1a1f26',
      colorBgMask: 'rgba(0, 0, 0, 0.7)',
    },
    
    // Tabs Component
    Tabs: {
      colorBorderSecondary: '#2a3441',
      colorFillAlter: '#232a33',
      inkBarColor: '#ff4655',
      itemSelectedColor: '#ff4655',
      itemHoverColor: '#ff6b75',
    },
    
    // Progress Component
    Progress: {
      colorSuccess: '#00d4aa',
      colorError: '#ff4655',
      colorInfo: '#ff4655',
    },
    
    // Steps Component
    Steps: {
      colorPrimary: '#ff4655',
      colorFillContent: '#2a3441',
    },
    
    // Spin Component
    Spin: {
      colorPrimary: '#ff4655',
    },
    
    // Switch Component
    Switch: {
      colorPrimary: '#ff4655',
      colorPrimaryHover: '#ff6b75',
    },
    
    // Radio Component
    Radio: {
      colorPrimary: '#ff4655',
      colorBgContainer: '#232a33',
    },
    
    // Checkbox Component
    Checkbox: {
      colorPrimary: '#ff4655',
      colorBgContainer: '#232a33',
    },
    
    // Rate Component
    Rate: {
      colorFillContent: '#ff4655',
    },
    
    // Slider Component
    Slider: {
      colorPrimary: '#ff4655',
      colorPrimaryBorderHover: '#ff6b75',
      colorFillSecondary: '#2a3441',
    },
    
    // DatePicker Component
    DatePicker: {
      colorBgContainer: '#232a33',
      colorBgElevated: '#1a1f26',
      colorBorder: '#2a3441',
      colorBorderHover: '#ff4655',
    },
    
    // TimePicker Component
    TimePicker: {
      colorBgContainer: '#232a33',
      colorBgElevated: '#1a1f26',
      colorBorder: '#2a3441',
      colorBorderHover: '#ff4655',
    },
    
    // Upload Component
    Upload: {
      colorFillAlter: '#232a33',
      colorBorder: '#2a3441',
      colorBorderHover: '#ff4655',
    },
    
    // Tree Component
    Tree: {
      colorBgContainer: '#1a1f26',
      colorFillAlter: '#232a33',
      nodeSelectedBg: '#2a3441',
      nodeHoverBg: '#232a33',
    },
    
    // Collapse Component
    Collapse: {
      colorBgContainer: '#1a1f26',
      colorFillAlter: '#232a33',
      colorBorder: '#2a3441',
    },
    
    // Anchor Component
    Anchor: {
      colorPrimary: '#ff4655',
      colorBgContainer: '#1a1f26',
    },
    
    // BackTop Component
    BackTop: {
      colorBgElevated: '#1a1f26',
      colorText: '#ff4655',
      colorTextLightSolid: '#ffffff',
    },
  },
  
  // Algorithm for dark theme
  algorithm: 'dark',
};

// Additional CSS variables for custom styling
export const valorantCSSVariables = {
  '--valorant-red': '#ff4655',
  '--valorant-red-hover': '#ff6b75',
  '--valorant-red-active': '#e63946',
  '--valorant-teal': '#00d4aa',
  '--valorant-teal-hover': '#1ae6b8',
  '--valorant-dark-bg': '#0f1419',
  '--valorant-dark-container': '#1a1f26',
  '--valorant-dark-elevated': '#232a33',
  '--valorant-dark-border': '#2a3441',
  '--valorant-text-primary': '#ffffff',
  '--valorant-text-secondary': '#b8c5d1',
  '--valorant-text-tertiary': '#8a9ba8',
  '--valorant-glow': '0 0 20px rgba(255, 70, 85, 0.3)',
  '--valorant-glow-strong': '0 0 30px rgba(255, 70, 85, 0.5)',
};