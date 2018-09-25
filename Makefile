lint:
	npm run lint
test:
	npm run test

.PHONY: dependencies
dependencies:
	npm install

.PHONY: build
build:
	npm run build

.PHONY: run
run:
	npm run build
	npm start

.PHONY: test
test:
	npm run build
	npm run test

# builds the production docker image
.PHONY: build-prod-image
build-prod-image:
	docker build --cache-from=app -t ${KUBERNETES_SERVICE_NAME} -f Dockerfile ${ARGS} .

# download scripts for build & deploy
.PHONY: get-deployment-scripts
get-deployment-scripts:
# SSH Permissions not working on CircleCI v2.0
# https://discuss.circleci.com/t/ssh-permissions-not-working-on-circleci-v2-0/15962
ifeq ($(CIRCLECI),true)
	ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub
	ssh-add -d ~/.ssh/id_rsa.pub
endif
	rm -rf continuous-deployment-scripts deployment
	git clone git@github.com:yoigo-thor/continuous-deployment-scripts.git
	mv continuous-deployment-scripts/deployment .