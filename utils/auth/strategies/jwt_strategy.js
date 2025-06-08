const { Strategy, ExtractJwt } = require('passport-jwt')
const {config} = require('./../../../config/config')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, donde) => 
{
    return donde(null, payload);
});

module.exports = JwtStrategy
