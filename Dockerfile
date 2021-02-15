# Use an official Elixir runtime as a parent image
FROM elixir:latest

RUN echo $(ls)

RUN apt-get update && \
  apt-get install -y apt-utils && \
  apt-get install -y postgresql-client && \
  curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
  apt-get install -y nodejs && \
  npm i -g nodemon

# Create app directory and copy the Elixir projects into it
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN echo $(ls)
#RUN chmod 777 /app/entrypoint.sh \
#    && ln -s /app/entrypoint.sh /

# Install hex package manager
RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix archive.install hex phx_new 1.5.7 --force
#RUN mix archive.install https://github.com/phoenixframework/archives/raw/master/phx_new.ez --force
#RUN mix archive.install hex phx_new 1.5.7 --force

# Compile the project
#RUN mix do compile --force


#CMD ["entrypoint.sh"]