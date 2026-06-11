import type { Core } from '@strapi/strapi';

const MICROSOFT_ICON_BASE64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSIyMSI+PHJlY3QgeD0iMSIgeT0iMSIgd2lkdGg9IjkiIGhlaWdodD0iOSIgZmlsbD0iI2YyNTAyMiIvPjxyZWN0IHg9IjExIiB5PSIxIiB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjN2ZiYTAwIi8+PHJlY3QgeD0iMSIgeT0iMTEiIHdpZHRoPSI5IiBoZWlnaHQ9IjkiIGZpbGw9IiMwMGE0ZWYiLz48cmVjdCB4PSIxMSIgeT0iMTEiIHdpZHRoPSI5IiBoZWlnaHQ9IjkiIGZpbGw9IiNmZmIzMDAiLz48L3N2Zz4=";

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => {
  const tenantID = env('MICROSOFT_TENANT_ID');
  return {
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    providers: [
      {
        uid: 'microsoft',
        displayName: 'Sign in with Microsoft',
        icon: MICROSOFT_ICON_BASE64,
        createStrategy: (strapi) => {
          const MicrosoftStrategy = require('passport-microsoft').Strategy;

          return new MicrosoftStrategy(
            {
              clientID: env('MICROSOFT_CLIENT_ID'),
              clientSecret: env('MICROSOFT_CLIENT_SECRET'),
              tenantID: tenantID,
              authorizationURL: `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/authorize`,
              tokenURL: `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/token`,
              callbackURL: `${env('STRAPI_ADMIN_URL', 'http://localhost:1337')}/admin/connect/microsoft`,
              scope: ['openid', 'profile', 'email', 'User.Read'],
            },
            async (accessToken, refreshToken, profile, done) => {
              try {
                console.log('=== Microsoft SSO Profile ===');
                console.log(JSON.stringify(profile, null, 2));

                const email =
                  profile?.emails?.[0]?.value ||
                  profile?._json?.mail ||
                  profile?._json?.userPrincipalName;

                if (!email) {
                  return done(new Error('No email found'));
                }

                return done(null, {
                  email,
                  firstname: profile?.name?.givenName || 'Unknown',
                  lastname: profile?.name?.familyName || 'Unknown',
                  username: email,
                });
              } catch (err) {
                return done(err);
              }
            }
          );
        },
      },
    ],
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
  ...(process.env.NODE_ENV === 'development' && {
    vite: {
      server: {
        server: {
          host: '0.0.0.0',
          port: 5173,
          hmr: {
            host: 'localhost',
            port: 5173,
            protocol: 'ws',
          },
        },
      }
    }
  }),
  url: env('ADMIN_URL', '/admin'),
  };
};

export default config;
