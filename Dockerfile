FROM node:12-alpine

WORKDIR /opt/app

ENV PORT=80

RUN echo 'set -e' >> /boot.sh

RUN echo 'crond' >> /boot.sh

RUN echo 'npm install --production' >> /boot.sh

CMD sh /boot.sh && npm run build && npm run start
