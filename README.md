# coffeetime


Initial work based on:

https://zellwk.com/blog/crud-express-mongodb/

Test branch::



## Stack

Node
Express
Mongo

nodemon (for automated running of the node app (dev only))
body-parser

## Running

``` ~~node server.js~~ ```
```npm run dev```




## database

DB is held at mLab under the `andrewdotdobson` account.


To connect using the mongo shell:
```mongo ds119070.mlab.com:19070/add-coffeetime -u <dbuser> -p <dbpassword>```

To connect using a driver via the standard MongoDB URI (what's this?):

```
	mongodb://<dbuser>:<dbpassword>@ds119070.mlab.com:19070/add-coffeetime


	username: add-coffeetime-app
	pass: cawffe33_T1fE

```


## SASS

We use the [Materialize](https://materializecss.com/about.html) framework.