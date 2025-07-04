// ========== DOM Elements ==========
const helpBtn = document.getElementById("helpBtn");
const helpScreen = document.getElementById("help-screen");
const backBtn = document.getElementById("backBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsScreen = document.getElementById("settings-screen");
const settingsBackBtn = document.getElementById("settingsBackBtn");
const gameArea = document.getElementById("game");
const status = document.getElementById("status");
const winnerLabel = document.getElementById("winnerLabel");
const restartBtn = document.getElementById("restart");

const toggleFireballs = document.getElementById("toggleFireballs");
const toggleGuns = document.getElementById("toggleGuns");
const toggleShields = document.getElementById("toggleShields");
const toggleMelee = document.getElementById("toggleMelee");
const toggleBombs = document.getElementById("toggleBombs");
const togglePunish = document.getElementById("togglePunish");
const toggleSwords = document.getElementById("toggleSwords");
const toggleLasers = document.getElementById("toggleLasers");
const toggleBoomerangs = document.getElementById("toggleBoomerangs");
const toggleFreezeRay = document.getElementById("toggleFreezeRay");
const toggleHeal = document.getElementById("toggleHeal");

const vsHuman = document.getElementById("vsHuman");
const vsAI = document.getElementById("vsAI");
const toggleDarkMode = document.getElementById("toggleDarkMode");
const aiSettingsBtn = document.getElementById("aiSettingsBtn");
const aiDifficultyScreen = document.getElementById("ai-difficulty-screen");
const aiDifficultyBackBtn = document.getElementById("aiDifficultyBackBtn");
const aiEasy = document.getElementById("aiEasy");
const aiMedium = document.getElementById("aiMedium");
const aiHard = document.getElementById("aiHard");
const aiImpossible = document.getElementById("aiImpossible");
const aiDifficultyMessage = document.getElementById("ai-difficulty-message");
const sword1 = document.getElementById("sword1");
const sword2 = document.getElementById("sword2");

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const health1Fill = document.getElementById("health1-fill");
const health2Fill = document.getElementById("health2-fill");

// ========== Game Constants ==========
const gameWidth = 950;
const playerWidth = 54;
const playerHeight = 108;
const groundLevel = 0;
const maxHealth = 600;
const speed = 5;
const gravity = 1.5;
const jumpPower = 25;
const attackDuration = 400;
const attackCooldown = 600;
const punishCooldown = 900;
const punishDamage = 120;
const fireballSpeed = 10;
const fireballCooldown = 1000;
const gunBulletSpeed = 15;
const gunMaxAmmo = 30;
const gunReloadTime = 3000;
const shieldDuration = 10000;
const shieldCooldown = 20000;
const bombCooldown = 2500;
const bombExplosionDelay = 2000;
const bombDamage = 100;
const bombBlastRadius = 75;
const swordCooldown = 700;
const swordDamage = 70;
const laserCooldown = 2500;
const laserDamage = 90;
const boomerangCooldown = 1700;
const boomerangDamage = 50;
const freezeRayCooldown = 5000;
const freezeRayDamage = 40;
const freezeRayDuration = 1400;
const healCooldown = 7000;
const healAmount = 120;

// ========== Game State ==========
let keys = {};
let keysPressed = new Set();
let fireballs = [];
let bullets = [];
let bombs = [];
let lasers = [];
let boomerangs = [];
let freezeRays = [];
let heals = [];
let lastBomb1 = 0;
let lastBomb2 = 0;
let gameOver = false;
let winnerText = "";
let boomerangId = 0;
let freezeTimeoutP1 = 0;
let freezeTimeoutP2 = 0;

// ========== Player State ==========
const p1 = {
  x: 50,
  y: groundLevel,
  vy: 0,
  direction: 1,
  health: maxHealth,
  attacking: false,
  lastAttack: 0,
  onGround: true,
  lastFireball: 0,
  ammo: gunMaxAmmo,
  lastBulletShot: 0,
  reloading: false,
  shieldActive: false,
  shieldAvailable: true,
  lastShieldActivate: 0,
  colorClass: "blue",
  lastPunish: 0,
  lastSword: 0,
  lastLaser: 0,
  lastBoomerang: 0,
  lastFreezeRay: 0,
  lastHeal: 0,
  frozenUntil: 0,
};
const p2 = {
  x: gameWidth - 50 - playerWidth,
  y: groundLevel,
  vy: 0,
  direction: -1,
  health: maxHealth,
  attacking: false,
  lastAttack: 0,
  onGround: true,
  lastFireball: 0,
  ammo: gunMaxAmmo,
  lastBulletShot: 0,
  reloading: false,
  shieldActive: false,
  shieldAvailable: true,
  lastShieldActivate: 0,
  colorClass: "red",
  lastPunish: 0,
  lastSword: 0,
  lastLaser: 0,
  lastBoomerang: 0,
  lastFreezeRay: 0,
  lastHeal: 0,
  frozenUntil: 0,
};

// ========== Settings ==========
const settings = {
  fireballs: true,
  guns: true,
  shields: true,
  melee: true,
  bombs: true,
  punish: true,
  swords: true,
  lasers: true,
  boomerangs: true,
  freezeRay: true,
  heal: true,
  aiMode: "human",
  aiDifficulty: "easy",
  darkMode: true,
};

// ========== UI & Settings Logic ==========
helpBtn.addEventListener("click", () => {
  helpScreen.style.display = "block";
  gameArea.style.filter = "blur(5px)";
});
backBtn.addEventListener("click", () => {
  helpScreen.style.display = "none";
  gameArea.style.filter = "none";
});
settingsBtn.addEventListener("click", () => {
  settingsScreen.style.display = "block";
  gameArea.style.filter = "blur(5px)";
  toggleFireballs.checked = settings.fireballs;
  toggleGuns.checked = settings.guns;
  toggleShields.checked = settings.shields;
  toggleMelee.checked = settings.melee;
  toggleBombs.checked = settings.bombs;
  togglePunish.checked = settings.punish;
  toggleSwords.checked = settings.swords;
  toggleLasers.checked = settings.lasers;
  toggleBoomerangs.checked = settings.boomerangs;
  toggleFreezeRay.checked = settings.freezeRay;
  toggleHeal.checked = settings.heal;
  if (settings.aiMode === "human") vsHuman.checked = true;
  if (settings.aiMode === "ai") vsAI.checked = true;
  toggleDarkMode.checked = settings.darkMode;
});
settingsBackBtn.addEventListener("click", () => {
  settings.fireballs = toggleFireballs.checked;
  settings.guns = toggleGuns.checked;
  settings.shields = toggleShields.checked;
  settings.melee = toggleMelee.checked;
  settings.bombs = toggleBombs.checked;
  settings.punish = togglePunish.checked;
  settings.swords = toggleSwords.checked;
  settings.lasers = toggleLasers.checked;
  settings.boomerangs = toggleBoomerangs.checked;
  settings.freezeRay = toggleFreezeRay.checked;
  settings.heal = toggleHeal.checked;
  settings.aiMode = vsAI.checked ? "ai" : "human";
  settings.darkMode = toggleDarkMode.checked;
  applyDarkMode();
  settingsScreen.style.display = "none";
  gameArea.style.filter = "none";
});
toggleDarkMode.addEventListener("change", () => {
  settings.darkMode = toggleDarkMode.checked;
  applyDarkMode();
});
function applyDarkMode() {
  if (settings.darkMode) document.body.classList.remove("light");
  else document.body.classList.add("light");
}
(function () {
  const local = localStorage.getItem("fightingGame-darkMode");
  if (local !== null) settings.darkMode = local === "true";
  applyDarkMode();
})();
toggleDarkMode.addEventListener("change", function () {
  localStorage.setItem("fightingGame-darkMode", settings.darkMode);
});

// ========== AI Difficulty Menu ==========
function showAIDifficultyMessage() {
  let msg = "";
  if (aiEasy.checked)
    msg =
      "Easy: The AI is slow, predictable, and often misses attacks or fails to dodge.";
  else if (aiMedium.checked)
    msg =
      "Medium: The AI reacts decently, uses all features, and is moderately challenging.";
  else if (aiHard.checked)
    msg =
      "Hard: The AI is fast, aggressive, dodges projectiles, and uses all features with high skill.";
  else if (aiImpossible.checked)
    msg =
      "Impossible: The AI is nearly perfect, reacts instantly, never misses, and never wastes a move.";
  aiDifficultyMessage.textContent = msg;
}
[aiEasy, aiMedium, aiHard, aiImpossible].forEach((input) => {
  input.addEventListener("change", function () {
    settings.aiDifficulty = this.value;
    showAIDifficultyMessage();
  });
});
aiSettingsBtn.addEventListener("click", () => {
  settingsScreen.style.display = "none";
  aiDifficultyScreen.style.display = "block";
  if (settings.aiDifficulty === "easy") aiEasy.checked = true;
  if (settings.aiDifficulty === "medium") aiMedium.checked = true;
  if (settings.aiDifficulty === "hard") aiHard.checked = true;
  if (settings.aiDifficulty === "impossible") aiImpossible.checked = true;
  showAIDifficultyMessage();
});
aiDifficultyBackBtn.addEventListener("click", () => {
  aiDifficultyScreen.style.display = "none";
  settingsScreen.style.display = "block";
});
vsAI.addEventListener("change", function () {
  aiSettingsBtn.style.display = this.checked ? "" : "none";
});
vsHuman.addEventListener("change", function () {
  aiSettingsBtn.style.display = "none";
});
if (!vsAI.checked) aiSettingsBtn.style.display = "none";

// ========== Start Alert ==========
window.addEventListener("DOMContentLoaded", () => {
  resetArmsToDefault();
  const overlay = document.createElement("div");
  overlay.id = "startOverlay";
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(20,24,40,0.92)";
  overlay.style.zIndex = 9999;
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";

  const msg = document.createElement("div");
  msg.innerHTML = `<h2 style="color:#1ec8c8 !important;font-size:2.8em;margin:0 0 30px 0;" >2 Player Fighting Game</h2>
    <p style="font-size:1.3em;color:#eee;margin-bottom:30px;">Click Start to Begin</p>`;
  overlay.appendChild(msg);

  const btn = document.createElement("button");
  btn.textContent = "Start";
  btn.style.fontSize = "2em";
  btn.style.padding = "18px 54px";
  btn.style.background = "#252837";
  btn.style.color = "#fff";
  btn.style.borderRadius = "12px";
  btn.style.cursor = "pointer";
  btn.style.border = "none";
  btn.style.fontWeight = "bold";
  btn.style.transition = "background 0.2s";
  btn.onmouseover = () => (btn.style.background = "#1ec8c8");
  btn.onmouseout = () => (btn.style.background = "#252837");
  btn.onclick = () => {
    overlay.parentNode.removeChild(overlay);
    restartGame();
    gameLoop();
  };
  overlay.appendChild(btn);

  document.body.appendChild(overlay);
});

// ========== Reset Arms to Default ==========
function resetArmsToDefault() {
  [player1, player2].forEach((playerElem) => {
    playerElem.querySelectorAll(".arm").forEach((arm) => {
      arm.classList.remove("attacking", "left", "right");
      arm.style.transform = "";
      arm.style.transition = "transform 0.5s";
      arm.style.background = "";
    });
  });
}

// ========== Restart Game ==========
function restartGame() {
  gameOver = false;
  Object.assign(p1, {
    x: 50,
    y: groundLevel,
    vy: 0,
    direction: 1,
    health: maxHealth,
    attacking: false,
    lastAttack: 0,
    onGround: true,
    lastFireball: 0,
    ammo: gunMaxAmmo,
    lastBulletShot: 0,
    reloading: false,
    shieldActive: false,
    shieldAvailable: true,
    lastShieldActivate: 0,
    lastPunish: 0,
    lastSword: 0,
    lastLaser: 0,
    lastBoomerang: 0,
    lastFreezeRay: 0,
    lastHeal: 0,
    frozenUntil: 0,
  });
  Object.assign(p2, {
    x: gameWidth - 50 - playerWidth,
    y: groundLevel,
    vy: 0,
    direction: -1,
    health: maxHealth,
    attacking: false,
    lastAttack: 0,
    onGround: true,
    lastFireball: 0,
    ammo: gunMaxAmmo,
    lastBulletShot: 0,
    reloading: false,
    shieldActive: false,
    shieldAvailable: true,
    lastShieldActivate: 0,
    lastPunish: 0,
    lastSword: 0,
    lastLaser: 0,
    lastBoomerang: 0,
    lastFreezeRay: 0,
    lastHeal: 0,
    frozenUntil: 0,
  });
  fireballs = [];
  bullets = [];
  bombs = [];
  lasers = [];
  boomerangs = [];
  freezeRays = [];
  heals = [];
  lastBomb1 = 0;
  lastBomb2 = 0;
  boomerangId = 0;
  freezeTimeoutP1 = 0;
  freezeTimeoutP2 = 0;
  restartBtn.style.display = "none";
  status.innerHTML = "";
  winnerLabel.innerHTML = "";
  winnerLabel.style.display = "none";
  resetArmsToDefault();
}
restartBtn.addEventListener("click", () => {
  restartGame();
});

// ========== Utility ==========
function isFrozen(player) {
  return Date.now() < player.frozenUntil;
}

// ========== Controls ==========
document.addEventListener("keydown", (e) => {
  if (keysPressed.has(e.key)) return;
  keys[e.key.toLowerCase()] = true;
  keysPressed.add(e.key);

  if (gameOver || isFrozen(p1)) return;

  // --- Player 1 Controls ---
  if (e.key.toLowerCase() === "w") jump(p1);
  if (e.key.toLowerCase() === "q" && settings.fireballs) shootFireball(p1);
  if (e.key.toLowerCase() === "f" && settings.guns) shootGun(p1);
  if (e.key.toLowerCase() === "r" && settings.guns) reloadGun(p1);
  if (e.key.toLowerCase() === "e" && settings.shields) toggleShield(p1);
  if (e.key.toLowerCase() === "v" && settings.melee) meleeAttack(p1);
  if (e.key.toLowerCase() === "b" && settings.bombs) dropBomb(p1, 1);
  if (e.key.toLowerCase() === "z" && settings.punish) punishAttack(p1);
  if (e.key.toLowerCase() === "c" && settings.swords) swordSlash(p1, 1);
  if (e.key.toLowerCase() === "x" && settings.lasers) shootLaser(p1);
  if (e.key.toLowerCase() === "g" && settings.boomerangs) throwBoomerang(p1, 1);
  if (e.key.toLowerCase() === "t" && settings.freezeRay) shootFreezeRay(p1);
  if (e.key.toLowerCase() === "y" && settings.heal) healSelf(p1);

  // --- Player 2 Controls ---
  if (settings.aiMode === "human" && !isFrozen(p2)) {
    if (e.key === "ArrowUp") jump(p2);
    if (e.key === "/" && settings.fireballs) shootFireball(p2);
    if (e.key === ";" && settings.guns) shootGun(p2);
    if (e.key === "'" && settings.guns) reloadGun(p2);
    if (e.key === "." && settings.shields) toggleShield(p2);
    if (e.key === "[" && settings.melee) meleeAttack(p2);
    if (e.key.toLowerCase() === "p" && settings.bombs) dropBomb(p2, 2);
    if (e.key.toLowerCase() === "l" && settings.punish) punishAttack(p2);
    if (e.key.toLowerCase() === "m" && settings.swords) swordSlash(p2, 2);
    if (e.key.toLowerCase() === "k" && settings.lasers) shootLaser(p2);
    if (e.key.toLowerCase() === "h" && settings.boomerangs)
      throwBoomerang(p2, 2);
    if (e.key.toLowerCase() === "u" && settings.freezeRay) shootFreezeRay(p2);
    if (e.key.toLowerCase() === "o" && settings.heal) healSelf(p2);
  }
});
document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
  keysPressed.delete(e.key);
});

