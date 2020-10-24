/* eslint-disable prettier/prettier */
const changeinfor = (token, name, phone, address) => (
    fetch('http://192.168.0.103/api/change_info.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ token, name, phone, address }),
        })
        .then(res => res.json())
);

module.exports = changeinfor;
