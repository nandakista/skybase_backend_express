FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Enable Corepack and prepare pnpm, then install
RUN corepack enable && corepack prepare pnpm@latest --activate \
	&& pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3001

CMD ["node", "dist/server.js"]