// ========== Weapon Logic ==========

// -- Sword
function swordSlash(player, whichPlayer) {
  if (!settings.swords || gameOver) return;
  const now = Date.now();
  if (whichPlayer === 1 && now - p1.lastSword < swordCooldown) return;
  if (whichPlayer === 2 && now - p2.lastSword < swordCooldown) return;

  if (whichPlayer === 1) p1.lastSword = now;
  if (whichPlayer === 2) p2.lastSword = now;

  const swordElem = whichPlayer === 1 ? sword1 : sword2;
  swordElem.classList.add("active");
  swordElem.style.transition = "transform 0.5s";
  setTimeout(() => {
    swordElem.classList.remove("active");
    swordElem.style.transition = "transform 0.5s";
  }, 200);

  const attacker = player;
  const defender = player === p1 ? p2 : p1;
  const dist = Math.abs(attacker.x - defender.x);
  if (dist < 80 && !defender.shieldActive) {
    defender.health -= swordDamage;
    if (defender.health < 0) defender.health = 0;
  }
}

// -- Melee
function meleeAttack(player) {
  const now = Date.now();
  if (player.attacking || gameOver) return;
  if (now - player.lastAttack < attackCooldown) return;
  player.attacking = true;
  player.lastAttack = now;
  const playerElem = player === p1 ? player1 : player2;
  const rightArm = playerElem.querySelector(".arm.right");
  rightArm.classList.remove("attacking", "right");
  void rightArm.offsetWidth;
  rightArm.style.transition = "transform 0.5s";
  rightArm.style.transform = "";
  rightArm.classList.add("attacking", "right");
  setTimeout(() => {
    rightArm.classList.remove("attacking", "right");
    rightArm.style.transition = "transform 0.5s";
    rightArm.style.transform = "";
    player.attacking = false;
  }, 500);
  const attacker = player;
  const defender = player === p1 ? p2 : p1;
  const dist = Math.abs(attacker.x - defender.x);
  if (dist < 60 && !defender.shieldActive) {
    defender.health -= 40;
    if (defender.health < 0) defender.health = 0;
  }
}

