const products = [
    { id: 1, name: "Produs 1", price: 100 },
    { id: 2, name: "Produs 2", price: 150 },
    { id: 3, name: "Produs 3", price: 200 },
    { id: 4, name: "Produs 4", price: 120 },
    { id: 5, name: "Produs 5", price: 80 },
    { id: 6, name: "Produs 6", price: 90 },
    { id: 7, name: "Produs 7", price: 110 },
    { id: 8, name: "Produs 8", price: 130 },
    { id: 9, name: "Produs 9", price: 140 },
    { id: 10, name: "Produs 10", price: 160 }
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
  
    return false;
  }
  
  module.exports = { handleProducts, products };
  