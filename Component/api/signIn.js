/* eslint-disable prettier/prettier */
const signIn = (email, password) => (
    fetch('http://192.168.0.103//api/login.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(res => res.json())
);

module.exports = signIn;
