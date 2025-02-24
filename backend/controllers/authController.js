const { generateChallenge, verifyRegistration, verifyAuthentication } = require('../utils/authUtils');
const users = {}; // Simulação de banco de dados

exports.registerChallenge = (req, res) => {
    const { username } = req.body;
    const challenge = generateChallenge();
    users[username] = { challenge, credentials: [] };
    res.json({ challenge, rp: { name: "Minha Aplicação", id: "localhost" }, user: { id: Buffer.from(username).toString("base64"), name: username, displayName: username }, pubKeyCredParams: [{ type: "public-key", alg: -7 }] });
};

exports.register = (req, res) => {
    const { username, credential } = req.body;
    const verification = verifyRegistration(credential, users[username].challenge);
    if (verification.success) {
        users[username].credentials.push(credential);
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
};

exports.loginChallenge = (req, res) => {
    const { username } = req.body;
    if (!users[username]) return res.status(404).json({ error: "Usuário não encontrado" });
    const challenge = generateChallenge();
    users[username].challenge = challenge;
    res.json({ challenge });
};

exports.login = (req, res) => {
    const { username, credential } = req.body;
    const verification = verifyAuthentication(credential, users[username].credentials, users[username].challenge);
    if (verification.success) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
};
