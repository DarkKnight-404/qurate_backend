const nodemailer = require("nodemailer");

async function sendMail(to, subject, message) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rohitrameshwarsawant@gmail.com",
            pass: "ovkl iqrs exzl zxdb"
        },
        tls: {
            rejectUnauthorized: false   // <-- IMPORTANT FIX
        }
    });

    await transporter.sendMail({
        from: "rohitrameshwarsawant@gmail.com",
        to: to,
        subject: subject,
        text: message
    });

    console.log("Email Sent ✅");
}




async function sendOneTimePass(to, pass) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rohitrameshwarsawant@gmail.com",
            pass: "ovkl iqrs exzl zxdb"
        },
        tls: {
            rejectUnauthorized: false   // <-- IMPORTANT FIX
        }
    });

    return transporter.sendMail({
        from: "rohitrameshwarsawant@gmail.com",
        to: to,
        subject: "one time password for login",
        html: `
<!-- htmlOtpEmail.html -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
  </head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:40px auto;background:#ffffff;border-radius:12px;box-shadow:0 6px 30px rgba(20,30,60,0.06);overflow:hidden;">
      <tr>
        <td style="padding:28px 32px 8px 32px;text-align:left;">
          <h1 style="margin:0;font-size:20px;color:#0f1724;">Your one-time password</h1>
          <p style="margin:8px 0 0 0;color:#475569;font-size:14px;">Use this code to sign in. It expires in <strong style="color:#0f1724">{{EXPIRY_MINUTES}} minutes</strong>.</p>
        </td>
      </tr>

      <tr>
        <td style="padding:18px 32px;text-align:center;">
          <div style="display:inline-block;background:linear-gradient(180deg,#0ea5a4,#0369a1);padding:18px 28px;border-radius:10px;color:#fff;font-weight:700;font-size:28px;letter-spacing:4px;">
            ${pass}
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:6px 32px 22px 32px;text-align:center;">
          <p style="margin:12px 0 0 0;color:#64748b;font-size:13px;line-height:1.4;">
            Or click the button below to sign in automatically.
          </p>

          <a href="{{MAGIC_LINK}}" style="display:inline-block;margin-top:12px;padding:10px 18px;border-radius:8px;background:#0ea5a4;color:#fff;text-decoration:none;font-weight:600;font-size:14px;">
            Sign in now
          </a>
        </td>
      </tr>

      <tr>
        <td style="padding:18px 32px 28px 32px;border-top:1px solid #f1f5f9;color:#94a3b8;font-size:12px;">
          <div style="max-width:560px;margin:auto;">
            <p style="margin:0;">If you did not request this code, you can safely ignore this email.</p>
            <p style="margin:8px 0 0 0;color:#94a3b8;">— The Qurate Team</p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>


        `
    });

}

// Example usage:





module.exports = {
    sendMail,
    sendOneTimePass
}
