import nextPlugin from '@next/eslint-plugin-next';
import rootConfig from '../../eslint.config.js';

export default [
  ...rootConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['recommended'].rules,
      // Next.js 앱 특정 규칙 추가
    },
  },
];
