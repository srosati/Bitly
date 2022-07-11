import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import Error from '../components/Error.js';
// import useUserId from '../hooks/useUserId.js';

// function RequireAuth(props) {
// 	const id = useUserId();
// 	const location = useLocation();
// 	return id === null ? <Navigate to='/login' replace state={{ path: location.pathname }} /> : props.children;
// }

export default function RouteMapper() {
	return (
		<div>
			<Routes>
				<Route path='*' element={<Error error={404} message='Not found' />} />
				<Route path='/login' element={<Login />} />
				<Route path='/' element={<Home />} />
				{/* <Route path='/register' element={<Register />} /> */}
				{/* <Route
					path='/profile'
					element={
						<RequireAuth>
							<Profile />
						</RequireAuth>
					}
				/>
				<Route
					path='/proposals'
					element={
						<RequireAuth>
							<Requests />
						</RequireAuth>
					}
				/>

				<Route path='/marketplace' element={<Marketplace />} />
				<Route path='/' element={<Landing />} />
				<Route path='/success' element={<Success />} />

				<Route
					path='/createArticle'
					element={
						<RequireAuth>
							<CreateArticle />
						</RequireAuth>
					}
				/>
				<Route path={`/articles/:id`} element={<Article />} />
				<Route
					path='/articles/:id/edit'
					element={
						<RequireAuth>
							<EditArticle />
						</RequireAuth>
					}
				/>
				<Route
					path='/createReview'
					element={
						<RequireAuth>
							<CreateReview />
						</RequireAuth>
					}
				/>
				<Route
					path={`/editReview/:id`}
					element={
						<RequireAuth>
							<EditReview />
						</RequireAuth>
					}
				/> */}
			</Routes>
		</div>
	);
}