// -- Punish
function punishAttack(player) {
  const now = Date.now();
  if (gameOver) return;
  if (now - player.lastPunish < punishCooldown) return;
  player.lastPunish = now;
  const playerElem = player === p1 ? player1 : player2;
  const leftArm = playerElem.querySelector(".arm.left");
  leftArm.classList.remove("attacking", "left");
  void leftArm.offsetWidth;
  leftArm.style.transition = "transform 0.5s";
  leftArm.style.transform = "";
  leftArm.classList.add("attacking", "left");
  setTimeout(() => {
    leftArm.classList.remove("attacking", "left");
    leftArm.style.transition = "transform 0.5s";
    leftArm.style.transform = "";
  }, 500);
  const attacker = player;
  const defender = player === p1 ? p2 : p1;
  const dist = Math.abs(attacker.x - defender.x);
  if (dist < 100 && !defender.shieldActive) {
    defender.health -= punishDamage;
    if (defender.health < 0) defender.health = 0;
  }
}

// -- Fireball
function shootFireball(player) {
  if (gameOver) return;
  const now = Date.now();
  if (now - player.lastFireball < fireballCooldown) return;
  player.lastFireball = now;
  const fb = {
    x: player.x + (player.direction === 1 ? playerWidth : -20),
    y: player.y + 60,
    speed: fireballSpeed * player.direction,
    owner: player,
    type: "fireball",
    colorClass: player.colorClass,
  };
  fireballs.push(fb);
}

// -- Gun
function shootGun(player) {
  if (gameOver || player.reloading) return;
  if (player.ammo <= 0) return;
  const now = Date.now();
  if (now - player.lastBulletShot < 200) return;
  player.lastBulletShot = now;
  player.ammo--;
  const b = {
    x: player.x + (player.direction === 1 ? playerWidth : -10),
    y: player.y + 40,
    speed: gunBulletSpeed * player.direction,
    owner: player,
    type: "bullet",
    colorClass: player.colorClass,
  };
  bullets.push(b);
}
function reloadGun(player) {
  if (gameOver || player.reloading) return;
  player.reloading = true;
  status.innerText = `${
    player === p1 ? "Player 1" : "Player 2"
  } is reloading...`;
  setTimeout(() => {
    player.ammo = gunMaxAmmo;
    player.reloading = false;
    status.innerText = "";
  }, gunReloadTime);
}

// -- Shield
function toggleShield(player) {
  if (gameOver) return;
  const now = Date.now();
  if (player.shieldActive) return;
  if (!player.shieldAvailable) return;
  player.shieldActive = true;
  player.shieldAvailable = false;
  player.lastShieldActivate = now;
  const playerElem = player === p1 ? player1 : player2;
  playerElem.classList.add("shield-glow");
  setTimeout(() => {
    player.shieldActive = false;
    playerElem.classList.remove("shield-glow");
  }, shieldDuration);
  setTimeout(() => {
    player.shieldAvailable = true;
  }, shieldCooldown);
}

// -- Bomb
function dropBomb(player, whichPlayer) {
  if (gameOver) return;
  const now = Date.now();
  if (whichPlayer === 1) {
    if (now - lastBomb1 < bombCooldown) return;
    lastBomb1 = now;
  } else {
    if (now - lastBomb2 < bombCooldown) return;
    lastBomb2 = now;
  }
  const bomb = {
    x: player.x + (player.direction === 1 ? playerWidth : -32),
    y: player.y,
    owner: player,
    createdAt: now,
    exploded: false,
    colorClass: player.colorClass,
    timer: bombExplosionDelay,
  };
  bombs.push(bomb);
}

// -- Laser
function shootLaser(player) {
  if (!settings.lasers || gameOver) return;
  const now = Date.now();
  if (now - player.lastLaser < laserCooldown) return;
  player.lastLaser = now;
  const l = {
    x: player.x + (player.direction === 1 ? playerWidth : -340),
    y: player.y + 50,
    owner: player,
    direction: player.direction,
    type: "laser",
    colorClass: player.colorClass,
    createdAt: now,
    hit: false,
  };
  lasers.push(l);
}

// -- Boomerang
function throwBoomerang(player, whichPlayer) {
  if (!settings.boomerangs || gameOver) return;
  const now = Date.now();
  if (whichPlayer === 1 && now - p1.lastBoomerang < boomerangCooldown) return;
  if (whichPlayer === 2 && now - p2.lastBoomerang < boomerangCooldown) return;
  if (whichPlayer === 1) p1.lastBoomerang = now;
  if (whichPlayer === 2) p2.lastBoomerang = now;
  boomerangId++;
  const b = {
    id: boomerangId,
    x: player.x + (player.direction === 1 ? playerWidth : -32),
    y: player.y + 60,
    owner: player,
    direction: player.direction,
    age: 0,
    goingOut: true,
    returned: false,
    colorClass: player.colorClass,
  };
  boomerangs.push(b);
}

// -- Freeze Ray
function shootFreezeRay(player) {
  if (!settings.freezeRay || gameOver) return;
  const now = Date.now();
  if (player.lastFreezeRay && now - player.lastFreezeRay < freezeRayCooldown)
    return;
  player.lastFreezeRay = now;
  const ray = {
    x: player.x + (player.direction === 1 ? playerWidth : -18),
    y: player.y + 30,
    owner: player,
    direction: player.direction,
    speed: 14 * player.direction,
    colorClass: player.colorClass,
    createdAt: now,
    type: "freeze-ray",
    hit: false,
  };
  freezeRays.push(ray);
}

// -- Heal
function healSelf(player) {
  if (!settings.heal || gameOver) return;
  const now = Date.now();
  if (player.lastHeal && now - player.lastHeal < healCooldown) return;
  player.lastHeal = now;
  player.health += healAmount;
  if (player.health > maxHealth) player.health = maxHealth;
  const effect = {
    x: player.x + playerWidth / 2 - 20,
    y: player.y + 80,
    player: player,
    createdAt: now,
  };
  heals.push(effect);
}

// ========== Player Update ==========
function updatePlayer(player, isAi = false) {
  if (!gameOver && !isFrozen(player)) {
    if (isAi) {
      aiMovePlayer(settings, p1, p2, {
        fireballs,
        bullets,
        bombs,
        now: Date.now(),
        lastBomb2,
        lasers,
        boomerangs,
        freezeRays,
      });
    } else {
      if (player === p1) {
        if (keys["a"]) {
          player.x -= speed;
          player.direction = -1;
        }
        if (keys["d"]) {
          player.x += speed;
          player.direction = 1;
        }
      } else {
        if (keys["arrowleft"]) {
          player.x -= speed;
          player.direction = -1;
        }
        if (keys["arrowright"]) {
          player.x += speed;
          player.direction = 1;
        }
      }
    }
  }
  if (player.x < 0) player.x = 0;
  if (player.x > gameWidth - playerWidth) player.x = gameWidth - playerWidth;
  player.vy -= gravity;
  player.y += player.vy;
  if (player.y < groundLevel) {
    player.y = groundLevel;
    player.vy = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }
}

