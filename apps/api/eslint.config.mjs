import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'coverage/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globalsNode() },
    },
  },
);

function globalsNode() {
  return {
    process: 'readonly',
    console: 'readonly',
    module: 'writable',
    require: 'readonly',
    __dirname: 'readonly',
    jest: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly',
    beforeAll: 'readonly',
    afterAll: 'readonly',
  };
}
