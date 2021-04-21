FROM node:10-alpine as builder

# Set NODE_ENV to production
ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock /usr/src/app/
RUN npm install && npm cache clean

# Copy source scripts
COPY . /usr/src/app

# Build react SPA bundle
RUN GENERATE_SOURCEMAP=false yarn build

FROM nginx:1.15-alpine

# Set healthcheck route
RUN apk --no-cache add curl
HEALTHCHECK CMD curl -f http://localhost/healthcheck || exit 1

# Copy nginx conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copy application bundle
RUN mkdir -p /var/www/html
COPY --from=builder /usr/src/app/build /var/www/html/

# Runtime
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
