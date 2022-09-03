import { AppMetadata, User as Auth0User, UserMetadata } from 'auth0';

export type User = Auth0User<AppMetadata, UserMetadata>;
