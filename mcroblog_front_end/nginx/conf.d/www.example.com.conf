server {
    listen 80;
    return 301 https://$host$request_uri;
    server_name www.catchcat.top;
}

server {
    listen 443 ssl;
    server_name www.catchcat.top;
    charset utf-8;
    ssl_certificate /etc/letsencrypt/live/www.catchcat.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.catchcat.top/privkey.pem; 
    location / {
       alias /user/src/app/mcroblog_front_end/dist/;
    }

}

