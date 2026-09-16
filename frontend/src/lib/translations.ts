export type Language = "en" | "hi";

export const translations = {
  en: {
    nav_home: "Home",
    nav_tournaments: "Tournaments",
    nav_games: "Games",
    nav_matches: "Matches",
    nav_leaderboard: "Leaderboard",
    nav_community: "Community",
    nav_about: "About",
    nav_login: "Login",
    nav_my_profile: "My Profile",
    nav_settings: "Settings",
    nav_my_tournaments: "My Tournaments",
    nav_logout: "Logout",
    nav_notifications: "Notifications",
    nav_view_all_notifications: "View all notifications →",
    nav_search_placeholder: "Search players, UID, games...",
  },
  hi: {
    nav_home: "होम",
    nav_tournaments: "टूर्नामेंट",
    nav_games: "गेम्स",
    nav_matches: "मैच",
    nav_leaderboard: "लीडरबोर्ड",
    nav_community: "कम्युनिटी",
    nav_about: "हमारे बारे में",
    nav_login: "लॉगिन",
    nav_my_profile: "मेरी प्रोफाइल",
    nav_settings: "सेटिंग्स",
    nav_my_tournaments: "मेरे टूर्नामेंट",
    nav_logout: "लॉगआउट",
    nav_notifications: "सूचनाएं",
    nav_view_all_notifications: "सभी सूचनाएं देखें →",
    nav_search_placeholder: "खिलाड़ी, गेम्स खोजें...",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;