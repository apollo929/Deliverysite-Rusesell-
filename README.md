# Main info

- **The project has to be run with Node.js version ^12 !!!**
- **Never change libs/graphql/src/lib/graphql.ts manually, it will be generated by the system !!!**

## Run system locally
```
cd docker/
docker-compose up -d
cd ..
npm run typegen
# By opening http://localhost:6431, you can use local pgadmin instance. Instructions are below in this document.
npm run migrate
npm run seed
nx serve dfobobcat-ui
```

# Connect to local PGAdmin instance
When you first open PGAdmin, it will suggest you to set a Master password!
**Do set the master password, without it you won't be able to connect to the DB.**

1. open http://localhost:6431 in your browser
2. Add the new server with details:
```
Host: dfobobcat_db
Port: 5432
Maintenance DB: postgres
Username: admin
Password: password
```
3. Click Save 

# Stack
The project is built on:
- NRWL Nx monorepo
- Angular and Ionic for mobile interfaces
- Nest.js
- Postgres and Typeorm

## Recommender software
- VSCode
- VScode plugin for nx: https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console
- VScode plugins for typescript/angular etc
- Dbeaver for connecting to the DB

# Developmen process

## Connect to the local database
- It is recommended to use dbeaver GUI to connect to the database
- You can check DB credentials in `docker/docker-compose.yml`

## Graphql

- Graphql schema definition is in `libs/api/core/src/lib/schema/root.graphql`
- Graphql documents is in `libs/api/core/src/lib/graphql/query/documents.graphql`

1. Apply your changes to the schema
2. Add new queries into the documents file
3. run `npm run typegen`
4. Done!


## Prelive deploy

- Currently no deploy happens on the remote server. You should build application locally, commit the dist folder into repository and pull changes on the server.

# Coding style

- Each major feature = new nx lib in the `/libs` folder.

# Updating let's encrypt certs on the server

- The lets encrypt certs on the server have to be updated manually
- You will need to update them in separate for `prelive.dfobobcatandcartage.com` as well as `app.dfobobcatandcartage.com`
- Updating is pretty simple: run `sudo certbot certonly --manual` and follow the instructions.
- After certbot has done his work, you will need to do the following: 

1. Certbot `sudo certbot certonly --manual` will generate 2 files for you: privkey.pem and fullchain.pem, it will display the file paths in the above command output.
2. Because you run the `sudo certbot certonly --manual` command 2 times: for prelive and production, you will get 2 pairs of those files.
3. Take a look at the contents of `/home/dev/.secret`, you will see
> dfofullchain.pem  dfoprivkey.pem  - pair for app.* production domain
> fullchain2.pem  privkey2.pem - pair for prelive.* staging domain
4. Your task is to replace contents of `/home/dev/.secret` with freshly generated files on the step 1.
5. Change permissions for the files, for example, this is how you would do that for the production files:
```
sudo chown dev:root dfoprivkey.pem dfofullchain.pem
sudo chmod 400 dfoprivkey.pem dfofullchain.pem
```
6. Restart the apps
   
# Managing deploy
- Deploy is managed thru `pm2` https://pm2.keymetrics.io/

# Migrations
- Every time you modify the DB structure, you should run `npm run typeorm migration:generate -- -n NameYourMigration`
- Then you should build the Backend part, run `npm run build:be:prod`
- After migrations were generated for you, examine the contents of the migration to make sure they do exactly what you expect
- Then, run `npm run migrate` to apply migrations to the database
