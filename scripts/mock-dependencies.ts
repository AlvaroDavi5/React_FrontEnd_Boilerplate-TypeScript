import MockedExternalServers from '@dev/mockedExternalServers/index';


function mockServiceDependencies() {
	console.info(
		'\n # Mocking service dependencies... \n # Update your projects env file \n'
	);

	const externalServices = new MockedExternalServers();
	externalServices.start();
}

mockServiceDependencies();
