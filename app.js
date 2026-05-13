"use strict";

const START_BALANCE = 1000;
const STORAGE_KEY = "neon-vault-fake-money-v1";
const MOON_LICENSE_CODE = "i-56343246534534-lizens";
const MOON_LICENSE_STORAGE_KEY = "moon-generated-license-codes-v1";
const ADMIN_PASSWORD = "123456";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const formatCoins = (value) => Math.max(0, Math.floor(value)).toLocaleString("de-DE");

const promoCodes = {
  "1sdb3v3": { amount: 1500, label: "Vault Bonus" },
  "1el2w1r": { amount: 800, label: "Mines Boost" },
  fhoqv6: { amount: 1200, label: "Tower Boost" },
  "1a27dmu": { amount: 2000, label: "Case Drop" },
  "1838w5n": { amount: 777, label: "Lucky Seven" },
  "3aoh39": { amount: 500, label: "Neon Tip" }
};

const rarityProfiles = [
  { rarity: "common", label: "Common", value: 0.24, weight: 42, accent: "#8da1b7" },
  { rarity: "uncommon", label: "Uncommon", value: 0.62, weight: 26, accent: "#70df83" },
  { rarity: "rare", label: "Rare", value: 1.15, weight: 16, accent: "#5fa8ff" },
  { rarity: "epic", label: "Epic", value: 2.5, weight: 9, accent: "#b986ff" },
  { rarity: "legendary", label: "Legendary", value: 6, weight: 4.4, accent: "#f7c85f" },
  { rarity: "mythic", label: "Mythic", value: 14, weight: 1.8, accent: "#ff5c7a" },
  { rarity: "divine", label: "Divine", value: 42, weight: 0.8, accent: "#f8fbff" }
];

const caseDefinitions = [
  ["Rusty Box", 25, "Cheap", "#8da1b7"],
  ["Streetwear Case", 50, "Cheap", "#70df83"],
  ["Budget Banger", 75, "Cheap", "#5fa8ff"],
  ["Noob Luck", 100, "Cheap", "#45d6b5"],
  ["Pixel Case", 125, "Cheap", "#b986ff"],
  ["Starter Drop", 150, "Cheap", "#f7c85f"],
  ["Neon Rush", 250, "Mid", "#45d6b5"],
  ["Midnight Case", 300, "Mid", "#5fa8ff"],
  ["Cyber Vault", 450, "Mid", "#b986ff"],
  ["Toxic Spin", 500, "Mid", "#70df83"],
  ["Hyper Drop", 650, "Mid", "#ff5c7a"],
  ["Phantom Case", 750, "Mid", "#8da1b7"],
  ["Dragon Fury", 1000, "High", "#ff5c7a"],
  ["Inferno Vault", 1500, "High", "#f7c85f"],
  ["Royal Crimson", 2000, "High", "#d74b6b"],
  ["Titan Drop", 2500, "High", "#b986ff"],
  ["Diamond Pulse", 3500, "High", "#5fa8ff"],
  ["Galaxy Elite", 5000, "High", "#45d6b5"],
  ["1% Dream", 6900, "Meme", "#f7c85f"],
  ["Rent Money", 9900, "Meme", "#70df83"],
  ["All In Case", 15000, "Meme", "#ff5c7a"],
  ["Heart Attack", 25000, "Meme", "#d74b6b"],
  ["Bankruptcy Box", 50000, "Meme", "#8da1b7"],
  ["Final Boss", 100000, "Meme", "#f8fbff"],
  ["Halloween Havoc", 1200, "Event Horror", "#ff5c7a"],
  ["Xmas Moon", 1600, "Event Weihnachten", "#70df83"],
  ["Summer Heat", 1800, "Event Sommer", "#f7c85f"],
  ["Lunar Drop", 2200, "Event Sci-Fi", "#5fa8ff"],
  ["Retro Arcade", 2600, "Event 80s", "#b986ff"],
  ["Glitch Case", 3200, "Event Cyberpunk", "#45d6b5"],
  ["VIP Vault", 7500, "VIP", "#f7c85f"],
  ["Millionaire Case", 15000, "VIP", "#70df83"],
  ["Black Card Case", 30000, "VIP", "#8da1b7"],
  ["Crypto Whale", 50000, "VIP", "#5fa8ff"],
  ["God Mode Case", 100000, "VIP", "#f8fbff"]
];

const cases = caseDefinitions.map(([name, price, category, accent]) => makeCase(name, price, category, accent));

const wheelOptions = {
  blue: { label: "Blau", chance: 50, multiplier: 1.8 },
  green: { label: "Gruen", chance: 33, multiplier: 2.7 },
  gold: { label: "Gold", chance: 17, multiplier: 5.2 }
};

const towerRisk = {
  easy: { trapCount: 1, step: 1.24 },
  medium: { trapCount: 1, step: 1.5 },
  hard: { trapCount: 2, step: 2.25 }
};

const PLINKO_ROWS = 12;
const plinkoMultipliers = {
  low: [0.35, 0.5, 0.7, 0.9, 1, 1.2, 1.6, 1.2, 1, 0.9, 0.7, 0.5, 0.35],
  medium: [0.1, 0.25, 0.45, 0.75, 1, 1.4, 3.2, 1.4, 1, 0.75, 0.45, 0.25, 0.1],
  high: [0, 0.1, 0.2, 0.45, 0.9, 1.8, 12, 1.8, 0.9, 0.45, 0.2, 0.1, 0]
};

const cryptoDefinitions = [
  ["BTC", "Bitcoin", 65000, "#f7931a"],
  ["ETH", "Ethereum", 3300, "#627eea"],
  ["SOL", "Solana", 165, "#14f195"],
  ["BNB", "BNB", 590, "#f3ba2f"],
  ["XRP", "XRP", 0.62, "#6e7782"],
  ["ADA", "Cardano", 0.48, "#2a71d0"],
  ["DOGE", "Dogecoin", 0.15, "#c2a633"],
  ["SHIB", "Shiba Inu", 0.000024, "#f05a28"],
  ["AVAX", "Avalanche", 36, "#e84142"],
  ["DOT", "Polkadot", 7.2, "#e6007a"],
  ["LINK", "Chainlink", 14, "#2a5ada"],
  ["LTC", "Litecoin", 84, "#345d9d"],
  ["TRX", "TRON", 0.12, "#ef0027"],
  ["TON", "Toncoin", 6.3, "#0098ea"],
  ["XMR", "Monero", 145, "#ff6600"],
  ["XLM", "Stellar", 0.11, "#7d8fa3"],
  ["ATOM", "Cosmos", 8.9, "#2e3148"],
  ["NEAR", "NEAR Protocol", 6.4, "#00c08b"],
  ["ICP", "Internet Computer", 12, "#f15a24"],
  ["FIL", "Filecoin", 5.7, "#0090ff"],
  ["VET", "VeChain", 0.034, "#15bdff"],
  ["ARB", "Arbitrum", 1.1, "#28a0f0"],
  ["OP", "Optimism", 2.4, "#ff0420"],
  ["SUI", "Sui", 1.25, "#6fbcf0"],
  ["APT", "Aptos", 9.2, "#00d1b2"],
  ["RNDR", "Render", 8.4, "#ff4d4d"],
  ["KAS", "Kaspa", 0.15, "#70c7ba"],
  ["PEPE", "Pepe", 0.000011, "#4fbf4f"],
  ["BONK", "Bonk", 0.000028, "#ff8a00"],
  ["FLOKI", "Floki", 0.0002, "#f0b90b"],
  ["GRT", "The Graph", 0.26, "#6747ed"],
  ["IMX", "Immutable", 2.1, "#17b4ff"],
  ["ALGO", "Algorand", 0.21, "#b8c0cc"],
  ["XTZ", "Tezos", 1.05, "#2c7df7"],
  ["MKR", "Maker", 2900, "#1aab9b"],
  ["AAVE", "Aave", 104, "#b6509e"],
  ["UNI", "Uniswap", 9.6, "#ff007a"],
  ["CAKE", "PancakeSwap", 2.8, "#d1884f"],
  ["SNX", "Synthetix", 3.1, "#00d1ff"],
  ["FTM", "Fantom", 0.72, "#1969ff"],
  ["SEI", "Sei", 0.55, "#f04438"],
  ["TIA", "Celestia", 10.5, "#7b2cff"],
  ["HBAR", "Hedera", 0.1, "#111827"],
  ["FLOW", "Flow", 0.9, "#00ef8b"],
  ["AXS", "Axie Infinity", 7.4, "#0055d5"],
  ["SAND", "Sandbox", 0.48, "#00adef"],
  ["MANA", "Decentraland", 0.44, "#ff2d55"],
  ["GALA", "Gala", 0.045, "#111111"],
  ["BEAM", "Beam", 0.03, "#00f6d2"],
  ["JASMY", "JasmyCoin", 0.022, "#f5b21b"],
  ["KAVA", "Kava", 0.68, "#ff433e"],
  ["RUNE", "THORChain", 6.1, "#00e0c6"],
  ["INJ", "Injective", 28, "#00f2fe"],
  ["STX", "Stacks", 2.2, "#5546ff"],
  ["RPL", "Rocket Pool", 24, "#f36f21"],
  ["WLD", "Worldcoin", 5.8, "#d1d5db"],
  ["XEC", "eCash", 0.000052, "#0074c2"],
  ["ZEC", "Zcash", 32, "#ecb244"],
  ["EOS", "EOS", 0.82, "#f3f7fb"],
  ["NEO", "Neo", 15, "#58bf00"]
].map(([symbol, name, basePrice, color], index) => ({
  symbol,
  name,
  basePrice,
  color,
  icon: `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${symbol.toLowerCase()}.svg`,
  logo: symbol.length > 4 ? symbol.slice(0, 4) : symbol,
  seed: index + 3
}));

const botNames = ["NovaBot", "PixelPete", "CyberMia", "LuckyLex", "VaultAI"];
const autoDefinitions = [
  { id: "cases", label: "Cases", interval: 3200 },
  { id: "crash", label: "Crash", interval: 180 },
  { id: "coinflip", label: "Coinflip", interval: 1100 },
  { id: "mines", label: "Mines", interval: 520 },
  { id: "plinko", label: "Plinko", interval: 2100 },
  { id: "wheel", label: "Wheel", interval: 2900 },
  { id: "roulette", label: "Roulette", interval: 2600 },
  { id: "blackjack", label: "Blackjack", interval: 1200 },
  { id: "poker", label: "Poker", interval: 1300 },
  { id: "dice", label: "Dice", interval: 650 },
  { id: "duel", label: "Dice Duel", interval: 1100 },
  { id: "tower", label: "Tower", interval: 520 },
  { id: "battle", label: "Battle", interval: 1600 },
  { id: "trade", label: "Trade Mode", interval: 7000 }
];

let state = loadState();
let selectedCaseId = "rusty-box";
let caseBusy = false;
let wheelBusy = false;
let wheelPick = "blue";
let wheelRotation = 0;
let roulettePick = "red";
let rouletteBusy = false;
let rouletteRotation = 0;
let rouletteBallRotation = 0;
let coinPick = "heads";
let plinkoBusy = false;
let selectedCryptoSymbol = "BTC";
let moonAutoCashoutTarget = null;
const autoLoops = {};
const moonTradeState = {
  active: false,
  symbol: "auto",
  targetValue: 0,
  entryValue: 0
};
let moonLicenseUnlocked = false;
const moonLicenseCodes = new Set([MOON_LICENSE_CODE, ...loadGeneratedMoonLicenses()]);

const blackjackState = {
  active: false,
  bet: 0,
  player: [],
  dealer: [],
  forceWin: false,
  dealerHidden: true
};

const pokerState = {
  active: false,
  phase: "idle",
  dealer: "player",
  smallBlind: 1,
  bigBlind: 2,
  currentBet: 0,
  playerStreetBet: 0,
  botStreetBet: 0,
  lastRaise: 2,
  lastAggressor: null,
  pot: 0,
  player: [],
  bot: [],
  community: [],
  visibleCommunity: 0,
  botChips: 1000,
  botThinking: false,
  forceWin: false,
  botHidden: true
};

const minesState = {
  active: false,
  bet: 0,
  mines: 5,
  mineSet: new Set(),
  revealed: new Set(),
  predicted: new Set(),
  predictionLocked: false
};

const towerState = {
  active: false,
  bet: 0,
  currentLevel: 0,
  traps: [],
  safePicks: [],
  predicted: null,
  predictedLevels: new Set(),
  risk: "medium",
  multiplier: 1
};

const crashState = {
  active: false,
  bet: 0,
  multiplier: 1,
  crashPoint: 1,
  startedAt: 0,
  raf: 0
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function hashPromo(text) {
  let hash = 2166136261;
  for (const char of text.trim().toUpperCase()) {
    hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
  }
  return hash.toString(36);
}

function loadGeneratedMoonLicenses() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MOON_LICENSE_STORAGE_KEY));
    return Array.isArray(parsed) ? parsed.filter((code) => /^i-.+-lizens$/.test(code)) : [];
  } catch {
    localStorage.removeItem(MOON_LICENSE_STORAGE_KEY);
    return [];
  }
}

function saveGeneratedMoonLicenses() {
  const generated = [...moonLicenseCodes].filter((code) => code !== MOON_LICENSE_CODE);
  localStorage.setItem(MOON_LICENSE_STORAGE_KEY, JSON.stringify(generated));
}

function generateMoonLicense() {
  const randomParts = new Uint32Array(3);
  crypto.getRandomValues(randomParts);
  const core = [...randomParts].map((part) => part.toString(36)).join("-");
  const code = `i-${core}-lizens`;
  moonLicenseCodes.add(code);
  saveGeneratedMoonLicenses();
  return code;
}

function renderAdminLicenseList() {
  const list = $("#adminLicenseList");
  list.innerHTML = "";
  [...moonLicenseCodes].forEach((code) => {
    const row = document.createElement("div");
    row.textContent = code;
    list.append(row);
  });
}

function openAdminPanel() {
  $("#adminPanel").hidden = false;
  $("#adminPassword").value = "";
  $("#adminGeneratedCode").value = "";
  $("#adminLoginArea").hidden = false;
  $("#adminTools").hidden = true;
}

function closeAdminPanel() {
  $("#adminPanel").hidden = true;
}

function loginAdmin() {
  if ($("#adminPassword").value !== ADMIN_PASSWORD) {
    showToast("Admin Passwort falsch.", true);
    return;
  }
  $("#adminLoginArea").hidden = true;
  $("#adminTools").hidden = false;
  renderAdminLicenseList();
  showToast("Admin Panel freigeschaltet.");
}

function adminGenerateLicense() {
  const code = generateMoonLicense();
  $("#adminGeneratedCode").value = code;
  renderAdminLicenseList();
  showToast("Lizenzcode generiert.");
}

