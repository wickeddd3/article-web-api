# article-web-api

Use Node.js v20.15.0

---

#### How to run on local

Install dependencies
```
yarn install
```

Create .env file with this value.
- `DATABASE_URL` - add your database url ex. "mysql://user:password@host:port/database-name?ssl-mode=REQUIRED"
- `CLOUDINARY_CLOUD_NAME` - add your cloudinary cloud name
- `CLOUDINARY_API_KEY` - add your cloudinary api key
- `CLOUDINARY_API_SECRET` - add your cloudinary api secret
- `APP_URL` - add frontend app local url
```
NODE_ENV=development
PORT=3000
DATABASE_URL=
APP_URL=http://localhost:5173

#JWT
JWT_SECRET=article-web-api
JWT_EXPIRATION=1h

#CLOUDINARY
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run development mode, http://localhost:3000

```
yarn dev
```

Generate build files
```
yarn build
```