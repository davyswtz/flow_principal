const config = {
    catalogUrl: 'https://flow-principal.vercel.app',
    adminUrl: 'https://flow-admin-one.vercel.app',
    apiUrl: 'https://flow-principal.vercel.app/api'
};

if (typeof window !== 'undefined') {
    window.config = config;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}
