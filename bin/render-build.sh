#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
yarn  install --production
bin/vite build --clear --mode=production`
./bin/rails assets:precompile
./bin/rails assets:clean
