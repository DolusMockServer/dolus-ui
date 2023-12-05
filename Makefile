run-dev:
	npm start

run:
	npm run build
	serve -s build

gen:
	rm -rf 	src/gen/api
	openapi-generator-cli generate -i  api/dolus.yaml -g javascript-flowtyped -o src/gen/api