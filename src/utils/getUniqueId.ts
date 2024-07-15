import { IJWTPayload } from '../models/jwtPayload';

/**
 * The format of the unique ID that will be generated.
 *
 * Note that opaque IDs are generally Guids, which should be different for each environment. They are not stable and would be lost if we change
 * the authentication provider or if we have to recreate the accounts after a disaster.
 *
 * Note that the human readable IDs are generally a username, which is a CodeU for an employee, an email for a citizen and a displayName for an app (or client or service account).
 * They are stable if we change the authentication provider or if we have to recreate the accounts after a disaster,
 * but they also might be reused for a new user (CodeU or emails can be reassigned once the person leaves).
 *
 * Finally, a non URN format will contain a single value (raw) whereas a URN format would contain multiple pieces of information, separated by a colon.
 * Or we could say that a URN ID is simply an enriched ID that is not meant to be parsed but provides more context on the origin of the ID.
 */
export type UniqueIdFormat = 'Opaque' | 'OpaqueURN' | 'HumanReadable' | 'HumanReadableURN';

/**
 * Builds a unique ID based on the submitted JWT, using the requested format.
 * @param jwt a set of claims on the authenticated user
 * @param format what information should be included in the unique id and how it should be formatted.
 *
 * Note that opaque IDs are generally Guids, which should be different for each environment. They are not stable and would be lost if we change
 * the authentication provider or if we have to recreate the accounts after a disaster.
 *
 * Note that the human readable IDs are generally a username, which is a CodeU for an employee, an email for a citizen and a displayName for an app (or client or service account).
 * They are stable if we change the authentication provider or if we have to recreate the accounts after a disaster,
 * but they also might be reused for a new user (CodeU or emails can be reassigned once the person leaves).
 *
 * Finally, a non URN format will contain a single value whereas a URN format would contain multiple pieces of information, separated by a colon.
 * Or we could say that a URN ID is simply an enriched ID that is not meant to be parsed but provides more context on the origin of the ID.
 * 
 * So, if you don't know which one to use and if you don't have any limitation in size where you need to store the ID, 
 * we would suggest to default to HumanReadableURN.
 *
 * @returns an encoded string that should be unique within a realm and an environment, allowing you to identify a user or a service account/principal.
 *
 * @throws an error if the format is unknown
 *
 * @description An opaque ID would be a GUID whereas a human readable ID would be a username, an email or an application name.
 *
 * The URN format would serialize the data as follows:
 * 
 * urn:montreal:{env}:{tenant}:iam:{resource-type}:{realm}:<id>
 * 
 * or urn:montreal:{lab|dev|accept|prod}:{vdm|spvm}:iam:{user|app}:{employee|citizen|anonymous}:{id}

 * @example
 * [Employee]
 * Opaque:            "0b642a04-9cce-42dc-b456-1cbbc179cd72"
 * OpaqueURN:         "urn:montreal:dev:vdm:iam:user:employees:0b642a04-9cce-42dc-b456-1cbbc179cd72"
 * HumanReadable:     "umartw8"
 * HumanReadableURN:  "urn:montreal:dev:vdm:iam:user:employees:umartw8"
 *
 * @example
 * [Employee of SPVM]
 * Opaque:            "0b642a04-9cce-42dc-b456-1cbbc179cd72"
 * OpaqueURN:         "urn:montreal:dev:spvm:iam:user:employees:0b642a04-9cce-42dc-b456-1cbbc179cd72"
 * HumanReadable:     "umartw8"
 * HumanReadableURN:  "urn:montreal:dev:spvm:iam:user:employees:umartw8"
 *
 * @example
 * [Citizen, with Gluu]
 * Opaque:            "@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D"
 * OpaqueURN:         "urn:montreal:dev:vdm:iam:user:citizens:@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D"
 * HumanReadable:     "morgan.japon@mailinator.com"
 * HumanReadableURN:  "urn:montreal:dev:vdm:iam:user:citizens:morgan.japon@mailinator.com"
 *
 * @example
 * [Citizen, without Gluu] // Gluu inum format would be replaced with a Guid.
 * Opaque:            "0b642a04-9cce-42dc-b456-1cbbc179cd72"
 * OpaqueURN:         "urn:montreal:dev:vdm:iam:user:citizens:0b642a04-9cce-42dc-b456-1cbbc179cd72"
 * HumanReadable:     "morgan.japon@mailinator.com"
 * HumanReadableURN:  "urn:montreal:dev:vdm:iam:user:citizens:morgan.japon@mailinator.com"
 *
 * @example
 * [Anonymous]
 * Opaque:            "@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!0000.1111.0020"
 * OpaqueURN:         "urn:montreal:dev:vdm:iam:user:anonymous:@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!0000.1111.0020"
 * HumanReadable:     "srvAccAnonymous"
 * HumanReadableURN:  "urn:montreal:dev:vdm:iam:user:anonymous:srvAccAnonymous"
 *
 * @example
 * [Employee App]
 * Opaque:            "e5dd632b-cb97-48d7-a310-5147be717cde"
 * OpaqueURN:         "urn:montreal:dev:vdm:iam:app:employees:e5dd632b-cb97-48d7-a310-5147be717cde"
 * HumanReadable:     "infra-auth-auth-playground-dev"
 * HumanReadableURN:  "urn:montreal:dev:vdm:iam:app:employees:infra-auth-auth-playground-dev"
 *
 * @example
 * [Citizen App] // Note that we can't rely on the displayName for apps in the citizens realm (Azure ADB2C), so we default to the aud.
 * Opaque:            "a496befa-db7d-45a6-ac7a-11471816b8f1"
 * OpaqueURN:         "urn:montreal:dev:vdm:iam:app:citizens:a496befa-db7d-45a6-ac7a-11471816b8f1"
 * HumanReadable:     "a496befa-db7d-45a6-ac7a-11471816b8f1"
 * HumanReadableURN:  "urn:montreal:dev:vdm:iam:app:citizens:a496befa-db7d-45a6-ac7a-11471816b8f1"
 */
