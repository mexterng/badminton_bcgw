//https://blog.logrocket.com/build-rest-api-node-express-mysql/
// provides the server
const express = require("express");
const session = require('express-session');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const port = process.env.API_PORT || 3000;
const memberRouter = require("./routes/memberRoutes");
const ageDivisionRouter = require("./routes/age_divisionRoutes");
const doublesRouter = require("./routes/doubles");
const singleGameRouter = require("./routes/games_single");
const doublesGameRouter = require("./routes/games_doubles");
const gameRouter = require("./routes/games");
const pyramideRouter = require("./routes/pyramides");

require('dotenv').config();
const mysql = require('mysql2/promise');

// DB-Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// ===== Benutzer aus .env laden =====
const authUsers = JSON.parse(process.env.AUTH_USERS || '[]');

// ===== Hilfs-Middleware für Authentifizierung =====
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Bitte anmelden' });
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin-Rechte erforderlich' });
  }
  next();
};

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// ===== AUTH-ROUTEN =====

// LOGIN
app.post('/login', async (req, res) => {
    const { username, password, rememberMe } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Benutzername und Passwort erforderlich' });
    }

    try {
        // 1. Benutzer mit Rolle abfragen
        const [rows] = await pool.query(
            `SELECT 
                u.user_id, 
                u.username, 
                u.role_id,
                r.description as role_name,
                c.password_hash
             FROM users u
             INNER JOIN roles r ON u.role_id = r.role_id
             INNER JOIN user_credentials c ON u.user_id = c.user_id
             WHERE u.username = ?`,
            [username]
        );

        if (rows.length === 0) {
            console.log(`❌ Login fehlgeschlagen: Benutzer '${username}' nicht gefunden`);
            return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
        }

        const user = rows[0];

        // 2. Passwort prüfen (bcrypt)
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            console.log(`❌ Login fehlgeschlagen: Falsches Passwort für '${username}'`);
            return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
        }

        // 3. Session anlegen (mit role_name aus der roles-Tabelle)
        req.session.user = {
            id: user.user_id,
            username: user.username,
            role: user.role_name    // 'admin' oder 'user'
        };

        // 4. Refresh-Token für "Angemeldet bleiben"
        let refreshToken = null;
        if (rememberMe) {
            refreshToken = crypto.randomBytes(64).toString('hex');
            await pool.query(
                'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))',
                [user.user_id, refreshToken]
            );
        }

        console.log(`✅ Login erfolgreich: ${username} (${user.role_name})`);
        res.json({
            success: true,
            username: user.username,
            role: user.role_name,
            refreshToken: refreshToken
        });

    } catch (error) {
        console.error('❌ Datenbankfehler beim Login:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// SESSION PER REFRESH-TOKEN ERNEUERN (für iOS-PWA)
app.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh-Token fehlt' });
    }

    try {
        const [rows] = await pool.query(
            `SELECT t.user_id, t.token, u.username, r.description as role_name
             FROM refresh_tokens t
             INNER JOIN users u ON t.user_id = u.user_id
             INNER JOIN roles r ON u.role_id = r.role_id
             WHERE t.token = ? AND t.expires_at > NOW()`,
            [refreshToken]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Ungültiges oder abgelaufenes Refresh-Token' });
        }

        const userData = rows[0];
        req.session.user = {
            id: userData.user_id,
            username: userData.username,
            role: userData.role_name
        };

        res.json({ success: true, username: userData.username, role: userData.role_name });
    } catch (error) {
        console.error('❌ Refresh-Fehler:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// LOGOUT
app.post('/logout', async (req, res) => {
    const { refreshToken } = req.body;
    if (refreshToken) {
        await pool.query('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]);
    }
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

app.use("/member", requireAuth, memberRouter);
app.use("/age_division", requireAuth, ageDivisionRouter);
app.use("/doubles", requireAuth, doublesRouter);
app.use("/single_games", requireAuth, singleGameRouter);
app.use("/double_games", requireAuth, doublesGameRouter);
app.use("/games", requireAuth, gameRouter);
app.use("/pyramides", requireAuth, pyramideRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

/* logged in user as header */
app.get("/me", (req, res) => {
  if (req.session.user) {
    res.json({ username: req.session.user.username, role: req.session.user.role });
  } else {
    res.status(401).json({ message: 'Nicht angemeldet' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});