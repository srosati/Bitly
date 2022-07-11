import { BaseApiSlice } from '../baseApiSlice';

const TagsApiSlice = BaseApiSlice.injectEndpoints({
	endpoints: (build) => ({
		findTag: build.query({
			query: (id) => `tags/${id}`
		}),

		listTags: build.query({
			query: () => 'tags'
		}),

		createTag: build.mutation({
			query: (args) => {
				return {
					url: 'tags',
					method: 'POST',
					body: args
				};
			}
		}),

		updateTag: build.mutation({
			query: ({ id, ...args }) => {
				return {
					url: `tags/${id}`,
					method: 'PUT',
					body: args
				};
			}
		}),

		deleteTag: build.mutation({
			query: (id) => {
				return {
					url: `tags/${id}`,
					method: 'DELETE'
				};
			}
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
