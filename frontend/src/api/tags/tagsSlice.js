import { BaseApiSlice } from '../baseApiSlice';

const TagsApiSlice = BaseApiSlice.injectEndpoints({
	endpoints: (build) => ({
		findTag: build.query({
			query: (id) => `tags/${id}`
		}),

		listTags: build.query({
			query: () => 'tags',
			providesTags: [{ type: 'Tag', id: 'PARTIAL_LIST' }]
		}),

		createTag: build.mutation({
			query: (args) => {
				return {
					url: 'tags',
					method: 'POST',
					body: args
				};
			},
			invalidatesTags: [{ type: 'Tag', id: 'PARTIAL_LIST' }]
		}),

		updateTag: build.mutation({
			query: ({ id, ...args }) => {
				return {
					url: `tags/${id}`,
					method: 'PUT',
					body: args
				};
			},
			invalidatesTags: [{ type: 'Tag', id: 'PARTIAL_LIST' }]
		}),

		deleteTag: build.mutation({
			query: (id) => {
				return {
					url: `tags/${id}`,
					method: 'DELETE'
				};
			},
			invalidatesTags: [{ type: 'Tag', id: 'PARTIAL_LIST' }]
		})
	})
});

export const {
	useListTagsQuery: useListTags,
	useFindTagQuery: useFindTag,
	useCreateTagMutation: useCreateTag,
	useUpdateTagMutation: useUpdateTag,
	useDeleteTagMutation: useDeleteTag
} = TagsApiSlice;
