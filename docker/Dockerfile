FROM node:20.13-bookworm-slim

# CONTAINER_SOURCE_PATH
WORKDIR /var/www/html

#RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

# Copiando script entrypoint
#COPY ./entrypoint.sh ./entrypoint.sh
COPY ./package.json .

# Instalando dependencias
RUN npm i -g npm@latest; \
  # Install pnpm
  npm install -g pnpm; \
  pnpm --version; \
  pnpm setup; \
  mkdir -p /usr/local/share/pnpm &&\
  export PNPM_HOME="/usr/local/share/pnpm" &&\
  export PATH="$PNPM_HOME:$PATH"; \
  pnpm bin -g &&\
  # Install dependencies
  pnpm install

# Agregando los archivos del proyecto. TODO: Probar si es necesario
ADD . .

# Exponiendo el puerto 3000. TODO: Probar si es necesario
EXPOSE 3000

CMD ["pnpm", "run", "dev"]