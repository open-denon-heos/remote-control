FROM ubuntu/apache2
COPY ./public /var/www/html
COPY ./apache-docker-config/heos.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 8000