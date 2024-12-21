// Gerenciador central do catálogo
class CatalogManager {
    static STORAGE_KEY = 'catalogProducts';
    static MONITORING_INTERVAL = 1000; // 1 segundo

    static addProduct(productData) {
        try {
            if (!productData.name || !productData.description || !productData.category || !productData.image) {
                console.error('Dados do produto incompletos:', productData);
                return false;
            }

            const products = this.loadProducts();
            const newProduct = {
                ...productData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            };

            products.push(newProduct);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
            this.notifyUpdate();
            return true;
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            return false;
        }
    }

    static loadProducts() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            return [];
        }
    }

    static deleteProduct(productId) {
        try {
            const products = this.loadProducts();
            const updatedProducts = products.filter(p => p.id !== productId);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedProducts));
            this.notifyUpdate();
            return true;
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            return false;
        }
    }

    static notifyUpdate() {
        const event = new CustomEvent('catalog_updated', {
            detail: {
                timestamp: new Date().toISOString()
            }
        });
        window.dispatchEvent(event);
    }

    static startMonitoring() {
        if (this._monitoringInterval) {
            clearInterval(this._monitoringInterval);
        }

        let lastData = localStorage.getItem(this.STORAGE_KEY);
        
        this._monitoringInterval = setInterval(() => {
            const currentData = localStorage.getItem(this.STORAGE_KEY);
            if (currentData !== lastData) {
                lastData = currentData;
                this.notifyUpdate();
            }
        }, this.MONITORING_INTERVAL);
    }

    static stopMonitoring() {
        if (this._monitoringInterval) {
            clearInterval(this._monitoringInterval);
            this._monitoringInterval = null;
        }
    }
}