function makeCase(name, price, category, accent) {
  const cleanPrice = Math.max(1, Math.floor(price));
  const drops = rarityProfiles.map((profile) => ({
    name: `${name} ${profile.label}`,
    value: Math.max(1, Math.floor(cleanPrice * profile.value)),
    rarity: profile.rarity,
    weight: profile.weight
  }));

  return {
    id: slugify(name),
    name,
    price: cleanPrice,
    category,
    accent,
    drops
  };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed && typeof parsed.balance === "number") {
      return {
        balance: parsed.balance,
        pokerChips: Math.max(0, Math.floor(Number(parsed.pokerChips) || 0)),
        redeemed: Array.isArray(parsed.redeemed) ? parsed.redeemed : [],
        stats: {
          profit: Number(parsed.stats?.profit) || 0,
          games: Number(parsed.stats?.games) || 0,
          bestWin: Number(parsed.stats?.bestWin) || 0
        },
        drops: Array.isArray(parsed.drops) ? parsed.drops.slice(0, 6) : [],
        cryptoHoldings: parsed.cryptoHoldings && typeof parsed.cryptoHoldings === "object" ? parsed.cryptoHoldings : {},
        cryptoStopLosses: parsed.cryptoStopLosses && typeof parsed.cryptoStopLosses === "object" ? parsed.cryptoStopLosses : {}
      };
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    balance: START_BALANCE,
    pokerChips: 0,
    redeemed: [],
    stats: { profit: 0, games: 0, bestWin: 0 },
    drops: [],
    cryptoHoldings: {},
    cryptoStopLosses: {}
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateHud() {
  $("#balance").textContent = formatCoins(state.balance);
  $("#profitStat").textContent = `${state.stats.profit >= 0 ? "+" : ""}${formatSigned(state.stats.profit)}`;
  $("#gamesStat").textContent = formatCoins(state.stats.games);
  $("#bestWinStat").textContent = formatCoins(state.stats.bestWin);
  if ($("#tradeBalance")) updateTradeSummary();
  saveState();
}

function formatSigned(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}${formatCoins(Math.abs(value))}`;
}

function spend(amount) {
  const cleanAmount = Math.max(1, Math.floor(amount));
  if (state.balance < cleanAmount) {
    showToast("Nicht genug Demo-Coins.", true);
    return false;
  }

  state.balance -= cleanAmount;
  state.stats.profit -= cleanAmount;
  updateHud();
  return true;
}

function pay(amount, countGame = true) {
  const cleanAmount = Math.max(0, Math.floor(amount));
  state.balance += cleanAmount;
  state.stats.profit += cleanAmount;
  if (countGame) {
    state.stats.games += 1;
  }
  state.stats.bestWin = Math.max(state.stats.bestWin, cleanAmount);
  updateHud();
}

function countLoss() {
  state.stats.games += 1;
  updateHud();
}

function showToast(message, bad = false) {
  const tradeApp = $("#tradeApp");
  const toast = tradeApp && !tradeApp.hidden ? $("#tradeToast") : $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.toggle("bad", bad);
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function getBet(inputId) {
  const raw = Number($(inputId).value);
  if (!Number.isFinite(raw) || raw < 1) {
    showToast("Einsatz muss mindestens 1 Coin sein.", true);
    return null;
  }
  return Math.floor(raw);
}

const quickBetInputIds = [
  "minesBet",
  "towerBet",
  "coinflipBet",
  "crashBet",
  "plinkoBet",
  "diceBet",
  "duelBet",
  "wheelBet",
  "rouletteBet",
  "blackjackBet",
  "pokerExchangeAmount",
  "pokerCashoutAmount",
  "pokerBet",
  "cryptoTradeAmount",
  "moonTradeBudget"
];

function getQuickBetMax(input) {
  if (input.id === "pokerCashoutAmount" || input.id === "pokerBet") {
    return Math.max(1, Math.floor(Number(state.pokerChips) || 1));
  }
  return Math.max(1, Math.floor(Number(state.balance) || 1));
}

function applyQuickBetAction(input, action) {
  const min = Math.max(1, Math.floor(Number(input.min) || 1));
  const step = Math.max(1, Math.floor(Number(input.step) || 1));
  const max = getQuickBetMax(input);
  const current = Math.max(min, Math.floor(Number(input.value) || Number(input.defaultValue) || min));
  let next = current;

  if (action === "base") next = Math.max(min, Math.floor(Number(input.defaultValue) || min));
  if (action === "half") next = Math.max(min, Math.floor(current / 2));
  if (action === "double") next = Math.min(max, Math.floor(current * 2));
  if (action === "max") next = max;

  next = Math.max(min, Math.min(max, Math.floor(next / step) * step || min));
  input.value = String(next);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function setupQuickBetControls() {
  quickBetInputIds.forEach((id) => {
    const input = document.getElementById(id);
    if (!input || input.dataset.quickBetReady) return;
    input.dataset.quickBetReady = "true";

    const row = document.createElement("div");
    row.className = "bet-quick-row";
    [
      ["base", "$"],
      ["half", "1/2"],
      ["double", "2x"],
      ["max", "Max"]
    ].forEach(([action, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.betAction = action;
      button.textContent = label;
      if (action === "base") button.classList.add("bet-base");
      button.addEventListener("click", () => applyQuickBetAction(input, action));
      row.append(button);
    });

    input.insertAdjacentElement("afterend", row);
  });
}

function switchView(viewName) {
  $$(".nav-btn").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  $$(".view").forEach((view) => view.classList.remove("active"));
  const activeView = $(`#view-${viewName}`);
  activeView.classList.add("active");
  $("#viewTitle").textContent = activeView.dataset.title;
  if (viewName === "crash") drawCrashGraph(1, false);
}

function showWelcome() {
  $("#welcomeScreen").hidden = false;
  $("#casinoApp").hidden = true;
  $("#tradeApp").hidden = true;
}

function showCasino() {
  $("#welcomeScreen").hidden = true;
  $("#casinoApp").hidden = false;
  $("#tradeApp").hidden = true;
  updateHud();
}

function showTrading() {
  $("#welcomeScreen").hidden = true;
  $("#casinoApp").hidden = true;
  $("#tradeApp").hidden = false;
  enforceCryptoStopLosses();
  renderCryptoList();
  renderSelectedCrypto();
  updateTradeSummary();
}

function formatMarketPrice(value) {
  if (value >= 1000) return `${value.toLocaleString("de-DE", { maximumFractionDigits: 0 })} Coins`;
  if (value >= 1) return `${value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Coins`;
  if (value >= 0.01) return `${value.toLocaleString("de-DE", { minimumFractionDigits: 3, maximumFractionDigits: 4 })} Coins`;
  return `${value.toLocaleString("de-DE", { minimumFractionDigits: 6, maximumFractionDigits: 8 })} Coins`;
}

function formatCryptoUnits(value) {
  if (!value) return "0";
  if (value >= 1000) return value.toLocaleString("de-DE", { maximumFractionDigits: 0 });
  if (value >= 1) return value.toLocaleString("de-DE", { maximumFractionDigits: 4 });
  return value.toLocaleString("de-DE", { maximumFractionDigits: 8 });
}

function parseCompactNumber(rawValue) {
  const text = String(rawValue || "").trim().toLowerCase().replace(/\s+/g, "");
  if (!text) return NaN;
  const germanThousands = /^\d{1,3}(\.\d{3})+(,\d+)?[km]?$/.test(text);
  const normalized = (germanThousands ? text.replace(/\./g, "").replace(",", ".") : text.replace(",", "."));
  const match = normalized.match(/^(\d+(?:\.\d+)?)(k|m)?$/);
  if (!match) return NaN;
  const number = Number(match[1]);
  const multiplier = match[2] === "m" ? 1000000 : match[2] === "k" ? 1000 : 1;
  return number * multiplier;
}

function getCryptoBySymbol(symbol) {
  return cryptoDefinitions.find((asset) => asset.symbol === symbol) || cryptoDefinitions[0];
}

function getCryptoPrice(asset, offset = 0) {
  const tick = Math.floor(Date.now() / 30000) + offset;
  const wave = Math.sin((tick + asset.seed) * 0.73) * 0.038;
  const pulse = Math.cos((tick * 0.47 + asset.seed) * 0.41) * 0.022;
  const micro = Math.sin((tick + asset.seed * 13) * 0.17) * 0.01;
  return Math.max(asset.basePrice * 0.0001, asset.basePrice * (1 + wave + pulse + micro));
}

function getCryptoChange(asset) {
  const now = getCryptoPrice(asset);
  const before = getCryptoPrice(asset, -48);
  return ((now - before) / before) * 100;
}

function getCryptoHolding(symbol) {
  return Math.max(0, Number(state.cryptoHoldings?.[symbol]) || 0);
}

function getCryptoStopLossRule(symbol) {
  const raw = state.cryptoStopLosses?.[symbol];
  if (!raw) return { mode: "none", value: 0 };
  if (typeof raw === "object") {
    const value = Math.max(0, Number(raw.value) || 0);
    if (!value) return { mode: "none", value: 0 };
    return { mode: raw.mode === "value" ? "value" : "price", value };
  }
  const value = Math.max(0, Number(raw) || 0);
  return value ? { mode: "price", value } : { mode: "none", value: 0 };
}

function getCryptoStopLoss(symbol) {
  return getCryptoStopLossRule(symbol).value;
}

function setCryptoHolding(symbol, amount) {
  if (!state.cryptoHoldings) state.cryptoHoldings = {};
  const cleanAmount = Math.max(0, amount);
  if (cleanAmount <= 0.00000001) {
    delete state.cryptoHoldings[symbol];
    return;
  }
  state.cryptoHoldings[symbol] = cleanAmount;
}

function setCryptoStopLossValue(symbol, value, mode = "price") {
  if (!state.cryptoStopLosses) state.cryptoStopLosses = {};
  const cleanValue = Number(value);
  if (!Number.isFinite(cleanValue) || cleanValue <= 0) {
    delete state.cryptoStopLosses[symbol];
    return;
  }
  state.cryptoStopLosses[symbol] = {
    mode: mode === "value" ? "value" : "price",
    value: cleanValue
  };
}

function cryptoPortfolioValue() {
  return cryptoDefinitions.reduce((total, asset) => total + getCryptoHolding(asset.symbol) * getCryptoPrice(asset), 0);
}

function updateTradeSummary() {
  const balance = $("#tradeBalance");
  if (!balance) return;
  const portfolio = cryptoPortfolioValue();
  const assetCount = Object.values(state.cryptoHoldings || {}).filter((amount) => Number(amount) > 0.00000001).length;
  balance.textContent = formatCoins(state.balance);
  $("#tradePortfolioValue").textContent = formatCoins(portfolio);
  $("#tradeNetWorth").textContent = formatCoins(state.balance + portfolio);
  $("#tradeAssetCount").textContent = formatCoins(assetCount);
}

function renderCryptoLogo(container, asset) {
  container.style.setProperty("--coin-color", asset.color);
  container.textContent = "";
  const image = document.createElement("img");
  image.src = asset.icon;
  image.alt = asset.symbol;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    image.remove();
    container.textContent = asset.logo;
  }, { once: true });
  container.append(image);
}

function renderCryptoList() {
  const list = $("#cryptoList");
  if (!list) return;
  list.innerHTML = "";
  cryptoDefinitions.forEach((asset) => {
    const price = getCryptoPrice(asset);
    const change = getCryptoChange(asset);
    const holding = getCryptoHolding(asset.symbol);
    const stopLossRule = getCryptoStopLossRule(asset.symbol);
    const card = document.createElement("button");
    card.className = "crypto-card";
    card.type = "button";
    card.dataset.crypto = asset.symbol;
    card.style.setProperty("--coin-color", asset.color);
    card.classList.toggle("active", asset.symbol === selectedCryptoSymbol);

    const logo = document.createElement("span");
    logo.className = "crypto-logo";
    renderCryptoLogo(logo, asset);

    const copy = document.createElement("span");
    copy.className = "crypto-copy";
    copy.innerHTML = `<strong>${asset.name}</strong><small>${asset.symbol}</small>`;

    const meta = document.createElement("span");
    meta.className = "crypto-meta";
    meta.innerHTML = `<strong>${formatMarketPrice(price)}</strong><small class="${change >= 0 ? "gain" : "loss"}">${change >= 0 ? "+" : ""}${change.toFixed(2)}%</small>`;

    if (holding > 0) {
      const badge = document.createElement("span");
      badge.className = "holding-badge";
      badge.textContent = formatCryptoUnits(holding);
      meta.append(badge);
    }

    if (stopLossRule.value > 0) {
      const stopBadge = document.createElement("span");
      stopBadge.className = "holding-badge stop-badge";
      stopBadge.textContent = stopLossRule.mode === "value"
        ? `SL Wert ${formatCoins(stopLossRule.value)}`
        : `SL Preis ${formatMarketPrice(stopLossRule.value).replace(" Coins", "")}`;
      meta.append(stopBadge);
    }

    card.append(logo, copy, meta);
    list.append(card);
  });
}

function selectCrypto(symbol) {
  selectedCryptoSymbol = getCryptoBySymbol(symbol).symbol;
  renderCryptoList();
  renderSelectedCrypto();
}

