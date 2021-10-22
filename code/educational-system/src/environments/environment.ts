// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiVersion = 'v1';

export const environment = {
  production: false,
  endpoint: `https://425plci4yi.execute-api.us-east-1.amazonaws.com/dev/api/${apiVersion}`
};

