const jwt = require('jsonwebtoken');

const secret = 'herSheyANDdandy';

function verifyToken(token, secret){
    return jwt.verify(token, secret);
}

const payload = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQyMDg1Nn0.VVBycExcmc8BoiRfeDGWQqCXEuT2oDrw6yO3sG5GKQA', secret);
console.log(payload);