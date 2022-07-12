import { ListGroup, Row, Col, Container, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useListUrls } from '../api/urls/urlsSlice.js';
import { useNavigate } from 'react-router';
import UrlItem from '../components/UrlItem.js';

export default function Home() {
	const { data, isSuccess } = useListUrls();
	const [currentUrl, setCurrentUrl] = useState({});
	const [alias, setAlias] = useState('');

	const navigate = useNavigate();
	useEffect(() => {
		if (!isSuccess || !data || data.length === 0) return;

		setCurrentUrl(data[0]);
		setAlias(`${process.env.REACT_APP_API_URL}/${data[0].alias}`);
	}, [isSuccess, data]);

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
							<UrlItem
								title={currentUrl.title}
								created_at={currentUrl.created_at}
								redirect_to={currentUrl.redirect_to}
								alias={alias}
								clicks={currentUrl.clicks}
								id={currentUrl.id}
								onDelete={() => setCurrentUrl({})}
							/>
						) : (
							<Button onClick={() => navigate('/new-url')}>Create new url</Button>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
}
