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
 * Finally, a non URN format will contain a single value whereas a URN format would contain multiple pieces of information, separated by a colon.
 */
export type UniqueIdFormat =
  | 'Opaque'
  | 'OpaqueURN'
  | 'HumanReadable'
  | 'HumanReadableURN'
  | 'VerboseURN';

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
 *
 * @returns an encoded string that should be unique within a realm and an environment, allowing you to identify a user or a service account/principal.
 *
 * @throws an error if the format is unknown
 *
 * @description An opaque ID would be a GUID whereas a human readable ID would be a username, an email or an application name.
 *
 * The URN format would serialize the data as follows: urn:type:realm:env:name:id
 *
 * @example
 * [Employee]
 * Opaque:            "0b642a04-9cce-42dc-b456-1cbbc179cd72"
 * OpaqueURN:         "urn:user:employees:dev::0b642a04-9cce-42dc-b456-1cbbc179cd72"
 * HumanReadable:     "umartw8"
 * HumanReadableURN:  "urn:user:employees:dev:umartw8"
 * VerboseURN:        "urn:user:employees:dev:umartw8:0b642a04-9cce-42dc-b456-1cbbc179cd72"
 *
 * @example
 * [Citizen, with Gluu]
 * Opaque:            "@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D"
 * OpaqueURN:         "urn:user:citizens:dev::@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D"
 * HumanReadable:     "morgan.japon@mailinator.com"
 * HumanReadableURN:  "urn:user:citizens:dev:morgan.japon@mailinator.com"
 * VerboseURN:        "urn:user:citizens:dev:morgan.japon@mailinator.com:@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!BEDB.3F39.4ADB.F74D"
 *
 * @example
 * [Citizen, without Gluu] // Gluu inum format would be replaced with Azure Guids.
 * Opaque:            "0b642a04-9cce-42dc-b456-1cbbc179cd72"
 * OpaqueURN:         "urn:user:citizens:dev::0b642a04-9cce-42dc-b456-1cbbc179cd72"
 * HumanReadable:     "morgan.japon@mailinator.com"
 * HumanReadableURN:  "urn:user:citizens:dev:morgan.japon@mailinator.com"
 * VerboseURN:        "urn:user:citizens:dev:morgan.japon@mailinator.com:0b642a04-9cce-42dc-b456-1cbbc179cd72"
 *
 * @example
 * [Anonymous]
 * Opaque:            "@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!0000.1111.0020"
 * OpaqueURN:         "urn:user:anonymous:dev::@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!0000.1111.0020"
 * HumanReadable:     "srvAccAnonymous"
 * HumanReadableURN:  "urn:user:anonymous:dev:srvAccAnonymous"
 * VerboseURN:        "urn:user:anonymous:dev:srvAccAnonymous:@!4025.CA62.9BB6.16C5!0001!2212.0010!0000!0000.1111.0020"
 *
 * @example
 * [Employee App]
 * Opaque:            "e5dd632b-cb97-48d7-a310-5147be717cde"
 * OpaqueURN:         "urn:sp:employees:dev::e5dd632b-cb97-48d7-a310-5147be717cde"
 * HumanReadable:     "infra-auth-auth-playground-dev"
 * HumanReadableURN:  "urn:sp:employees:dev:infra-auth-auth-playground-dev"
 * VerboseURN:        "urn:sp:employees:dev:infra-auth-auth-playground-dev:e5dd632b-cb97-48d7-a310-5147be717cde"
 *
 * @example
 * [Citizen App] // Note that we can't rely on the displayName for apps in the citizens realm (Azure ADB2C), so we default to the sub.
 * Opaque:            "a496befa-db7d-45a6-ac7a-11471816b8f1"
 * OpaqueURN:         "urn:sp:citizens:dev::a496befa-db7d-45a6-ac7a-11471816b8f1"
 * HumanReadable:     "a496befa-db7d-45a6-ac7a-11471816b8f1"
 * HumanReadableURN:  "urn:sp:citizens:dev:a496befa-db7d-45a6-ac7a-11471816b8f1"
 * VerboseURN:        "urn:sp:citizens:dev:a496befa-db7d-45a6-ac7a-11471816b8f1:a496befa-db7d-45a6-ac7a-11471816b8f1"
 */
