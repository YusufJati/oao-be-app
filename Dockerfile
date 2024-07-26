FROM node:20-alpine as development

# Working directory
WORKDIR /app

COPY  package*.json .
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

# # ----------------------
FROM node:20-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /app

# COPY package*.json ./
# COPY prisma ./prisma/

# RUN npm ci --only=production

COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/package*.json ./
COPY --from=development /app/dist ./dist

EXPOSE 8080
CMD ["node", "dist/index.js"]



