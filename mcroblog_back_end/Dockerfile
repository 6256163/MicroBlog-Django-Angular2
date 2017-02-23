FROM python:2-slim
ENV PYTHONUNBUFFERED 1
EXPOSE 8000 
COPY . /usr/src/app/mcroblog_back_end
RUN apt-get -qq update
RUN apt-get install -y build-essential python3-dev libmysqlclient-dev libjpeg-dev
RUN pip install -r /usr/src/app/mcroblog_back_end/requirements.txt
WORKDIR /usr/src/app/mcroblog_back_end/
RUN mkdir -p logs/django_log/
RUN touch logs/django_log/log
