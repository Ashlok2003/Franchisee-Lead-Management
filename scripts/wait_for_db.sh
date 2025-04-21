#!/bin/bash

echo "Waiting for MySQL to be ready..."

while ! nc -z db 36969; do
    echo "MySQL not yet ready, retrying..."
    sleep 2
done

echo "MySQL is ready!"
exec "$@"
