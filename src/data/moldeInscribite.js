const crypto = require('crypto');

function molde(email){
    this.id = crypto.randomUUID();
    this.email = email.trim();
}

module.exports = molde;