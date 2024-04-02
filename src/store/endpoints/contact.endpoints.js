import { ApiService } from "../service/ApiService";

const ContactEndpoints = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (arg) => ({
        url: "/contact",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["contact"],
    }),
    getContact: builder.query({
      query: () => "/contact",
      providesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: (updateData) => ({
        url: `/contact/${updateData.id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = ContactEndpoints;
