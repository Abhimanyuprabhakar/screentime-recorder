const EXTENSION_CONFIG = {
  // Environment detection
  ENVIRONMENTS: {
    DEVELOPMENT: "development",
    PRODUCTION: "production"
  },

  // Backend API URL (use 127.0.0.1 to avoid IPv6 localhost conflicts)
  API_URL: "http://127.0.0.1:3000",

  // Primary frontend URL for opening login/dashboard pages
  FRONTEND_URL: "http://127.0.0.1:5173",

  // All frontend URLs for token sync (accept tokens from any of these origins)
  FRONTEND_URLS: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://screentime-recoder.vercel.app"
  ],

  // Backend configuration by environment
  BACKEND_CONFIG: {
    development: {
      url: "http://127.0.0.1:3000",
      apiPath: "/api/activity/log"
    },
    production: {
      url: "https://screentime-recoder.onrender.com",
      apiPath: "/api/activity/log"
    }
  },

  // Allowed hostnames for extension communication
  ALLOWED_HOSTNAMES: [
    "localhost",
    "127.0.0.1",
    "screentime-recoder.vercel.app",
    "screentime-recoder.onrender.com"
  ]
};

// Environment detection function
function detectEnvironment() {
  return fetch("http://127.0.0.1:3000/api/health", {
    method: "GET",
    signal: AbortSignal.timeout(2000)
  })
    .then(response => (response.ok ? "development" : "production"))
    .catch(() => "production");
}

// Get backend URL based on environment
async function getBackendUrl() {
  try {
    const environment = await detectEnvironment();
    const config = EXTENSION_CONFIG.BACKEND_CONFIG[environment];
    return `${config.url}${config.apiPath}`;
  } catch (error) {
    console.warn(
      "Environment detection failed, using production backend:",
      error
    );
    const config = EXTENSION_CONFIG.BACKEND_CONFIG.production;
    return `${config.url}${config.apiPath}`;
  }
}

// Validate backend URL security
function isValidBackendUrl(url) {
  try {
    const urlObj = new URL(url);

    if (urlObj.protocol !== "https:" && urlObj.hostname !== "localhost" && urlObj.hostname !== "127.0.0.1") {
      console.error("Invalid protocol for production backend:", url);
      return false;
    }

    if (!EXTENSION_CONFIG.ALLOWED_HOSTNAMES.includes(urlObj.hostname)) {
      console.error("Backend hostname not in allowed list:", urlObj.hostname);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Invalid backend URL format:", url);
    return false;
  }
}

// Helper function to get all allowed origins
function getAllowedOrigins() {
  return [
    ...EXTENSION_CONFIG.FRONTEND_URLS,
    ...Object.values(EXTENSION_CONFIG.BACKEND_CONFIG).map(config => config.url)
  ];
}

// Export for use in other extension files
if (typeof module !== "undefined" && module.exports) {
  module.exports = EXTENSION_CONFIG;
}
