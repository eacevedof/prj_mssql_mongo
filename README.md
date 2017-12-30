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
mongoimport --db flamagas --collection accproducts --file /c/xampp/htdocs/prj_mssql_mongo/data/accprod.js

## Backup

mongodump -h 127.0.0.1 -d flamagas -o c:\shared\mongobk\

## Restore
mongo ds<123456>.mlab.com:35827/flamagas -u xxx -p yyy
mongorestore -h ds<123456>.mlab.com:35827 -d flamagas -u xxx -p yyy c:\shared\mongobk\flamagas

```

# error
```
**Error de memoria**

$ node scp_pricing.js
https://stackoverflow.com/questions/38453801/best-way-to-process-results-of-multiple-sequential-dependent-mongo-queries-in

accounts  opened!
products  opened!
accprods  opened!
priority  opened!
structure  opened!
conditions  opened!

<--- Last few GCs --->

[16464:00000000002E4830]    62868 ms: Mark-sweep 1407.7 (1487.6) -> 1407.7 (1467.6) MB, 1008.9 / 0.0 ms
(+ 0.0 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 1009 ms) last resort GC in old space requested
[16464:00000000002E4830]    63881 ms: Mark-sweep 1407.7 (1467.6) -> 1407.7 (1467.6) MB, 1013.2 / 0.0 ms
last resort GC in old space requested


<--- JS stacktrace --->

==== JS stack trace =========================================

Security context: 000000A525525EC1 <JSObject>
    1: completeMany [C:\xampp\htdocs\prj_mssql_mongo\node_modules\mongoose\lib\query.js:~1456] [pc=000001E7DE5CF855](this=000001FC0850BE21 <JSGlobal Object>,model=000001BB1FAF18D1 <JSFunction model (sfi = 0000012259497159)>,docs=0000037F2D6AB891 <JSArray[191610]>,fields=0000037F2D6AC2E1 <Object map = 00000275C4F023B9>,userProvidedFields=0000037F2D6AC319 <Object map = 00000275C4F023B9>,pop=0000...

FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory

## solución
https://stackoverflow.com/questions/38558989/node-js-heap-out-of-memory

$ node --max-old-space-size=4096 scp_pricing.js
```

## error
```
al conectar con mlab.com:

Db.prototype.authenticate method will no longer be available in the next major release 3.x as MongoDB 3.6 will only allow auth against users in the admin db and will no longer allow multiple credentials on a socket. Please authenticate using MongoClient.connect with auth credentials

##solucion


```