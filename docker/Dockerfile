FROM registry.gz.cvte.cn/library/node:pandora-v1

WORKDIR /app

COPY ENOWParse.tar.gz .

COPY start.sh .

RUN chmod +x start.sh

RUN tar -xf ENOWParse.tar.gz

CMD ["bash", "-c", "/app/start.sh"]
