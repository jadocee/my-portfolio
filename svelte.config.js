// import adapter from '@sveltejs/adapter-auto';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/variables.scss" as *;'
			}
		})
	],
	kit: {
		adapter: netlifyAdapter(),
		prerender: {
			enabled: true,
			
			onError: 'fail',
		},
		floc: false,
		methodOverride: {
			allowed: ['PATCH', 'DELETE'],
		},
		target: '#svelte',
		// hydrate the <div id="svelte"> element in src/app.html
		// target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$styles: resolve('./src/styles'),
					$components: resolve('./src/lib/components'),
					// $lib: resolve('./src/lib')
				}
			},

			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@use "src/variables.scss" as *;'
					}
				}
			}
		},
		files: {
			assets: 'static',
			lib: 'src/lib',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',
			template: 'src/app.html',
		}
	}
};

export default config;
