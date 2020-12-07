clean:
	rm -rf .next node_modules out

install: clean
	yarn install

build: install
	yarn build && yarn export

serve: build
	yarn start

dev: install
	ntl dev
