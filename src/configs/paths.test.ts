import { externalPath, paths } from './paths';

describe('paths', () => {
  it('should have the correct main path', () => {
    expect(paths.main).toBe('/');
  });

  it('should have the correct favorites path', () => {
    expect(paths.favorites).toBe('/favorites');
  });

  it('should have the correct auth login path', () => {
    expect(paths.api.auth.login).toBe('/api/auth/login');
  });

  it('should have the correct auth logout path', () => {
    expect(paths.api.auth.logout).toBe('/api/auth/logout');
  });

  it('should have the correct auth callback path', () => {
    expect(paths.api.auth.callback).toBe('/api/auth/callback');
  });

  it('should have the correct graphql path', () => {
    expect(paths.api.graphql).toBe('/api/graphql');
  });
});

describe('externalPath', () => {
  it('should have the correct githubApi path', () => {
    expect(externalPath.githubApi).toBe('https://api.github.com/graphql');
  });
});