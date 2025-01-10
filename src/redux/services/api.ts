import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "/api/",
  //   prepareHeaders: (headers, { getState }) => {
  //     // By default, if we have a token in the store, let's use that for authenticated requests
  //     const token = getState().auth.token;
  //     if (token) {
  //       if (isExpired(token)) {
  //         location.reload();
  //       } else {
  //         headers.set("authorization", `Bearer ${token}`);
  //       }
  //     }
  //     return headers;
  //   },
  //   validateStatus: (response, body) => {
  //     return response.status >= 200 && response.status <= 299 && body.status === true;
  //   },
  // }),
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ["Task"],
});