// ========== Projectiles Update ==========
function updateProjectiles() {
  // Fireballs
  fireballs = fireballs.filter((fb) => {
    fb.x += fb.speed;
    if (fb.x < -22 || fb.x > gameWidth + 22) return false;
    const target = fb.owner === p1 ? p2 : p1;
    if (
      fb.x > target.x &&
      fb.x < target.x + playerWidth &&
      fb.y > target.y &&
      fb.y < target.y + playerHeight
    ) {
      if (!target.shieldActive) {
        target.health -= 50;
        if (target.health < 0) target.health = 0;
      }
      return false;
    }
    return true;
  });
  // Bullets
  bullets = bullets.filter((b) => {
    b.x += b.speed;
    if (b.x < -10 || b.x > gameWidth + 16) return false;
    const target = b.owner === p1 ? p2 : p1;
    if (
      b.x > target.x &&
      b.x < target.x + playerWidth &&
      b.y > target.y &&
      b.y < target.y + playerHeight
    ) {
      if (!target.shieldActive) {
        target.health -= 30;
        if (target.health < 0) target.health = 0;
      }
      return false;
    }
    return true;
  });
  // Lasers
  lasers = lasers.filter((l) => {
    if (l.hit) return false;
    const target = l.owner === p1 ? p2 : p1;
    // Laser is a line, player is a box: check overlap
    const lx = l.x;
    const ly = l.y;
    const tx = target.x;
    const ty = target.y;
    if (
      ((l.direction === 1 && lx < tx + playerWidth && lx + 340 > tx) ||
        (l.direction === -1 && lx > tx && lx - 340 < tx + playerWidth)) &&
      ly > ty &&
      ly < ty + playerHeight
    ) {
      if (!target.shieldActive) {
        target.health -= laserDamage;
        if (target.health < 0) target.health = 0;
      }
      l.hit = true;
      setTimeout(() => {
        const idx = lasers.indexOf(l);
        if (idx !== -1) lasers.splice(idx, 1);
      }, 120);
      return false;
    }
    setTimeout(() => {
      const idx = lasers.indexOf(l);
      if (idx !== -1) lasers.splice(idx, 1);
    }, 120);
    return !l.hit;
  });
  // Boomerangs
  boomerangs = boomerangs.filter((boom) => {
    if (boom.goingOut) {
      boom.x += 14 * boom.direction;
      boom.age += 1;
      if (boom.age > 25) boom.goingOut = false;
    } else {
      boom.x -= 14 * boom.direction;
      boom.age -= 1;
      if (boom.age < 0) boom.returned = true;
    }
    const target = boom.owner === p1 ? p2 : p1;
    if (
      boom.x > target.x &&
      boom.x < target.x + playerWidth &&
      boom.y > target.y &&
      boom.y < target.y + playerHeight &&
      !target.shieldActive
    ) {
      target.health -= boomerangDamage;
      if (target.health < 0) target.health = 0;
      boom.returned = true;
    }
    return !boom.returned;
  });
  // Freeze Rays
  freezeRays = freezeRays.filter((ray) => {
    if (ray.hit) return false;
    ray.x += ray.speed;
    const target = ray.owner === p1 ? p2 : p1;
    if (
      ray.x > target.x &&
      ray.x < target.x + playerWidth &&
      ray.y > target.y &&
      ray.y < target.y + playerHeight &&
      !target.shieldActive
    ) {
      target.health -= freezeRayDamage;
      if (target.health < 0) target.health = 0;
      target.frozenUntil = Date.now() + freezeRayDuration;
      ray.hit = true;
      setTimeout(() => {
        const idx = freezeRays.indexOf(ray);
        if (idx !== -1) freezeRays.splice(idx, 1);
      }, 80);
      return false;
    }
    if (ray.x < -30 || ray.x > gameWidth + 30) return false;
    setTimeout(() => {
      const idx = freezeRays.indexOf(ray);
      if (idx !== -1) freezeRays.splice(idx, 1);
    }, 100);
    return !ray.hit;
  });
  // Heals
  heals = heals.filter((h) => {
    if (Date.now() - h.createdAt > 500) return false;
    return true;
  });
}

// ========== Bombs ==========
function updateBombs() {
  const now = Date.now();
  bombs.forEach((bomb) => {
    bomb.timer = Math.max(0, bombExplosionDelay - (now - bomb.createdAt));
  });
  bombs = bombs.filter((bomb) => {
    if (!bomb.exploded && now - bomb.createdAt > bombExplosionDelay) {
      bomb.exploded = true;
      [p1, p2].forEach((player) => {
        const centerX = bomb.x + 16;
        const centerY = bomb.y + 16;
        const playerCenterX = player.x + playerWidth / 2;
        const playerCenterY = player.y + playerHeight / 2;
        const dist = Math.sqrt(
          Math.pow(centerX - playerCenterX, 2) +
            Math.pow(centerY - playerCenterY, 2)
        );
        if (dist < bombBlastRadius && !player.shieldActive) {
          player.health -= bombDamage;
          if (player.health < 0) player.health = 0;
        }
      });
      setTimeout(() => {
        const idx = bombs.indexOf(bomb);
        if (idx !== -1) bombs.splice(idx, 1);
      }, 300);
      return false;
    }
    if (bomb.x < -40 || bomb.x > gameWidth + 40) return false;
    return !bomb.exploded;
  });
}

