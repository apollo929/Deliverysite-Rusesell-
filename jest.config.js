const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/api',
    '<rootDir>/libs/shared',
    '<rootDir>/libs/libs/api/shared',
    '<rootDir>/libs/api/core/src/lib/database',
    '<rootDir>/libs/api/core/src/lib/tested',
    '<rootDir>/libs/ui/graphql-service',
    '<rootDir>/libs/api/tool',
    '<rootDir>/libs/ui/testing',
    '<rootDir>/libs/ui/admin',
    '<rootDir>/libs/ui/admin/admin-jobs',
    '<rootDir>/libs/api/shared/tool',
  ],
};
