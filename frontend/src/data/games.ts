export type FAQ = {
  question: string;
  answer: string;
};

export type Game = {
  id: string;
  name: string;
  shortName: string;
  genre: string;
  description: string;
  image: string;
  players: string;
  tournaments: string;
  status: "ACTIVE" | "POPULAR" | "COMING SOON";
  rules: string[];
  instructions: string[];
  faqs: FAQ[];
};

export const games: Game[] = [
  {
    id: "free-fire",
    name: "Free Fire",
    shortName: "FF",
    genre: "Battle Royale",
    description:
      "Fast-paced battle royale competition built for players who want intense matches and quick action.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    players: "18.7K",
    tournaments: "154",
    status: "POPULAR",
    rules: [
      "Emulators are strictly not allowed — mobile devices only.",
      "Only the character skills and gun skins available in the standard client may be used.",
      "Custom room settings (map, zone timing) must match what the tournament organizer sets.",
      "Players must keep a screen recording of their match if asked by the admin for verification.",
      "Booyah screenshots must be submitted within 5 minutes of match end for result confirmation.",
    ],
    instructions: [
      "Register for an available Free Fire tournament.",
      "Complete your player or team information.",
      "Join the match using the provided room details.",
      "Play the assigned match and follow fair-play rules.",
      "Submit or confirm the result when the match ends.",
    ],
    faqs: [
      {
        question: "Which mode does the tournament use?",
        answer:
          "Most Free Fire tournaments run Battle Royale (Bermuda/Purgatory) in Solo, Duo or Squad — check the specific tournament's mode before registering.",
      },
      {
        question: "How many players are in a team?",
        answer:
          "Solo = 1 player, Duo = 2 players, Squad = 4 players. The required team size is shown on each tournament's page.",
      },
      {
        question: "What gets a player disqualified?",
        answer:
          "Using an emulator, teaming with rival squads, hacks/scripts, or not joining the room within the grace period all result in disqualification.",
      },
      {
        question: "When do I get the Room ID and password?",
        answer:
          "Room ID and password are shared in-app 10–15 minutes before the scheduled match time. Keep notifications on so you don't miss it.",
      },
    ],
  },
  {
    id: "valorant",
    name: "Valorant",
    shortName: "VAL",
    genre: "Tactical FPS",
    description:
      "Competitive tactical shooter where teams fight through rounds using precision, strategy and abilities.",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80",
    players: "24.8K",
    tournaments: "186",
    status: "ACTIVE",
    rules: [
      "No smurfing — players must compete on their own registered Riot account.",
      "Agent locks must be completed before the pick phase timer ends.",
      "Pauses are only permitted for genuine technical/connection issues, max 2 per team per map.",
      "Matches are played on official Riot servers only — no unofficial hosts.",
      "Coaching or outside communication during a live round is not allowed.",
    ],
    instructions: [
      "Select a Valorant tournament.",
      "Register your Riot account details when required.",
      "Join the lobby at the scheduled time.",
      "Complete the match according to tournament rules.",
      "Report the final score through the tournament system.",
    ],
    faqs: [
      {
        question: "Which mode does the tournament use?",
        answer:
          "Standard 5v5 Competitive mode on the current active map pool, best-of-1 or best-of-3 depending on the tournament stage.",
      },
      {
        question: "How many players are in a team?",
        answer:
          "5 starting players per team, plus up to 2 substitutes may be registered depending on the tournament's rules.",
      },
      {
        question: "What gets a player disqualified?",
        answer:
          "Smurfing on an unregistered account, using cheats/exploits, unauthorized coaching during rounds, or toxic conduct toward opponents/staff.",
      },
      {
        question: "When do I get the Room/Lobby details?",
        answer:
          "The custom lobby code is shared 10–15 minutes before the scheduled match time via the platform and/or Discord.",
      },
    ],
  },
  {
    id: "bgmi",
    name: "BGMI",
    shortName: "BG",
    genre: "Battle Royale",
    description:
      "Competitive mobile battle royale experience featuring squad-based tournaments and intense survival matches.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    players: "31.2K",
    tournaments: "241",
    status: "POPULAR",
    rules: [
      "TPP (Third Person Perspective) mode only, unless a tournament specifically states FPP.",
      "Emulators and modified clients are strictly banned — mobile devices only.",
      "In-game name must exactly match the name used during registration.",
      "Exploiting red zone, vehicle or terrain glitches is not allowed.",
      "Teaming with rival squads or stream sniping results in immediate disqualification.",
    ],
    instructions: [
      "Choose an available BGMI tournament.",
      "Register your player or squad information.",
      "Enter the tournament room using the supplied details.",
      "Complete the scheduled match.",
      "Submit the final result when requested.",
    ],
    faqs: [
      {
        question: "Which mode does the tournament use?",
        answer:
          "TPP Squad is the most common format, though Solo and Duo TPP tournaments are also run — check the tournament card for the exact mode.",
      },
      {
        question: "How many players are in a team?",
        answer:
          "Squad = 4 players, Duo = 2 players, Solo = 1 player. All 4 squad members must be registered with valid in-game UIDs.",
      },
      {
        question: "What gets a player disqualified?",
        answer:
          "Emulator use, name mismatch with registration, glitch abuse, teaming, or not entering the custom room within the grace period.",
      },
      {
        question: "When do I get the Room ID and password?",
        answer:
          "Shared 10–15 minutes before the scheduled match slot. Make sure your registered in-game name matches exactly so you're allowed into the room.",
      },
    ],
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    shortName: "CS2",
    genre: "Competitive FPS",
    description:
      "Classic tactical FPS competition focused on teamwork, aim, economy and round strategy.",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80",
    players: "16.4K",
    tournaments: "127",
    status: "ACTIVE",
    rules: [
      "Registered Steam accounts only — account age/hour restrictions may apply per tournament.",
      "Only approved overlays (Discord, OBS) are allowed; third-party aim/wallhack tools are strictly banned.",
      "Standard competitive settings apply — MR12 (or MR15) with overtime enabled unless stated otherwise.",
      "Team rosters must be locked before the tournament start and cannot be changed mid-tournament.",
      "Server/tech pauses are limited to 2 per team per map, 5 minutes each.",
    ],
    instructions: [
      "Select a CS2 tournament.",
      "Register your team and player information.",
      "Join the assigned server.",
      "Complete the scheduled match.",
      "Submit the match result after completion.",
    ],
    faqs: [
      {
        question: "Which mode does the tournament use?",
        answer:
          "Competitive 5v5 on the active map pool, played as MR12 halves with overtime rounds if the score is tied.",
      },
      {
        question: "How many players are in a team?",
        answer:
          "5 starting players, plus up to 2 substitutes may be registered depending on tournament rules.",
      },
      {
        question: "What gets a player disqualified?",
        answer:
          "Cheating/wallhacks, playing on an unregistered Steam account, roster changes mid-tournament, or repeated no-shows.",
      },
      {
        question: "When do I get the server details?",
        answer:
          "Server IP/connect string is shared 10–15 minutes before the scheduled match time to the team captain.",
      },
    ],
  },
  {
    id: "call-of-duty",
    name: "Call of Duty",
    shortName: "COD",
    genre: "Battle Royale",
    description:
      "High-stakes Warzone battle royale action with fast rotations, squad tactics and explosive firefights.",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=80",
    players: "12.9K",
    tournaments: "98",
    status: "ACTIVE",
    rules: [
      "Stream sniping (watching opponents' live streams during your match) is strictly prohibited.",
      "Loadout drops and killstreaks must be limited to what the tournament ruleset allows.",
      "Gulag/redeploy rules follow the standard Warzone ruleset unless the tournament states otherwise.",
      "Cheating, scripting or unauthorized software is forbidden on both console and PC.",
      "Teaming with rival squads is not allowed and will result in disqualification.",
    ],
    instructions: [
      "Register for an available Call of Duty tournament.",
      "Complete your player or squad information.",
      "Join the match using the provided lobby details.",
      "Play the assigned match and follow fair-play rules.",
      "Submit or confirm the result when the match ends.",
    ],
    faqs: [
      {
        question: "Which mode does the tournament use?",
        answer:
          "Warzone Battle Royale (Trios or Quads) is the standard competitive format — check the tournament page for the exact squad size.",
      },
      {
        question: "How many players are in a team?",
        answer:
          "Trios = 3 players, Quads = 4 players. All squad members must be registered with their linked Activision ID.",
      },
      {
        question: "What gets a player disqualified?",
        answer:
          "Stream sniping, cheating/scripting, teaming with rival squads, or not deploying within the grace period after the lobby opens.",
      },
      {
        question: "When do I get the lobby details?",
        answer:
          "Custom lobby invite or code is shared 10–15 minutes before the scheduled match time via the platform.",
      },
    ],
  },
];