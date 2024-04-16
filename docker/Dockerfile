FROM node:21-bookworm

# CONTAINER_SOURCE_PATH
WORKDIR /var/www/html


# Copiando script entrypoint
COPY ./entrypoint.sh ./entrypoint.sh
COPY ./package.json .

# Instalando dependencias
RUN npm install -g vite
RUN npm install

# Agregando los archivos del proyecto. TODO: Probar si es necesario
ADD . .


RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["sh", "./entrypoint.sh" ]

# Exponiendo el puerto 3000. TODO: Probar si es necesario
EXPOSE 3000

CMD ["npm", "run", "dev"]