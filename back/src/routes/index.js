const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const router = express.Router();
dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

router.get('/', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`,
  );
});

router.get('/oauth-callback', async (req, res) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code,
  };
  const opts = { headers: { accept: 'application/json' } };
  const token = await axios
    .post(`https://github.com/login/oauth/access_token`, body, opts)
    .then((res) => res.data['access_token'])
    .then((_token) => {
      console.log('My token:', _token);
      return _token;
    })
    .catch((err) => res.status(500).json({ message: err.message }));

  const options = {
    method: 'get',
    url: 'https://api.github.com/user',
    headers: { accept: 'application/json', authorization: `token ${token}` },
  };
  axios(options)
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      res.json({ id: data.login, avatar_url: data.avatar_url });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

module.exports = router;
