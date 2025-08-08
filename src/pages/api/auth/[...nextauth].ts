import environment from "@/config/environment";
import authServices from "@/services/auth.service";
import { IUserExtended } from "@/types/Auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 30 days
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: {
          label: "Identifier",
          type: "text",
          placeholder: "Username or Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        code: { label: "2FA Code", type: "text", optional: true },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined,
      ): Promise<IUserExtended | null> {
        const { identifier, password, code, userAgent } = credentials as {
          identifier: string;
          password: string;
          code?: string;
          userAgent?: string;
        };
        if (!identifier || !password) {
          throw new Error("Identifier and password are required");
        }

        try {
          const response = await authServices.login({
            identifier,
            password,
            code,
            userAgent,
          });

          const mfaRequired = response?.data?.mfaRequired;

          if (mfaRequired && !code) {
            throw new Error("mfaRequired");
          }

          if (response?.data) {
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            const mfaRequired = response?.data?.mfaRequired;
            const user = response?.data?.user;

            const expiresInMinutes = parseInt(
              environment.JWT_EXPIRES_IN || "60",
              10,
            );
            return {
              ...user,
              accessToken,
              refreshToken,
              mfaRequired,
              accessTokenExpires: Date.now() + expiresInMinutes + 60 * 1000, // 🔒 expire in 15 minute
            };
          }
          throw new Error("Invalid login credentials");
        } catch (error: any) {
          const errorBackend = error.response?.data?.message;
          const errorFrontend = error.message;
          console.log({ errorBackend, errorFrontend, error });
          let messageError = errorBackend;

          if (errorBackend === undefined) {
            messageError = errorFrontend;
          }

          console.log({ messageError });
          console.log({ data: error?.response?.data?.errors });
          throw new Error(messageError);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      // the token object is passed done to the session call back for persistence
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user?.accessTokenExpires;
        token.role = user.role;
        token.name = user.fullname;
        token.mfaRequired = user.mfaRequired;
      }
      // console.log({
      //   callback: {
      //     token,
      //   },
      // });
      const expiresIn = token.accessTokenExpires - Date.now();

      if (expiresIn > 0) {
        const secondsLeft = Math.floor(expiresIn / 1000);
        console.log(`⏳ Access token will expire in ${secondsLeft} seconds`);
      }

      //   if (trigger === "update") {
      //     token.companyId = session.companyId;
      //   }

      // Cek apakah token sudah expired
      if (Date.now() > token.accessTokenExpires) {
        try {
          console.log({ token });
          console.log("🔄 Refreshing access token...");
          const res = await authServices.refreshToken(token.refreshToken);

          if (res.data.accessToken) {
            console.log("✅ Access token refreshed!");
            const expiresInMinutes = parseInt(
              environment.JWT_EXPIRES_IN || "60",
              10,
            );
            console.log("new access token: " + res.data.accessToken);
            // console.log({
            //   accessToken: res.data.accessToken,
            //   accessTokenExpires: Date.now() + expiresInMinutes + 60 * 1000, // 60 menit
            //   test: "test",
            // });
            return {
              ...token,
              accessToken: res.data.accessToken,
              accessTokenExpires: Date.now() + expiresInMinutes + 60 * 1000, // 60 menit
            };
          }
        } catch (error: any) {
          console.error("❌ Refresh token failed:", error?.data?.message);
          //   console.log(error);
        }
        // hapus session backend
        try {
          await authServices.logout();
          console.log("hapus backend session berhasil");
          // Jika refresh gagal, hapus token agar user logout
          return null;
        } catch (error) {
          console.log("Session tidak Ditemukan");
          return null;
        }

        // return { ...token, token: null };
      }

      return token;
    },
    async session({ session, token }: any) {
      if (!token) {
        // Jika token null karena gagal refresh, hapus session
        return null;
      }

      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.role = token.role;
      session.user.mfaRequired = token.mfaRequired;
      return session;
    },
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
