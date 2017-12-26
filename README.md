# prj_mssql_mongo
Prueba de busqueda de precios en mongo

```js
//comando mongo
cd /c/xampp/htdocs/mongodb/3.6.0/bin/
mongoimport --db flamagas --collection accounts --file /c/xampp/htdocs/prj_mssql_mongo/data/accounts.js

mongoimport --db flamagas --collection products --file /c/xampp/htdocs/prj_mssql_mongo/data/products.js
mongoimport --db flamagas --collection priority --file /c/xampp/htdocs/prj_mssql_mongo/data/priority.js
mongoimport --db flamagas --collection structure --file /c/xampp/htdocs/prj_mssql_mongo/data/structure.js
mongoimport --db flamagas --collection conditions --file /c/xampp/htdocs/prj_mssql_mongo/data/conditions.js
mongoimport --db flamagas --collection accprod_loop --file /c/xampp/htdocs/prj_mssql_mongo/data/accprod_loop.js
```