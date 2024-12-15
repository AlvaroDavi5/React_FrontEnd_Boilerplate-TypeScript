# React Front-End Boilerplate :fire:

## Description

Node.js Boilerplate for Front-End using TypeScript and Next.js (React.js).

## Overview

### Main technologies

- **JavaScript**: Web programming language;
- **TypeScript**: JavaScript superset for typing;
- **Node.js**: JavaScript runtime;
- **React.js**: TypeScript Framework for Front-End;
	- **Next.js**: TypeScript Framework for Front-End (React-based);
- **Axios**: HTTP requests tool;
- **Socket.io**: WebSocket library;
- **Express**: Robust tooling for HTTP servers;
- **Zod**: Schema validator library;
- **Jest**: Testing Framework;
- **ESLint**: JavaScript/TypeScript linter and formatter;
- **Huksy**: Git hooks tool used to check tests, format the code and the commits;

---

### Install dependencies

1. Install project dependencies  
```shell
yarn install
```

#### What to do if the service goes down

- Check the logs;
- Test the dependencies and execution locally;
- Run automated tests;
- If necessary, merge with a hotfix on git;
- Rebuild the project and restart the service;

## Environment Preparation

1. Copy dotenv file  
```shell
cp .env.local ./.env # copy development local example
source ./.env # load envs on shell session
```

## Running Locally

```shell
yarn run mock-dependencies # start external service mock
yarn run start:dev # start application in development mode
```

## Interface

- [localhost:3001](http://localhost:3001/) - Application Interface  
	* `/` - Index Page
- [localhost:4000](http://localhost:4000/) - Mocked Back-End Page  

___

### TO DO

- **Concepts**
	* Application State
		- [ ] Redux
		- [ ] Context API
		- [ ] Fetch API
	- [ ] UseState, UseEffect, UseContext
	* Rendering
		- [ ] Static Site Generation
		- [ ] Client-Side Rendering
			- Client-side Fetching
		- [ ] Server-Side Rendering
			- getStaticProps
			- getServerSideProps
	* Components
		- [ ] Form
		- [ ] NavBar
		- [ ] Toast
		- [ ] DropDown
		- [ ] Modal
		- [ ] Image
		- [ ] Header
		- [ ] Scroller
	* Actions
		- [ ] Validations
		- [ ] Requests (Http & GraphQl)
		- [ ] Connections (WebSockets)
		- [ ] Hooks
- **Tests**
	- [ ] Component Render Test
	- [ ] Page Render Test
