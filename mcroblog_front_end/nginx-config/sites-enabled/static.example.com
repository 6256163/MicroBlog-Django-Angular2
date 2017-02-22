server{
	listen 80;
	return 301 https://$host$request_uri;
	server_name static.catchcat.top;
	charset	utf-8;
	location / {
		autoindex on; #显示索引
        	autoindex_exact_size on; #显示大小
		autoindex_localtime on;   #显示时间
	}
	client_max_body_size 10M;
	root /user/src/app/mcroblog_back_end/media/;

}

server{
	listen 443 ssl;
	server_name static.catchcat.top;
	charset utf-8;
	location / {
		autoindex on; #显示索引
                autoindex_exact_size on; #显示大小
                autoindex_localtime on;   #显示时间
	}
	client_max_body_size 10M;
        root /usr/src/app/mcroblog_back_end/media/;
	ssl_certificate /etc/letsencrypt/live/www.catchcat.top/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/www.catchcat.top/privkey.pem;
	
}
