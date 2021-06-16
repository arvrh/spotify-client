import express from "express";
import cors from "cors";
import querystring from "querystring";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const host = process.env.HOST;
const port = process.env.PORT;
const app_host = process.env.APP_HOST;
const redirect_url = `${host}/api/callback`;
const scope = process.env.SCOPE;

const app = express().use(cors());
app.use("/", express.static(process.cwd() + "/dist"));

app.get("/api/login", (_, res) => {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_url,
      })
  );
});

app.get("/api/callback", (req, res) => {
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
          app_host + "/#" + querystring.stringify({ error: "auth error" })
        );
      }
    })
    .then((data) => {
      res.redirect(
        app_host +
          "/#" +
          querystring.stringify({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          })
      );
    });
});
app.get("/api/refresh_token", (req, res) => {
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
      res.redirect(app_host + "/#" + querystring.stringify({ error: error }));
    });
});

console.log(`server running in ${host}`);
app.listen(port);
