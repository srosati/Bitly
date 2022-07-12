import { BaseApiSlice } from '../baseApiSlice';

const UrlsApiSlice = BaseApiSlice.injectEndpoints({
	endpoints: (build) => ({
		findUrl: build.query({
			query: (url) => url.toString(),
			providesTags: (result) => (result ? [{ type: 'Url', id: result.id }] : ['Url'])
		}),

		listUrls: build.query({
			query: ({ tag, orderBy }) => `urls?${tag ? `tag_id=${tag}&` : ''}${orderBy ? `order_by=${orderBy}&` : ''}`,
			providesTags: (result) =>
				result && result.data
					? [...result.data.map(({ id }) => ({ type: 'Url', id: id })), { type: 'Url', id: 'PARTIAL-LIST' }]
					: [{ type: 'Url', id: 'PARTIAL-LIST' }]
		}),

		listUrlTags: build.query({
			query: (id) => `urls/${id}/tags`,
			providesTags: (result) => (result ? [{ type: 'UrlTags', id: result.id }] : ['UrlTags'])
		}),

		createUrl: build.mutation({
			query: (args) => {
				return {
					url: 'urls',
					method: 'POST',
					body: args
				};
			},
			invalidatesTags: [{ type: 'Url', id: 'PARTIAL-LIST' }]
		}),

		updateUrl: build.mutation({
			query: ({ id, ...args }) => ({
				url: `urls/${id}`,
				method: 'PUT',
				body: args
			}),
			invalidatesTags: ({ id }) => {
				return [
					{ type: 'Url', id: id },
					{
						type: 'Url',
						id: 'PARTIAL-LIST'
					}
				];
			}
		}),

		deleteUrl: build.mutation({
			query: (id) => ({
				url: `urls/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (id) => {
				return [
					{ type: 'Url', id: id },
					{ type: 'Url', id: 'PARTIAL-LIST' }
				];
			}
		})
	})
});

export const {
	useListUrlsQuery: useListUrls,
	useFindUrlQuery: useFindUrl,
	useListUrlTagsQuery: useListUrlTags,
	useCreateUrlMutation: useCreateUrl,
	useUpdateUrlMutation: useUpdateUrl,
	useDeleteUrlMutation: useDeleteUrl
} = UrlsApiSlice;
