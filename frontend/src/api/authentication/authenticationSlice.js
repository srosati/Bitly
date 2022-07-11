import { BaseApiSlice } from '../baseApiSlice';

const AuthApiSlice = BaseApiSlice.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation({
			query: ({ email, password }) => {
				return {
					url: 'auth/login',
					method: 'POST',
					body: {
						email: email,
						password: password
					}
				};
			},
			transformResponse: (response, meta, { callback }) => {
				// const auth = meta?.response?.headers.get('Authorization');
				// if (auth == null) return callback(null);
				const token = response.token;
				if (token == null) return callback(null);

				return callback(token);
			}
		})
	})
});

export const { useLoginMutation: useLogin } = AuthApiSlice;
