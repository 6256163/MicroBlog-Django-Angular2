FROM python:3-onbuild
COPY ./MicroBlog-Django-Angular2 /usr/src/app
RUN sudo apt-get install python3-dev libmysqlclient-dev
RUN pip install -r /usr/src/app/MicroBlog-Django-Angular2/mcroblog_back_end/requirements.txt
CMD ./MicroBlog-Django-Angular2/mcroblog_back_end/gunicorn_start
