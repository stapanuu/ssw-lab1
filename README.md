# Autodoc App
Aplicație Node.js fără framework pentru gestionarea unui catalog de produse Autodoc.

## Context și obiectiv
Aplicația demonstrează cum poate fi construit un API REST minimal folosind doar `http` din Node.js. Implementarea curentă concentrează logica într-un singur server, cu rute separate pentru zona publică și pentru cea administrativă, păstrând codul ușor de parcurs și adaptat unui proiect de laborator sau unei demonstrații rapide.

## Funcționalități principale
- expune rută publică pentru listarea tuturor produselor disponibile;
- oferă detalii pentru un produs pe baza identificatorului numeric;
- filtrează produse după nume și interval de preț via query string;
- pune la dispoziție o căutare care convertește automat numele produselor la majuscule (pipe custom);
- protejează rutele de administrare printr-un antet `role` ce trebuie să conțină valoarea `Admin`.

## Structura proiectului
- `index.js` – instanțiază serverul HTTP și dirijează cererile către modulele de rutare;
- `routes/products.js` – gestionează rutele publice legate de produse și expune lista în memorie;
- `routes/admin.js` – expune rute ce necesită rol de administrator pentru editare și rapoarte;
- `pipes/nameToUppercase.js` – transformă câmpul `name` al produselor găsite pentru anumite căutări.

## Rute publice
- `GET /products/list` – întoarce lista completă de produse (structură JSON).
- `GET /products/details/:id` – întoarce produsul cu `id` egal; 404 dacă nu există.
- `GET /products/search?name=&minPrice=&maxPrice=` – filtrează după unul sau mai mulți parametri opționali.
- `GET /products/search-by-name/:name` – caută produse după fragment de nume și întoarce numele cu litere mari.

## Rute administrative
Aceste rute necesită antetul `role: Admin` în cerere.
- `GET /admin/edit/:id` – verifică dacă produsul poate fi editat.
- `GET /admin/reports` – întoarce mesaj informativ pentru zona de rapoarte.

## Cum rulezi aplicația
1. Asigură-te că ai instalat Node.js (>= 18 recomandat).
2. În rădăcina proiectului rulează `npm install` (nu există dependențe externe, dar menține consistența proiectului).
3. Pornește serverul cu `npm start` sau `node index.js`.
4. Serverul ascultă implicit pe portul 3000 (modifică argumentul din `server.listen` dacă ai nevoie de alt port).

## Exemple rapide cu `curl`
```bash
# Lista completă de produse
curl http://localhost:3000/products/list

# Detalii pentru produsul cu ID 3
curl http://localhost:3000/products/details/3

# Căutare după nume și preț maxim
curl "http://localhost:3000/products/search?name=pl&maxPrice=150"

# Accesare rută admin (necesită antet role)
curl -H "role: Admin" http://localhost:3000/admin/reports
```

## Idei de extindere
- Persistență reală a produselor într-o bază de date sau fișier JSON.
- Mecansim de autentificare și emitere de token-uri în locul antetului static.
- Teste unitare pentru rutare și pipe-ul de transformare.
- Middleware generic pentru validarea și logarea cererilor.