export function getUniqueId(jwt: IJWTPayload, format: UniqueIdFormat): string {
  switch (format) {
    case 'Opaque':
      return getId(jwt);

    case 'OpaqueURN':
      return buildUrn({
        type: getUrnType(jwt),
        realm: jwt.realm,
        env: jwt.env,
        id: getId(jwt),
      });

    case 'HumanReadable':
      return getUsername(jwt);

    case 'HumanReadableURN':
      return buildUrn({
        type: getUrnType(jwt),
        realm: jwt.realm,
        env: jwt.env,
        name: getUsername(jwt),
      });

    case 'VerboseURN':
      return buildUrn({
        type: getUrnType(jwt),
        realm: jwt.realm,
        env: jwt.env,
        name: getUsername(jwt),
        id: getId(jwt),
      });

    default:
      throw new Error(`Unknown format '${format}'`);
  }
}

/** The type of resource: user for employees, citizens and anonymous users, versus sp for service principals or service accounts */
export type UrnType = 'user' | 'sp';

/** creates a URN string from the submitted values */
export function buildUrnFromValues(values: string[]): string {
  return ['urn', ...values.map((val) => val.replace(':', '\\:'))].join(':');
}

/** creates a URN string from the normalized components of an account or resource */
export function buildUrn(options: {
  type: UrnType;
  realm?: string;
  env?: string;
  name?: string;
  id?: string;
}): string {
  if (!(options.name || options.id)) {
    throw new Error(
      `Expected to receive at least a name or an id but received: ${JSON.stringify(options)}`
    );
  }
  const values = [options.type, options.realm, options.env ?? '', options.name ?? ''];
  if (options.id) {
    // Do not end with an empty value or the URN would end with a colon.
    values.push(options.id);
  }
  return buildUrnFromValues(values);
}

/** gets the type of resource returned in the URN format
 * @description
 * 'user' for employees, citizens and anonymous users, versus 'sp' for service principals or service accounts.
 * @default 'user'
 */
export function getUrnType(jwt: IJWTPayload): UrnType {
  if (jwt.userType === 'client') {
    return 'sp';
  }
  return 'user';
}

/** gets the internal ID of the resource */
export function getId(jwt: IJWTPayload): string {
  if (jwt.realm === 'employees' && jwt.userType !== 'client') {
    // In EntraID, the sub of an employee is a unique random number assigned for the app and won't be the same accross apps,
    // so we'll prefer the oid (ObjectID) which is the real ID of the user.
    // Note that we don't want to use the oid for clients because it is different from the sub, which contains the appId,
    // and the appId has been used to configure GDA to recognize a client a return a specific profile.
    return jwt.oid ?? jwt.sub;
  }
  // for other types of JWT (citizen, anonymous and client), the sub is already correct.
  return jwt.sub;
}

/**
 * gets the username of the resource
 * @default returns the 'sub' of the jwt if there is not enough information
 */
export function getUsername(jwt: IJWTPayload): string {
  if (jwt.userName) {
    return jwt.userName;
  }
  if (jwt.email) {
    return jwt.email;
  }
  if (jwt.userType === 'client' && jwt.displayName && jwt.realm === 'employees') {
    // we can trust the displayName in EntraID (employees) because it is part of the access_token used to produce the JWT
    // and is thus guaranteed to be present.
    return jwt.displayName;
  }
  // for ADB2C, we can't guarantee the displayName since TokenAPI will do a lookup in the App definition and thus we'll rely on the audience (appId).
  // Note that there should be very few clients in ADB2C since we have decided that all our clients (service account or principal) should be in EntraID.
  return jwt.sub;
}
