const JWTToken = require('../services/jwtToken.service');

module.exports = function(req, res, next) {
  // if (!token.headers.authorization) {
  //   return res.status(404).json('unauthorized');
  // }

  // const [bearer, token] = req.headers.authorization.split(' ');
  // const github_id = JWTToken.verify(token)
  // const user = UserModel.findUser({ github_id })

  // if (!user) {
  //   return res.status(404).json('unauthorized');
  // }

  // req.body.authorizedUsername = user.username;
  // req.body.authorizedUserId = user.id;

  // 개발용 임시 하드코딩
  req.body.authorizedUsername = 'profornnan';
  req.body.authorizedUserId = 1;

  next();
}