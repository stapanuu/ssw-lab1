const { products } = require('./products');

function authRole(req, res, role) {
  const userRole = req.headers['role'];
  if (userRole !== role) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: "Acces interzis" }));
    return false;
  }
  return true;
}

function handleAdmin(req, res, pathname) {
  // /admin/edit/:id
  if (pathname.startsWith('/admin/edit/')) {
    if (!authRole(req, res, 'Admin')) return true;

    const parts = pathname.split('/').filter(Boolean);
    const id = parseInt(parts[2]);
    const product = products.find(p => p.id === id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: "Produsul nu a fost găsit" }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: `Produs ${id} poate fi editat` }));
  }

  // /admin/reports
  if (pathname === '/admin/reports') {
    if (!authRole(req, res, 'Admin')) return true;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: "Rapoarte vizibile doar pentru Admin" }));
  }

  return false;
}

module.exports = handleAdmin;
