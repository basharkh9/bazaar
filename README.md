To run the project add .env.local file

touch .env.local 

with content of :

MONGODB_URI="mongodb://localhost:27017/bazaardb"

SERVER=http://localhost:3000

bazaar_jwtPrivateKey=YOURSUPERCOMPLEXSECUREKEY
 
import products.json into products collection.

then run yarn && yarn dev
