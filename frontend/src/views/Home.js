import { ListGroup, Row, Col, Container, Button } from 'react-bootstrap';
import { BsPencilFill } from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useListUrls } from '../api/urls/urlsSlice.js';
import useUserId from '../hooks/useUserId.js';
import { useNavigate } from 'react-router';

export default function Home() {
	const { data, isSuccess } = useListUrls();
	const [currentUrl, setCurrentUrl] = useState({});
	const [alias, setAlias] = useState('');

	const loggedId = useUserId();

	const navigate = useNavigate();
	useEffect(() => {
		if (!isSuccess || !data || data.length === 0) return;

		setCurrentUrl(data[0]);
		setAlias(`${process.env.REACT_APP_API_URL}/${data[0].alias}`);
	}, [isSuccess, data]);

	const goToEditUrl = () => {
		let path = new URL(`/editUrl/${currentUrl.id}`, process.env.REACT_APP_API_URL);
		navigate(path);
	};

	return (
		<>
			<Helmet>
				<title>Bitly</title>
			</Helmet>
			<Container>
				<Row>
					<Col md={3}>
						<ListGroup defaultActiveKey='#link1'>
							{isSuccess &&
								data &&
								data.map((url) => (
									<ListGroup.Item
										key={url.id}
										onClick={() => setCurrentUrl(url)}
										active={currentUrl.id === url.id}
									>
										{url.title}
									</ListGroup.Item>
								))}
						</ListGroup>
					</Col>
					<Col md={7}>
						{isSuccess && currentUrl.id ? (
							<div>
								<Row>
									<h1>{currentUrl.title}</h1>
									<p>
										{loggedId && (
											<BsPencilFill
												className='col-1 fa-lg color-action'
												onClick={() => goToEditUrl()}
											/>
										)}
									</p>
								</Row>
								<hr></hr>
								<p>
									<a href={currentUrl.redirect_to}>{currentUrl.redirect_to}</a>
								</p>
								<p>Created at: {new Date(currentUrl.created_at).toLocaleDateString()}</p>
								<p>
									Alias:{' '}
									<a
										href={`${process.env.REACT_APP_API_URL}/${currentUrl.alias}`}
									>{`${process.env.REACT_APP_API_URL}/${currentUrl.alias}`}</a>
								</p>
								<p>Clicks: {currentUrl.clicks}</p>
							</div>
						) : (
							<Button onClick={() => navigate('/new-url')}>Create new url</Button>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
}
