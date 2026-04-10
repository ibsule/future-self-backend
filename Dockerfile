FROM node:20-slim
WORKDIR /app
COPY . .
RUN npm install --frozen-lockfile
RUN npm run build
EXPOSE 5001
CMD ["npm", "start"]