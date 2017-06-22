// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: "AIzaSyDACtSHaQWplSi-y6e2vsD2EmmjXtDMOjk",
		authDomain: "zomoztest-f8fdd.firebaseapp.com",
		databaseURL: "https://zomoztest-f8fdd.firebaseio.com",
		projectId: "zomoztest-f8fdd",
		storageBucket: "gs://zomoztest-f8fdd.appspot.com",
		messagingSenderId: "582527205554"
	}
};
