export const ROUTES = {
  BASE: "/api",
  INDEX: "/",
  INDEX_ID: "/:id",
  NEW: "/new",
  INITIALIZE: "/initialize",
  CREATE_PASSWORD:"/create-password",
  INSIGHTS: "/insights",
  SUBROUTES: {
    AUTH: "/auth",
    PROFILE: "/profile",
    QUIZ: "/quiz",
    ADMIN: "/admin",
    ARTIST_MANAGER: "/artist-manager",
    ARTWORK: "/artwork",
    SALES:"/sales"
  },

  // AUTH
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOTTEN_PASSWORD:"/forgotten-password",
  VERIFY_FORGOTTEN_PASSWORD:"/forgotten-password/verify",
  
  // ARTISTS MANAGER
  CREATE_MANAGER: "/artist-manager/new",
  ARTIST_MANAGER_REQUESTS: "/artist-manager/requests",

  // PROFILE
  // CREATE_STORE: "/create-store",
};
