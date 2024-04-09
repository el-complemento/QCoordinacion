FROM node:18-bullseye

# CONTAINER_SOURCE_PATH
WORKDIR /var/www/html

# Copiando script
COPY ./entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

# Agregando los archivos del proyecto. TODO: Probar si es necesario
ADD . .

# Instalando dependencias
RUN npm install -g npm
RUN npm config set registry http://registry.npmjs.org/
RUN npm install

# Exponiendo el puerto 3000. TODO: Probar si es necesario
EXPOSE 3000

ENTRYPOINT ["sh", "entrypoint.sh" ]

CMD ["npm", "run", "dev"]