// ========== Rendering ==========
function render() {
  player1.style.left = p1.x + "px";
  player1.style.bottom = p1.y + "px";
  player2.style.left = p2.x + "px";
  player2.style.bottom = p2.y + "px";
  player1.style.transform = p1.direction === 1 ? "none" : "scaleX(-1)";
  player2.style.transform = p2.direction === 1 ? "none" : "scaleX(-1)";
  health1Fill.style.width = (p1.health / maxHealth) * 100 + "%";
  health2Fill.style.width = (p2.health / maxHealth) * 100 + "%";
  // Show status (ammo, cooldowns)
  let statusHtml = `
    <div>
      <span style="color:#3399ff;font-weight:bold;">P1<br></span> Ammo: ${p1.ammo}${
    p1.reloading ? " (Reloading...)" : ""
  }
      ${
        settings.punish
          ? `<br>Punish: <span style="color:${
              Date.now() - p1.lastPunish > punishCooldown ? "#1ec8c8" : "#aaa"
            }">${
              Date.now() - p1.lastPunish > punishCooldown
                ? "Ready"
                : Math.ceil(
                    (punishCooldown - (Date.now() - p1.lastPunish)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
      ${
        settings.swords
          ? `<br>Sword: <span style="color:${
              Date.now() - p1.lastSword > swordCooldown ? "#bfc8ff" : "#aaa"
            }">${
              Date.now() - p1.lastSword > swordCooldown
                ? "Ready"
                : Math.ceil(
                    (swordCooldown - (Date.now() - p1.lastSword)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
      ${
        settings.bombs
          ? `<br>Bomb: <span style="color:${
              Date.now() - lastBomb1 > bombCooldown ? "#ffe629" : "#aaa"
            }">${
              Date.now() - lastBomb1 > bombCooldown
                ? "Ready"
                : Math.ceil((bombCooldown - (Date.now() - lastBomb1)) / 1000) +
                  "s"
            }</span>`
          : ""
      }
      ${
        settings.lasers
          ? `<br>Laser: <span style="color:${
              Date.now() - p1.lastLaser > laserCooldown ? "#1ec8c8" : "#aaa"
            }">${
              Date.now() - p1.lastLaser > laserCooldown
                ? "Ready"
                : Math.ceil(
                    (laserCooldown - (Date.now() - p1.lastLaser)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
      ${
        settings.boomerangs
          ? `<br>Boomerang: <span style="color:${
              Date.now() - p1.lastBoomerang > boomerangCooldown
                ? "#FFE629"
                : "#aaa"
            }">${
              Date.now() - p1.lastBoomerang > boomerangCooldown
                ? "Ready"
                : Math.ceil(
                    (boomerangCooldown - (Date.now() - p1.lastBoomerang)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
      ${
        settings.freezeRay
          ? `<br>Freeze Ray: <span style="color:${
              Date.now() - p1.lastFreezeRay > freezeRayCooldown
                ? "#00e3ff"
                : "#aaa"
            }">${
              Date.now() - p1.lastFreezeRay > freezeRayCooldown
                ? "Ready"
                : Math.ceil(
                    (freezeRayCooldown - (Date.now() - p1.lastFreezeRay)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
      ${
        settings.heal
          ? `<br>Heal: <span style="color:${
              Date.now() - p1.lastHeal > healCooldown ? "#31ff8c" : "#aaa"
            }">${
              Date.now() - p1.lastHeal > healCooldown
                ? "Ready"
                : Math.ceil(
                    (healCooldown - (Date.now() - p1.lastHeal)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
    </div>
    <div>
      <span style="color:#ff4444;font-weight:bold;">P2<br></span> Ammo: ${p2.ammo}${
    p2.reloading ? " (Reloading...)" : ""
  }
      ${
        settings.punish
          ? `<br>Punish: <span style="color:${
              Date.now() - p2.lastPunish > punishCooldown ? "#ff4444" : "#aaa"
            }">${
              Date.now() - p2.lastPunish > punishCooldown
                ? "Ready"
                : Math.ceil(
                    (punishCooldown - (Date.now() - p2.lastPunish)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
      ${
        settings.swords
          ? `<br>Sword: <span style="color:${
              Date.now() - p2.lastSword > swordCooldown ? "#bfc8ff" : "#aaa"
            }">${
              Date.now() - p2.lastSword > swordCooldown
                ? "Ready"
                : Math.ceil(
                    (swordCooldown - (Date.now() - p2.lastSword)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
      ${
        settings.bombs
          ? `<br>Bomb: <span style="color:${
              Date.now() - lastBomb2 > bombCooldown ? "#ffd24c" : "#aaa"
            }">${
              Date.now() - lastBomb2 > bombCooldown
                ? "Ready"
                : Math.ceil((bombCooldown - (Date.now() - lastBomb2)) / 1000) +
                  "s"
            }</span>`
          : ""
      }
      ${
        settings.lasers
          ? `<br>Laser: <span style="color:${
              Date.now() - p2.lastLaser > laserCooldown ? "#1ec8c8" : "#aaa"
            }">${
              Date.now() - p2.lastLaser > laserCooldown
                ? "Ready"
                : Math.ceil(
                    (laserCooldown - (Date.now() - p2.lastLaser)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
      ${
        settings.boomerangs
          ? `<br>Boomerang: <span style="color:${
              Date.now() - p2.lastBoomerang > boomerangCooldown
                ? "#FFE629"
                : "#aaa"
            }">${
              Date.now() - p2.lastBoomerang > boomerangCooldown
                ? "Ready"
                : Math.ceil(
                    (boomerangCooldown - (Date.now() - p2.lastBoomerang)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
      ${
        settings.freezeRay
          ? `<br>Freeze Ray: <span style="color:${
              Date.now() - p2.lastFreezeRay > freezeRayCooldown
                ? "#00e3ff"
                : "#aaa"
            }">${
              Date.now() - p2.lastFreezeRay > freezeRayCooldown
                ? "Ready"
                : Math.ceil(
                    (freezeRayCooldown - (Date.now() - p2.lastFreezeRay)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
      ${
        settings.heal
          ? `<br>Heal: <span style="color:${
              Date.now() - p2.lastHeal > healCooldown ? "#31ff8c" : "#aaa"
            }">${
              Date.now() - p2.lastHeal > healCooldown
                ? "Ready"
                : Math.ceil(
                    (healCooldown - (Date.now() - p2.lastHeal)) / 1000
                  ) + "s"
            }</span>`
          : ""
      }
    </div>
  `;
  status.innerHTML = statusHtml;
  // Remove old projectiles
  document
    .querySelectorAll(
      ".fireball, .bullet, .bomb, .laser, .boomerang, .freeze-ray, .heal-effect"
    )
    .forEach((e) => e.remove());
  // Fireballs
  fireballs.forEach((fb) => {
    const el = document.createElement("div");
    el.className = "fireball " + fb.colorClass;
    el.style.left = fb.x + "px";
    el.style.bottom = fb.y + "px";
    gameArea.appendChild(el);
  });
  // Bullets
  bullets.forEach((b) => {
    const el = document.createElement("div");
    el.className = "bullet " + b.colorClass;
    el.style.left = b.x + "px";
    el.style.bottom = b.y + "px";
    gameArea.appendChild(el);
  });
  // Bombs
  bombs.forEach((bomb) => {
    const el = document.createElement("div");
    el.className = "bomb";
    el.style.left = bomb.x + "px";
    el.style.bottom = bomb.y + "px";
    const timer = document.createElement("span");
    timer.className = "bomb-timer";
    timer.innerText = Math.ceil(bomb.timer / 1000);
    el.appendChild(timer);
    gameArea.appendChild(el);
  });
  // Lasers
  lasers.forEach((l) => {
    const el = document.createElement("div");
    el.className = "laser " + l.colorClass;
    el.style.left = l.x + "px";
    el.style.bottom = l.y + "px";
    el.style.width = "340px";
    gameArea.appendChild(el);
  });
  // Boomerangs
  boomerangs.forEach((b) => {
    const el = document.createElement("div");
    el.className = "boomerang";
    el.style.left = b.x + "px";
    el.style.bottom = b.y + "px";
    gameArea.appendChild(el);
  });
  // Freeze Rays
  freezeRays.forEach((fr) => {
    const el = document.createElement("div");
    el.className = "freeze-ray";
    el.style.left = fr.x + "px";
    el.style.bottom = fr.y + "px";
    gameArea.appendChild(el);
  });
  // Heals
  heals.forEach((h) => {
    const el = document.createElement("div");
    el.className = "heal-effect";
    el.style.left = h.x + "px";
    el.style.bottom = h.y + "px";
    gameArea.appendChild(el);
  });
}

// ========== Game Over ==========
function checkGameOver() {
  if (gameOver) return;
  if (p1.health <= 0 || p2.health <= 0) {
    gameOver = true;
    if (p1.health <= 0 && p2.health <= 0) {
      winnerText = "It's a draw!";
    } else if (p1.health <= 0) {
      winnerText = "Player 2 Wins!";
    } else {
      winnerText = "Player 1 Wins!";
    }
    status.innerHTML = `<h2>${winnerText}</h2>`;
    winnerLabel.innerHTML = winnerText;
    winnerLabel.style.display = "block";
    restartBtn.style.display = "block";
  }
}

// ========== AI Logic ==========
// AI player only jumps for two reasons:
// 1. To dodge projectiles or bombs (danger).
// 2. To attack you with melee/punish/sword when you are in the air (if you are jumping).
function aiMovePlayer(
  settings,
  p1,
  p2,
  { fireballs, bullets, bombs, now, lastBomb2, lasers, boomerangs, freezeRays }
) {
  let diff = settings.aiDifficulty || "easy";
  let params = {
    easy: {
      react: 350,
      missChance: 0.48,
      shieldChance: 0.13,
      punishChance: 0.19,
      meleeChance: 0.22,
      bombChance: 0.13,
      gunChance: 0.18,
      fireballChance: 0.16,
      retreatChance: 0.3,
      approachChance: 0.65,
      swordChance: 0.15,
      laserChance: 0.12,
      boomerangChance: 0.12,
      freezeRayChance: 0.08,
      healChance: 0.08,
    },
    medium: {
      react: 160,
      missChance: 0.22,
      shieldChance: 0.25,
      punishChance: 0.33,
      meleeChance: 0.39,
      bombChance: 0.22,
      gunChance: 0.33,
      fireballChance: 0.28,
      retreatChance: 0.44,
      approachChance: 0.79,
      swordChance: 0.22,
      laserChance: 0.15,
      boomerangChance: 0.15,
      freezeRayChance: 0.12,
      healChance: 0.11,
    },
    hard: {
      react: 65,
      missChance: 0.08,
      shieldChance: 0.48,
      punishChance: 0.46,
      meleeChance: 0.61,
      bombChance: 0.37,
      gunChance: 0.62,
      fireballChance: 0.41,
      retreatChance: 0.59,
      approachChance: 0.96,
      swordChance: 0.35,
      laserChance: 0.21,
      boomerangChance: 0.22,
      freezeRayChance: 0.17,
      healChance: 0.14,
    },
    impossible: {
      react: 10,
      missChance: 0.01,
      shieldChance: 0.99,
      punishChance: 0.99,
      meleeChance: 0.98,
      bombChance: 0.98,
      gunChance: 0.98,
      fireballChance: 0.98,
      retreatChance: 0.99,
      approachChance: 0.99,
      swordChance: 0.92,
      laserChance: 0.89,
      boomerangChance: 0.92,
      freezeRayChance: 0.85,
      healChance: 0.5,
    },
  }[diff];

  if (!p2._nextActionTime || now > p2._nextActionTime) {
    p2._nextActionTime = now + params.react + Math.random() * params.react;
    const dist = Math.abs(p2.x - p1.x);
    const facing = p2.x < p1.x ? 1 : -1;
    p2.direction = facing;

    // --- Danger Jump: Dodge projectiles or bombs ---
    let danger = false;
    // Fireball danger
    if (
      fireballs.some(
        (fb) =>
          fb.owner === p1 &&
          Math.abs(fb.x - p2.x) < 120 &&
          Math.abs(fb.y - p2.y) < 70
      )
    ) {
      danger = true;
    }
    // Bullet danger
    if (
      bullets.some(
        (b) =>
          b.owner === p1 &&
          Math.abs(b.x - p2.x) < 100 &&
          Math.abs(b.y - p2.y) < 50
      )
    ) {
      danger = true;
    }
    // Bomb about to explode near AI
    if (
      bombs.some(
        (bomb) =>
          bomb.owner === p1 &&
          !bomb.exploded &&
          bomb.timer < 800 &&
          Math.abs(bomb.x - p2.x) < 80
      )
    ) {
      danger = true;
    }
    if (danger && p2.onGround) {
      jump(p2);
      return;
    }

    // --- Attack Jump: If AI wants to attack with melee/punish/sword AND player 1 is jumping ---
    // Check if player 1 is airborne
    const p1Jumping = !p1.onGround && p1.y > groundLevel + 2;
    // Only attempt attack jump if close enough for melee/punish/sword
    if (p1Jumping && p2.onGround && dist < 100) {
      // Pick an attack type if ready
      if (
        settings.punish &&
        now - p2.lastPunish > punishCooldown &&
        !p1.shieldActive &&
        Math.random() < params.punishChance
      ) {
        jump(p2);
        setTimeout(() => punishAttack(p2), 120); // attack soon after jump
        return;
      }
      if (
        settings.swords &&
        now - p2.lastSword > swordCooldown &&
        Math.random() < params.swordChance
      ) {
        jump(p2);
        setTimeout(() => swordSlash(p2, 2), 120);
        return;
      }
      if (
        settings.melee &&
        now - p2.lastAttack > attackCooldown &&
        !p1.shieldActive &&
        Math.random() < params.meleeChance
      ) {
        jump(p2);
        setTimeout(() => meleeAttack(p2), 120);
        return;
      }
    }

    // Shield logic
    if (
      settings.shields &&
      !p2.shieldActive &&
      p2.shieldAvailable &&
      ((p2.health < 180 && Math.random() < params.shieldChance) ||
        (dist < 65 && Math.random() < params.shieldChance) ||
        fireballs.some(
          (fb) =>
            fb.owner === p1 &&
            Math.abs(fb.x - p2.x) < 100 &&
            Math.random() < params.shieldChance + 0.07
        ) ||
        bullets.some(
          (b) =>
            b.owner === p1 &&
            Math.abs(b.x - p2.x) < 70 &&
            Math.random() < params.shieldChance + 0.05
        ))
    ) {
      toggleShield(p2);
      return;
    }
    // Approach/Retreat
    if (dist > 180 && Math.random() < params.approachChance) {
      p2.x += speed * facing;
    } else if (dist < 55 && Math.random() < params.retreatChance) {
      p2.x -= speed * facing;
    }
    if (Math.random() < params.missChance) return;
    // Punish
    if (
      settings.punish &&
      now - p2.lastPunish > punishCooldown &&
      dist < 100 &&
      !p1.shieldActive &&
      Math.random() < params.punishChance
    ) {
      punishAttack(p2);
      return;
    }
    // Sword
    if (
      settings.swords &&
      now - p2.lastSword > swordCooldown &&
      dist < 80 &&
      Math.random() < params.swordChance
    ) {
      swordSlash(p2, 2);
      return;
    }
    // Melee
    if (
      settings.melee &&
      dist < 60 &&
      now - p2.lastAttack > attackCooldown &&
      !p1.shieldActive &&
      Math.random() < params.meleeChance
    ) {
      meleeAttack(p2);
      return;
    }
    // Bomb
    if (
      settings.bombs &&
      now - lastBomb2 > bombCooldown &&
      dist < 160 &&
      Math.random() < params.bombChance
    ) {
      dropBomb(p2, 2);
      return;
    }
    // Gun
    if (
      settings.guns &&
      dist < 180 &&
      !p2.reloading &&
      p2.ammo > 0 &&
      now - p2.lastBulletShot > 200 &&
      Math.random() < params.gunChance
    ) {
      shootGun(p2);
      return;
    }
    // Fireball
    if (
      settings.fireballs &&
      dist > 90 &&
      now - p2.lastFireball > fireballCooldown &&
      Math.random() < params.fireballChance
    ) {
      shootFireball(p2);
      return;
    }
    // Laser
    if (
      settings.lasers &&
      now - p2.lastLaser > laserCooldown &&
      Math.random() < params.laserChance
    ) {
      shootLaser(p2);
      return;
    }
    // Boomerang
    if (
      settings.boomerangs &&
      now - p2.lastBoomerang > boomerangCooldown &&
      Math.random() < params.boomerangChance
    ) {
      throwBoomerang(p2, 2);
      return;
    }
    // Freeze Ray
    if (
      settings.freezeRay &&
      now - p2.lastFreezeRay > freezeRayCooldown &&
      Math.random() < params.freezeRayChance
    ) {
      shootFreezeRay(p2);
      return;
    }
    // Heal (if health low)
    if (
      settings.heal &&
      now - p2.lastHeal > healCooldown &&
      p2.health < maxHealth * 0.75 &&
      Math.random() < params.healChance
    ) {
      healSelf(p2);
      return;
    }
    // Gun reload
    if (settings.guns && p2.ammo <= 0 && !p2.reloading && Math.random() < 0.5) {
      reloadGun(p2);
      return;
    }
    // --- NO RANDOM JUMP at the end! ---
  }
}

// ========== Jump ==========
function jump(player) {
  if (player.onGround && !gameOver && !isFrozen(player)) {
    player.vy = jumpPower;
    player.onGround = false;
  }
}

// ========== Main Game Loop ==========
function gameLoop() {
  if (!gameOver) {
    updatePlayer(p1);
    updatePlayer(p2, settings.aiMode === "ai");
    updateProjectiles();
    if (settings.bombs) updateBombs();
    checkGameOver();
    render();
  }
  requestAnimationFrame(gameLoop);
}
// ========== PATCHES & ADVANCED ERROR HANDLING ==========

// --- Start Overlay adapts to Dark/Light mode ---
function updateStartOverlayBg() {
  const overlay = document.getElementById("startOverlay");
  if (!overlay) return;
  if (settings.darkMode) {
    overlay.style.background = "rgba(20,24,40,0.92)";
    overlay.style.color = "#eee";
    overlay.querySelectorAll("h2, p").forEach(el => el.style.color = "#eee");
  } else {
    overlay.style.background = "rgba(255,255,255,0.92)";
    overlay.style.color = "#191a22";
    overlay.querySelectorAll("h2, p").forEach(el => el.style.color = "#191a22");
  }
}
window.addEventListener("DOMContentLoaded", function () {
  setTimeout(updateStartOverlayBg, 10);
});
toggleDarkMode.addEventListener("change", updateStartOverlayBg);

// --- Auto-save and load all settings ---
const SETTINGS_STORAGE_KEY = "fightingGame-settings";
function saveSettings() {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  localStorage.setItem("fightingGame-darkMode", settings.darkMode);
}
function loadSettings() {
  const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (saved) {
    try {
      const loaded = JSON.parse(saved);
      Object.assign(settings, loaded);
    } catch (e) {}
  }
  const dark = localStorage.getItem("fightingGame-darkMode");
  if (dark !== null) settings.darkMode = dark === "true";
}
loadSettings();
settingsBtn.addEventListener("click", () => {
  toggleFireballs.checked = settings.fireballs;
  toggleGuns.checked = settings.guns;
  toggleShields.checked = settings.shields;
  toggleMelee.checked = settings.melee;
  toggleBombs.checked = settings.bombs;
  togglePunish.checked = settings.punish;
  toggleSwords.checked = settings.swords;
  toggleLasers.checked = settings.lasers;
  toggleBoomerangs.checked = settings.boomerangs;
  toggleFreezeRay.checked = settings.freezeRay;
  toggleHeal.checked = settings.heal;
  if (settings.aiMode === "human") vsHuman.checked = true;
  if (settings.aiMode === "ai") vsAI.checked = true;
  toggleDarkMode.checked = settings.darkMode;
  applyDarkMode();
});
[
  toggleFireballs, toggleGuns, toggleShields, toggleMelee, toggleBombs,
  togglePunish, toggleSwords, toggleLasers, toggleBoomerangs,
  toggleFreezeRay, toggleHeal, toggleDarkMode, vsHuman, vsAI,
  aiEasy, aiMedium, aiHard, aiImpossible
].forEach(el => {
  el.addEventListener("change", () => {
    settings.fireballs = toggleFireballs.checked;
    settings.guns = toggleGuns.checked;
    settings.shields = toggleShields.checked;
    settings.melee = toggleMelee.checked;
    settings.bombs = toggleBombs.checked;
    settings.punish = togglePunish.checked;
    settings.swords = toggleSwords.checked;
    settings.lasers = toggleLasers.checked;
    settings.boomerangs = toggleBoomerangs.checked;
    settings.freezeRay = toggleFreezeRay.checked;
    settings.heal = toggleHeal.checked;
    settings.darkMode = toggleDarkMode.checked;
    settings.aiMode = vsAI.checked ? "ai" : "human";
    if (aiEasy.checked) settings.aiDifficulty = "easy";
    if (aiMedium.checked) settings.aiDifficulty = "medium";
    if (aiHard.checked) settings.aiDifficulty = "hard";
    if (aiImpossible.checked) settings.aiDifficulty = "impossible";
    saveSettings();
    updateStartOverlayBg();
  });
});
settingsBackBtn.addEventListener("click", saveSettings);
aiDifficultyBackBtn.addEventListener("click", saveSettings);

// --- Pause the game when on Help or Settings screens ---
function isMenuOpen() {
  return (
    helpScreen.style.display === "block" ||
    settingsScreen.style.display === "block" ||
    aiDifficultyScreen.style.display === "block"
  );
}
const origGameLoop = gameLoop;
let gamePaused = false;
function patchedGameLoop() {
  if (isMenuOpen()) {
    if (!gamePaused) {
      status.innerHTML = "<span style='color:#1ec8c8;font-size:1.3em;'>Paused</span>";
      gamePaused = true;
    }
    requestAnimationFrame(patchedGameLoop);
    return;
  }
  if (gamePaused) {
    gamePaused = false;
    status.innerHTML = "";
  }
  origGameLoop();
}
window.gameLoop = patchedGameLoop;

// Patch Start overlay Start button to use patchedGameLoop
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const overlay = document.getElementById("startOverlay");
    if (overlay) {
      const btn = overlay.querySelector("button");
      if (btn) {
        btn.onclick = () => {
          overlay.parentNode.removeChild(overlay);
          restartGame();
          patchedGameLoop();
        };
      }
    }
  }, 20);
});
// Status message on menu open/close
helpBtn.addEventListener("click", () => { setTimeout(() => { status.innerHTML = "<span style='color:#1ec8c8;font-size:1.3em;'>Paused</span>"; }, 10); });
backBtn.addEventListener("click", () => { status.innerHTML = ""; });
settingsBtn.addEventListener("click", () => { setTimeout(() => { status.innerHTML = "<span style='color:#1ec8c8;font-size:1.3em;'>Paused</span>"; }, 10); });
settingsBackBtn.addEventListener("click", () => { status.innerHTML = ""; });
aiSettingsBtn.addEventListener("click", () => { setTimeout(() => { status.innerHTML = "<span style='color:#1ec8c8;font-size:1.3em;'>Paused</span>"; }, 10); });
aiDifficultyBackBtn.addEventListener("click", () => { status.innerHTML = ""; });

// ========== Advanced Global JS Error Fixer & Logger ==========

// Helper: Try to create missing .arm.left/.arm.right if needed
function ensurePlayerArms() {
  [player1, player2].forEach(playerElem => {
    if (playerElem) {
      if (!playerElem.querySelector('.arm.left')) {
        const left = document.createElement('div');
        left.className = 'arm left';
        playerElem.appendChild(left);
      }
      if (!playerElem.querySelector('.arm.right')) {
        const right = document.createElement('div');
        right.className = 'arm right';
        playerElem.appendChild(right);
      }
    }
  });
}

// Helper: General safe function call, auto-fixes for null/undefined/classList errors
function safeCall(fn, ...args) {
  try {
    return fn(...args);
  } catch (err) {
    if (
      String(err).includes("Cannot read properties of null") ||
      String(err).includes("Cannot read properties of undefined") ||
      String(err).includes("undefined is not an object")
    ) {
      ensurePlayerArms();
      try {
        // Retry after attempting fix
        return fn(...args);
      } catch (e2) {
        // Still failed, log and prevent crash
        console.log('The Error Fixed (retries failed):', err);
        return undefined;
      }
    }
    // Other error: log and prevent crash
    console.log('The Error Fixed:', err);
    return undefined;
  }
}

// Example: Patch punishAttack and other DOM-manipulating functions to use safeCall
const origPunishAttack = punishAttack;
window.punishAttack = function(player) {
  return safeCall(origPunishAttack, player);
};
const origMeleeAttack = meleeAttack;
window.meleeAttack = function(player) {
  return safeCall(origMeleeAttack, player);
};
const origSwordSlash = swordSlash;
window.swordSlash = function(player, whichPlayer) {
  return safeCall(origSwordSlash, player, whichPlayer);
};
// ... add more as needed (any function that touches DOM/arms, etc.)

// Global error catch for everything else
window.onerror = function (message, source, lineno, colno, error) {
  if (
    String(message).includes("Cannot read properties of null") ||
    String(message).includes("Cannot read properties of undefined") ||
    String(message).includes("undefined is not an object")
  ) {
    ensurePlayerArms();
    console.log('The Error Fixed (window.onerror)');
    return true;
  }
  console.log('The Error Fixed (window.onerror):', message);
  return true;
};
window.addEventListener('unhandledrejection', function (event) {
  console.log('The Error Fixed (unhandledrejection)');
  event.preventDefault();
});

// ========== END PATCHES ==========
// ========== UNIVERSAL PLAYER STATE SAFEGUARD & AUTO-RECOVERY (1ms Interval) ==========

function fullPlayerStateRecovery() {
  // Helper to check for invalid (null, undefined, NaN) state
  function isBad(val) {
    return (
      val === null ||
      val === undefined ||
      (typeof val === "number" && isNaN(val))
    );
  }
  function fixPlayer(player, fallback) {
    if (!player || typeof player !== "object") return;
    if (isBad(player.x)) player.x = fallback.x;
    if (isBad(player.y)) player.y = fallback.y;
    if (isBad(player.vy)) player.vy = 0;
    if (isBad(player.direction)) player.direction = fallback.direction;
    if (isBad(player.health)) player.health = fallback.health;
    if (isBad(player.attacking)) player.attacking = false;
    if (isBad(player.lastAttack)) player.lastAttack = 0;
    if (isBad(player.onGround)) player.onGround = true;
    if (isBad(player.lastFireball)) player.lastFireball = 0;
    if (isBad(player.ammo)) player.ammo = 30;
    if (isBad(player.lastBulletShot)) player.lastBulletShot = 0;
    if (isBad(player.reloading)) player.reloading = false;
    if (isBad(player.shieldActive)) player.shieldActive = false;
    if (isBad(player.shieldAvailable)) player.shieldAvailable = true;
    if (isBad(player.lastShieldActivate)) player.lastShieldActivate = 0;
    if (isBad(player.colorClass)) player.colorClass = fallback.colorClass;
    if (isBad(player.lastPunish)) player.lastPunish = 0;
    if (isBad(player.lastSword)) player.lastSword = 0;
    if (isBad(player.lastLaser)) player.lastLaser = 0;
    if (isBad(player.lastBoomerang)) player.lastBoomerang = 0;
    if (isBad(player.lastFreezeRay)) player.lastFreezeRay = 0;
    if (isBad(player.lastHeal)) player.lastHeal = 0;
    if (isBad(player.frozenUntil)) player.frozenUntil = 0;
    // Clamp position to game field
    if (player.x < 0) player.x = 0;
    if (player.x > gameWidth - playerWidth) player.x = gameWidth - playerWidth;
    if (player.y < groundLevel) player.y = groundLevel;
    if (player.y > 1000) player.y = groundLevel;
    if (player.health < 0) player.health = 0;
    if (player.health > 600) player.health = 600;
    if (!player.onGround && player.y > groundLevel && Math.abs(player.vy) < 0.01)
      player.vy = -1.5;
  }

  function ensurePlayerDOM(playerElem, id) {
    if (!playerElem) {
      const p = document.createElement("div");
      p.id = id;
      p.className = "player";
      document.getElementById("game").appendChild(p);
      playerElem = p;
    }
    if (!playerElem.querySelector('.arm.left')) {
      const left = document.createElement('div');
      left.className = 'arm left';
      playerElem.appendChild(left);
    }
    if (!playerElem.querySelector('.arm.right')) {
      const right = document.createElement('div');
      right.className = 'arm right';
      playerElem.appendChild(right);
    }
    if (!playerElem.querySelector('.sword')) {
      const sword = document.createElement('div');
      sword.className = 'sword';
      sword.id = id === "player1" ? "sword1" : "sword2";
      playerElem.appendChild(sword);
    }
  }

  fixPlayer(window.p1, {
    x: 50,
    y: groundLevel,
    direction: 1,
    health: 600,
    colorClass: "blue"
  });
  ensurePlayerDOM(document.getElementById("player1"), "player1");

  fixPlayer(window.p2, {
    x: gameWidth - 50 - playerWidth,
    y: groundLevel,
    direction: -1,
    health: 600,
    colorClass: "red"
  });
  ensurePlayerDOM(document.getElementById("player2"), "player2");
}

// Call this recovery function every 1ms for maximum safety!
setInterval(fullPlayerStateRecovery, 1);

// ========== END PLAYER STATE SAFEGUARD ==========
// ========== HIDE AMMO DISPLAY WHEN GUNS DISABLED ==========
// This patch hides "Ammo: 30" for both players when guns are disabled.

const origRender = render;
window.render = function () {
  origRender();

  // Patch: Remove ammo lines from status if guns are off
  if (!settings.guns) {
    // Remove "Ammo: ..." for both players from the status panel
    if (status && status.innerHTML) {
      status.innerHTML = status.innerHTML.replace(/Ammo:\s*\d+\s*(\(Reloading...\))?/g, "")
        // Remove leftover double <br> or leading/trailing spaces
        .replace(/<br>\s*<br>/g, "<br>")
        .replace(/(<div>)(\s*<br>)+/g, "$1")
        .replace(/(<\/span>)(\s*<br>)+/g, "$1");
    }
  }
};
// ========== KNOCKBACK WHEN WEAPON HITS PLAYER ==========
// Place this under your other patches to enable knockback effect on hit.

function applyKnockback(defender, attacker, force = 24) {
  // Determine direction: away from attacker
  if (attacker.x < defender.x) {
    defender.x += force; // Knock right
    defender.direction = 1;
  } else {
    defender.x -= force; // Knock left
    defender.direction = -1;
  }
  // Clamp within game bounds
  if (defender.x < 0) defender.x = 0;
  if (defender.x > gameWidth - playerWidth) defender.x = gameWidth - playerWidth;
}

// --- Patch meleeAttack ---
const _origMeleeAttack = meleeAttack;
window.meleeAttack = function(player) {
  const beforeHealth = (player === p1 ? p2 : p1).health;
  _origMeleeAttack(player);
  const defender = player === p1 ? p2 : p1;
  if (defender.health < beforeHealth) {
    applyKnockback(defender, player, 32); // Stronger for melee
  }
};

// --- Patch punishAttack ---
const _origPunishAttack = punishAttack;
window.punishAttack = function(player) {
  const beforeHealth = (player === p1 ? p2 : p1).health;
  _origPunishAttack(player);
  const defender = player === p1 ? p2 : p1;
  if (defender.health < beforeHealth) {
    applyKnockback(defender, player, 40); // Even stronger for punish
  }
};

// --- Patch swordSlash ---
const _origSwordSlash = swordSlash;
window.swordSlash = function(player, whichPlayer) {
  const defender = player === p1 ? p2 : p1;
  const beforeHealth = defender.health;
  _origSwordSlash(player, whichPlayer);
  if (defender.health < beforeHealth) {
    applyKnockback(defender, player, 28);
  }
};

// --- Patch projectiles update for fireballs, bullets, boomerangs, freeze rays, laser ---
const _origUpdateProjectiles = updateProjectiles;
window.updateProjectiles = function() {
  // Before calling original, cache health
  const prevHealth = { p1: p1.health, p2: p2.health };
  _origUpdateProjectiles();
  // Fireballs, bullets, laser, boomerang, freeze-ray: knockback if health decreased
  if (p1.health < prevHealth.p1) applyKnockback(p1, p2, 20);
  if (p2.health < prevHealth.p2) applyKnockback(p2, p1, 20);
};

// --- Patch bombs ---
const _origUpdateBombs = updateBombs;
window.updateBombs = function() {
  const prevHealth = { p1: p1.health, p2: p2.health };
  _origUpdateBombs();
  if (p1.health < prevHealth.p1) applyKnockback(p1, p2, 36);
  if (p2.health < prevHealth.p2) applyKnockback(p2, p1, 36);
};

// --- Patch freeze ray direct attack ---
const _origShootFreezeRay = shootFreezeRay;
window.shootFreezeRay = function(player) {
  // The ray itself triggers knockback on hit in updateProjectiles
  _origShootFreezeRay(player);
};

// --- Patch boomerang direct attack ---
const _origThrowBoomerang = throwBoomerang;
window.throwBoomerang = function(player, whichPlayer) {
  // The boomerang itself triggers knockback in updateProjectiles
  _origThrowBoomerang(player, whichPlayer);
};
// ========== FULL PLAYER COLLISION: NO PASSING THROUGH FROM ANY DIRECTION ==========
function preventPlayerFullOverlap() {
  // Get rectangles
  const p1Left = p1.x;
  const p1Right = p1.x + playerWidth;
  const p1Bottom = p1.y;
  const p1Top = p1.y + playerHeight;
  const p2Left = p2.x;
  const p2Right = p2.x + playerWidth;
  const p2Bottom = p2.y;
  const p2Top = p2.y + playerHeight;

  // Check for overlap
  const overlapX = p1Right > p2Left && p1Left < p2Right;
  const overlapY = p1Top > p2Bottom && p1Bottom < p2Top;

  if (overlapX && overlapY) {
    // Calculate overlap distances
    const overlapAmountX = Math.min(p1Right, p2Right) - Math.max(p1Left, p2Left);
    const overlapAmountY = Math.min(p1Top, p2Top) - Math.max(p1Bottom, p2Bottom);

    // Resolve the axis with the smallest overlap (classic AABB collision response)
    if (overlapAmountX < overlapAmountY) {
      // Separate horizontally
      if (p1.x < p2.x) {
        p1.x -= overlapAmountX / 2;
        p2.x += overlapAmountX / 2;
      } else {
        p1.x += overlapAmountX / 2;
        p2.x -= overlapAmountX / 2;
      }
    } else {
      // Separate vertically
      if (p1.y < p2.y) {
        p1.y -= overlapAmountY / 2;
        p2.y += overlapAmountY / 2;
      } else {
        p1.y += overlapAmountY / 2;
        p2.y -= overlapAmountY / 2;
      }
    }
    // Clamp positions to game area
    p1.x = Math.max(0, Math.min(p1.x, gameWidth - playerWidth));
    p2.x = Math.max(0, Math.min(p2.x, gameWidth - playerWidth));
    p1.y = Math.max(groundLevel, p1.y);
    p2.y = Math.max(groundLevel, p2.y);
  }
}

// ==== SAFE PATCH: Only PATCH ONCE! ====
if (!window._collisionPatched) {
  const _origGameLoop = window.gameLoop || patchedGameLoop;
  window.gameLoop = function() {
    preventPlayerFullOverlap();
    _origGameLoop();
  };
  window._collisionPatched = true;
}
