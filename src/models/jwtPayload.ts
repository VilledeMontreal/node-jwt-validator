import * as _ from 'lodash';

/**
 * A JWT payload
 */
export interface IJWTPayload {
  // TODO more comments on those properties!

  accessToken: string;
  accessTokenIssuer?: string;
  iss: string;

  // JWT information
  // From Introspect
  exp: number;
  iat: number;
  keyId: number;

  // From ClientInfo
  displayName: string;
  aud: string;

  // From UserInfo
  name: string;
  sub: string;
  oid?: string;

  /**
   * @deprecated Please use mtlIdentityId or userName instead.
   */
  inum: string;

  /**
   * @description Warning! This attribute will be empty when userType is 'client',
   * because the token was produced using client_credentials grant, which is for machine to machine communication
   * and has no associated account and also does not allow interactive logon.
   */
  userName: string;
  givenName: string;
  familyName: string;
  userType: string;
  email?: string;
  realm?: string;
  env?: string;
  isGenericAccount?: boolean;

  // Corresponds to oro identity-id or inum
  mtlIdentityId?: string;
  // available only for employees
  employeeNumber?: string;
  department?: string;
  phoneNumber?: string;
  phoneMobileNumber?: string;
  customData?: any;
}

/**
 * IJWTPayload Type Guard
 */
export const isJWTPayload = (obj: any): obj is IJWTPayload => {
  return (
    obj &&
    _.isObject(obj) &&
    'accessToken' in obj &&
    'iss' in obj &&
    'exp' in obj &&
    'iat' in obj &&
    'sub' in obj &&
    'keyId' in obj
  );
};
