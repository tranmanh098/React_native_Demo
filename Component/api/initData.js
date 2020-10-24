/* eslint-disable prettier/prettier */
const initData = () => (
    fetch('http://192.168.0.103/api/')
        .then(res => res.json())
);

export default initData;
