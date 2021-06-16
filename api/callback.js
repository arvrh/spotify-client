import querystring from "querystring";
import fetch from "node-fetch";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

module.exports = (req, res) => {
  const host = `https://${req.headers.host}`;
  const redirect_url = `${host}/api/callback`;
  const code = req.query.code;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
  };
  const body = querystring.stringify({
    code: code,
    redirect_uri: redirect_url,
    grant_type: "authorization_code",
  });
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: body,
    headers: headers,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        res.redirect(
          `${host}/#` + querystring.stringify({ error: "auth error" })
        );
      }
    })
    .then((data) => {
      res.redirect(
        `${host}/#` +
          querystring.stringify({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          })
      );
    });
};
