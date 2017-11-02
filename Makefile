
init:
	cd projectlist/client && yarn install
	cd reports/client && yarn install
	cd integration/client && yarn install

build: build-core build-projectlist build-reports build-integration build-loadbalancer

build-core: build-core-server build-core-docker-image

build-core-server:
	cd core/server && ./gradlew build

build-core-docker-image:
	cd core && docker build -t microfrontends/core:latest .

build-projectlist: build-projectlist-server build-projectlist-client build-projectlist-docker-image

build-projectlist-server:
	cd projectlist/server && ./gradlew build

build-projectlist-client:
	cd projectlist/client && yarn build

build-projectlist-docker-image:
	cd projectlist && docker build -t microfrontends/projectlist:latest .

build-reports: build-reports-server build-reports-client build-reports-docker-image

build-reports-server:
	cd reports/server && ./gradlew build

build-reports-client:
	cd reports/client && yarn build

build-reports-docker-image:
	cd reports && docker build -t microfrontends/reports:latest .

build-integration: build-integration-client build-integration-docker-image

build-integration-client:
	cd integration/client && yarn build

build-integration-docker-image:
	cd integration && docker build -t microfrontends/integration:latest .

build-loadbalancer: build-loadbalancer-docker-image

build-loadbalancer-docker-image:
	cd loadbalancer && docker build -t microfrontends/loadbalancer:latest .