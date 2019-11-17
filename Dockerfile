FROM node:10-alpine

WORKDIR /opt/app

ENV PORT=80
ENV CLIENT_PUBLIC_PATH=http://torchment.openode.io/

RUN echo 'set -e' >> /boot.sh

# daemon for cron jobs
RUN echo 'crond' >> /boot.sh
# RUN echo 'crontab .openode.cron' >> /boot.sh

RUN echo 'npm install --production' >> /boot.sh

# npm start, make sure to have a start attribute in "scripts" in package.json
CMD sh /boot.sh && npm start
