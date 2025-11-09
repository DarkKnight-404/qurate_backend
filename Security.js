const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { verifyOneTimePass } = require("./db");

const JWT_SECRET = "your_jwt_secret";
const SESSION_SECRET = "your_session_secret";

// Create Auth Token (1 day)
function createAuthToken(user) {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: "1d" });
}

// Create Session Token (1 month)
function createSessionToken(user) {
  return jwt.sign({ user }, SESSION_SECRET, { expiresIn: "30d" });
}


// Used on login → automatically sets both cookies
function issueTokens(res, user) {
  const authToken = createAuthToken(user);
  const sessionToken = createSessionToken(user);

  res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  res.cookie("sessionToken", sessionToken, {
    httpOnly: true,
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 1 month
  });
}


// Middleware: If auth expired but session valid → refresh auth
function requireAuth(req, res, next) {
  const authToken = req.cookies.authToken;
  const sessionToken = req.cookies.sessionToken;

  

  try {
    req.user = jwt.verify(authToken, JWT_SECRET).user;
    return next();
  } catch (err) {
    console.log(err);
    // Try restoring session
    try {
      const decoded = jwt.verify(sessionToken, SESSION_SECRET);

      // Issue new authToken
      const newAuthToken = createAuthToken(decoded.user);
      res.cookie("authToken", newAuthToken, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      });

      req.user = decoded.user;
      return next();
    } catch (sessionErr) {
      return res.status(401).json({ error: "Session expired" });
    }
  }
}


// Middleware: Refresh sessionToken if expiry < 2 days
function refreshSession(req, res, next) {
  const sessionToken = req.cookies.sessionToken;
  if (!sessionToken) return next();

  try {
    const decoded = jwt.verify(sessionToken, SESSION_SECRET, { ignoreExpiration: true });

    const expiresAt = decoded.exp * 1000;
    const now = Date.now();
    const twoDays = 2 * 24 * 60 * 60 * 1000;

    if (expiresAt - now < twoDays) {
      const newSessionToken = createSessionToken(decoded.user);

      res.cookie("sessionToken", newSessionToken, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000
      });
    }
  } catch (err) {
    console.log(err);
  }

  next();
}



function otpVerific(email,otp){
    return verifyOneTimePass(email,otp);
}





module.exports = { issueTokens, requireAuth, refreshSession, otpVerific };
