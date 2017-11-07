# Microfrontends Proof of Concept

This repository tries to implement a [microfrontends](https://micro-frontends.org/) approach using a up to date technology stack. The proof of concept tries to evaluate the production readiness of this stack.

## The stack

This proof of concept contains several microservices providing data which should be displayed in an single page application.

Backends are written in [Kotlin](https://kotlinlang.org/) using the [Spring Boot](https://projects.spring.io/spring-boot/) framework and [Gradle](https://gradle.org/) to build the application.

Frontends are written in [TypeScript](https://www.typescriptlang.org/) using [React](https://reactjs.org/) as the UI framework and [yarn](https://yarnpkg.com/en/)/[create-react-app](https://github.com/wmonk/create-react-app-typescript) to build the application. Frontends use [WebComponents](https://developer.mozilla.org/de/docs/Web/Web_Components) with [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM) to separate their DOM tree from other applications inside the integration layer.

Each backend is bundled with its frontend inside a [Docker](https://www.docker.com/) image. It uses the builtin functionality of Spring Boot to serve the static assets generated in the client build process.

The backend also provides a static URL `/static/js/bundle.js` which is a redirect to the compiled javascript file (e.g. `/static/js/bundle.a123b3ac.js`). This enables us to load the javascript file later on dynamically without needing to know the exact filename.

To run the whole stack [Docker Compose](https://docs.docker.com/compose/overview/) is used.

### Service `core`

The core service does provide data which is used by two other services to calculate another representation of the data. No UI is communicating with this service directly.

The service provides an API under `/api/v1/data` which returns data containing a list of projects, resources and allocations. Allocations are linked to projects and resources.

### Service `projectlist`

The project list service does provide a simplified version of the projects retrieved from the core service. As the UI of projectlist does need only some information about the projects and their allocations.

The service provides its UI as a web component inside

### Service `reports`

The reports service does provide an sliced version of the allocation. The allocation are split over a static range of days according to the project length. This calculation is done in the service to provide a pre-calculated data set to the UI.

### Service `integration`

The integration service provides only a UI which contains a navigation to switch between the UIs of the projectlist and integration service.

The javascript of each application is only loaded when it is selected in the menu. This results in a short delay when selecting the menu entry for the first time. But future selects are loaded immediately.

Each component included in the integration UI will receive a property `baseurl` which points to the base-path of the application. This is used by each application to resolve the path to their API.

The integration layer must only know the baseUrl and web component name of an application. Everything else is handled transparently with an [React component](integration/client/src/components/GenericChildApp.tsx) used for integrating the applications.

### Service `loadbalancer`

The loadbalancer service is only used serve all services under one domain. So it serves each service by proxying the requests of a sub folder to the respective service.

- `/reports/*` will proxy requests to the reports service
- `/projectlist/*` will proxy requests to the projectlist service
- `/*` will redirect all other requests to the integration service

The services are also started inside the same context to match the path when requests are passed to them. This can easily be achieved by using Spring Boots `server.context.path` property. The Spring Boot services also do have a configuration (`service.core`) where you can configure the URL under which they can access backend services like the core service.

## Build & run the stack

Use this as a playbook to build and run the stack.

```bash
# We need to have installed the following tools:
# - make
# - Java JDK 8
# - Node.JS (>=6)
# - yarn
# - docker
# - docker-compose

# Load all dependencies with yarn
make init

# Build all services (client, server, docker image)
make build

# Run the stack
docker-compose up
```

## What happens when I open the application?

In a deployed stack something like the following will happen:

- Request to http://127.0.0.1/ will pass the request to the integration service and pass back the html/js for the integration UI
- The integration UI will request the js for the projectlist app under http://127.0.0.1/projectlist/static/js/bundle.js
- The server will return a redirect to http://127.0.0.1/projectlist/static/js/bundle.a123b3ac.js
- The client will load the js file
- The client will display the projectlist app inside a web component with shadow dom
- The user can click on the "load data" button which will issue a request to a URL built from `baseUrl=/projectlist` and `apiPath=/api/v1/projects`.
- The server will pass this request to the projectlist service which then returns the requested data

## Modify a service

Each service can run in a standalone mode. This requires a development environment for the Kotlin service. You can use [IntelliJ](https://www.jetbrains.com/idea/) for example. Just import the Gradle project and you're ready to run.

## Known limitations

This proof of concept does work but has several limitations inside the UI of them some could not be fully resolved.

### Browser limitation for WebComponents

When using WebComponents with javascript compiled to EcmaScript 5 it is impossible to instantiate WebComponents as they are not native classes, but this is a requirement of the WebComponents browser API.

There is a polyfill to fix this: https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs

Older browsers do not support WebComponents at all. There is also a polyfill to fix this: https://github.com/webcomponents/webcomponentsjs#webcomponentsjs-v1-spec-polyfills

Keep in mind that polyfills must be loaded before any WebComponent is used. Otherwise this will cause issues.

### React compatibility with Shadow DOM

React is not fully compatible to Shadow DOM. For React 17 there are some planned changes which should make this easier but until then some things would not work as expected.

The biggest problem is that by default React will not receive any events triggered by a component inside the Shadow DOM.

- Issue on GitHub: https://github.com/facebook/react/issues/9242
- Workaround on StackOverflow: https://stackoverflow.com/a/37891448
- NPM dependency with a working fix: https://www.npmjs.com/package/react-shadow-dom-retarget-events

All in all the workaround does fix the problem but there is no native support by React.

### Styling libraries compatibility with Shadow DOM

Almost all advanced styling libraries do have major issues working inside a Shadow DOM, don't have good typescript integration or do miss broad adoption. Some libraries plan to support Shadow DOM but none of them has a production ready implementation as of 2017-11-06.

#### [CSS modules](https://github.com/css-modules/css-modules)

_This approach was used in the reports service._

Styling works good with css modules. This will generate a single css file which can later be imported inside the ShadowDOM.

#### [styled-components](https://www.styled-components.com/)

_This approach was used in the projectlist service._

- [-] Missing ShadowDOM support
-- https://github.com/styled-components/styled-components/issues/659
-- https://github.com/styled-components/styled-components/pull/1102
- [-] Missing support to instantiate multiple instances (one per application)
-- https://github.com/styled-components/styled-components/issues/1032

#### [jss](http://cssinjs.org/)

- [-] Missing typescript support: https://github.com/cssinjs/react-jss/issues/151
- [+] Does support the Shadow DOM mounting using `insertionPoint`: http://cssinjs.org/js-api?v=v9.2.0#setup-jss-instance
- [+] React-JSS does also support Shadow DOM mounting: http://cssinjs.org/react-jss?v=v7.2.0#custom-setup
- [+] JSS is used by [material-ui](https://github.com/callemall/material-ui)

#### [typestyle](https://typestyle.github.io/#/)

- [-] Very difficult to use when requiring multiple instances
- [-] CSS animations are difficult to use
