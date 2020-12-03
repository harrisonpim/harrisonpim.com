clean:
	rm -rf .next node_modules out

install: clean
	yarn install netlify-cli

build: install
	yarn export
	cp ./_redirects ./out/_redirects

serve: build
	yarn start

dev: install
	ntl dev