export function getUniqueId(jwt: IJWTPayload, format: UniqueIdFormat): string {
  switch (format) {
    case 'Opaque':
      return getOpaqueId(jwt);

    case 'OpaqueURN':
      return buildUrn({
        type: getUrnType(jwt),
        tenant: getTenant(jwt),
        realm: jwt.realm,
        env: jwt.env,
        id: getOpaqueId(jwt),
      });

    case 'HumanReadable':
      return getHumanReadableId(jwt);

    case 'HumanReadableURN':
      return buildUrn({
        type: getUrnType(jwt),
        tenant: getTenant(jwt),
        realm: jwt.realm,
        env: jwt.env,
        id: getHumanReadableId(jwt),
      });

    default:
      throw new Error(`Unknown format '${format}'`);
  }
}

/** The type of resource: user for employees, citizens and anonymous users, versus app for service accounts (client_credentials) */
export type UrnType = 'user' | 'app';

/** creates a URN string from the submitted values */
export function buildUrnFromValues(values: string[]): string {
  return ['urn', ...values.map((val) => val.replace('%', '%25').replace(':', '%3A'))].join(':');
}

/** creates a URN string from the normalized components of an account or resource */
export function buildUrn(options: {
  type: UrnType;
  tenant?: string;
  realm?: string;
  env?: string;
  id?: string;
}): string {
  if (!options.id) {
    throw new Error(`Expected to receive an id but received: ${JSON.stringify(options)}`);
  }
  const values = [
    'montreal',
    options.env ?? 'unknown',
    options.tenant ?? 'unknown',
    'iam',
    options.type,
    options.realm ?? 'unknown',
    options.id,
  ];
  return buildUrnFromValues(values);
}

/** gets the type of resource returned in the URN format
 * @description
 * 'user' for employees, citizens and anonymous users, versus 'sp' for service principals or service accounts.
 * @default 'user'
 */
export function getUrnType(jwt: IJWTPayload): UrnType {
  if (jwt.userType === 'client') {
    return 'app';
  }
  return 'user';
}

/**
 * gets the tenant containing this ID.
 * For the moment we only support SPVM or VDM (as a default).
 */
export function getTenant(jwt: IJWTPayload): string {
  if (jwt.email && jwt.email.endsWith('@spvm.qc.ca')) {
    return 'spvm';
  }
  return 'vdm';
}

/** gets the internal ID of the resource (aud, oid or sub depending on the context) */
export function getOpaqueId(jwt: IJWTPayload): string {
  if (jwt.userType === 'client') {
    // Note that we don't want to use the oid or the sub for clients because it might be different from the aud, which contains the appId,
    // and the appId has been used to configure GDA to recognize a client in order to return a specific profile.
    return jwt.aud;
  }
  if (jwt.oid && jwt.realm === 'employees') {
    // In EntraID, the sub of an employee is a unique random number assigned for the app and won't be the same accross apps,
    // so we'll prefer the oid (ObjectID) which is the real ID of the user.
    // In Azure AD B2C, the sub is in fact an internal user ID that was imported from Gluu and contains the inum.
    // This value will continue to be generated by IdentityManagementAPI once Gluu is retired and this will provide us
    // with a portable ID if we ever switch to a new IDP.
    return jwt.oid;
  }
  return jwt.sub;
}

/**
 * gets the username/email/displayName of the resource
 * @default returns the 'sub' or 'aud' of the jwt if there is not enough information
 */
export function getHumanReadableId(jwt: IJWTPayload): string {
  if (jwt.userName) {
    return jwt.userName;
  }
  if (jwt.email) {
    return jwt.email;
  }
  if (jwt.userType === 'client') {
    if (jwt.displayName && jwt.realm === 'employees') {
      // we can trust the displayName in EntraID (employees) because it is part of the access_token used to produce the JWT
      // and is thus guaranteed to be present.
      return jwt.displayName;
    }
    if (jwt.aud) {
      // for ADB2C, we can't guarantee the displayName since TokenAPI will do a lookup in the App definition and thus we'll rely on the audience (appId).
      // Note that there should be very few clients in ADB2C since we have decided that all our clients (service account or principal) should be in EntraID.
      return jwt.aud;
    }
  }
  return jwt.sub;
}
