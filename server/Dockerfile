FROM python:3.10.13

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && \
    apt-get install -y gettext

COPY pyproject.toml poetry.lock /

RUN pip install poetry

RUN poetry config virtualenvs.create false && \
    poetry install
