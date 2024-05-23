import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { AUTH_KEYCLOAK } from '@/config-global';

export default NextAuth({
  providers: [
    KeycloakProvider(AUTH_KEYCLOAK)
  ],
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin', // ruta personalizada para el login
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // If set, new users will be directed here on first sign in
  }
});
