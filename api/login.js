import querystring from "querystring";

const client_id = process.env.CLIENT_ID;
const scope = process.env.SCOPE;

module.exports = (req, res) => {
  const host = `https://${req.headers.host}`;
  const redirect_url = `${host}/api/callback`;
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_url,
      })
  );
};
