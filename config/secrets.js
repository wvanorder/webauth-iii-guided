module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'thisIsSomethingOnlyTheServerKnows',
}