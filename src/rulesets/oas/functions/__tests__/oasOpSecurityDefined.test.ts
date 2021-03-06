import { DiagnosticSeverity } from '@stoplight/types';
import { RuleType, Spectral } from '../../../../index';
import { rules as oas2Rules } from '../../../oas2/index.json';
import { rules as oas3Rules } from '../../../oas3/index.json';
import oasOpSecurityDefined from '../oasOpSecurityDefined';

describe('oasOpSecurityDefined', () => {
  describe('oas2', () => {
    const s = new Spectral();
    s.setFunctions({ oasOpSecurityDefined });
    s.setRules({
      'oas2-operation-security-defined': Object.assign(oas2Rules['oas2-operation-security-defined'], {
        recommended: true,
        type: RuleType[oas2Rules['oas2-operation-security-defined'].type],
      }),
    });

    test('validate a correct object (just in body)', async () => {
      const results = await s.run({
        securityDefinitions: {
          apikey: {},
        },
        paths: {
          '/path': {
            get: {
              security: [
                {
                  apikey: [],
                },
              ],
            },
          },
        },
      });
      expect(results.length).toEqual(0);
    });

    test('return errors on invalid object', async () => {
      const results = await s.run({
        securityDefinitions: {},
        paths: {
          '/path': {
            get: {
              security: [
                {
                  apikey: [],
                },
              ],
            },
          },
        },
      });

      expect(results).toEqual([
        {
          code: 'oas2-operation-security-defined',
          message: 'Operation `security` values must match a scheme defined in the `securityDefinitions` object.',
          path: ['paths', '/path', 'get', 'security', '0'],
          range: {
            end: {
              character: 24,
              line: 7,
            },
            start: {
              character: 10,
              line: 6,
            },
          },
          severity: DiagnosticSeverity.Warning,
        },
      ]);
    });
  });

  describe('oas3', () => {
    const s = new Spectral();
    s.setFunctions({ oasOpSecurityDefined });
    s.setRules({
      'oas3-operation-security-defined': Object.assign(oas3Rules['oas3-operation-security-defined'], {
        recommended: true,
        type: RuleType[oas3Rules['oas3-operation-security-defined'].type],
      }),
    });

    test('validate a correct object (just in body)', async () => {
      const results = await s.run({
        components: {
          securitySchemes: {
            apikey: {},
          },
        },
        paths: {
          '/path': {
            get: {
              security: [
                {
                  apikey: [],
                },
              ],
            },
          },
        },
      });
      expect(results.length).toEqual(0);
    });

    test('return errors on invalid object', async () => {
      const results = await s.run({
        components: {},
        paths: {
          '/path': {
            get: {
              security: [
                {
                  apikey: [],
                },
              ],
            },
          },
        },
      });

      expect(results).toEqual([
        {
          code: 'oas3-operation-security-defined',
          message:
            'Operation `security` values must match a scheme defined in the `components.securitySchemes` object.',
          path: ['paths', '/path', 'get', 'security', '0'],
          range: {
            end: {
              character: 24,
              line: 7,
            },
            start: {
              character: 10,
              line: 6,
            },
          },
          severity: DiagnosticSeverity.Warning,
        },
      ]);
    });
  });
});