function renderSelectedCrypto() {
  const asset = getCryptoBySymbol(selectedCryptoSymbol);
  const logo = $("#selectedCryptoLogo");
  if (!logo) return;
  const price = getCryptoPrice(asset);
  const change = getCryptoChange(asset);
  const holding = getCryptoHolding(asset.symbol);
  renderCryptoLogo(logo, asset);
  $("#selectedCryptoSymbol").textContent = asset.symbol;
  $("#selectedCryptoName").textContent = asset.name;
  $("#selectedCryptoPrice").textContent = formatMarketPrice(price);
  $("#selectedCryptoChange").textContent = `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
  $("#selectedCryptoChange").classList.toggle("gain", change >= 0);
  $("#selectedCryptoChange").classList.toggle("loss", change < 0);
  $("#selectedCryptoHolding").textContent = `${formatCryptoUnits(holding)} ${asset.symbol}`;
  $("#selectedCryptoValue").textContent = formatCoins(holding * price);
  renderCryptoChart(asset);
  renderCryptoStopLossControls(asset);
  updateTradeSummary();
}

function plainMarketValue(value) {
  if (value >= 1) return value.toFixed(2);
  if (value >= 0.01) return value.toFixed(4);
  return value.toFixed(8);
}

function getStopLossLinePrice(asset, rule, holding) {
  if (!rule.value) return 0;
  if (rule.mode === "value") return holding > 0 ? rule.value / holding : 0;
  return rule.value;
}

function formatStopLossRule(asset, rule, holding) {
  if (!rule.value) return "Kein Stop Loss";
  if (rule.mode === "value") {
    const linePrice = getStopLossLinePrice(asset, rule, holding);
    return linePrice > 0
      ? `Stop Loss Wert ${formatCoins(rule.value)} (${formatMarketPrice(linePrice)})`
      : `Stop Loss Wert ${formatCoins(rule.value)}`;
  }
  return `Stop Loss Preis ${formatMarketPrice(rule.value)}`;
}

function stopLossStatusText(asset, rule, holding) {
  if (!rule.value) return "Kein Stop Loss aktiv.";
  if (rule.mode === "value") {
    return `Aktiv: verkauft alles, wenn dein ${asset.symbol}-Bestand auf ${formatCoins(rule.value)} Coins oder weniger faellt.`;
  }
  return `Aktiv: verkauft alles, wenn der ${asset.symbol}-Preis auf ${formatMarketPrice(rule.value)} faellt.`;
}

function renderCryptoChart(asset) {
  const canvas = $("#cryptoChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const cssWidth = Math.max(320, rect.width || 720);
  const cssHeight = Math.max(190, rect.height || 260);
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(cssWidth * dpr);
  canvas.height = Math.floor(cssHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const points = Array.from({ length: 84 }, (_, index) => getCryptoPrice(asset, index - 83));
  const holding = getCryptoHolding(asset.symbol);
  const stopLossRule = getCryptoStopLossRule(asset.symbol);
  const stopLossLinePrice = getStopLossLinePrice(asset, stopLossRule, holding);
  const values = stopLossLinePrice > 0 ? [...points, stopLossLinePrice] : points;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = Math.max(max - min, asset.basePrice * 0.01, 0.00000001);
  const pad = 22;
  const top = pad;
  const bottom = cssHeight - pad;
  const left = pad + 12;
  const right = cssWidth - pad;
  const accent = asset.color;

  const xFor = (index) => left + (index / (points.length - 1)) * (right - left);
  const yFor = (value) => bottom - ((value - min) / spread) * (bottom - top);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = top + (i / 3) * (bottom - top);
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }

  const area = ctx.createLinearGradient(0, top, 0, bottom);
  area.addColorStop(0, `${accent}66`);
  area.addColorStop(1, `${accent}00`);
  ctx.beginPath();
  points.forEach((value, index) => {
    const x = xFor(index);
    const y = yFor(value);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(right, bottom);
  ctx.lineTo(left, bottom);
  ctx.closePath();
  ctx.fillStyle = area;
  ctx.fill();

  ctx.beginPath();
  points.forEach((value, index) => {
    const x = xFor(index);
    const y = yFor(value);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.shadowColor = accent;
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;

  if (stopLossLinePrice > 0) {
    const y = yFor(stopLossLinePrice);
    ctx.setLineDash([8, 7]);
    ctx.strokeStyle = "#ff5c7a";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#ff5c7a";
    ctx.font = "700 12px system-ui, sans-serif";
    ctx.fillText(stopLossRule.mode === "value" ? "Stop Loss Wert" : "Stop Loss Preis", left + 4, Math.max(top + 14, y - 8));
  }

  ctx.fillStyle = "rgba(243, 247, 251, 0.72)";
  ctx.font = "700 12px system-ui, sans-serif";
  ctx.fillText(formatMarketPrice(max), left, top - 5);
  ctx.fillText(formatMarketPrice(min), left, bottom + 15);

  $("#cryptoChartLabel").textContent = `${asset.symbol} Graph`;
  $("#cryptoChartPrice").textContent = formatMarketPrice(points[points.length - 1]);
  const badge = $("#cryptoStopLossBadge");
  badge.textContent = formatStopLossRule(asset, stopLossRule, holding);
  badge.classList.toggle("active", stopLossRule.value > 0);
}

function renderCryptoStopLossControls(asset) {
  const input = $("#cryptoStopLossPrice");
  if (!input) return;
  const stopLossRule = getCryptoStopLossRule(asset.symbol);
  const currentPrice = getCryptoPrice(asset);
  const holding = getCryptoHolding(asset.symbol);
  const holdingValue = holding * currentPrice;
  if (document.activeElement !== input) {
    input.value = stopLossRule.value > 0 ? plainMarketValue(stopLossRule.value) : "";
    input.placeholder = holdingValue >= 1 ? `unter ${Math.floor(holdingValue)} oder 59K` : `Preis unter ${plainMarketValue(currentPrice)}`;
  }
  $("#cryptoStopLossStatus").textContent = stopLossStatusText(asset, stopLossRule, holding);
}

function setCryptoStopLoss() {
  const asset = getCryptoBySymbol(selectedCryptoSymbol);
  const value = parseCompactNumber($("#cryptoStopLossPrice").value);
  const currentPrice = getCryptoPrice(asset);
  const holding = getCryptoHolding(asset.symbol);
  const holdingValue = holding * currentPrice;
  if (!Number.isFinite(value) || value <= 0) {
    showToast("Stop Loss braucht einen Wert groesser als 0.", true);
    return;
  }

  if (holdingValue >= 1 && value < holdingValue) {
    setCryptoStopLossValue(asset.symbol, value, "value");
    saveState();
    renderCryptoList();
    renderSelectedCrypto();
    showToast(`Stop Loss Wert fuer ${asset.symbol} gesetzt.`);
    return;
  }

  if (holdingValue >= 1 && value >= holdingValue) {
    showToast("Stop Loss Wert muss unter deinem aktuellen Bestand liegen.", true);
    return;
  }

  if (value >= currentPrice) {
    showToast("Stop Loss Preis muss unter dem aktuellen Preis liegen.", true);
    return;
  }
  setCryptoStopLossValue(asset.symbol, value, "price");
  saveState();
  renderCryptoList();
  renderSelectedCrypto();
  showToast(`Stop Loss Preis fuer ${asset.symbol} gesetzt.`);
}

function clearCryptoStopLoss() {
  const asset = getCryptoBySymbol(selectedCryptoSymbol);
  setCryptoStopLossValue(asset.symbol, 0);
  saveState();
  renderCryptoList();
  renderSelectedCrypto();
  showToast(`Stop Loss fuer ${asset.symbol} geloescht.`);
}

function enforceCryptoStopLosses() {
  if (!state.cryptoStopLosses) return;
  const triggered = [];
  cryptoDefinitions.forEach((asset) => {
    const stopLossRule = getCryptoStopLossRule(asset.symbol);
    const holding = getCryptoHolding(asset.symbol);
    if (stopLossRule.value <= 0 || holding <= 0) return;
    const price = getCryptoPrice(asset);
    const holdingValue = holding * price;
    const shouldSell = stopLossRule.mode === "value" ? holdingValue <= stopLossRule.value : price <= stopLossRule.value;
    if (!shouldSell) return;
    const payout = Math.floor(holding * price);
    setCryptoHolding(asset.symbol, 0);
    setCryptoStopLossValue(asset.symbol, 0);
    state.balance += payout;
    triggered.push(`${asset.symbol} +${formatCoins(payout)}`);
  });

  if (!triggered.length) return;
  updateHud();
  renderCryptoList();
  renderSelectedCrypto();
  const tradeApp = $("#tradeApp");
  if (tradeApp && !tradeApp.hidden) showToast(`Stop Loss verkauft: ${triggered.join(", ")}`);
}

function tickCryptoMarket() {
  enforceCryptoStopLosses();
  const tradeApp = $("#tradeApp");
  if (!tradeApp || tradeApp.hidden) return;
  renderCryptoList();
  renderSelectedCrypto();
}

function getCryptoTradeAmount() {
  const amount = Math.floor(Number($("#cryptoTradeAmount").value) || 0);
  if (!Number.isFinite(amount) || amount < 1) {
    showToast("Trading-Betrag muss mindestens 1 Coin sein.", true);
    return null;
  }
  return amount;
}

function buyCrypto() {
  const amount = getCryptoTradeAmount();
  if (amount === null) return;
  if (state.balance < amount) {
    showToast("Nicht genug Demo-Coins zum Kaufen.", true);
    return;
  }
  const asset = getCryptoBySymbol(selectedCryptoSymbol);
  const price = getCryptoPrice(asset);
  const units = amount / price;
  state.balance -= amount;
  setCryptoHolding(asset.symbol, getCryptoHolding(asset.symbol) + units);
  updateHud();
  renderCryptoList();
  renderSelectedCrypto();
  showToast(`${formatCryptoUnits(units)} ${asset.symbol} gekauft.`);
}

function sellCrypto() {
  const amount = getCryptoTradeAmount();
  if (amount === null) return;
  const asset = getCryptoBySymbol(selectedCryptoSymbol);
  const price = getCryptoPrice(asset);
  const holding = getCryptoHolding(asset.symbol);
  const maxValue = holding * price;
  if (maxValue < 1) {
    showToast(`Du hast kein ${asset.symbol}.`, true);
    return;
  }
  const sellValue = Math.min(amount, maxValue);
  const units = sellValue / price;
  setCryptoHolding(asset.symbol, holding - units);
  state.balance += Math.floor(sellValue);
  updateHud();
  renderCryptoList();
  renderSelectedCrypto();
  showToast(`${formatCryptoUnits(units)} ${asset.symbol} verkauft.`);
}

function getMoonTradeBudget() {
  return Math.max(1, Math.floor(Number($("#moonTradeBudget").value) || 1));
}

function getMoonTradeProfitPct() {
  return Math.max(0.1, Number($("#moonTradeProfit").value) || 1.5);
}

function getMoonTradeStopPct() {
  return Math.max(0.1, Number($("#moonTradeStop").value) || 2);
}

function setMoonTradeStatus(message) {
  const status = $("#moonTradeStatus");
  if (status) status.textContent = message;
}

function populateMoonTradeCoins() {
  const select = $("#moonTradeCoin");
  if (!select) return;
  select.innerHTML = "";
  const auto = document.createElement("option");
  auto.value = "auto";
  auto.textContent = "Auto Dip";
  select.append(auto);
  cryptoDefinitions.forEach((asset) => {
    const option = document.createElement("option");
    option.value = asset.symbol;
    option.textContent = `${asset.symbol} - ${asset.name}`;
    select.append(option);
  });
}

function cryptoDipScore(asset) {
  const current = getCryptoPrice(asset);
  const samples = Array.from({ length: 24 }, (_, index) => getCryptoPrice(asset, -index - 1));
  const average = samples.reduce((total, value) => total + value, 0) / samples.length;
  return (average - current) / average;
}

function pickMoonTradeAsset() {
  const selected = $("#moonTradeCoin").value;
  if (selected !== "auto") {
    const asset = getCryptoBySymbol(selected);
    return { asset, score: cryptoDipScore(asset), auto: false };
  }

  return cryptoDefinitions
    .map((asset) => ({ asset, score: cryptoDipScore(asset), auto: true }))
    .sort((left, right) => right.score - left.score)[0];
}

function sellMoonTradePosition(asset, reason) {
  const holding = getCryptoHolding(asset.symbol);
  if (holding <= 0) return false;
  const payout = Math.floor(holding * getCryptoPrice(asset));
  setCryptoHolding(asset.symbol, 0);
  setCryptoStopLossValue(asset.symbol, 0);
  state.balance += payout;
  moonTradeState.targetValue = 0;
  moonTradeState.entryValue = 0;
  updateHud();
  renderCryptoList();
  renderSelectedCrypto();
  setMoonTradeStatus(`${reason}: ${asset.symbol} verkauft fuer ${formatCoins(payout)} Coins.`);
  showToast(`Trade Mode: ${asset.symbol} +${formatCoins(payout)} Coins`);
  return true;
}

function runMoonTradeTick() {
  if (!moonTradeState.active) return false;
  if (!moonLicenseUnlocked) {
    stopMoonTradeMode("Trade Mode braucht die Moon Lizenz.");
    return false;
  }

  enforceCryptoStopLosses();
  const pick = pickMoonTradeAsset();
  if (!pick?.asset) return false;
  const asset = pick.asset;
  const holding = getCryptoHolding(asset.symbol);
  const price = getCryptoPrice(asset);
  const holdingValue = holding * price;

  if (holding > 0) {
    selectedCryptoSymbol = asset.symbol;
    if (moonTradeState.targetValue > 0 && holdingValue >= moonTradeState.targetValue) {
      return sellMoonTradePosition(asset, "Take Profit erreicht");
    }
    setMoonTradeStatus(`${asset.symbol} Position aktiv: ${formatCoins(holdingValue)} / Ziel ${formatCoins(moonTradeState.targetValue)}.`);
    renderCryptoList();
    renderSelectedCrypto();
    return false;
  }

  const minDip = pick.auto ? 0.002 : -0.001;
  if (pick.score < minDip) {
    setMoonTradeStatus(`${asset.symbol} noch nicht guenstig genug. Dip ${(pick.score * 100).toFixed(2)}%.`);
    return false;
  }

  const autoCap = autoMaxBet("trade") || getMoonTradeBudget();
  const budget = Math.min(getMoonTradeBudget(), autoCap, Math.floor(state.balance));
  if (budget < 1) {
    stopMoonTradeMode("Trade Mode gestoppt: zu wenig Demo-Coins.");
    return false;
  }

  const units = budget / price;
  state.balance -= budget;
  setCryptoHolding(asset.symbol, units);
  moonTradeState.symbol = asset.symbol;
  moonTradeState.entryValue = budget;
  moonTradeState.targetValue = Math.floor(budget * (1 + getMoonTradeProfitPct() / 100));
  setCryptoStopLossValue(asset.symbol, Math.floor(budget * (1 - getMoonTradeStopPct() / 100)), "value");
  selectedCryptoSymbol = asset.symbol;
  updateHud();
  renderCryptoList();
  renderSelectedCrypto();
  setMoonTradeStatus(`${asset.symbol} Dip gekauft. Ziel ${formatCoins(moonTradeState.targetValue)}, Stop Loss gesetzt.`);
  showToast(`Trade Mode kaufte ${asset.symbol} fuer ${formatCoins(budget)} Coins.`);
  return true;
}

function startMoonTradeMode() {
  if (!requireMoonLicense("Trade Mode")) return;
  moonTradeState.active = true;
  moonTradeState.symbol = $("#moonTradeCoin").value;
  startAutoGame("trade", getRequestedAutoRuns(), getRequestedAutoDuration(), getMoonTradeBudget());
  setMoonTradeStatus("Trade Mode sucht guenstige Einstiege.");
}

function stopMoonTradeMode(reason = "Trade Mode gestoppt.") {
  moonTradeState.active = false;
  moonTradeState.targetValue = 0;
  moonTradeState.entryValue = 0;
  if (autoLoops.trade) stopAutoGame("trade");
  setMoonTradeStatus(reason);
}

function redeemCode() {
  const input = $("#codeInput");
  const code = input.value.trim().toUpperCase();
  if (!code) return;

  const codeHash = hashPromo(code);
  const reward = promoCodes[codeHash];
  if (!reward) {
    showToast("Code nicht gefunden.", true);
    return;
  }

  if (state.redeemed.includes(codeHash)) {
    showToast("Diesen Code hast du schon benutzt.", true);
    return;
  }

  state.redeemed.push(codeHash);
  state.balance += reward.amount;
  updateHud();
  input.value = "";
  showToast(`${reward.label}: +${formatCoins(reward.amount)} Demo-Coins`);
}

function shuffleIndexes(size, take) {
  const indexes = Array.from({ length: size }, (_, index) => index);
  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes.slice(0, take);
}

function renderMinesBoard(revealAll = false) {
  const board = $("#minesBoard");
  board.innerHTML = "";

  for (let index = 0; index < 25; index += 1) {
    const button = document.createElement("button");
    button.className = "mine-tile";
    button.type = "button";
    button.ariaLabel = `Feld ${index + 1}`;
    button.dataset.index = String(index);

    if (minesState.revealed.has(index)) {
      button.classList.add("safe");
      button.disabled = true;
    }

    if (minesState.predicted.has(index) && !minesState.revealed.has(index)) {
      button.classList.add("predicted");
    }

    if (revealAll && minesState.mineSet.has(index)) {
      button.classList.add("bomb");
      button.disabled = true;
    }

    if (!minesState.active) {
      button.disabled = true;
    }

    button.addEventListener("click", () => pickMine(index));
    board.append(button);
  }
}

function startMines() {
  if (minesState.active) return;
  const bet = getBet("#minesBet");
  if (bet === null || !spend(bet)) return;

  const mineCount = Number($("#minesCount").value);
  minesState.active = true;
  minesState.bet = bet;
  minesState.mines = mineCount;
  minesState.mineSet = new Set(shuffleIndexes(25, mineCount));
  minesState.revealed = new Set();
  minesState.predicted = new Set();
  minesState.predictionLocked = false;

  $("#startMines").disabled = true;
  $("#cashoutMines").disabled = true;
  updateMoonControls();
  updateMinesStats();
  renderMinesBoard();
  showToast("Mines gestartet. Such die sicheren Felder.");
}

function pickMine(index) {
  if (!minesState.active || minesState.revealed.has(index)) return;

  if (minesState.mineSet.has(index)) {
    minesState.active = false;
    countLoss();
    renderMinesBoard(true);
    $("#startMines").disabled = false;
    $("#cashoutMines").disabled = true;
    updateMoonControls();
    showToast("Mine getroffen. Einsatz verloren.", true);
    return;
  }

  minesState.revealed.add(index);
  minesState.predicted.delete(index);
  const safeSlots = 25 - minesState.mines;
  const boardTile = $(`.mine-tile[data-index="${index}"]`);
  boardTile.classList.add("safe", "win-flash");
  boardTile.disabled = true;

  updateMinesStats();
  $("#cashoutMines").disabled = false;

  if (minesState.revealed.size >= safeSlots) {
    cashoutMines(true);
  }
}

function minesMultiplier() {
  const safe = minesState.revealed.size;
  const risk = minesState.mines / 25;
  return 1 + safe * (0.14 + risk * 0.34) + safe * safe * (0.014 + risk * 0.018);
}

function updateMinesStats() {
  const multiplier = minesMultiplier();
  $("#minesMultiplier").textContent = `${multiplier.toFixed(2)}x`;
  $("#minesPayout").textContent = formatCoins(minesState.revealed.size ? minesState.bet * multiplier : 0);
}

function cashoutMines(auto = false) {
  if (!minesState.active || minesState.revealed.size === 0) return;
  const payout = Math.floor(minesState.bet * minesMultiplier());
  minesState.active = false;
  pay(payout);
  renderMinesBoard(true);
  $("#startMines").disabled = false;
  $("#cashoutMines").disabled = true;
  updateMoonControls();
  showToast(`${auto ? "Perfekt gecleart" : "Cashout"}: +${formatCoins(payout)} Coins`);
}

function renderTowerBoard(reveal = false) {
  const board = $("#towerBoard");
  board.innerHTML = "";

  for (let displayRow = 5; displayRow >= 0; displayRow -= 1) {
    const row = document.createElement("div");
    row.className = "tower-row";
    row.dataset.level = String(displayRow);
    if (towerState.active && displayRow === towerState.currentLevel) row.classList.add("active");
    if (displayRow < towerState.currentLevel) row.classList.add("cleared");

    for (let col = 0; col < 3; col += 1) {
      const tile = document.createElement("button");
      tile.className = "tower-tile";
      tile.type = "button";
      tile.ariaLabel = `Level ${displayRow + 1}, Feld ${col + 1}`;
      tile.dataset.level = String(displayRow);
      tile.dataset.col = String(col);
      tile.innerHTML = `<span class="tower-multi">${towerMultiplierForLevel(displayRow).toFixed(2)}x</span>`;

      const pickedSafe = towerState.safePicks.some((pick) => pick.level === displayRow && pick.col === col);
      if (pickedSafe) tile.classList.add("safe");
      if (towerState.predicted?.level === displayRow && towerState.predicted?.col === col && !pickedSafe) {
        tile.classList.add("predicted");
      }
      if (reveal && towerState.traps[displayRow]?.has(col)) tile.classList.add("trap");
      tile.disabled = !towerState.active || displayRow !== towerState.currentLevel;
      tile.addEventListener("click", () => pickTower(displayRow, col));
      row.append(tile);
    }

    board.append(row);
  }
}

function towerMultiplierForLevel(level) {
  const risk = towerRisk[towerState.risk] || towerRisk.medium;
  return risk.step ** (level + 1);
}

function startTower() {
  if (towerState.active) return;
  const bet = getBet("#towerBet");
  if (bet === null || !spend(bet)) return;

  towerState.active = true;
  towerState.bet = bet;
  towerState.currentLevel = 0;
  towerState.risk = $("#towerRisk").value;
  towerState.multiplier = 1;
  towerState.safePicks = [];
  towerState.predicted = null;
  towerState.predictedLevels = new Set();
  towerState.traps = Array.from({ length: 6 }, () => new Set(shuffleIndexes(3, towerRisk[towerState.risk].trapCount)));

  $("#startTower").disabled = true;
  $("#cashoutTower").disabled = true;
  updateMoonControls();
  updateTowerStats();
  renderTowerBoard();
  showToast("Tower gestartet. Klettere Level fuer Level.");
}

function pickTower(level, col) {
  if (!towerState.active || level !== towerState.currentLevel) return;

  if (towerState.traps[level].has(col)) {
    towerState.active = false;
    countLoss();
    renderTowerBoard(true);
    $("#startTower").disabled = false;
    $("#cashoutTower").disabled = true;
    updateMoonControls();
    showToast("Falle erwischt. Tower Runde verloren.", true);
    return;
  }

  towerState.safePicks.push({ level, col });
  if (towerState.predicted?.level === level && towerState.predicted?.col === col) {
    towerState.predicted = null;
  }
  towerState.currentLevel += 1;
  towerState.multiplier *= towerRisk[towerState.risk].step;
  updateMoonControls();
  updateTowerStats();

  if (towerState.currentLevel >= 6) {
    cashoutTower(true);
    return;
  }

  $("#cashoutTower").disabled = false;
  renderTowerBoard();
}

function updateTowerStats() {
  $("#towerLevel").textContent = `${towerState.currentLevel}/6`;
  const payout = towerState.currentLevel > 0 ? Math.floor(towerState.bet * towerState.multiplier) : 0;
  $("#towerPayout").textContent = formatCoins(payout);
}

function cashoutTower(auto = false) {
  if (!towerState.active || towerState.currentLevel === 0) return;
  const payout = Math.floor(towerState.bet * towerState.multiplier);
  towerState.active = false;
  pay(payout);
  renderTowerBoard(true);
  $("#startTower").disabled = false;
  $("#cashoutTower").disabled = true;
  updateMoonControls();
  showToast(`${auto ? "Tower komplett" : "Tower Cashout"}: +${formatCoins(payout)} Coins`);
}

function renderCases() {
  const list = $("#caseList");
  list.innerHTML = "";

  cases.forEach((box) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "case-card";
    button.classList.toggle("active", box.id === selectedCaseId);
    button.innerHTML = `<strong>${box.name}</strong><span>${formatCoins(box.price)} Coins</span><em>${box.category}</em>`;
    button.style.borderColor = box.id === selectedCaseId ? box.accent : "";
    button.addEventListener("click", () => {
      if (caseBusy) return;
      selectedCaseId = box.id;
      renderCases();
      renderCaseReel(box);
    });
    list.append(button);
  });

  const selected = getSelectedCase();
  $("#selectedCaseName").textContent = selected.name;
  $("#selectedCasePrice").textContent = `Preis: ${formatCoins(selected.price)} Coins`;
  renderCaseOdds(selected);
}

function renderCaseOdds(box = getSelectedCase()) {
  const odds = $("#caseOdds");
  if (!odds) return;
  const totalWeight = box.drops.reduce((sum, drop) => sum + drop.weight, 0);
  odds.innerHTML = "";

  box.drops.forEach((drop) => {
    const chance = (drop.weight / totalWeight) * 100;
    const row = document.createElement("div");
    row.className = `case-odd rarity-${drop.rarity}`;
    row.innerHTML = `
      <strong>${drop.name.replace(`${box.name} `, "")}</strong>
      <span>${chance.toFixed(chance < 1 ? 2 : 1)}%</span>
      <em>${formatCoins(drop.value)} Coins</em>
    `;
    odds.append(row);
  });
}

function getSelectedCase() {
  return cases.find((box) => box.id === selectedCaseId) || cases[0];
}

function randomDrop(box, forceBest = false) {
  if (forceBest) {
    return box.drops.reduce((best, drop) => (drop.value > best.value ? drop : best), box.drops[0]);
  }

  const total = box.drops.reduce((sum, drop) => sum + drop.weight, 0);
  let roll = Math.random() * total;
  for (const drop of box.drops) {
    roll -= drop.weight;
    if (roll <= 0) return drop;
  }
  return box.drops[0];
}

function createCaseItem(drop) {
  const item = document.createElement("div");
  item.className = `case-item rarity-${drop.rarity}`;
  item.innerHTML = `
    <div>
      <div class="case-gem"></div>
      <strong>${drop.name}</strong>
      <span>${formatCoins(drop.value)} Coins</span>
    </div>
  `;
  item.querySelector(".case-gem").style.background = "currentColor";
  return item;
}

function renderCaseReel(box = getSelectedCase()) {
  const reel = $("#caseReel");
  reel.style.transition = "none";
  reel.style.transform = "translate(-50%, -50%)";
  reel.innerHTML = "";

  for (let index = 0; index < 18; index += 1) {
    reel.append(createCaseItem(box.drops[index % box.drops.length]));
  }
}

function openCase(forceBest = false) {
  if (caseBusy) return;
  const box = getSelectedCase();
  if (!spend(box.price)) return;

  caseBusy = true;
  $("#openCase").disabled = true;
  const winningDrop = randomDrop(box, forceBest);
  const winningIndex = 35;
  const reel = $("#caseReel");
  reel.style.transition = "none";
  reel.style.transform = "translate(-50%, -50%)";
  reel.innerHTML = "";

  for (let index = 0; index < 44; index += 1) {
    const drop = index === winningIndex ? winningDrop : randomDrop(box);
    reel.append(createCaseItem(drop));
  }

  window.requestAnimationFrame(() => {
    const target = reel.children[winningIndex];
    const targetRect = target.getBoundingClientRect();
    const windowRect = $(".case-window").getBoundingClientRect();
    const delta = targetRect.left + targetRect.width / 2 - (windowRect.left + windowRect.width / 2);
    reel.style.transition = "transform 2800ms cubic-bezier(0.08, 0.82, 0.18, 1)";
    reel.style.transform = `translate(calc(-50% - ${delta}px), -50%)`;
  });

  window.setTimeout(() => {
    pay(winningDrop.value);
    state.drops.unshift({
      caseName: box.name,
      dropName: winningDrop.name,
      value: winningDrop.value,
      rarity: winningDrop.rarity
    });
    state.drops = state.drops.slice(0, 6);
    updateHud();
    renderDrops();
    caseBusy = false;
    $("#openCase").disabled = false;
    showToast(`${winningDrop.name}: +${formatCoins(winningDrop.value)} Coins`);
  }, 2920);
}

function renderDrops() {
  const log = $("#caseDrops");
  log.innerHTML = "";

  if (!state.drops.length) {
    const empty = document.createElement("div");
    empty.className = "drop-card";
    empty.innerHTML = "<span>Letzte Drops</span><strong>Noch keine</strong>";
    log.append(empty);
    return;
  }

  state.drops.forEach((drop) => {
    const card = document.createElement("div");
    card.className = `drop-card rarity-${drop.rarity}`;
    card.innerHTML = `<span>${drop.caseName}</span><strong>${drop.dropName}</strong><span>${formatCoins(drop.value)} Coins</span>`;
    log.append(card);
  });
}

function updateCoinPick() {
  $$("[data-coin-pick]").forEach((button) => {
    button.classList.toggle("active", button.dataset.coinPick === coinPick);
  });
}

function flipCoin(forceWin = false) {
  const bet = getBet("#coinflipBet");
  if (bet === null || !spend(bet)) return;

  const result = forceWin ? coinPick : (Math.random() < 0.5 ? "heads" : "tails");
  const won = result === coinPick;
  const coin = $("#coinVisual");
  $("#flipCoin").disabled = true;
  coin.classList.remove("spin");
  void coin.offsetWidth;
  coin.classList.add("spin");

  window.setTimeout(() => {
    coin.textContent = result === "heads" ? "K" : "Z";
    if (won) {
      const payout = Math.floor(bet * 1.95);
      pay(payout);
      $("#coinflipResult").textContent = `Win +${formatCoins(payout)}`;
      showToast(`Coinflip gewonnen: +${formatCoins(payout)} Coins`);
    } else {
      countLoss();
      $("#coinflipResult").textContent = result === "heads" ? "Kopf" : "Zahl";
      showToast("Coinflip verloren.", true);
    }
    $("#flipCoin").disabled = false;
  }, 920);
}

function renderPlinko() {
  const board = $("#plinkoBoard");
  $$(".plinko-peg").forEach((peg) => peg.remove());
  for (let row = 0; row < PLINKO_ROWS; row += 1) {
    const count = row + 1;
    for (let col = 0; col < count; col += 1) {
      const peg = document.createElement("span");
      peg.className = "plinko-peg";
      const left = 50 + (col - (count - 1) / 2) * 6.8;
      const top = 8 + row * 6.9;
      peg.style.left = `${left}%`;
      peg.style.top = `${top}%`;
      board.append(peg);
    }
  }

  renderPlinkoSlots();
}

function renderPlinkoSlots() {
  const risk = $("#plinkoRisk").value;
  const multipliers = plinkoMultipliers[risk];
  $("#plinkoMax").textContent = `${Math.max(...multipliers).toFixed(2)}x`;
  const slots = $("#plinkoSlots");
  slots.innerHTML = "";
  slots.style.gridTemplateColumns = `repeat(${multipliers.length}, minmax(0, 1fr))`;
  multipliers.forEach((multiplier) => {
    const slot = document.createElement("div");
    slot.className = "plinko-slot";
    slot.textContent = `${multiplier.toFixed(multiplier >= 1 ? 1 : 2)}x`;
    slots.append(slot);
  });
}

function createPlinkoPath(forceBest, multipliers) {
  let slotIndex = 0;
  const path = [];
  if (forceBest) {
    slotIndex = multipliers.indexOf(Math.max(...multipliers));
    let current = 0;
    for (let row = 0; row < PLINKO_ROWS; row += 1) {
      const remaining = PLINKO_ROWS - row;
      if (current < slotIndex && slotIndex - current <= remaining) current += 1;
      path.push(current);
    }
    return { slotIndex, path };
  }

  for (let row = 0; row < PLINKO_ROWS; row += 1) {
    const right = Math.random() > 0.5;
    if (right) slotIndex += 1;
    path.push(slotIndex);
  }
  return { slotIndex, path };
}

function dropPlinko(forceBest = false, ballCount = 1) {
  const managedDrop = forceBest;
  if (managedDrop && plinkoBusy) return;
  const bet = getBet("#plinkoBet");
  const cleanBallCount = Math.max(1, Math.floor(ballCount));
  const totalCost = bet === null ? 0 : bet * cleanBallCount;
  if (bet === null || !spend(totalCost)) return;

  if (managedDrop) {
    plinkoBusy = true;
    $("#dropPlinko").disabled = true;
  }
  $$(".plinko-slot").forEach((slot) => slot.classList.remove("hit"));
  const risk = $("#plinkoRisk").value;
  const multipliers = plinkoMultipliers[risk];
  let finished = 0;
  let totalPayout = 0;
  const landedMultipliers = [];

  for (let dropIndex = 0; dropIndex < cleanBallCount; dropIndex += 1) {
    const { slotIndex, path } = createPlinkoPath(forceBest, multipliers);
    const multiplier = multipliers[slotIndex];
    const payout = Math.floor(bet * multiplier);
    const ball = managedDrop && dropIndex === 0 ? $("#plinkoBall") : document.createElement("div");
    const startDelay = dropIndex * 105;

    if (!managedDrop || dropIndex > 0) {
      ball.className = "plinko-ball";
      $("#plinkoBoard").append(ball);
    }
    ball.classList.add("dropping");
    ball.style.left = `${50 + (dropIndex - (cleanBallCount - 1) / 2) * 1.1}%`;
    ball.style.top = "1rem";

    path.forEach((step, row) => {
      window.setTimeout(() => {
        const rowWidth = row + 2;
        const left = 50 + (step - (rowWidth - 1) / 2) * 6.8;
        const top = 10 + row * 6.9;
        ball.style.left = `${left}%`;
        ball.style.top = `${top}%`;
      }, startDelay + 90 + row * 125);
    });

    window.setTimeout(() => {
      const finalLeft = 3.85 + slotIndex * (92.3 / (multipliers.length - 1));
      ball.style.left = `${finalLeft}%`;
      ball.style.top = "91%";
    }, startDelay + 90 + PLINKO_ROWS * 125);

    window.setTimeout(() => {
      $("#plinkoSlots").children[slotIndex]?.classList.add("hit");
      ball.style.top = "1rem";
      ball.style.left = "50%";
      ball.classList.remove("dropping");
      totalPayout += payout;
      landedMultipliers.push(multiplier);
      finished += 1;

      if (managedDrop && dropIndex === 0) {
        ball.style.top = "1rem";
      } else {
        ball.remove();
      }

      if (finished !== cleanBallCount) return;
      if (totalPayout > 0) {
        pay(totalPayout);
        $("#plinkoResult").textContent = cleanBallCount > 1
          ? `${cleanBallCount} Balls +${formatCoins(totalPayout)}`
          : `${landedMultipliers[0].toFixed(2)}x +${formatCoins(totalPayout)}`;
        showToast(`Plinko: ${cleanBallCount} Ball(s), +${formatCoins(totalPayout)} Coins`);
      } else {
        countLoss();
        $("#plinkoResult").textContent = cleanBallCount > 1 ? `${cleanBallCount} Balls 0` : "0.00x";
        showToast("Plinko landete auf 0.00x.", true);
      }
      if (managedDrop) {
        plinkoBusy = false;
        $("#dropPlinko").disabled = false;
      }
    }, startDelay + 1900);
  }
}

function rollDuel(forceWin = false) {
  const bet = getBet("#duelBet");
  if (bet === null || !spend(bet)) return;
  $("#rollDuel").disabled = true;
  $("#playerDie").classList.add("rolling");
  $("#botDie").classList.add("rolling");

  window.setTimeout(() => {
    const bot = forceWin ? 1 + Math.floor(Math.random() * 90) : 1 + Math.floor(Math.random() * 100);
    const player = forceWin ? bot + 1 + Math.floor(Math.random() * (100 - bot)) : 1 + Math.floor(Math.random() * 100);
    $("#playerDie").classList.remove("rolling");
    $("#botDie").classList.remove("rolling");
    $("#playerDie").textContent = String(player);
    $("#botDie").textContent = String(bot);
    $("#duelPlayerScore").textContent = String(player);
    $("#duelBotScore").textContent = String(bot);

    if (player >= bot) {
      const payout = Math.floor(bet * (player === bot ? 1 : 1.9));
      pay(payout);
      $("#duelResult").textContent = `Win +${formatCoins(payout)}`;
      showToast(`Dice Duel gewonnen: +${formatCoins(payout)} Coins`);
    } else {
      countLoss();
      $("#duelResult").textContent = "Bot gewinnt";
      showToast("Dice Duel verloren.", true);
    }
    $("#rollDuel").disabled = false;
  }, 850);
}

function populateBattleCases() {
  const select = $("#battleCase");
  select.innerHTML = "";
  cases.forEach((box) => {
    const option = document.createElement("option");
    option.value = box.id;
    option.textContent = `${box.name} - ${formatCoins(box.price)} Coins`;
    select.append(option);
  });
  updateBattleCost();
}

function updateBattleCost() {
  const box = cases.find((entry) => entry.id === $("#battleCase").value) || cases[0];
  $("#battleCost").textContent = formatCoins(box.price);
}

function battleDropMarkup(drop) {
  return `<span class="battle-drop rarity-${drop.rarity}">${drop.name}<strong>${formatCoins(drop.value)}</strong></span>`;
}

function startBattle(forceWin = false) {
  const box = cases.find((entry) => entry.id === $("#battleCase").value) || cases[0];
  const bots = Number($("#battleBots").value);
  if (!spend(box.price)) return;
  $("#startBattle").disabled = true;
  $("#battleWinner").textContent = "--";
  $("#battleResult").textContent = "Opening";

  const players = [{ name: "Du", bot: false }, ...botNames.slice(0, bots).map((name) => ({ name, bot: true }))];
  const arena = $("#battleArena");
  arena.innerHTML = "";

  players.forEach((player) => {
    player.drops = forceWin && !player.bot ? [randomDrop(box, true), randomDrop(box, true), randomDrop(box, true)] : [randomDrop(box), randomDrop(box), randomDrop(box)];
    player.total = player.drops.reduce((sum, drop) => sum + drop.value, 0);
    const card = document.createElement("div");
    card.className = "battle-card rolling";
    card.innerHTML = `
      <span class="eyebrow">${player.name}</span>
      <strong class="battle-total">Rolling...</strong>
      <div class="battle-reels">
        <div class="battle-slot"></div>
        <div class="battle-slot"></div>
        <div class="battle-slot"></div>
      </div>
      <div class="battle-drops"></div>
    `;
    arena.append(card);
    player.card = card;
    player.rollTimer = window.setInterval(() => {
      card.querySelectorAll(".battle-slot").forEach((slot) => {
        slot.innerHTML = battleDropMarkup(randomDrop(box));
      });
    }, 90);
  });

  window.setTimeout(() => {
    players.forEach((player) => {
      window.clearInterval(player.rollTimer);
      player.card.classList.remove("rolling");
      player.card.querySelector(".battle-total").textContent = `${formatCoins(player.total)} Coins`;
      player.card.querySelectorAll(".battle-slot").forEach((slot, index) => {
        slot.innerHTML = battleDropMarkup(player.drops[index]);
      });
      player.card.querySelector(".battle-drops").innerHTML = player.drops
        .map((drop) => `${drop.name}: ${formatCoins(drop.value)}`)
        .join("<br>");
    });
    const winner = players.reduce((best, player) => (player.total > best.total ? player : best), players[0]);
    $("#battleWinner").textContent = winner.name;
    if (!winner.bot) {
      const prize = players.reduce((sum, player) => sum + player.total, 0);
      pay(prize);
      $("#battleResult").textContent = `Du gewinnst ${formatCoins(prize)}`;
      showToast(`Mystery Battle gewonnen: +${formatCoins(prize)} Coins`);
    } else {
      countLoss();
      $("#battleResult").textContent = `${winner.name} gewinnt`;
      showToast(`${winner.name} gewinnt die Battle.`, true);
    }
    $("#startBattle").disabled = false;
  }, 2600);
}

function crashPoint() {
  return Math.max(1.03, Math.min(14, 0.92 / Math.random()));
}

function startCrash() {
  if (crashState.active) return;
  const bet = getBet("#crashBet");
  if (bet === null || !spend(bet)) return;

  crashState.active = true;
  crashState.bet = bet;
  crashState.multiplier = 1;
  crashState.crashPoint = crashPoint();
  crashState.startedAt = performance.now();
  $("#startCrash").disabled = true;
  $("#cashoutCrash").disabled = false;
  $("#crashStatus").textContent = "Laeuft";
  animateCrash();
}

function animateCrash() {
  if (!crashState.active) return;
  const elapsed = (performance.now() - crashState.startedAt) / 1000;
  crashState.multiplier = 1 + elapsed * 0.36 + Math.pow(elapsed, 1.42) * 0.11;
  $("#crashMultiplier").textContent = `${crashState.multiplier.toFixed(2)}x`;
  $("#crashPayout").textContent = formatCoins(crashState.bet * crashState.multiplier);
  drawCrashGraph(crashState.multiplier, false);

  if (crashState.multiplier >= crashState.crashPoint) {
    crashState.active = false;
    countLoss();
    $("#startCrash").disabled = false;
    $("#cashoutCrash").disabled = true;
    $("#crashStatus").textContent = `Crash bei ${crashState.crashPoint.toFixed(2)}x`;
    drawCrashGraph(crashState.crashPoint, true);
    showToast(`Crash bei ${crashState.crashPoint.toFixed(2)}x. Einsatz verloren.`, true);
    return;
  }

  if (moonAutoCashoutTarget && crashState.multiplier >= moonAutoCashoutTarget) {
    cashoutCrash();
    setMoonStatus(`Crash Auto Cashout bei ${crashState.multiplier.toFixed(2)}x.`);
    moonAutoCashoutTarget = null;
    return;
  }

  crashState.raf = window.requestAnimationFrame(animateCrash);
}

function cashoutCrash() {
  if (!crashState.active) return;
  const payout = Math.floor(crashState.bet * crashState.multiplier);
  crashState.active = false;
  window.cancelAnimationFrame(crashState.raf);
  pay(payout);
  $("#startCrash").disabled = false;
  $("#cashoutCrash").disabled = true;
  $("#crashStatus").textContent = `Cashout ${crashState.multiplier.toFixed(2)}x`;
  drawCrashGraph(crashState.multiplier, false);
  showToast(`Crash Cashout: +${formatCoins(payout)} Coins`);
}

function drawCrashGraph(multiplier, crashed) {
  const canvas = $("#crashCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(69, 214, 181, 0.16)");
  gradient.addColorStop(1, "rgba(95, 168, 255, 0.04)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;
  for (let x = 70; x < width; x += 90) {
    ctx.beginPath();
    ctx.moveTo(x, 30);
    ctx.lineTo(x, height - 45);
    ctx.stroke();
  }
  for (let y = 55; y < height - 45; y += 70) {
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(width - 30, y);
    ctx.stroke();
  }

  const maxMult = Math.max(3, multiplier + 0.5);
  ctx.beginPath();
  for (let i = 0; i <= 90; i += 1) {
    const progress = i / 90;
    const curve = 1 + (multiplier - 1) * Math.pow(progress, 1.7);
    const x = 55 + progress * (width - 110);
    const y = height - 55 - ((curve - 1) / (maxMult - 1)) * (height - 110);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.strokeStyle = crashed ? "#ff5c7a" : "#45d6b5";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.fillStyle = crashed ? "#ff5c7a" : "#f7c85f";
  ctx.font = "800 44px system-ui, sans-serif";
  ctx.fillText(`${multiplier.toFixed(2)}x`, 66, 86);
}

function updateDiceInfo() {
  const target = Number($("#diceTarget").value);
  const multiplier = 98 / target;
  $("#diceTargetLabel").textContent = String(target);
  $("#diceChance").textContent = `${target}%`;
  $("#diceMultiplier").textContent = `${multiplier.toFixed(2)}x`;
  $("#diceWinZone").style.width = `${target}%`;
}

function rollDice(forceWin = false) {
  const bet = getBet("#diceBet");
  if (bet === null || !spend(bet)) return;

  const target = Number($("#diceTarget").value);
  const multiplier = 98 / target;
  const roll = forceWin ? Math.random() * Math.max(1, target - 0.01) : Math.random() * 100;
  const won = roll < target;
  const payout = won ? Math.floor(bet * multiplier) : 0;

  $("#diceMarker").style.left = `${roll}%`;
  $("#diceNumber").textContent = roll.toFixed(2);
  $("#diceResult").textContent = won ? `Win +${formatCoins(payout)}` : "Lose";
  $("#diceResult").classList.toggle("rarity-legendary", won);
  $("#diceResult").classList.toggle("rarity-common", !won);

  if (won) {
    pay(payout);
    showToast(`Dice gewonnen: +${formatCoins(payout)} Coins`);
  } else {
    countLoss();
    showToast(`Gewuerfelt: ${roll.toFixed(2)}. Verloren.`, true);
  }
}

function updateWheelInfo() {
  const option = wheelOptions[wheelPick];
  $("#wheelChance").textContent = `${option.chance}%`;
  $("#wheelMultiplier").textContent = `${option.multiplier.toFixed(2)}x`;
  $$(".segment").forEach((button) => button.classList.toggle("active", button.dataset.wheelPick === wheelPick));
}

function spinWheel(forceWin = false) {
  if (wheelBusy) return;
  const bet = getBet("#wheelBet");
  if (bet === null || !spend(bet)) return;

  wheelBusy = true;
  $("#spinWheel").disabled = true;
  const slots = ["blue", "green", "blue", "gold", "green", "blue", "blue", "green", "gold", "blue", "green", "blue"];
  const winningIndexes = slots.map((slot, index) => slot === wheelPick ? index : -1).filter((index) => index >= 0);
  const resultIndex = forceWin ? winningIndexes[Math.floor(Math.random() * winningIndexes.length)] : Math.floor(Math.random() * slots.length);
  const result = slots[resultIndex];
  const slice = 360 / slots.length;
  const targetCenter = resultIndex * slice + slice / 2;
  wheelRotation += 1440 + (360 - targetCenter);
  $("#wheelDisc").style.transform = `rotate(${wheelRotation}deg)`;
  $("#wheelResult").textContent = "Dreht";

  window.setTimeout(() => {
    const won = result === wheelPick;
    if (won) {
      const payout = Math.floor(bet * wheelOptions[wheelPick].multiplier);
      pay(payout);
      $("#wheelResult").textContent = `${wheelOptions[result].label} +${formatCoins(payout)}`;
      showToast(`Wheel Treffer: +${formatCoins(payout)} Coins`);
    } else {
      countLoss();
      $("#wheelResult").textContent = `${wheelOptions[result].label} getroffen`;
      showToast(`Wheel traf ${wheelOptions[result].label}. Einsatz verloren.`, true);
    }
    wheelBusy = false;
    $("#spinWheel").disabled = false;
  }, 2700);
}

const rouletteSlots = [
  { number: 0, color: "green" },
  { number: 1, color: "red" },
  { number: 2, color: "black" },
  { number: 3, color: "red" },
  { number: 4, color: "black" },
  { number: 5, color: "red" },
  { number: 6, color: "black" },
  { number: 7, color: "red" },
  { number: 8, color: "black" },
  { number: 9, color: "red" },
  { number: 10, color: "black" },
  { number: 11, color: "red" },
  { number: 12, color: "black" },
  { number: 13, color: "red" },
  { number: 14, color: "black" }
];

const roulettePicks = {
  red: { label: "Rot", multiplier: 2 },
  black: { label: "Schwarz", multiplier: 2 },
  green: { label: "Zero", multiplier: 14 },
  even: { label: "Gerade", multiplier: 2 },
  odd: { label: "Ungerade", multiplier: 2 },
  low: { label: "1-7", multiplier: 2 },
  high: { label: "8-14", multiplier: 2 }
};

function rouletteMatchesPick(pick, slot) {
  if (pick === "red" || pick === "black" || pick === "green") return slot.color === pick;
  if (slot.number === 0) return false;
  if (pick === "even") return slot.number % 2 === 0;
  if (pick === "odd") return slot.number % 2 === 1;
  if (pick === "low") return slot.number >= 1 && slot.number <= 7;
  if (pick === "high") return slot.number >= 8 && slot.number <= 14;
  return false;
}

function updateRoulettePick() {
  $$("[data-roulette-pick]").forEach((button) => {
    button.classList.toggle("active", button.dataset.roulettePick === roulettePick);
  });
  $("#roulettePickLabel").textContent = roulettePicks[roulettePick].label;
  $("#roulettePayoutLabel").textContent = `${roulettePicks[roulettePick].multiplier.toFixed(2)}x`;
}

function spinRoulette(forceWin = false) {
  if (rouletteBusy) return false;
  const bet = getBet("#rouletteBet");
  if (bet === null || !spend(bet)) return false;

  rouletteBusy = true;
  $("#spinRoulette").disabled = true;
  const winningSlots = rouletteSlots.filter((slot) => rouletteMatchesPick(roulettePick, slot));
  const result = forceWin && winningSlots.length
    ? winningSlots[Math.floor(Math.random() * winningSlots.length)]
    : rouletteSlots[Math.floor(Math.random() * rouletteSlots.length)];
  const resultIndex = rouletteSlots.indexOf(result);
  const slice = 360 / rouletteSlots.length;
  const targetCenter = resultIndex * slice + slice / 2;
  const currentDiscAngle = ((rouletteRotation % 360) + 360) % 360;
  const targetDiscAngle = (360 - targetCenter) % 360;
  const discToTarget = (targetDiscAngle - currentDiscAngle + 360) % 360;
  const currentBallAngle = ((rouletteBallRotation % 360) + 360) % 360;
  const ballToPointer = (360 - currentBallAngle) % 360;
  rouletteRotation += 1440 + discToTarget;
  rouletteBallRotation += 2160 + ballToPointer;
  $("#rouletteDisc").style.transform = `rotate(${rouletteRotation}deg)`;
  $("#rouletteBall").style.transform = `rotate(${rouletteBallRotation}deg)`;
  $("#rouletteResult").textContent = "Spin";

  window.setTimeout(() => {
    const won = rouletteMatchesPick(roulettePick, result);
    $("#rouletteLastNumber").textContent = String(result.number);
    $("#rouletteLastColor").textContent = roulettePicks[result.color].label;
    if (won) {
      const payout = Math.floor(bet * roulettePicks[roulettePick].multiplier);
      pay(payout);
      $("#rouletteResult").textContent = `${result.number} +${formatCoins(payout)}`;
      showToast(`Roulette gewonnen: +${formatCoins(payout)} Coins`);
    } else {
      countLoss();
      $("#rouletteResult").textContent = `${result.number} ${roulettePicks[result.color].label}`;
      showToast(`Roulette traf ${result.number} ${roulettePicks[result.color].label}.`, true);
    }
    rouletteBusy = false;
    $("#spinRoulette").disabled = false;
  }, 2350);
  return true;
}

const cardRanks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const cardSuits = ["S", "H", "D", "C"];
const cardSuitSymbols = { S: "♠", H: "♥", D: "♦", C: "♣" };
const cardValues = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
};

function makeCard(rank, suit) {
  return { rank, suit };
}

function createDeck() {
  return cardSuits.flatMap((suit) => cardRanks.map((rank) => makeCard(rank, suit)));
}

function drawCard(deck = null) {
  if (Array.isArray(deck) && deck.length) {
    const index = Math.floor(Math.random() * deck.length);
    return deck.splice(index, 1)[0];
  }
  return makeCard(
    cardRanks[Math.floor(Math.random() * cardRanks.length)],
    cardSuits[Math.floor(Math.random() * cardSuits.length)]
  );
}

function cardText(card) {
  return `${card.rank}${cardSuitSymbols[card.suit] || card.suit}`;
}

function appendCardFace(el, card) {
  const top = document.createElement("span");
  top.className = "card-corner card-top";
  top.textContent = cardText(card);

  const center = document.createElement("span");
  center.className = "card-center";
  center.textContent = cardSuitSymbols[card.suit] || card.suit;

  const bottom = document.createElement("span");
  bottom.className = "card-corner card-bottom";
  bottom.textContent = cardText(card);

  el.append(top, center, bottom);
}

function renderCards(containerId, cards, options = {}) {
  const container = $(containerId);
  container.innerHTML = "";
  cards.forEach((card, index) => {
    const hidden = options.hiddenIndexes?.has(index);
    const el = document.createElement(options.selectable ? "button" : "div");
    el.className = `playing-card ${card.suit === "H" || card.suit === "D" ? "red" : ""}`;
    if (hidden) {
      el.classList.add("hidden-card");
      el.textContent = "??";
    } else {
      appendCardFace(el, card);
    }
    if (options.selectable) {
      el.type = "button";
      el.classList.add("card-button");
      el.classList.toggle("held", options.held?.has(index));
      el.dataset.pokerCard = String(index);
      el.setAttribute("aria-pressed", options.held?.has(index) ? "true" : "false");
    }
    container.append(el);
  });
}

function blackjackValue(cards) {
  let total = 0;
  let aces = 0;
  cards.forEach((card) => {
    if (card.rank === "A") {
      aces += 1;
      total += 11;
    } else if (["J", "Q", "K"].includes(card.rank)) {
      total += 10;
    } else {
      total += Number(card.rank);
    }
  });
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
}

function updateBlackjackControls() {
  $("#dealBlackjack").disabled = blackjackState.active;
  $("#hitBlackjack").disabled = !blackjackState.active;
  $("#standBlackjack").disabled = !blackjackState.active;
}

function renderBlackjack() {
  const hiddenDealer = blackjackState.active && blackjackState.dealerHidden ? new Set([1]) : new Set();
  renderCards("#blackjackPlayerCards", blackjackState.player);
  renderCards("#blackjackDealerCards", blackjackState.dealer, { hiddenIndexes: hiddenDealer });
  $("#blackjackPlayerScore").textContent = blackjackState.player.length ? String(blackjackValue(blackjackState.player)) : "--";
  if (!blackjackState.dealer.length) {
    $("#blackjackDealerScore").textContent = "--";
  } else if (hiddenDealer.size) {
    $("#blackjackDealerScore").textContent = `${blackjackValue([blackjackState.dealer[0]])}+`;
  } else {
    $("#blackjackDealerScore").textContent = String(blackjackValue(blackjackState.dealer));
  }
  updateBlackjackControls();
}

function finishBlackjack() {
  blackjackState.dealerHidden = false;
  while (blackjackValue(blackjackState.player) <= 21 && blackjackValue(blackjackState.dealer) < 17) {
    blackjackState.dealer.push(drawCard(blackjackState.deck));
  }

  const playerScore = blackjackValue(blackjackState.player);
  const dealerScore = blackjackValue(blackjackState.dealer);
  const won = playerScore <= 21 && (dealerScore > 21 || playerScore > dealerScore);
  const push = playerScore <= 21 && playerScore === dealerScore;
  blackjackState.active = false;
  renderBlackjack();

  if (won) {
    const payout = Math.floor(blackjackState.bet * 2);
    pay(payout);
    $("#blackjackResult").textContent = `Win +${formatCoins(payout)}`;
    showToast(`Blackjack gewonnen: +${formatCoins(payout)} Coins`);
  } else if (push) {
    pay(blackjackState.bet);
    $("#blackjackResult").textContent = "Push";
    showToast("Blackjack Push.");
  } else {
    countLoss();
    $("#blackjackResult").textContent = playerScore > 21 ? "Bust" : "Dealer gewinnt";
    showToast("Blackjack verloren.", true);
  }
}

function startBlackjack(forceWin = false) {
  if (blackjackState.active) return false;
  const bet = getBet("#blackjackBet");
  if (bet === null || !spend(bet)) return false;
  blackjackState.deck = createDeck();
  blackjackState.bet = bet;
  blackjackState.forceWin = forceWin;
  blackjackState.active = true;
  blackjackState.dealerHidden = true;
  blackjackState.player = forceWin
    ? [makeCard("A", "S"), makeCard("K", "H")]
    : [drawCard(blackjackState.deck), drawCard(blackjackState.deck)];
  blackjackState.dealer = forceWin
    ? [makeCard("10", "C"), makeCard("7", "D")]
    : [drawCard(blackjackState.deck), drawCard(blackjackState.deck)];
  $("#blackjackResult").textContent = "Runde laeuft";
  renderBlackjack();
  return true;
}

function hitBlackjack(forceSafe = false) {
  if (!blackjackState.active) return false;
  const score = blackjackValue(blackjackState.player);
  if (forceSafe && score >= 17) return standBlackjack();
  blackjackState.player.push(drawCard(blackjackState.deck));
  renderBlackjack();
  if (blackjackValue(blackjackState.player) >= 21) finishBlackjack();
  return true;
}

function standBlackjack() {
  if (!blackjackState.active) return false;
  finishBlackjack();
  return true;
}

function autoBlackjack(forceWin = false) {
  if (!blackjackState.active) {
    const started = startBlackjack(forceWin);
    if (!started) return false;
  }
  if (!blackjackState.active) return true;
  if (forceWin || blackjackValue(blackjackState.player) >= 16) return standBlackjack();
  return hitBlackjack(false);
}

function playBlackjack(forceWin = false) {
  return autoBlackjack(forceWin);
}

function rankScoreBits(values) {
  return values.reduce((score, value, index) => score + value / (100 ** (index + 1)), 0);
}

function pokerRank(cards) {
  const counts = new Map();
  cards.forEach((card) => counts.set(card.rank, (counts.get(card.rank) || 0) + 1));
  const groups = [...counts.entries()]
    .map(([rank, count]) => ({ rank, count, value: cardValues[rank] }))
    .sort((a, b) => b.count - a.count || b.value - a.value);
  const values = cards.map((card) => cardValues[card.rank]).sort((a, b) => b - a);
  const unique = [...new Set(values)].sort((a, b) => b - a);
  const flush = cards.every((card) => card.suit === cards[0].suit);
  const wheel = unique.join(",") === "14,5,4,3,2";
  const straight = unique.length === 5 && (unique[0] - unique[4] === 4 || wheel);
  const straightHigh = wheel ? 5 : unique[0];

  if (straight && flush && straightHigh === 14) return { name: "Royal Flush", score: 9 };
  if (straight && flush) return { name: "Straight Flush", score: 8 + straightHigh / 100 };
  if (groups[0].count === 4) return { name: "Four", score: 7 + groups[0].value / 100 };
  if (groups[0].count === 3 && groups[1]?.count === 2) return { name: "Full House", score: 6 + groups[0].value / 100 };
  if (flush) return { name: "Flush", score: 5 + rankScoreBits(values) };
  if (straight) return { name: "Straight", score: 4 + straightHigh / 100 };
  if (groups[0].count === 3) return { name: "Trips", score: 3 + groups[0].value / 100 + rankScoreBits(groups.slice(1).map((group) => group.value)) };
  if (groups[0].count === 2 && groups[1]?.count === 2) {
    return { name: "Two Pair", score: 2 + groups[0].value / 100 + groups[1].value / 10000 + groups[2].value / 1000000 };
  }
  if (groups[0].count === 2) return { name: "Pair", score: 1 + groups[0].value / 100 + rankScoreBits(groups.slice(1).map((group) => group.value)) };
  return { name: "High Card", score: rankScoreBits(values) };
}

function cardKey(card) {
  return `${card.rank}-${card.suit}`;
}

function removeCardsFromDeck(deck, cards) {
  const used = new Set(cards.map(cardKey));
  return deck.filter((card) => !used.has(cardKey(card)));
}

function fiveCardCombos(cards) {
  const combos = [];
  for (let a = 0; a < cards.length - 4; a += 1) {
    for (let b = a + 1; b < cards.length - 3; b += 1) {
      for (let c = b + 1; c < cards.length - 2; c += 1) {
        for (let d = c + 1; d < cards.length - 1; d += 1) {
          for (let e = d + 1; e < cards.length; e += 1) {
            combos.push([cards[a], cards[b], cards[c], cards[d], cards[e]]);
          }
        }
      }
    }
  }
  return combos;
}

function bestHoldemRank(cards) {
  if (cards.length < 5) return null;
  return fiveCardCombos(cards)
    .map((combo) => pokerRank(combo))
    .sort((a, b) => b.score - a.score)[0];
}

function visiblePokerCommunity() {
  return pokerState.community.slice(0, pokerState.visibleCommunity);
}

function startingPokerLabel(cards) {
  if (!cards.length) return "--";
  if (cards.length === 2 && cards[0].rank === cards[1].rank) return "Pair";
  const high = cards.map((card) => cardValues[card.rank]).sort((a, b) => b - a)[0];
  return high >= 14 ? "A High" : high >= 13 ? "K High" : "High Card";
}

function displayHoldemRank(hole, showIncomplete = true) {
  const visible = [...hole, ...visiblePokerCommunity()];
  const rank = bestHoldemRank(visible);
  if (rank) return rank.name;
  return showIncomplete ? startingPokerLabel(hole) : "--";
}

function preflopHoleStrength(hole) {
  if (hole.length < 2) return 0;
  const values = hole.map((card) => cardValues[card.rank]).sort((a, b) => b - a);
  const [high, low] = values;
  const pair = hole[0].rank === hole[1].rank;
  const suited = hole[0].suit === hole[1].suit;
  const gap = Math.abs(high - low);

  if (pair && high >= 12) return 3.3;
  if (pair && high >= 8) return 2.55;
  if (pair) return 1.85;
  if (high === 14 && low >= 13) return suited ? 3.05 : 2.75;
  if (high === 14 && low >= 11) return suited ? 2.25 : 1.85;
  if (high === 13 && low >= 12) return suited ? 2.05 : 1.65;
  if (suited && gap <= 2 && high >= 10) return 1.65;
  if (suited && high >= 11) return 1.35;
  if (gap <= 1 && high >= 10) return 1.25;
  if (high <= 7 && low <= 4 && !suited && gap > 2) return 0.12;
  return high / 14 + (suited ? 0.18 : 0) + (gap <= 2 ? 0.14 : 0);
}

function straightDrawScore(cards) {
  const values = [...new Set(cards.map((card) => cardValues[card.rank]))];
  if (values.includes(14)) values.push(1);
  let bestRun = 0;
  for (let start = 1; start <= 10; start += 1) {
    let run = 0;
    for (let value = start; value < start + 5; value += 1) {
      if (values.includes(value)) run += 1;
    }
    bestRun = Math.max(bestRun, run);
  }
  if (bestRun >= 5) return 0.9;
  if (bestRun === 4) return 0.55;
  if (bestRun === 3) return 0.18;
  return 0;
}

function drawPotentialScore(hole, community) {
  const cards = [...hole, ...community];
  const suitCounts = new Map();
  cards.forEach((card) => suitCounts.set(card.suit, (suitCounts.get(card.suit) || 0) + 1));
  const maxSuit = Math.max(0, ...suitCounts.values());
  const flushDraw = maxSuit === 4 ? 0.72 : maxSuit === 3 && community.length < 5 ? 0.24 : 0;
  return flushDraw + straightDrawScore(cards);
}

function botHasPosition() {
  if (pokerState.phase === "preflop") return pokerState.dealer !== "bot";
  return pokerState.dealer === "bot";
}

function estimatePokerStrength(hole, community) {
  const complete = bestHoldemRank([...hole, ...community]);
  if (complete) return complete.score + drawPotentialScore(hole, community);

  return preflopHoleStrength(hole) + drawPotentialScore(hole, community);
}

function pokerStreetLabel() {
  const labels = {
    idle: "--",
    preflop: "Preflop",
    flop: "Flop",
    turn: "Turn",
    river: "River"
  };
  return labels[pokerState.phase] || "--";
}

function updatePokerControls() {
  const amountToCall = Math.max(0, pokerState.currentBet - pokerState.playerStreetBet);
  $("#buyPokerChips").disabled = pokerState.active || state.balance < 10;
  $("#cashoutPokerChips").disabled = pokerState.active || state.pokerChips < 1;
  $("#dealPoker").disabled = pokerState.active || state.pokerChips < pokerState.bigBlind;
  $("#pokerCall").disabled = !pokerState.active || pokerState.botThinking;
  $("#pokerCall").textContent = amountToCall > 0 ? `Call ${formatCoins(amountToCall)}` : "Check";
  $("#pokerRaise").disabled = !pokerState.active || pokerState.botThinking || state.pokerChips <= amountToCall;
  $("#pokerAllIn").disabled = !pokerState.active || pokerState.botThinking || state.pokerChips < 1;
  $("#foldPoker").disabled = !pokerState.active || pokerState.botThinking;
}

function renderPoker() {
  const hiddenBot = pokerState.botHidden ? new Set(pokerState.bot.map((_, index) => index)) : new Set();
  const hiddenCommunity = new Set(
    pokerState.community.map((_, index) => index).filter((index) => index >= pokerState.visibleCommunity)
  );
  renderCards("#pokerPlayerCards", pokerState.player);
  renderCards("#pokerBotCards", pokerState.bot, { hiddenIndexes: hiddenBot });
  renderCards("#pokerCommunityCards", pokerState.community, { hiddenIndexes: hiddenCommunity });
  $("#pokerChipBalance").textContent = formatCoins(state.pokerChips);
  $("#pokerBotChips").textContent = formatCoins(pokerState.botChips);
  $("#pokerPot").textContent = formatCoins(pokerState.pot);
  $("#pokerCurrentBet").textContent = formatCoins(Math.max(0, pokerState.currentBet - pokerState.playerStreetBet));
  $("#pokerPlayerStreetBet").textContent = formatCoins(pokerState.playerStreetBet);
  $("#pokerBotStreetBet").textContent = formatCoins(pokerState.botStreetBet);
  $("#pokerPlayerBetStack span").textContent = formatCoins(pokerState.playerStreetBet);
  $("#pokerBotBetStack span").textContent = formatCoins(pokerState.botStreetBet);
  $("#pokerPlayerBetStack").classList.toggle("empty", pokerState.playerStreetBet <= 0);
  $("#pokerBotBetStack").classList.toggle("empty", pokerState.botStreetBet <= 0);
  $("#pokerStreet").textContent = pokerStreetLabel();
  $("#pokerBlindLabel").textContent = pokerState.dealer === "player" ? "Du SB" : "Du BB";
  $("#pokerPlayerRank").textContent = pokerState.player.length ? displayHoldemRank(pokerState.player) : "--";
  $("#pokerBotRank").textContent = pokerState.bot.length && !pokerState.botHidden ? displayHoldemRank(pokerState.bot) : "--";
  updatePokerControls();
}

function exchangePokerChips(showMessage = true, forcedAmount = null) {
  if (pokerState.active) {
    showToast("Chips erst nach der Hand umtauschen.", true);
    return false;
  }
  const rawAmount = forcedAmount ?? Number($("#pokerExchangeAmount").value);
  const amount = Math.floor((Number(rawAmount) || 0) / 10) * 10;
  if (amount < 10) {
    showToast("Mindestens 10 Demo-Coins umtauschen.", true);
    return false;
  }
  if (state.balance < amount) {
    showToast("Nicht genug Demo-Coins zum Umtauschen.", true);
    return false;
  }

  if (!spend(amount)) return false;
  const chips = Math.floor(amount / 10);
  state.pokerChips += chips;
  updateHud();
  renderPoker();
  if (showMessage) showToast(`${formatCoins(amount)} Coins in ${formatCoins(chips)} Chips getauscht.`);
  return true;
}

function buyPokerChips(showMessage = true) {
  return exchangePokerChips(showMessage, 1000);
}

function cashoutPokerChips(showMessage = true, forcedChips = null) {
  if (pokerState.active) {
    showToast("Chips erst nach der Hand zuruecktauschen.", true);
    return false;
  }
  const rawChips = forcedChips ?? Number($("#pokerCashoutAmount").value);
  const chips = Math.max(1, Math.floor(Number(rawChips) || 0));
  if (state.pokerChips < chips) {
    showToast("Nicht genug Poker-Chips.", true);
    return false;
  }

  state.pokerChips -= chips;
  const coins = chips * 10;
  state.balance += coins;
  state.stats.profit += coins;
  updateHud();
  renderPoker();
  if (showMessage) showToast(`${formatCoins(chips)} Chips in ${formatCoins(coins)} Coins getauscht.`);
  return true;
}

function getPokerRaiseAmount() {
  const raw = Number($("#pokerBet").value);
  if (!Number.isFinite(raw) || raw < pokerState.bigBlind) {
    showToast(`Raise muss mindestens ${pokerState.bigBlind} Chips sein.`, true);
    return null;
  }
  return Math.floor(raw);
}

function takePlayerPokerChips(amount) {
  const cleanAmount = Math.max(0, Math.floor(amount));
  if (cleanAmount === 0) return true;
  if (state.pokerChips < cleanAmount) {
    showToast("Nicht genug Poker-Chips.", true);
    return false;
  }
  state.pokerChips -= cleanAmount;
  pokerState.playerStreetBet += cleanAmount;
  pokerState.pot += cleanAmount;
  updateHud();
  return true;
}

function takeBotPokerChips(amount) {
  const cleanAmount = Math.max(0, Math.min(pokerState.botChips, Math.floor(amount)));
  pokerState.botChips -= cleanAmount;
  pokerState.botStreetBet += cleanAmount;
  pokerState.pot += cleanAmount;
  return cleanAmount;
}

function switchPokerDealer() {
  pokerState.dealer = pokerState.dealer === "player" ? "bot" : "player";
}

function endPokerHand(message, bad = false) {
  pokerState.active = false;
  pokerState.phase = "idle";
  pokerState.botHidden = false;
  pokerState.visibleCommunity = 5;
  pokerState.currentBet = 0;
  pokerState.playerStreetBet = 0;
  pokerState.botStreetBet = 0;
  pokerState.pot = 0;
  pokerState.botThinking = false;
  switchPokerDealer();
  state.stats.games += 1;
  updateHud();
  renderPoker();
  showToast(message, bad);
}

function awardPokerPotToPlayer(reason) {
  const amount = pokerState.pot;
  state.pokerChips += amount;
  $("#pokerResult").textContent = `${reason} +${formatCoins(amount)} Chips`;
  endPokerHand(`Poker gewonnen: +${formatCoins(amount)} Chips`);
}

function awardPokerPotToBot(reason) {
  const amount = pokerState.pot;
  pokerState.botChips += amount;
  $("#pokerResult").textContent = reason;
  endPokerHand("Poker verloren.", true);
}

function resetPokerStreetBets() {
  pokerState.currentBet = 0;
  pokerState.playerStreetBet = 0;
  pokerState.botStreetBet = 0;
  pokerState.lastRaise = pokerState.bigBlind;
  pokerState.lastAggressor = null;
}

function botPokerRaiseSize() {
  const strength = estimatePokerStrength(pokerState.bot, visiblePokerCommunity());
  const pressure = strength >= 3 ? 0.68 : strength >= 2 ? 0.48 : 0.32;
  const base = Math.max(pokerState.bigBlind, Math.floor(pokerState.pot * pressure));
  const playerCoverage = Math.max(0, state.pokerChips + pokerState.playerStreetBet - pokerState.botStreetBet);
  const capped = Math.min(pokerState.botChips, playerCoverage, base);
  return capped >= pokerState.bigBlind ? capped : 0;
}

function botShouldRaise(context = "normal") {
  const strength = estimatePokerStrength(pokerState.bot, visiblePokerCommunity());
  if (pokerState.botChips <= pokerState.bigBlind) return false;
  if (botPokerRaiseSize() <= 0) return false;
  const positionBoost = botHasPosition() ? 0.08 : -0.06;
  const bluffChance = botHasPosition() && context === "check" && pokerState.pot <= pokerState.bigBlind * 5 ? 0.08 : 0.025;

  if (context === "preflop") {
    if (strength >= 2.7) return Math.random() < 0.72 + positionBoost;
    if (strength >= 1.85) return Math.random() < 0.24 + positionBoost;
    return Math.random() < bluffChance;
  }

  if (strength >= 5) return Math.random() < 0.82;
  if (strength >= 3.15) return Math.random() < 0.58 + positionBoost;
  if (strength >= 2.15) return Math.random() < 0.28 + positionBoost;
  if (strength >= 1.55 && context === "check") return Math.random() < 0.16 + positionBoost;
  return Math.random() < bluffChance;
}

function botShouldCall(amountToCall) {
  const strength = estimatePokerStrength(pokerState.bot, visiblePokerCommunity());
  const potOdds = amountToCall / Math.max(1, pokerState.pot + amountToCall);
  const positionBoost = botHasPosition() ? 0.12 : 0;

  if (amountToCall <= pokerState.bigBlind) return strength >= 0.8 || Math.random() < 0.42 + positionBoost;
  if (strength >= 3) return true;
  if (strength >= 2) return potOdds <= 0.42 || Math.random() < 0.42 + positionBoost;
  if (strength >= 1.35) return potOdds <= 0.28 && Math.random() < 0.74 + positionBoost;
  if (strength >= 0.9) return potOdds <= 0.18 && Math.random() < 0.36;
  return Math.random() < 0.06;
}

function schedulePokerBotAction(message, action) {
  pokerState.botThinking = true;
  $("#pokerResult").textContent = message;
  renderPoker();
  window.setTimeout(() => {
    pokerState.botThinking = false;
    if (!pokerState.active) {
      renderPoker();
      return;
    }
    action();
    renderPoker();
  }, 700 + Math.floor(Math.random() * 550));
}

function botPreflopOpen() {
  const toCall = Math.max(0, pokerState.currentBet - pokerState.botStreetBet);
  if (toCall > 0) takeBotPokerChips(toCall);
  if (botShouldRaise("preflop")) {
    const raise = botPokerRaiseSize();
    takeBotPokerChips(raise);
    pokerState.currentBet = pokerState.botStreetBet;
    pokerState.lastAggressor = "bot";
    $("#pokerResult").textContent = `Bot raised ${formatCoins(raise)}`;
  } else {
    $("#pokerResult").textContent = "Bot callt den Blind";
  }
}

function dealPoker(forceWin = false) {
  if (pokerState.active) return false;
  if (state.pokerChips < pokerState.bigBlind) {
    showToast("Du brauchst Chips fuer den Big Blind.", true);
    return false;
  }
  if (pokerState.botChips < pokerState.bigBlind * 4) pokerState.botChips = 1000;

  const forcedPlayer = [makeCard("A", "S"), makeCard("A", "H")];
  const forcedBot = [makeCard("7", "C"), makeCard("2", "D")];
  const forcedBoard = [makeCard("A", "D"), makeCard("K", "C"), makeCard("K", "S"), makeCard("5", "C"), makeCard("3", "H")];
  const forcedCards = [...forcedPlayer, ...forcedBot, ...forcedBoard];
  pokerState.deck = forceWin ? removeCardsFromDeck(createDeck(), forcedCards) : createDeck();
  pokerState.active = true;
  pokerState.phase = "preflop";
  pokerState.forceWin = forceWin;
  pokerState.botHidden = true;
  pokerState.visibleCommunity = 0;
  pokerState.pot = 0;
  pokerState.currentBet = pokerState.bigBlind;
  pokerState.playerStreetBet = 0;
  pokerState.botStreetBet = 0;
  pokerState.lastRaise = pokerState.bigBlind;
  pokerState.lastAggressor = pokerState.dealer === "player" ? "blindBot" : "blindPlayer";
  pokerState.player = forceWin ? forcedPlayer : [drawCard(pokerState.deck), drawCard(pokerState.deck)];
  pokerState.bot = forceWin ? forcedBot : [drawCard(pokerState.deck), drawCard(pokerState.deck)];
  pokerState.community = forceWin ? forcedBoard : Array.from({ length: 5 }, () => drawCard(pokerState.deck));

  const playerBlind = pokerState.dealer === "player" ? pokerState.smallBlind : pokerState.bigBlind;
  const botBlind = pokerState.dealer === "player" ? pokerState.bigBlind : pokerState.smallBlind;
  if (!takePlayerPokerChips(playerBlind)) {
    pokerState.active = false;
    return false;
  }
  takeBotPokerChips(botBlind);

  $("#pokerResult").textContent = pokerState.dealer === "player" ? "Du postest Small Blind" : "Du postest Big Blind";
  renderPoker();
  if (pokerState.dealer === "bot") schedulePokerBotAction("Bot denkt...", botPreflopOpen);
  return true;
}

function advancePokerStreet() {
  resetPokerStreetBets();
  if (pokerState.phase === "preflop") {
    pokerState.phase = "flop";
    pokerState.visibleCommunity = 3;
    $("#pokerResult").textContent = "Flop";
  } else if (pokerState.phase === "flop") {
    pokerState.phase = "turn";
    pokerState.visibleCommunity = 4;
    $("#pokerResult").textContent = "Turn";
  } else if (pokerState.phase === "turn") {
    pokerState.phase = "river";
    pokerState.visibleCommunity = 5;
    $("#pokerResult").textContent = "River";
  } else if (pokerState.phase === "river") {
    resolvePoker();
    return;
  }
  renderPoker();
}

function botRespondToPlayerRaise() {
  schedulePokerBotAction("Bot denkt...", () => {
    const amountToCall = Math.max(0, pokerState.currentBet - pokerState.botStreetBet);
    if (amountToCall > 0 && !botShouldCall(amountToCall)) {
      awardPokerPotToPlayer("Bot foldet");
      return;
    }

    if (amountToCall > 0) takeBotPokerChips(amountToCall);
    if (botShouldRaise("response")) {
      const raise = botPokerRaiseSize();
      takeBotPokerChips(raise);
      pokerState.currentBet = pokerState.botStreetBet;
      pokerState.lastAggressor = "bot";
      $("#pokerResult").textContent = `Bot raised ${formatCoins(raise)}`;
      return;
    }

    $("#pokerResult").textContent = amountToCall > 0 ? "Bot callt" : "Bot checkt";
    advancePokerStreet();
  });
}

function botRespondToPlayerCheck() {
  schedulePokerBotAction("Bot wartet...", () => {
    if (botShouldRaise("check")) {
      const raise = botPokerRaiseSize();
      takeBotPokerChips(raise);
      pokerState.currentBet = pokerState.botStreetBet;
      pokerState.lastAggressor = "bot";
      $("#pokerResult").textContent = `Bot setzt ${formatCoins(raise)}`;
      return;
    }
    $("#pokerResult").textContent = "Check / Check";
    advancePokerStreet();
  });
}

function pokerCallOrCheck() {
  if (!pokerState.active) return false;
  const amountToCall = Math.max(0, pokerState.currentBet - pokerState.playerStreetBet);
  if (amountToCall > 0) {
    if (!takePlayerPokerChips(amountToCall)) return false;
    $("#pokerResult").textContent = `Call ${formatCoins(amountToCall)}`;
    if (pokerState.phase === "preflop" && pokerState.lastAggressor === "blindBot") {
      botRespondToPlayerCheck();
      return true;
    }
    advancePokerStreet();
    return true;
  }
  botRespondToPlayerCheck();
  return true;
}

function raisePoker() {
  if (!pokerState.active) return false;
  const raise = getPokerRaiseAmount();
  if (raise === null) return false;
  const amountToCall = Math.max(0, pokerState.currentBet - pokerState.playerStreetBet);
  if (!takePlayerPokerChips(amountToCall + raise)) return false;
  pokerState.currentBet = pokerState.playerStreetBet;
  pokerState.lastRaise = raise;
  pokerState.lastAggressor = "player";
  $("#pokerResult").textContent = `Du raised ${formatCoins(raise)}`;
  botRespondToPlayerRaise();
  return true;
}

function allInPoker() {
  if (!pokerState.active || pokerState.botThinking || state.pokerChips < 1) return false;
  const allInAmount = state.pokerChips;
  if (!takePlayerPokerChips(allInAmount)) return false;
  pokerState.currentBet = Math.max(pokerState.currentBet, pokerState.playerStreetBet);
  pokerState.lastAggressor = "player";
  $("#pokerResult").textContent = `All-In ${formatCoins(allInAmount)}`;
  botRespondToPlayerRaise();
  return true;
}

function resolvePoker() {
  pokerState.botHidden = false;
  pokerState.visibleCommunity = 5;
  const playerRank = bestHoldemRank([...pokerState.player, ...pokerState.community]);
  const botRank = bestHoldemRank([...pokerState.bot, ...pokerState.community]);
  $("#pokerPlayerRank").textContent = playerRank.name;
  $("#pokerBotRank").textContent = botRank.name;

  if (playerRank.score > botRank.score) {
    awardPokerPotToPlayer(`${playerRank.name} gewinnt`);
  } else if (playerRank.score < botRank.score) {
    awardPokerPotToBot(`Bot gewinnt mit ${botRank.name}`);
  } else {
    const split = Math.floor(pokerState.pot / 2);
    state.pokerChips += split;
    pokerState.botChips += pokerState.pot - split;
    $("#pokerResult").textContent = "Split Pot";
    endPokerHand("Poker Split Pot.");
  }
}

function foldPoker() {
  if (!pokerState.active) return false;
  awardPokerPotToBot("Fold");
  return true;
}

function autoPoker(forceWin = false) {
  const loop = autoLoops.poker;
  if (pokerState.botThinking) return false;
  if (state.pokerChips < pokerState.bigBlind) {
    if (state.balance < 1000) {
      stopAutoGame("poker", "Poker auto stopped: balance too low for chips.");
      return false;
    }
    if (!exchangePokerChips(false, 1000)) return false;
  }

  const maxBet = loop?.maxBet > 0 ? loop.maxBet : Number($("#pokerBet").value) || pokerState.bigBlind;
  $("#pokerBet").value = Math.max(pokerState.bigBlind, Math.min(state.pokerChips, Math.floor(maxBet)));

  if (!pokerState.active) return dealPoker(forceWin);
  if (forceWin && state.pokerChips > pokerState.bigBlind && pokerState.currentBet === pokerState.playerStreetBet) {
    return raisePoker();
  }
  return pokerCallOrCheck();
}

function playPoker(forceWin = false) {
  return autoPoker(forceWin);
}

function setMoonStatus(message) {
  const status = $("#moonStatus");
  if (status) status.textContent = message;
}

function updateMoonLicenseUi() {
  const state = $("#moonLicenseState");
  if (state) state.textContent = moonLicenseUnlocked ? "Licensed signal mode" : "Autoplay mode";
  $("#moonMenu")?.classList.toggle("licensed", moonLicenseUnlocked);
}

function unlockMoonLicense() {
  const input = $("#moonLicenseInput");
  const code = input.value.trim();
  if (!/^i-.+-lizens$/.test(code) || !moonLicenseCodes.has(code)) {
    moonLicenseUnlocked = false;
    updateMoonLicenseUi();
    setMoonStatus("Lizenz ungueltig. Autoplay bleibt im normalen Zufallsmodus.");
    showToast("Moon Lizenz ungueltig.", true);
    return;
  }

  moonLicenseUnlocked = true;
  input.value = "";
  updateMoonLicenseUi();
  setMoonStatus("Lizenz akzeptiert. Signal-Autoplay ist aktiv.");
  showToast("Moon Lizenz aktiviert.");
}

function toggleMoonCompact() {
  const menu = $("#moonMenu");
  const compact = menu.classList.toggle("compact");
  $("#moonCompactToggle").textContent = compact ? "Gross" : "Klein";
}

function requireMoonLicense(feature) {
  if (moonLicenseUnlocked) return true;
  setMoonStatus(`${feature} braucht die Moon Lizenz. Normales Auto bleibt Zufall.`);
  showToast("Dafuer brauchst du die Moon Lizenz.", true);
  return false;
}

function openMoonPredictor() {
  $("#moonMenu").hidden = false;
  updateMoonControls();
  updateAutoButtons();
  updateMoonLicenseUi();
  setMoonStatus("Signal engine online. Local demo session connected.");
}

function closeMoonPredictor() {
  $("#moonMenu").hidden = true;
}

function updateMoonControls() {
  const minesButton = $("#moonPredictMines");
  if (!minesButton) return;
  minesButton.disabled = minesState.active && minesState.predictionLocked;
  const towerButton = $("#moonPredictTower");
  if (towerButton) {
    towerButton.disabled = towerState.active && (towerState.currentLevel >= 3 || towerState.predictedLevels.has(towerState.currentLevel));
  }
}

function getMinesSafeHints(limit = 4) {
  if (!minesState.active) return [];
  const hints = [];
  for (let index = 0; index < 25; index += 1) {
    if (!minesState.mineSet.has(index) && !minesState.revealed.has(index)) {
      hints.push(index);
    }
  }
  return hints.slice(0, limit);
}

function moonPredictMines() {
  if (!requireMoonLicense("Mines Signal")) return [];
  if (!minesState.active) {
    setMoonStatus("Mines signal standby. Start a round first.");
    showToast("Moon Predictor braucht eine aktive Mines-Runde.", true);
    return [];
  }

  if (minesState.predictionLocked) {
    setMoonStatus("Mines signal is already locked for this round.");
    return [];
  }

  const hints = getMinesSafeHints(4);
  minesState.predicted = new Set(hints);
  minesState.predictionLocked = true;
  renderMinesBoard();
  switchView("mines");
  updateMoonControls();
  setMoonStatus(hints.length ? "Mines signal locked. Follow highlighted cells." : "Mines signal unavailable.");
  showToast("Moon Predictor hat ein Mines-Signal gesetzt.");
  return hints;
}

function moonPredictTower() {
  if (!requireMoonLicense("Tower Signal")) return null;
  if (!towerState.active) {
    setMoonStatus("Tower signal standby. Start a round first.");
    showToast("Moon Predictor braucht eine aktive Tower-Runde.", true);
    return null;
  }

  if (towerState.predictedLevels.has(towerState.currentLevel)) {
    setMoonStatus("Tower signal is already locked for this floor.");
    return null;
  }

  const level = towerState.currentLevel;
  if (level >= 3) {
    setMoonStatus("Tower signal only covers the first floors.");
    showToast("Tower Signal ist nur fuer die ersten 3 Floors aktiv.", true);
    return null;
  }

  const traps = towerState.traps[level];
  const safeCol = [0, 1, 2].find((col) => !traps?.has(col));
  if (safeCol === undefined) {
    setMoonStatus("Tower signal unavailable.");
    return null;
  }

  towerState.predicted = { level, col: safeCol };
  towerState.predictedLevels.add(level);
  renderTowerBoard();
  switchView("tower");
  updateMoonControls();
  setMoonStatus("Tower signal locked. Follow highlighted tile.");
  showToast("Moon Predictor hat ein Tower-Signal gesetzt.");
  return towerState.predicted;
}

function moonCrashHint() {
  if (!requireMoonLicense("Crash Signal")) return;
  if (!crashState.active) {
    setMoonStatus("Crash signal standby. Start a round first.");
    showToast("Crash Check braucht eine laufende Runde.", true);
    return;
  }
  const verdict = crashState.crashPoint >= 2 ? "stark" : "riskant";
  setMoonStatus(`Crash signal ${verdict}. Exit window estimated near ${crashState.crashPoint.toFixed(2)}x.`);
}

function moonAutoCashout() {
  if (!requireMoonLicense("Crash Auto Cashout")) return;
  const target = Number($("#moonCrashTarget").value);
  if (!Number.isFinite(target) || target < 1.1) {
    setMoonStatus("Auto Cashout braucht ein Ziel ab 1.10x.");
    return;
  }
  moonAutoCashoutTarget = target;
  setMoonStatus(`Crash Auto Cashout wartet auf ${target.toFixed(2)}x.`);
  showToast(`Moon Auto Cashout: ${target.toFixed(2)}x aktiviert.`);
}

function renderMoonAutoGrid() {
  const select = $("#moonAutoGame");
  select.innerHTML = "";
  autoDefinitions.forEach((definition) => {
    const option = document.createElement("option");
    option.value = definition.id;
    option.textContent = definition.label;
    select.append(option);
  });

  updateAutoButtons();
}

function updateAutoButtons() {
  const grid = $("#moonAutoGrid");
  grid.innerHTML = "";
  grid.hidden = Object.keys(autoLoops).length === 0;
  Object.entries(autoLoops).forEach(([gameId, loop]) => {
    const definition = autoDefinitions.find((entry) => entry.id === gameId);
    const counter = loop.remaining > 0 ? ` ${loop.remaining}` : "";
    const button = document.createElement("button");
    button.className = "secondary-btn active";
    button.type = "button";
    button.dataset.autoGame = gameId;
    button.textContent = `${definition?.label || gameId} Stop${counter}`;
    grid.append(button);
  });
}

function getRequestedAutoRuns() {
  return Math.max(0, Math.floor(Number($("#moonAutoRuns").value) || 0));
}

function getRequestedAutoDuration() {
  return Math.max(0, Math.floor(Number($("#moonAutoDuration").value) || 0));
}

function getRequestedAutoMaxBet() {
  return Math.max(0, Math.floor(Number($("#moonAutoMaxBet").value) || 0));
}

function startSelectedAutoGame() {
  const gameId = $("#moonAutoGame").value;
  startAutoGame(gameId, getRequestedAutoRuns(), getRequestedAutoDuration(), getRequestedAutoMaxBet());
}

function toggleAutoGame(gameId) {
  if (autoLoops[gameId]) {
    stopAutoGame(gameId, "Auto loop stopped.");
    return;
  }

  startAutoGame(gameId, getRequestedAutoRuns(), getRequestedAutoDuration(), getRequestedAutoMaxBet());
}

function startAutoGame(gameId, runs = 0, durationSeconds = 0, maxBet = 0) {
  const definition = autoDefinitions.find((entry) => entry.id === gameId);
  if (!definition) return;
  if (autoLoops[gameId]) stopAutoGame(gameId);
  autoLoops[gameId] = {
    timer: window.setInterval(() => runAutoTick(gameId), definition.interval),
    remaining: Math.max(0, Math.floor(runs)),
    endAt: durationSeconds > 0 ? performance.now() + durationSeconds * 1000 : 0,
    maxBet: Math.max(0, Math.floor(maxBet))
  };
  runAutoTick(gameId);
  updateAutoButtons();
  const parts = [];
  if (runs > 0) parts.push(`${runs} run(s)`);
  if (durationSeconds > 0) parts.push(`${durationSeconds}s`);
  if (maxBet > 0) parts.push(`max ${formatCoins(maxBet)}`);
  setMoonStatus(`${definition.label} auto farm armed${parts.length ? `: ${parts.join(", ")}` : "."}`);
}

function runAutoTick(gameId) {
  const loop = autoLoops[gameId];
  if (!loop) return;
  if (loop.endAt && performance.now() >= loop.endAt) {
    stopAutoGame(gameId, "Auto time limit complete.");
    return;
  }
  const didRun = runAutoGame(gameId);
  if (didRun && loop.remaining > 0) {
    loop.remaining -= 1;
    if (loop.remaining <= 0) {
      stopAutoGame(gameId, "Auto sequence complete.");
      return;
    }
    updateAutoButtons();
  }
}

function stopAutoGame(gameId, reason = "") {
  if (!autoLoops[gameId]) return;
  window.clearInterval(autoLoops[gameId].timer);
  delete autoLoops[gameId];
  if (gameId === "trade") {
    moonTradeState.active = false;
    if (reason) setMoonTradeStatus(reason);
  }
  updateAutoButtons();
  if (reason) setMoonStatus(reason);
}

function stopAllAutoGames() {
  Object.keys(autoLoops).forEach((gameId) => stopAutoGame(gameId));
  moonTradeState.active = false;
  moonAutoCashoutTarget = null;
  updateAutoButtons();
  setMoonStatus("All auto loops stopped.");
  setMoonTradeStatus("Trade Mode gestoppt.");
}

function autoBetValue(inputId) {
  const input = $(inputId);
  return Math.max(1, Math.floor(Number(input?.value) || 1));
}

function autoMaxBet(gameId) {
  return autoLoops[gameId]?.maxBet || 0;
}

function prepareAutoBet(gameId, inputId) {
  const input = $(inputId);
  const maxBet = autoMaxBet(gameId);
  const current = autoBetValue(inputId);
  const capped = Math.max(1, Math.floor(Math.min(current, maxBet || current, state.balance || current)));
  if (input) input.value = String(capped);
  return capped;
}

function selectAutoCase(gameId, selectId = null) {
  const maxBet = autoMaxBet(gameId);
  const currentId = selectId ? $(selectId)?.value : selectedCaseId;
  const current = cases.find((box) => box.id === currentId) || getSelectedCase();
  if (!maxBet || current.price <= maxBet) return current;

  const eligible = cases.filter((box) => box.price <= maxBet);
  return eligible[eligible.length - 1] || null;
}

function canAutoSpend(gameId, amount) {
  const loop = autoLoops[gameId];
  if (loop?.maxBet > 0 && amount > loop.maxBet) {
    const definition = autoDefinitions.find((entry) => entry.id === gameId);
    stopAutoGame(gameId, `${definition?.label || "Auto"} stopped: above Max Bet.`);
    return false;
  }

  if (state.balance >= amount) return true;
  const definition = autoDefinitions.find((entry) => entry.id === gameId);
  stopAutoGame(gameId, `${definition?.label || "Auto"} stopped: balance too low.`);
  return false;
}

function runAutoGame(gameId) {
  switch (gameId) {
    case "cases":
      {
        const box = selectAutoCase(gameId);
        if (!box) {
          stopAutoGame(gameId, "Cases stopped: no case under Max Bet.");
          return false;
        }
        if (box.id !== selectedCaseId) {
          selectedCaseId = box.id;
          renderCases();
          renderCaseReel(box);
        }
        if (!caseBusy && canAutoSpend(gameId, box.price)) {
        openCase(moonLicenseUnlocked);
        return true;
        }
      }
      return false;
    case "crash":
      return autoCrash();
    case "coinflip":
      if (!$("#flipCoin").disabled && canAutoSpend(gameId, prepareAutoBet(gameId, "#coinflipBet"))) {
        flipCoin(moonLicenseUnlocked);
        return true;
      }
      return false;
    case "mines":
      return autoMines();
    case "plinko":
      if (!plinkoBusy && canAutoSpend(gameId, prepareAutoBet(gameId, "#plinkoBet"))) {
        dropPlinko(moonLicenseUnlocked);
        return true;
      }
      return false;
    case "wheel":
      if (!wheelBusy && canAutoSpend(gameId, prepareAutoBet(gameId, "#wheelBet"))) {
        spinWheel(moonLicenseUnlocked);
        return true;
      }
      return false;
    case "roulette":
      if (!rouletteBusy && canAutoSpend(gameId, prepareAutoBet(gameId, "#rouletteBet"))) {
        spinRoulette(moonLicenseUnlocked);
        return true;
      }
      return false;
    case "blackjack":
      if (blackjackState.active) {
        autoBlackjack(moonLicenseUnlocked);
        return true;
      }
      if (canAutoSpend(gameId, prepareAutoBet(gameId, "#blackjackBet"))) {
        autoBlackjack(moonLicenseUnlocked);
        return true;
      }
      return false;
    case "poker":
      return autoPoker(moonLicenseUnlocked);
    case "dice":
      if (canAutoSpend(gameId, prepareAutoBet(gameId, "#diceBet"))) {
        rollDice(moonLicenseUnlocked);
        return true;
      }
      return false;
    case "duel":
      if (!$("#rollDuel").disabled && canAutoSpend(gameId, prepareAutoBet(gameId, "#duelBet"))) {
        rollDuel(moonLicenseUnlocked);
        return true;
      }
      return false;
    case "tower":
      return autoTower();
    case "battle":
      return autoBattle();
    case "trade":
      moonTradeState.active = true;
      return runMoonTradeTick();
    default:
      return false;
  }
}

function autoCrash() {
  const target = Math.max(1.1, Number($("#moonCrashTarget").value) || 2);
  if (!crashState.active) {
    if (canAutoSpend("crash", prepareAutoBet("crash", "#crashBet"))) {
      moonAutoCashoutTarget = target;
      startCrash();
      if (moonLicenseUnlocked) {
        moonAutoCashoutTarget = Math.max(1.01, Math.min(target, crashState.crashPoint - 0.03));
      }
      return true;
    }
    return false;
  }

  if (crashState.multiplier >= target) cashoutCrash();
  return false;
}

function autoMines() {
  if (!minesState.active) {
    if (canAutoSpend("mines", prepareAutoBet("mines", "#minesBet"))) {
      startMines();
      return true;
    }
    return false;
  }

  const choices = Array.from({ length: 25 }, (_, index) => index).filter((index) => !minesState.revealed.has(index));
  const pick = moonLicenseUnlocked ? getMinesSafeHints(1)[0] : choices[Math.floor(Math.random() * choices.length)];
  if (pick !== undefined) pickMine(pick);
  if (minesState.active && minesState.revealed.size >= 3) cashoutMines(false);
  return false;
}

function autoTower() {
  if (!towerState.active) {
    if (canAutoSpend("tower", prepareAutoBet("tower", "#towerBet"))) {
      startTower();
      return true;
    }
    return false;
  }

  const level = towerState.currentLevel;
  if (moonLicenseUnlocked && level >= 3) {
    cashoutTower(false);
    return false;
  }
  const traps = towerState.traps[level];
  const safeCol = [0, 1, 2].find((col) => !traps?.has(col));
  const pickCol = moonLicenseUnlocked ? safeCol : Math.floor(Math.random() * 3);
  if (pickCol !== undefined) pickTower(level, pickCol);
  if (towerState.active && towerState.currentLevel >= (moonLicenseUnlocked ? 3 : 4)) cashoutTower(false);
  return false;
}

function autoBattle() {
  const box = selectAutoCase("battle", "#battleCase");
  if (!box) {
    stopAutoGame("battle", "Battle stopped: no case under Max Bet.");
    return false;
  }
  if ($("#battleCase").value !== box.id) {
    $("#battleCase").value = box.id;
    updateBattleCost();
  }
  if (!$("#startBattle").disabled && canAutoSpend("battle", box.price)) {
    startBattle(moonLicenseUnlocked);
    return true;
  }
  return false;
}

function setupMoonDrag() {
  const menu = $("#moonMenu");
  const handle = $("#moonDragHandle");
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  handle.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    const rect = menu.getBoundingClientRect();
    dragging = true;
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    menu.style.left = `${rect.left}px`;
    menu.style.top = `${rect.top}px`;
    menu.style.right = "auto";
    menu.style.bottom = "auto";
    handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const rect = menu.getBoundingClientRect();
    const maxLeft = window.innerWidth - rect.width - 8;
    const maxTop = window.innerHeight - rect.height - 8;
    const left = Math.max(8, Math.min(maxLeft, event.clientX - offsetX));
    const top = Math.max(8, Math.min(maxTop, event.clientY - offsetY));
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  });

  handle.addEventListener("pointerup", (event) => {
    dragging = false;
    if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
  });

  handle.addEventListener("pointercancel", () => {
    dragging = false;
  });
}

function setupGoogleRedirect() {
  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() !== "h") return;
    event.preventDefault();
    stopAllAutoGames();
    const googleUrl = "https://www.google.com/";
    const nextTab = window.open(googleUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      try {
        window.open("", "_self");
        window.close();
      } finally {
        if (!nextTab || !nextTab.closed) {
          window.location.replace(googleUrl);
        }
      }
    }, 50);
  }, true);
}

function setupAmbientCanvas() {
  const canvas = $("#ambientCanvas");
  const ctx = canvas.getContext("2d");
  const shapes = Array.from({ length: 34 }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: 10 + Math.random() * 28,
    speed: 0.05 + Math.random() * 0.12,
    spin: Math.random() * Math.PI,
    kind: Math.floor(Math.random() * 3),
    color: ["#45d6b5", "#5fa8ff", "#ff5c7a", "#f7c85f"][Math.floor(Math.random() * 4)]
  }));

  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function drawShape(shape, time) {
    const x = shape.x * window.innerWidth;
    const y = ((shape.y + time * shape.speed * 0.012) % 1.15) * window.innerHeight - window.innerHeight * 0.1;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(shape.spin + time * 0.00025);
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = shape.color;
    ctx.lineWidth = 2;
    ctx.fillStyle = `${shape.color}22`;

    if (shape.kind === 0) {
      ctx.beginPath();
      ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, shape.size / 4, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape.kind === 1) {
      ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size * 1.25);
      ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size * 1.25);
    } else {
      ctx.beginPath();
      ctx.moveTo(0, -shape.size / 2);
      ctx.lineTo(shape.size / 2, 0);
      ctx.lineTo(0, shape.size / 2);
      ctx.lineTo(-shape.size / 2, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function tick(time) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    shapes.forEach((shape) => drawShape(shape, time));
    window.requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);
  window.requestAnimationFrame(tick);
}

function bindEvents() {
  $("#enterCasino").addEventListener("click", showCasino);
  $("#enterTrading").addEventListener("click", showTrading);
  $("#openLobbyFromCasino").addEventListener("click", showWelcome);
  $("#openTradingFromCasino").addEventListener("click", showTrading);
  $("#openLobbyFromTrade").addEventListener("click", showWelcome);
  $("#openCasinoFromTrade").addEventListener("click", showCasino);
  $("#refreshCrypto").addEventListener("click", () => {
    enforceCryptoStopLosses();
    renderCryptoList();
    renderSelectedCrypto();
    showToast("Kurse aktualisiert.");
  });
  $("#cryptoList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-crypto]");
    if (!button) return;
    selectCrypto(button.dataset.crypto);
  });
  $("#buyCrypto").addEventListener("click", buyCrypto);
  $("#sellCrypto").addEventListener("click", sellCrypto);
  $("#setCryptoStopLoss").addEventListener("click", setCryptoStopLoss);
  $("#clearCryptoStopLoss").addEventListener("click", clearCryptoStopLoss);
  $("#cryptoStopLossPrice").addEventListener("keydown", (event) => {
    if (event.key === "Enter") setCryptoStopLoss();
  });

  $$(".nav-btn").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  $("#redeemCode").addEventListener("click", redeemCode);
  $("#codeInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") redeemCode();
  });
  $("#closeAdmin").addEventListener("click", closeAdminPanel);
  $("#adminLogin").addEventListener("click", loginAdmin);
  $("#adminPassword").addEventListener("keydown", (event) => {
    if (event.key === "Enter") loginAdmin();
  });
  $("#adminGenerateLicense").addEventListener("click", adminGenerateLicense);

  $("#minesCount").addEventListener("input", () => {
    $("#minesCountLabel").textContent = $("#minesCount").value;
    if (!minesState.active) {
      minesState.mines = Number($("#minesCount").value);
      updateMinesStats();
    }
  });
  $("#startMines").addEventListener("click", startMines);
  $("#cashoutMines").addEventListener("click", () => cashoutMines(false));

  $("#startTower").addEventListener("click", startTower);
  $("#cashoutTower").addEventListener("click", () => cashoutTower(false));

  $("#openCase").addEventListener("click", () => openCase(false));

  $$("[data-coin-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      coinPick = button.dataset.coinPick;
      updateCoinPick();
    });
  });
  $("#flipCoin").addEventListener("click", () => flipCoin(false));

  $("#startCrash").addEventListener("click", startCrash);
  $("#cashoutCrash").addEventListener("click", cashoutCrash);

  $("#plinkoRisk").addEventListener("change", renderPlinkoSlots);
  $("#dropPlinko").addEventListener("click", () => dropPlinko(false));
  $("#dropPlinkoTen").addEventListener("click", () => dropPlinko(false, 10));

  $("#diceTarget").addEventListener("input", updateDiceInfo);
  $("#rollDice").addEventListener("click", () => rollDice(false));

  $("#rollDuel").addEventListener("click", () => rollDuel(false));

  $$(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.dataset.wheelPick) return;
      if (wheelBusy) return;
      wheelPick = button.dataset.wheelPick;
      updateWheelInfo();
    });
  });
  $("#spinWheel").addEventListener("click", () => spinWheel(false));

  $$("[data-roulette-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      if (rouletteBusy) return;
      roulettePick = button.dataset.roulettePick;
      updateRoulettePick();
    });
  });
  $("#spinRoulette").addEventListener("click", () => spinRoulette(false));
  $("#dealBlackjack").addEventListener("click", () => startBlackjack(false));
  $("#hitBlackjack").addEventListener("click", () => hitBlackjack(false));
  $("#standBlackjack").addEventListener("click", standBlackjack);
  $("#buyPokerChips").addEventListener("click", () => exchangePokerChips(true));
  $("#cashoutPokerChips").addEventListener("click", () => cashoutPokerChips(true));
  $("#dealPoker").addEventListener("click", () => dealPoker(false));
  $("#pokerCall").addEventListener("click", pokerCallOrCheck);
  $("#pokerRaise").addEventListener("click", raisePoker);
  $("#pokerAllIn").addEventListener("click", allInPoker);
  $("#foldPoker").addEventListener("click", foldPoker);

  $("#battleCase").addEventListener("change", updateBattleCost);
  $("#battleBots").addEventListener("change", updateBattleCost);
  $("#startBattle").addEventListener("click", () => startBattle(false));

  $("#closeMoon").addEventListener("click", closeMoonPredictor);
  $("#moonCompactToggle").addEventListener("click", toggleMoonCompact);
  $("#moonUnlock").addEventListener("click", unlockMoonLicense);
  $("#moonLicenseInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlockMoonLicense();
  });
  $("#moonPredictMines").addEventListener("click", moonPredictMines);
  $("#moonPredictTower").addEventListener("click", moonPredictTower);
  $("#moonCrashHint").addEventListener("click", moonCrashHint);
  $("#moonAutoCashout").addEventListener("click", moonAutoCashout);
  $("#moonStartTrade").addEventListener("click", startMoonTradeMode);
  $("#moonStopTrade").addEventListener("click", () => stopMoonTradeMode());
  $("#moonStartAutoSelected").addEventListener("click", startSelectedAutoGame);
  $("#moonStopAuto").addEventListener("click", stopAllAutoGames);
  $("#moonAutoGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-auto-game]");
    if (!button) return;
    toggleAutoGame(button.dataset.autoGame);
  });
}

function init() {
  setupQuickBetControls();
  bindEvents();
  setupMoonDrag();
  setupGoogleRedirect();
  setupAmbientCanvas();
  window.setInterval(tickCryptoMarket, 7000);
  window.addEventListener("resize", () => {
    const tradeApp = $("#tradeApp");
    if (tradeApp && !tradeApp.hidden) renderSelectedCrypto();
  });
  updateHud();
  renderMinesBoard();
  renderTowerBoard();
  renderCases();
  renderCaseReel();
  renderDrops();
  renderPlinko();
  populateBattleCases();
  populateMoonTradeCoins();
  renderMoonAutoGrid();
  updateCoinPick();
  updateRoulettePick();
  updateMinesStats();
  updateTowerStats();
  updateDiceInfo();
  updateWheelInfo();
  renderBlackjack();
  renderPoker();
  renderCryptoList();
  renderSelectedCrypto();
  drawCrashGraph(1, false);
  window.openMoonPredictor = openMoonPredictor;
  window.moon = openMoonPredictor;
  window.openAdminPanel = openAdminPanel;
  window.admin = openAdminPanel;
  console.info("Moon Predictor bereit: openMoonPredictor() oder moon() in der Konsole ausfuehren.");
  console.info("Admin Panel bereit: openAdminPanel() oder admin() in der Konsole ausfuehren.");
  switchView("mines");
  showWelcome();
}

document.addEventListener("DOMContentLoaded", init);
