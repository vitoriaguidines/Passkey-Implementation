exports.generateChallenge = () => Math.random().toString(36).substring(2);
exports.verifyRegistration = (credential, challenge) => ({ success: true }); // Simulação
exports.verifyAuthentication = (credential, credentials, challenge) => ({ success: true }); // Simulação
