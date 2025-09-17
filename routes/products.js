const { nameToUppercasePipe } = require('../pipes/nameToUppercase');

const products = [
    { id: 1, name: "Frane", price: 100 },
    { id: 2, name: "Placute", price: 150 },
    { id: 3, name: "Piston", price: 200 },
    { id: 4, name: "Anvelope", price: 120 },
    { id: 5, name: "Bumper", price: 80 },
    { id: 6, name: "Spoiler", price: 90 },
    { id: 7, name: "Buza", price: 110 },
    { id: 8, name: "Acoperis", price: 130 },
    { id: 9, name: "Ulei", price: 140 },
    { id: 10, name: "Esapament", price: 160 }
  ];
  
  function handleProducts(req, res, pathname, query) {
    if (pathname === '/products/list') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(products));
    }
  
    if (pathname.startsWith('/products/details/')) {
      const parts = pathname.split('/').filter(Boolean); // ["products","details","ID"]
      const id = parseInt(parts[2]);
      const product = products.find(p => p.id === id);
      if (!product) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "Produsul nu a fost găsit" }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(product));
    }
  
    if (pathname === '/products/search') {
      let filtered = products;
      const { name, minPrice, maxPrice } = query;

      if (name) filtered = filtered.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
      if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
      if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(filtered));
    }

    if (pathname.startsWith('/products/search-by-name/')) {
      const parts = pathname.split('/').filter(Boolean);
      const searchName = parts[2] ? decodeURIComponent(parts[2]) : '';

      if (!searchName) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "Parametrul name este necesar" }));
      }

      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchName.toLowerCase())
      );

      const transformed = nameToUppercasePipe(filtered);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(transformed));
    }

    return false;
  }
  
  module.exports = { handleProducts, products };
  
