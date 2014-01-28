DEBUG=couch_models:*
MOCHA=@NODE_ENV=test DEBUG=$(DEBUG) ./node_modules/.bin/mocha

jshint:
	@find . ! -path "*/test/*" ! -path "*/node_modules/*" -type f -name "*.js" -exec jshint {} \;

install:
	@NODE_ENV=development npm install

test: install
	$(MOCHA) ./test/*.mocha.js

test-cov: install
	$(MOCHA) --require blanket --reporter html-cov ./test/*.mocha.js > coverage.html

.PHONY: install test test-cov
