// Configurações da área administrativa
const CONFIG = {
    // URL base do catálogo (ajuste conforme necessário)
    CATALOG_BASE_URL: '../',
    
    // Credenciais de acesso (em produção, isso deveria estar em um servidor seguro)
    ADMIN_CREDENTIALS: {
        username: 'admin',
        password: 'admin123'
    },
    
    // Configurações de armazenamento
    STORAGE_KEYS: {
        products: 'catalog_products',
        auth: 'admin_auth'
    }
};

// Funções de utilidade para gerenciar produtos
const ProductManager = {
    // Carregar produtos
    loadProducts: function() {
        return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.products) || '[]');
    },

    // Salvar produtos
    saveProducts: function(products) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.products, JSON.stringify(products));
        this.notifyCatalog();
    },

    // Adicionar produto
    addProduct: function(product) {
        const products = this.loadProducts();
        products.push({
            ...product,
            id: Date.now()
        });
        this.saveProducts(products);
    },

    // Atualizar produto
    updateProduct: function(id, updatedProduct) {
        let products = this.loadProducts();
        products = products.map(p => p.id === id ? {...updatedProduct, id} : p);
        this.saveProducts(products);
    },

    // Deletar produto
    deleteProduct: function(id) {
        let products = this.loadProducts();
        products = products.filter(p => p.id !== id);
        this.saveProducts(products);
    },

    // Notificar o catálogo sobre mudanças
    notifyCatalog: function() {
        // Dispara um evento que o catálogo pode escutar
        window.dispatchEvent(new CustomEvent('catalog_updated'));
        
        // Se o catálogo estiver aberto em outra aba, atualiza
        localStorage.setItem('catalog_last_update', Date.now().toString());
    }
};

// Funções de autenticação
const AuthManager = {
    // Verificar login
    checkLogin: function() {
        const authToken = sessionStorage.getItem(CONFIG.STORAGE_KEYS.auth);
        if (!authToken) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Fazer login
    login: function(username, password) {
        if (username === CONFIG.ADMIN_CREDENTIALS.username && 
            password === CONFIG.ADMIN_CREDENTIALS.password) {
            sessionStorage.setItem(CONFIG.STORAGE_KEYS.auth, 'true');
            return true;
        }
        return false;
    },

    // Fazer logout
    logout: function() {
        sessionStorage.removeItem(CONFIG.STORAGE_KEYS.auth);
        window.location.href = 'login.html';
    }
};

// Exportar configurações e gerenciadores
window.AdminConfig = CONFIG;
window.ProductManager = ProductManager;
window.AuthManager = AuthManager;
