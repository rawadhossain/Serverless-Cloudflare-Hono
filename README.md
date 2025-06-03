# Serverless Backends using Cloudflare workers
[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types)

# Hono install
Initialize a new app
```
npm create hono@latest my-app
```

Login to cloudflare via the `wrangler cli`
```
bunx wrangler login
```

Deploy your worker
```
bun run deploy
```
<br>
<br>

# Install prisma in your project
## 1. Init Prisma
```
bun add prisma

bunx prisma init
```

## 2. After schema creation, migrate prisma

```
bunx prisma migrate dev
```

## 3. After migration, replace `DATABASE_URL` to prisma accelerate URL
```
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=your_key"
```
## 4. Add accelerate as a dependency
```
bun add @prisma/extension-accelerate
```
## 5. Generate the prisma client
```
bunx prisma generate --no-engine
```
## 6. import in main code (index.ts)
```
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
```
