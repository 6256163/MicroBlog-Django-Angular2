  upstream api.catchcat.top {
    # fail_timeout=0 means we always retry an upstream even if it failed
    # to return a good HTTP response

    # for UNIX domain socket setups
    server web:8000

    # for a TCP configuration
    # server 192.168.0.7:8000 fail_timeout=0;
  }



  server {
    listen 80;
    return 301 https://$host$request_uri;
    server_name api.catchcat.top;
    charset     utf-8;
    location ~ {
	proxy_pass   http://127.0.0.1:8000;
	proxy_set_header Host       $host;
    }
    client_max_body_size 10M;	
  }

  server {
    listen 443 ssl;
    server_name api.catchcat.top;
    keepalive_timeout 5;
    access_log /user/src/app/mcroblog_back_end/logs/nginx-access.log;
    error_log /user/src/app/mcroblog_back_end/logs/nginx-error.log;
    charset utf-8;
    location ~ {
        proxy_pass http://api.catchcat.top;
        proxy_set_header Host $host;
    }
    client_max_body_size 10M;
    ssl_certificate /etc/letsencrypt/live/www.catchcat.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.catchcat.top/privkey.pem;
  }

