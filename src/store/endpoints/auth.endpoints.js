import { ApiService } from "../service/ApiService";

const AuthEndpoints = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (userInfo) => ({
        url: "/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    userProfile: builder.query({
      query: () => "/user-profile",
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/user-logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useUserProfileQuery,
  useLogoutMutation,
} = AuthEndpoints;
