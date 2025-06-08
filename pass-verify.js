const bcrypt = require('bcrypt');

async function verifyPassword() {
    const myPassword = 'admin12###3';
    const hash = '$2b$10$1DOxn.3uWZBYSRSP8WlMpupwmUWGIT/yylveMJbTMYD6mqsgDCC42';
    const isMatch = await bcrypt.compare(myPassword, hash);
    console.log(isMatch);
}

verifyPassword();
