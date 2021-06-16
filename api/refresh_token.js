import querystring from "querystring";
import fetch from "node-fetch";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

module.exports = (req, res) => {
  const host = `https://${req.headers.host}`;
  const refresh_token = req.query.refresh_token;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
  };
  const body = querystring.stringify({
    refresh_token: refresh_token,
    grant_type: "refresh_token",
  });
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: body,
    headers: headers,
  })
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject("auth error");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      res.send({
        access_token: data.access_token,
      });
    })
    .catch((error) => {
      res.redirect(`${host}/#` + querystring.stringify({ error: error }));
    });
};
