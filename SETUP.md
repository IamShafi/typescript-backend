## Project setup 

# Typescript Backend

1.

```
npm init

```

2.  setup package.json

```
"type": "module"

```

3.  Install Nodemon, prettier, concurrently

```
npm i -D nodemon, npm i -D prettier, npm i -D concurrently

setup prettier : .prettierrc , .prettierignore
```

4.  setup scripts : package.json -> 
```
 "scripts": {
    "build": "tsc",
    "compile": "tsc -w",
    "start": "npm run compile && node ./dist/index.js",
    "dev": "concurrently \"npm run compile\" \"nodemon ./dist/index.js\""
  },
```

5.  setup folder structure src/index.ts

```
$directories = "src/db", "src/controllers", "src/middleware", "src/routes", "src/models"
foreach ($dir in $directories) {
    mkdir $dir
}


```

6. Initialize git 

```
git init
```


7. setup Typescript  as dev dependencies
```
npm install --save-dev typescript @types/node

tsconfig.json:
{
    "compilerOptions": {
      "rootDirs": ["src/**/*"],
      "outDir": "dist",
      "sourceMap": true,
      "lib": ["es2020"],
      "target": "es2020",
      "module": "esnext",
      "moduleResolution": "node",
      "esModuleInterop": true,
      "verbatimModuleSyntax": false,
      "types": ["node"]
    }
  }
```

8. setup mongodb & .env mongoDB_URI && install dependencies
```
npm i cors bcryptjs dotenv mongoose express colors cookie-parser jsonwebtoken body-parser axios 
```

8.1 # setup PRISMA
```
npm install prisma typescript ts-node @types/node --save-dev
npx prisma
npx prisma init

npm install @prisma/client

npx prisma generate

```

9. setup custom error handling & file upload

10. setup middleware  routes and controllers

11. Logic Building - user.controller.js

12. MongoDB aggregate Pipeline
