import { expect } from 'chai';
import { IJWTPayload } from '../models/jwtPayload';
import { getUniqueId } from './getUniqueId';

describe('getUniqueId', () => {
  describe('employee', () => {
    const jwt: IJWTPayload = {
      accessToken: '<redacted>',
      iss: 'security-identity-token-api',
      exp: 1720130328,
      iat: 1720124899,
      keyId: 6,
      displayName: 'infra-auth-auth-playground-dev',
      aud: 'e5dd632b-cb97-48d7-a310-5147be717cde',
      name: 'Morgan MARTINET',
      sub: 'uuUOZLMFfuURgumF2hE2VLqLoDy8Z0ZIr5AeicCJSHQ',
      oid: '0b642a04-9cce-42dc-b456-1cbbc179cd72',
      userName: 'umartw8',
      givenName: 'Morgan',
      familyName: 'MARTINET',
      userType: 'employee',
      employeeNumber: '100175062',
      department: '421408000000',
      phoneMobileNumber: '4389698467',
      realm: 'employees',
      accessTokenIssuer:
        'https://login.microsoftonline.com/9f15d2dc-8753-4f83-aac2-a58288d3a4bc/v2.0',
      email: 'morgan.martinet@montreal.ca',
      inum: '',
      env: 'dev',
    };

    it('Opaque', () => {
      expect(getUniqueId(jwt, 'Opaque')).to.equal('0b642a04-9cce-42dc-b456-1cbbc179cd72');
    });
    it('OpaqueURN', () => {
      expect(getUniqueId(jwt, 'OpaqueURN')).to.equal(
        'urn:user:employees:dev::0b642a04-9cce-42dc-b456-1cbbc179cd72'
      );
    });
    it('HumanReadable', () => {
      expect(getUniqueId(jwt, 'HumanReadable')).to.equal('umartw8');
    });
    it('HumanReadableURN', () => {
      expect(getUniqueId(jwt, 'HumanReadableURN')).to.equal('urn:user:employees:dev:umartw8');
    });
    it('VerboseURN', () => {
      expect(getUniqueId(jwt, 'VerboseURN')).to.equal(
        'urn:user:employees:dev:umartw8:0b642a04-9cce-42dc-b456-1cbbc179cd72'
      );
    });
  });
  describe('generic employee', () => {
    const jwt: IJWTPayload = {
      accessToken: '<redacted>',
      iss: 'security-identity-token-api',
      exp: 1720127907,
      iat: 1720123763,
      keyId: 6,
      displayName: 'infra-auth-auth-playground-dev',
      aud: 'e5dd632b-cb97-48d7-a310-5147be717cde',
      name: 'C.Generique dsec developpeur2',
      sub: 'mlKfaYaESpCXWGoHE3ej-kCaUBwfsQzqayvRvXXQHJo',
      oid: '74096b4e-c090-4a97-af04-bbe25dc4f7d6',
      userName: 'cgdsecdev2',
      givenName: 'C.Generique',
      familyName: 'dsec developpeur2',
      userType: 'employee',
      department: '4211',
      isGenericAccount: true,
      realm: 'employees',
      accessTokenIssuer:
        'https://login.microsoftonline.com/9f15d2dc-8753-4f83-aac2-a58288d3a4bc/v2.0',
      inum: '',
      env: 'dev',
    };

    it('Opaque', () => {
      expect(getUniqueId(jwt, 'Opaque')).to.equal('74096b4e-c090-4a97-af04-bbe25dc4f7d6');
    });
    it('OpaqueURN', () => {
      expect(getUniqueId(jwt, 'OpaqueURN')).to.equal(
        'urn:user:employees:dev::74096b4e-c090-4a97-af04-bbe25dc4f7d6'
      );
    });
    it('HumanReadable', () => {
      expect(getUniqueId(jwt, 'HumanReadable')).to.equal('cgdsecdev2');
    });
    it('HumanReadableURN', () => {
      expect(getUniqueId(jwt, 'HumanReadableURN')).to.equal('urn:user:employees:dev:cgdsecdev2');
    });
    it('VerboseURN', () => {
      expect(getUniqueId(jwt, 'VerboseURN')).to.equal(
        'urn:user:employees:dev:cgdsecdev2:74096b4e-c090-4a97-af04-bbe25dc4f7d6'
      );
    });
  });
  describe('citizen', () => {
    const jwt: IJWTPayload = {
      accessToken: '<redacted>',
      iss: 'security-identity-token-api',
      exp: 1720129011,
      iat: 1720125411,
      keyId: 6,
      displayName: 'infra-auth-auth-playground',
      aud: 'a496befa-db7d-45a6-ac7a-11471816b8f1',
      name: 'Morgan Japon',
      sub: '@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D',
      inum: '@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D',
      userName: 'morgan.japon@mailinator.com',
      givenName: 'Morgan',
      familyName: 'Japon',
      realm: 'citizens',
      accessTokenIssuer:
        'https://connexion.dev.montreal.ca/1543b575-116b-4325-a0bf-3ccdd7925321/v2.0/',
      mtlIdentityId: '@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D',
      email: 'morgan.japon@mailinator.com',
      userType: '',
      env: 'dev',
    };

    it('Opaque', () => {
      expect(getUniqueId(jwt, 'Opaque')).to.equal(
        '@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D'
      );
    });
    it('OpaqueURN', () => {
      expect(getUniqueId(jwt, 'OpaqueURN')).to.equal(
        'urn:user:citizens:dev::@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D'
      );
    });
    it('HumanReadable', () => {
      expect(getUniqueId(jwt, 'HumanReadable')).to.equal('morgan.japon@mailinator.com');
    });
    it('HumanReadableURN', () => {
      expect(getUniqueId(jwt, 'HumanReadableURN')).to.equal(
        'urn:user:citizens:dev:morgan.japon@mailinator.com'
      );
    });
    it('VerboseURN', () => {
      expect(getUniqueId(jwt, 'VerboseURN')).to.equal(
        'urn:user:citizens:dev:morgan.japon@mailinator.com:@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D'
      );
    });
  });
  describe('anonymous', () => {
    const jwt: IJWTPayload = {
      accessToken: '<redacted>',
      iss: 'security-identity-token-api',
      exp: 1720129251,
      iat: 1720125651,
      keyId: 6,
      displayName: 'Account Identity Managment',
      aud: '@!4025.CA62.9BB6.16C5!0001!2212.0010!0008!2212.0010',
      name: 'srvAcc Anonymous',
      sub: '@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!0000.1111.0020',
      inum: '@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!0000.1111.0020',
      userName: 'srvAccAnonymous',
      givenName: 'srvAcc',
      familyName: 'Anonymous',
      userType: 'anonymous',
      realm: 'anonymous',
      accessTokenIssuer: 'security-identity-anonymous-token-api',
      env: 'dev',
    };

    it('Opaque', () => {
      expect(getUniqueId(jwt, 'Opaque')).to.equal(
        '@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!0000.1111.0020'
      );
    });
    it('OpaqueURN', () => {
      expect(getUniqueId(jwt, 'OpaqueURN')).to.equal(
        'urn:user:anonymous:dev::@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!0000.1111.0020'
      );
    });
    it('HumanReadable', () => {
      expect(getUniqueId(jwt, 'HumanReadable')).to.equal('srvAccAnonymous');
    });
    it('HumanReadableURN', () => {
      expect(getUniqueId(jwt, 'HumanReadableURN')).to.equal(
        'urn:user:anonymous:dev:srvAccAnonymous'
      );
    });
    it('VerboseURN', () => {
      expect(getUniqueId(jwt, 'VerboseURN')).to.equal(
        'urn:user:anonymous:dev:srvAccAnonymous:@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!0000.1111.0020'
      );
    });
  });
  describe('service account in employees realm', () => {
    const jwt: IJWTPayload = {
      accessToken: '<redacted>',
      iss: 'security-identity-token-api',
      exp: 1720130654,
      iat: 1720126754,
      keyId: 6,
      displayName: 'infra-auth-auth-playground-dev',
      aud: 'e5dd632b-cb97-48d7-a310-5147be717cde',
      sub: 'e5dd632b-cb97-48d7-a310-5147be717cde',
      userType: 'client',
      realm: 'employees',
      accessTokenIssuer:
        'https://login.microsoftonline.com/9f15d2dc-8753-4f83-aac2-a58288d3a4bc/v2.0',
      inum: '',
      env: 'dev',
      userName: '',
      name: '',
      givenName: '',
      familyName: '',
    };

    it('Opaque', () => {
      expect(getUniqueId(jwt, 'Opaque')).to.equal('e5dd632b-cb97-48d7-a310-5147be717cde');
    });
    it('OpaqueURN', () => {
      expect(getUniqueId(jwt, 'OpaqueURN')).to.equal(
        'urn:sp:employees:dev::e5dd632b-cb97-48d7-a310-5147be717cde'
      );
    });
    it('HumanReadable', () => {
      expect(getUniqueId(jwt, 'HumanReadable')).to.equal('infra-auth-auth-playground-dev');
    });
    it('HumanReadableURN', () => {
      expect(getUniqueId(jwt, 'HumanReadableURN')).to.equal(
        'urn:sp:employees:dev:infra-auth-auth-playground-dev'
      );
    });
    it('VerboseURN', () => {
      expect(getUniqueId(jwt, 'VerboseURN')).to.equal(
        'urn:sp:employees:dev:infra-auth-auth-playground-dev:e5dd632b-cb97-48d7-a310-5147be717cde'
      );
    });
  });
  describe('service account in citizens realm', () => {
    const jwt: IJWTPayload = {
      accessToken: '<redacted>',
      iss: 'security-identity-token-api',
      exp: 1720130863,
      iat: 1720127263,
      keyId: 6,
      displayName: 'infra-auth-auth-playground',
      aud: 'a496befa-db7d-45a6-ac7a-11471816b8f1',
      sub: 'a496befa-db7d-45a6-ac7a-11471816b8f1',
      userType: 'client',
      realm: 'citizens',
      accessTokenIssuer:
        'https://connexion.dev.montreal.ca/1543b575-116b-4325-a0bf-3ccdd7925321/v2.0/',
      inum: '',
      env: 'dev',
      userName: '',
      name: '',
      givenName: '',
      familyName: '',
    };

    it('Opaque', () => {
      expect(getUniqueId(jwt, 'Opaque')).to.equal('a496befa-db7d-45a6-ac7a-11471816b8f1');
    });
    it('OpaqueURN', () => {
      expect(getUniqueId(jwt, 'OpaqueURN')).to.equal(
        'urn:sp:citizens:dev::a496befa-db7d-45a6-ac7a-11471816b8f1'
      );
    });
    it('HumanReadable', () => {
      // Note that we can't guarantee the displayName in the citizens realm (Azure ADB2C) and thus we defaults to the sub.
      expect(getUniqueId(jwt, 'HumanReadable')).to.equal('a496befa-db7d-45a6-ac7a-11471816b8f1');
    });
    it('HumanReadableURN', () => {
      // Note that we can't guarantee the displayName in the citizens realm (Azure ADB2C) and thus we defaults to the sub.
      expect(getUniqueId(jwt, 'HumanReadableURN')).to.equal(
        'urn:sp:citizens:dev:a496befa-db7d-45a6-ac7a-11471816b8f1'
      );
    });
    it('VerboseURN', () => {
      // Note that we can't guarantee the displayName in the citizens realm (Azure ADB2C) and thus we defaults to the sub.
      expect(getUniqueId(jwt, 'VerboseURN')).to.equal(
        'urn:sp:citizens:dev:a496befa-db7d-45a6-ac7a-11471816b8f1:a496befa-db7d-45a6-ac7a-11471816b8f1'
      );
    });
  });
  describe('test edge cases', () => {
    it('should accept missing env claim', () => {
      const jwt: IJWTPayload = {
        accessToken: '<redacted>',
        iss: 'security-identity-token-api',
        exp: 1720130328,
        iat: 1720124899,
        keyId: 6,
        displayName: 'infra-auth-auth-playground-dev',
        aud: 'e5dd632b-cb97-48d7-a310-5147be717cde',
        name: 'Morgan MARTINET',
        sub: 'uuUOZLMFfuURgumF2hE2VLqLoDy8Z0ZIr5AeicCJSHQ',
        oid: '0b642a04-9cce-42dc-b456-1cbbc179cd72',
        userName: 'umartw8',
        givenName: 'Morgan',
        familyName: 'MARTINET',
        userType: 'employee',
        employeeNumber: '100175062',
        department: '421408000000',
        phoneMobileNumber: '4389698467',
        realm: 'employees',
        accessTokenIssuer:
          'https://login.microsoftonline.com/9f15d2dc-8753-4f83-aac2-a58288d3a4bc/v2.0',
        email: 'morgan.martinet@montreal.ca',
        inum: '',
      };
      expect(getUniqueId(jwt, 'OpaqueURN')).to.equal(
        'urn:user:employees:::0b642a04-9cce-42dc-b456-1cbbc179cd72'
      );
    });
    it('should not ignore an unknown env', () => {
      const jwt: IJWTPayload = {
        accessToken: '<redacted>',
        iss: 'security-identity-token-api',
        exp: 1720130328,
        iat: 1720124899,
        keyId: 6,
        displayName: 'infra-auth-auth-playground-dev',
        aud: 'e5dd632b-cb97-48d7-a310-5147be717cde',
        name: 'Morgan MARTINET',
        sub: 'uuUOZLMFfuURgumF2hE2VLqLoDy8Z0ZIr5AeicCJSHQ',
        oid: '0b642a04-9cce-42dc-b456-1cbbc179cd72',
        userName: 'umartw8',
        givenName: 'Morgan',
        familyName: 'MARTINET',
        userType: 'employee',
        employeeNumber: '100175062',
        department: '421408000000',
        phoneMobileNumber: '4389698467',
        realm: 'employees',
        accessTokenIssuer:
          'https://login.microsoftonline.com/9f15d2dc-8753-4f83-aac2-a58288d3a4bc/v2.0',
        email: 'morgan.martinet@montreal.ca',
        inum: '',
        env: 'staging',
      };
      expect(getUniqueId(jwt, 'OpaqueURN')).to.equal(
        'urn:user:employees:staging::0b642a04-9cce-42dc-b456-1cbbc179cd72'
      );
    });
    it('should accept values containing a colon', () => {
      const jwt: IJWTPayload = {
        accessToken: '<redacted>',
        iss: 'security-identity-token-api',
        exp: 1720130328,
        iat: 1720124899,
        keyId: 6,
        displayName: 'infra-auth-auth-playground-dev',
        aud: 'e5dd632b-cb97-48d7-a310-5147be717cde',
        name: 'Morgan MARTINET',
        sub: 'uuUOZLMFfuURgumF2hE2VLqLoDy8Z0ZIr5AeicCJSHQ',
        oid: '0b642a04-9cce-42dc-b456-1cbbc179cd72',
        userName: 'foo:bar',
        givenName: 'Morgan',
        familyName: 'MARTINET',
        userType: 'employee',
        employeeNumber: '100175062',
        department: '421408000000',
        phoneMobileNumber: '4389698467',
        realm: 'employees',
        accessTokenIssuer:
          'https://login.microsoftonline.com/9f15d2dc-8753-4f83-aac2-a58288d3a4bc/v2.0',
        email: 'morgan.martinet@montreal.ca',
        inum: '',
        env: 'dev',
      };
      expect(getUniqueId(jwt, 'HumanReadableURN')).to.equal('urn:user:employees:dev:foo\\:bar');
    });
    it('should not reject an unknown realm', () => {
      const jwt: IJWTPayload = {
        accessToken: '<redacted>',
        iss: 'security-identity-token-api',
        exp: 1720130328,
        iat: 1720124899,
        keyId: 6,
        displayName: 'infra-auth-auth-playground-dev',
        aud: 'e5dd632b-cb97-48d7-a310-5147be717cde',
        name: 'Morgan MARTINET',
        sub: 'uuUOZLMFfuURgumF2hE2VLqLoDy8Z0ZIr5AeicCJSHQ',
        oid: '0b642a04-9cce-42dc-b456-1cbbc179cd72',
        userName: 'foo:bar',
        givenName: 'Morgan',
        familyName: 'MARTINET',
        userType: 'employee',
        employeeNumber: '100175062',
        department: '421408000000',
        phoneMobileNumber: '4389698467',
        realm: 'foobar',
        accessTokenIssuer:
          'https://login.microsoftonline.com/9f15d2dc-8753-4f83-aac2-a58288d3a4bc/v2.0',
        email: 'morgan.martinet@montreal.ca',
        inum: '',
        env: 'dev',
      };
      // Note that we get the sub as an ID because the realm is not employees!
      expect(getUniqueId(jwt, 'OpaqueURN')).to.equal(
        'urn:user:foobar:dev::uuUOZLMFfuURgumF2hE2VLqLoDy8Z0ZIr5AeicCJSHQ'
      );
    });
    it('should reject a JWT without an ID and a username', () => {
      const jwt: IJWTPayload = {
        accessToken: '<redacted>',
        iss: 'security-identity-token-api',
        exp: 1720130328,
        iat: 1720124899,
        keyId: 6,
        displayName: 'infra-auth-auth-playground-dev',
        aud: 'e5dd632b-cb97-48d7-a310-5147be717cde',
        name: 'Morgan MARTINET',
        sub: '',
        userName: '',
        givenName: 'Morgan',
        familyName: 'MARTINET',
        userType: 'employee',
        employeeNumber: '100175062',
        department: '421408000000',
        phoneMobileNumber: '4389698467',
        realm: 'employees',
        accessTokenIssuer:
          'https://login.microsoftonline.com/9f15d2dc-8753-4f83-aac2-a58288d3a4bc/v2.0',
        email: '',
        inum: '',
        env: 'dev',
      };
      expect(() => getUniqueId(jwt, 'HumanReadableURN')).to.throw(
        `Expected to receive at least a name or an id but received: {"type":"user","realm":"employees","env":"dev","name":""}`
      );
    });
    it('should fallback on the email when username is missing', () => {
      const jwt: IJWTPayload = {
        accessToken: '<redacted>',
        iss: 'security-identity-token-api',
        exp: 1720130328,
        iat: 1720124899,
        keyId: 6,
        displayName: 'infra-auth-auth-playground-dev',
        aud: 'e5dd632b-cb97-48d7-a310-5147be717cde',
        name: 'Morgan MARTINET',
        sub: 'uuUOZLMFfuURgumF2hE2VLqLoDy8Z0ZIr5AeicCJSHQ',
        oid: '0b642a04-9cce-42dc-b456-1cbbc179cd72',
        userName: '',
        givenName: 'Morgan',
        familyName: 'MARTINET',
        userType: 'employee',
        employeeNumber: '100175062',
        department: '421408000000',
        phoneMobileNumber: '4389698467',
        realm: 'employees',
        accessTokenIssuer:
          'https://login.microsoftonline.com/9f15d2dc-8753-4f83-aac2-a58288d3a4bc/v2.0',
        email: 'morgan.martinet@montreal.ca',
        inum: '',
        env: 'dev',
      };
      expect(getUniqueId(jwt, 'HumanReadableURN')).to.equal(
        'urn:user:employees:dev:morgan.martinet@montreal.ca'
      );
    });
    it('should fallback on the sub when oid is missing', () => {
      const jwt: IJWTPayload = {
        accessToken: '<redacted>',
        iss: 'security-identity-token-api',
        exp: 1720130328,
        iat: 1720124899,
        keyId: 6,
        displayName: 'infra-auth-auth-playground-dev',
        aud: 'e5dd632b-cb97-48d7-a310-5147be717cde',
        name: 'Morgan MARTINET',
        sub: 'uuUOZLMFfuURgumF2hE2VLqLoDy8Z0ZIr5AeicCJSHQ',
        userName: '',
        givenName: 'Morgan',
        familyName: 'MARTINET',
        userType: 'employee',
        employeeNumber: '100175062',
        department: '421408000000',
        phoneMobileNumber: '4389698467',
        realm: 'employees',
        accessTokenIssuer:
          'https://login.microsoftonline.com/9f15d2dc-8753-4f83-aac2-a58288d3a4bc/v2.0',
        email: 'morgan.martinet@montreal.ca',
        inum: '',
        env: 'dev',
      };
      expect(getUniqueId(jwt, 'OpaqueURN')).to.equal(
        'urn:user:employees:dev::uuUOZLMFfuURgumF2hE2VLqLoDy8Z0ZIr5AeicCJSHQ'
      );
    });
  });
});
