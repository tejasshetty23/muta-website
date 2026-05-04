// ─────────────────────────────────────────────────────────────
// mutaData.js – Data service layer for muta.bet content
// Uses real public data from muta.bet + realistic mock leaderboard entries
// ─────────────────────────────────────────────────────────────

// Real partner data from muta.bet
const PARTNERS = [
  {
    name: "Shuffle",
    url: "https://shuffle.com/?r=muta",
    code: "MUTA",
    leaderboardTotal: 11000,
    leaderboardUrl: "https://muta.bet/leaderboard/shuffle",
  },
  {
    name: "PackDraw",
    url: "https://packdraw.com/?ref=muta",
    code: "MUTA",
    leaderboardTotal: 3010,
    leaderboardUrl: "https://muta.bet/leaderboard/packdraw",
  },
  {
    name: "SkinRave",
    url: "https://skinrave.gg/en?r=muta",
    code: "MUTA",
    leaderboardTotal: 2000,
    leaderboardUrl: "https://muta.bet/leaderboard/skinrave",
  },
  {
    name: "Dejen",
    url: "https://dejen.com/?r=muta",
    code: "MUTA",
    leaderboardTotal: 5000,
    leaderboardUrl: "https://muta.bet/leaderboard/dejen",
  },
];

// Real social links from muta.bet
const SOCIALS = [
  { label: "Kick", href: "https://kick.com/muta11" },
  { label: "Twitter", href: "https://x.com/OgMuta" },
  { label: "Discord", href: "https://discord.gg/C3QyjybcKP" },
];

// Realistic mock leaderboard entries (based on real structure from muta.bet)
const LEADERBOARD_ENTRIES = {
  shuffle: [
    { username: "ka***ku", wagered: 79769.76, reward: 3700 },
    { username: "so**********ie", wagered: 31794.64, reward: 2200 },
    { username: "Le**********ge", wagered: 26559.91, reward: 1500 },
    { username: "Mi********in", wagered: 18446.40, reward: 1000 },
    { username: "Bl*****er", wagered: 14220.35, reward: 750 },
    { username: "Cy******ix", wagered: 11890.10, reward: 500 },
    { username: "Da*****ks", wagered: 9540.22, reward: 400 },
    { username: "Fr*****ce", wagered: 7320.88, reward: 350 },
    { username: "Ni*****ht", wagered: 5190.44, reward: 300 },
    { username: "Sk*****er", wagered: 3280.15, reward: 300 },
  ],
  packdraw: [
    { username: "xM*****ta", wagered: 12450.30, reward: 1000 },
    { username: "Pa*****ck", wagered: 8920.15, reward: 700 },
    { username: "Dr*****aw", wagered: 6340.80, reward: 500 },
    { username: "Lu*****ky", wagered: 4210.55, reward: 350 },
    { username: "Wi*****ns", wagered: 2890.40, reward: 260 },
    { username: "Go*****ld", wagered: 1540.25, reward: 200 },
  ],
  skinrave: [
    { username: "Ra*****ve", wagered: 8120.60, reward: 800 },
    { username: "Sk*****in", wagered: 5640.35, reward: 500 },
    { username: "Ne*****on", wagered: 3290.10, reward: 350 },
    { username: "Gl*****ow", wagered: 1870.85, reward: 200 },
    { username: "Fi*****re", wagered: 980.40, reward: 150 },
  ],
  dejen: [
    { username: "777aldo", wagered: 5433.20, reward: 2000 },
    { username: "biggt", wagered: 4597.20, reward: 1100 },
    { username: "icyzzz", wagered: 3233.40, reward: 600 },
    { username: "de*****en", wagered: 2140.90, reward: 450 },
    { username: "cr*****sh", wagered: 1560.35, reward: 350 },
    { username: "mu*****ta", wagered: 890.10, reward: 250 },
    { username: "wi*****ld", wagered: 620.55, reward: 150 },
    { username: "no*****va", wagered: 340.80, reward: 100 },
  ],
};

/**
 * Get stats data mapped into the existing component format.
 * Uses real leaderboard totals from muta.bet partners.
 */
export function getStats() {
  const totalPrizePool = PARTNERS.reduce((sum, p) => sum + p.leaderboardTotal, 0);
  const biggestPool = Math.max(...PARTNERS.map((p) => p.leaderboardTotal));
  return [
    { label: "Total Prize Pool", value: totalPrizePool, prefix: "$" },
    { label: "Biggest Leaderboard", value: biggestPool, prefix: "$" },
    { label: "Active Partners", value: PARTNERS.length, prefix: "" },
  ];
}

/**
 * Get games data mapped into the existing component format.
 * Uses real partner sites from muta.bet.
 */
export function getGames() {
  const gradients = [
    "from-fuchsia-500 via-violet-500 to-cyan-400",
    "from-pink-500 via-purple-500 to-indigo-500",
    "from-blue-500 via-fuchsia-500 to-pink-500",
    "from-violet-500 via-pink-500 to-amber-300",
  ];

  return PARTNERS.map((partner, index) => ({
    title: partner.name,
    meta: `$${partner.leaderboardTotal.toLocaleString()} Prize Pool`,
    gradient: gradients[index % gradients.length],
    url: partner.url,
    code: partner.code,
  }));
}

/**
 * Get recent wins data mapped into the existing component format.
 * Uses realistic leaderboard entries from muta.bet partners.
 */
export function getWins() {
  // Flatten top entries from each partner's leaderboard
  const allEntries = [];
  for (const partner of PARTNERS) {
    const key = partner.name.toLowerCase();
    const entries = LEADERBOARD_ENTRIES[key] || [];
    // Take top 2 from each partner
    entries.slice(0, 2).forEach((entry) => {
      allEntries.push({
        amount: `$${entry.reward.toLocaleString()}`,
        game: partner.name,
        time: entry.username,
      });
    });
  }
  // Sort by reward descending and take top 6
  return allEntries
    .sort((a, b) => {
      const aVal = parseFloat(a.amount.replace(/[$,]/g, ""));
      const bVal = parseFloat(b.amount.replace(/[$,]/g, ""));
      return bVal - aVal;
    })
    .slice(0, 6);
}

/**
 * Get social links mapped into the existing component format.
 * Uses real links from muta.bet.
 */
export function getSocials() {
  return SOCIALS;
}

/**
 * Get all partner data for detailed views.
 */
export function getPartners() {
  return PARTNERS;
}

/**
 * Get leaderboard entries for a specific partner.
 */
export function getLeaderboard(partnerName) {
  const key = partnerName.toLowerCase();
  return LEADERBOARD_ENTRIES[key] || [];
}

/**
 * Get all data in one call.
 */
export function getAllMutaData() {
  return {
    stats: getStats(),
    games: getGames(),
    wins: getWins(),
    socials: getSocials(),
    partners: getPartners(),
  };
}
