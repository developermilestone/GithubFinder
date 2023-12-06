import { auth0Config, globalConfig } from './index';

describe('configs', () => {
  describe('enableDevTools', () => {

    jest.mock('./index', () => ({
      enableDevTools: process.env.NEXT_PUBLIC_ENABLE_REDUX_DEV_TOOLS === 'true',
    }));

    it('should be true when NEXT_PUBLIC_ENABLE_REDUX_DEV_TOOLS is "true"', () => {
      process.env.NEXT_PUBLIC_ENABLE_REDUX_DEV_TOOLS = 'true';
      jest.resetModules();
      const { enableDevTools } = require('./index');
  
      expect(enableDevTools).toBe(true);
    });
  
    it('should be false when NEXT_PUBLIC_ENABLE_REDUX_DEV_TOOLS is not "true"', () => {
      process.env.NEXT_PUBLIC_ENABLE_REDUX_DEV_TOOLS = 'false';
      jest.resetModules();
      const { enableDevTools } = require('./index');
  
      expect(enableDevTools).toBe(false);
    });
  });
  describe('Configuration Objects', () => {
    test('auth0Config should have correct properties', () => {
      expect(auth0Config).toHaveProperty('base_url');
      expect(auth0Config).toHaveProperty('client_id');
      expect(auth0Config).toHaveProperty('issuer_base_url');
    });
  
    test('globalConfig should have correct properties', () => {
      expect(globalConfig).toHaveProperty('appName');
    });
  
    test('globalConfig.appName should be "Github Finder"', () => {

      expect(globalConfig.appName).toBe('Github Finder');
    });
  });
});