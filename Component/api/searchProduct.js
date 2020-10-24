/* eslint-disable prettier/prettier */
const searchProduct = (key) => {
    const url = `http://192.168.0.103/api/search.php?key=${key}`;
    return fetch(url)
        .then(res => res.json());
};

export default searchProduct;
