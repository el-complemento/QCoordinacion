#!/bin/bash

chmod -R 777 ./node_modules

# Para solucionar problema con vite y los node_modules instalados en volumen separado de docker
# Link: https://github.com/vitejs/vite/issues/2671#issuecomment-829535806
npm rebuild esbuild
chmod -R 777 ./node_modules
exec "$@"