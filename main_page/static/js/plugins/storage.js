/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

window.onstorage = event => { 
};

const storage = {
    set: (k, v) => {
        sessionStorage.setItem(k, v);
    },
    get: (k) => {
        return sessionStorage.getItem(k);
    },
    remove: (k) => {
        sessionStorage.removeItem(k);
    },
    clear: () => {
        sessionStorage.clear();
    }
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */