const passport = require('passport');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;

const { prisma } = require('../utils/prisma');

const { SECRET } = require('../config');

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
};

passport.use(
    new JWTstrategy(options, async (jwt_payload, done) => {
        try {
            const selectedUser = await prisma.user.findUnique({
                where: {
                    id: Number(jwt_payload),
                },
            });
            return done(null, selectedUser);
        } catch (error) {
            return done(error, false);
        }
    })
);
