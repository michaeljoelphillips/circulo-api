.PHONY : start check build test clean install

# Default Target
check: node_modules
	npx tsc
	npx eslint -f unix index.ts src/**/*.ts

node_modules:
	npm install

# Phony Targets
start: node_modules
	npx ts-node -r dotenv/config index.ts

build: clean check test
	npx swc index.ts -o build/index.js
	npx swc src -d build/src

test: node_modules
	npx jest

clean:
	rm -rf build/*
	fd -Ie js . ./src/ --exec rm {}
