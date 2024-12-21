// Simulação de um banco de dados em memória
let products = [];

export default function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

    // Lidar com requisições OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    switch (req.method) {
        case 'GET':
            return getProducts(req, res);
        case 'POST':
            return addProduct(req, res);
        case 'PUT':
            return updateProduct(req, res);
        case 'DELETE':
            return deleteProduct(req, res);
        default:
            res.status(405).json({ message: 'Method not allowed' });
    }
}

function getProducts(req, res) {
    res.status(200).json(products);
}

function addProduct(req, res) {
    const product = {
        id: Date.now(),
        ...req.body
    };
    products.push(product);
    res.status(201).json(product);
}

function updateProduct(req, res) {
    const { id } = req.query;
    const index = products.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    products[index] = { ...products[index], ...req.body };
    res.status(200).json(products[index]);
}

function deleteProduct(req, res) {
    const { id } = req.query;
    const index = products.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    products.splice(index, 1);
    res.status(204).end();
}
