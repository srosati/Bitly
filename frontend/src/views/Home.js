import { ListGroup, Row, Col, Container, Button, Dropdown, Badge } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useListUrls } from '../api/urls/urlsSlice.js';
import { useListTags } from '../api/tags/tagsSlice.js';
import { useNavigate } from 'react-router';
import UrlItem from '../components/UrlItem.js';
import { BsXCircle } from 'react-icons/bs';

export default function Home() {
	const [currentUrl, setCurrentUrl] = useState({});
	const [currentOrder, setCurrentOrder] = useState(null);
	const [currentTag, setCurrentTag] = useState(null);

	const { data, isSuccess } = useListUrls({ tag: currentTag ? currentTag.id : null, orderBy: currentOrder });

	const orderBy = {
		created_at: 'Created at',
		clicks: 'Clicks'
	};

	const { data: tags, isSuccess: tagsIsSuccess } = useListTags();

	const [alias, setAlias] = useState('');

	const navigate = useNavigate();
	useEffect(() => {
		if (!isSuccess || !data || data.length === 0) {
			setCurrentUrl({});
			return;
		}

		setCurrentUrl(data[0]);
	}, [isSuccess, data, currentTag, currentOrder]);

	useEffect(() => {
		setAlias(`${process.env.REACT_APP_API_URL}/${currentUrl.alias}`);
	}, [currentUrl]);

	return (
		<>
			<Helmet>
				<title>Bitly</title>
			</Helmet>
			<Container>
				<Row>
					<Col md={4}>
						<div className='d-flex align-items-center'>
							<Dropdown>
								<Dropdown.Toggle variant='success' id='dropdown-basic'>
									Order By
								</Dropdown.Toggle>

								<Dropdown.Menu>
									{Object.entries(orderBy).map(([key, value]) => (
										<Dropdown.Item key={key} onClick={() => setCurrentOrder(key)}>
											{value}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
							<Badge className='lead ms-7'>
								{currentOrder && (
									<>
										{currentOrder.toUpperCase()}
										<BsXCircle className='ms-2' onClick={() => setCurrentOrder(null)} />
									</>
								)}
							</Badge>
						</div>
						<div className='d-flex align-items-center'>
							<Dropdown>
								<Dropdown.Toggle variant='success' id='dropdown-basic'>
									Tags
								</Dropdown.Toggle>

								<Dropdown.Menu>
									{tagsIsSuccess &&
										tags &&
										tags.map((tag) => (
											<Dropdown.Item key={tag.id} onClick={() => setCurrentTag(tag)}>
												{tag.name}
											</Dropdown.Item>
										))}
								</Dropdown.Menu>
							</Dropdown>
							<Badge className='lead ml-10'>
								{currentTag && (
									<>
										{currentTag.name.toUpperCase()}
										<BsXCircle className='ms-2' onClick={() => setCurrentTag(null)} />
									</>
								)}
							</Badge>
						</div>
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
					<Col md={8}>
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
