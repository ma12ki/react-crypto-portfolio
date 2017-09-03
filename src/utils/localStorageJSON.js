const getItem = (key) => {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(e);
    }
};

const api = {
    getItem,
    setItem,
};

export default api;
