const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const querystring = require("querystring");
const request = require("request");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

const frontend_uri = process.env.FRONTEND_URI;
const redirect_uri = process.env.REDIRECT_URI;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const generateRandomString = (len) =>
  crypto.randomBytes(len / 2).toString("hex");

app.get("/test", function (req, res) {
  console.log(req, res);
});

app.get("/login", function (req, res) {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email user-top-read";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization: `Basic ${new Buffer.from(
          client_id + ":" + client_secret
        ).toString("base64")}`,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let accessToken = body.access_token;
        // let refreshToken = body.refresh_token;

        const options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: `Bearer ${accessToken}` },
          json: true,
        };

        request.get(options, function (error, response, body) {
          console.log(body);
        });

        res.redirect(
          `${frontend_uri}/#` +
            querystring.stringify({
              access_token: accessToken,
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});
