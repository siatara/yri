module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: [
		'airbnb-base/legacy',
		'prettier',
		'plugin:import/typescript',
		'plugin:import/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		camelcase: 1,
		enforceForClassFields: 0,
		exceptMethods: 0,
		'no-extra-boolean-cast': 0,
		'no-console': 0,
		'max-len': ['error', { code: 120 }],
		'prefer-template': 1,
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				ts: 'never'
			}
		]
	}
}
