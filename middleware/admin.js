function admin(req, res, next) {
    const token = req.header('x-token');
    if (!req.user.isAdmin) return res.status(403).send('Access denied');
    next()
}

module.exports = admin;