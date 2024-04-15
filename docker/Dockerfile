FROM node:21-bookworm

# CONTAINER_SOURCE_PATH
WORKDIR /var/www/html

# Copiando script entrypoint
COPY ./entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

# Agregando los archivos del proyecto. TODO: Probar si es necesario
ADD . .

# Instalando dependencias
RUN npm install -g npm
RUN npm install

RUN npm install -g vite

# Exponiendo el puerto 3000. TODO: Probar si es necesario
EXPOSE 3000

ENTRYPOINT ["sh", "entrypoint.sh" ]

CMD ["npm", "run", "dev"]