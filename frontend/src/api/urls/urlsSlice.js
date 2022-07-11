import { BaseApiSlice } from '../baseApiSlice';

const UrlsApiSlice = BaseApiSlice.injectEndpoints({
	endpoints: (build) => ({
		findUrl: build.query({
			query: (id) => `urls/${id}`,
			providesTags: (result) => (result ? [{ type: 'Url', id: result.id }] : ['Url'])
		}),

		listUrls: build.query({
			query: () => `urls`,
			providesTags: (result) =>
				result && result.data
					? [
							...result.data.map(({ id }) => ({ type: 'Url', id: id })),
							{ type: 'Url', id: 'PARTIAL-LIST' }
					  ]
					: [{ type: 'Url', id: 'PARTIAL-LIST' }]
		}),

		createUrl: build.mutation({
			query: (args) => {
				return {
					url: 'urls',
					method: 'POST',
					body: args
				};
			},
			invalidatesTags: [{ type: 'Article', id: 'PARTIAL-LIST' }]
		}),

		updateUrl: build.mutation({
			query: ({ id, ...args }) => ({
				url: `urls/${id}`,
				method: 'PUT',
				body: args
			}),
			invalidatesTags: (_, __, arg) => {
                // TODO: ver que poronga era esto
				const parts = arg.url.split('/');
				return [
					{ type: 'Url', id: parts[parts.length - 1] },
				];
			}
		}),

        deleteUrl: build.mutation({
            query: (id) => ({
                url: `urls/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_, __, arg) => {
                const parts = arg.url.split('/');
                return [
                    { type: 'Url', id: parts[parts.length - 1] },
                    { type: 'Url', id: 'PARTIAL-LIST' }
                ];
            }
        })
	})
});

export const {
	useListUrlsQuery: useListUrls,
	useFindUrlQuery: useFindUrl,
	useCreateUrlMutation: useCreateUrl,
	useUpdateUrlMutation: useUpdateUrl
} = UrlsApiSlice;
