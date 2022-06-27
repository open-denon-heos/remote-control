FROM ubuntu/apache2

RUN a2enmod rewrite
RUN a2enmod proxy
RUN a2enmod proxy_http

COPY ./public /var/www/html
COPY ./apache-docker-config/heos.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 8000