### Build docker

  - `docker compose build`

### Run docker

  - `docker compose up`

### Set up front-end

- ### Install node modules

  - `docker compose run client yarn`

- ### Run tests

  - `docker compose run client yarn test`

- ### Install a new package

  - `docker compose run client yarn add <package_name>`

### Set up back-end

- ### Update the database schema

  - `docker compose run server python manage.py makemigrations`

- ### Apply the migration

  - `docker compose run server python manage.py migrate`

- ### Create superuser

  - `docker compose run server python manage.py createsuperuser`

- ### Django shell

  - `docker compose run server python manage.py shell`

- ### Run tests

  - `docker compose run server python manage.py test`

- ### Collect static files

  - `docker compose run server python manage.py collectstatic`

- ### Create a new Django app

  - `docker compose run server python manage.py startapp <your_app_name>`
