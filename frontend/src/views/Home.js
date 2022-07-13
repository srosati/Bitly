import { ListGroup, Row, Col, Container, Button, Dropdown, Badge, Form, Card } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useListUrls } from '../api/urls/urlsSlice.js';
import { useCreateTag, useListTags, useDeleteTag } from '../api/tags/tagsSlice.js';
import { useNavigate } from 'react-router';
import UrlItem from '../components/UrlItem.js';
import { BsXCircle } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import FormInput from '../components/FormInputs/FormInput.js';

export default function Home() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const [currentUrl, setCurrentUrl] = useState({});
	const [currentOrder, setCurrentOrder] = useState(null);
	const [currentTag, setCurrentTag] = useState(null);

	const { data: urls, isSuccess } = useListUrls({ tag: currentTag ? currentTag.id : null, orderBy: currentOrder });

	const orderBy = {
		created_at: 'Created at',
		clicks: 'Clicks'
	};

	const { data: tags, isSuccess: tagsIsSuccess } = useListTags();

	const [alias, setAlias] = useState('');

	const navigate = useNavigate();
	useEffect(() => {
		if (!isSuccess || !urls || urls.length === 0) {
			setCurrentUrl({});
			return;
		}

		setCurrentUrl(urls[0]);
	}, [isSuccess, urls, currentTag, currentOrder]);

	useEffect(() => {
		setAlias(`${process.env.REACT_APP_API_URL}/${currentUrl.alias}`);
	}, [currentUrl]);

	const [createTag, createTagResult] = useCreateTag();
	// useEffect(() => {
	// 	if (createTagResult.isSuccess) setCurrentTag(createTagResult.data);
	// }, [createTagResult]);

	const [deleteTag, deleteTagResult] = useDeleteTag();
	// useEffect(() => {
	// 	if (deleteTagResult.isSuccess) setCurrentTag(null);
	// }, [deleteTagResult]);

	function handleDeleteTag(e, id) {
		e.preventDefault();
		e.stopPropagation();
		deleteTag(id);
	}

	function onSubmit(data) {
		createTag(data);
	}

	return (
		<>
			<Helmet>
				<title>Bitly</title>
			</Helmet>
			<Container>
				<Row>
					<Col md={4}>
						<div className='d-flex align-items-center lead mb-2'>
							<Dropdown>
								<Dropdown.Toggle className='lead' variant='success' id='dropdown-basic'>
									Order By
								</Dropdown.Toggle>

								<Dropdown.Menu>
									{Object.entries(orderBy).map(([key, value]) => (
										<Dropdown.Item className='lead' key={key} onClick={() => setCurrentOrder(key)}>
											{value}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
							<Badge className='lead ms-4 mt-3'>
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
								<Dropdown.Toggle className='lead' variant='success' id='dropdown-basic'>
									Tags
								</Dropdown.Toggle>

								<Dropdown.Menu className='pa-4'>
									{tagsIsSuccess &&
										tags &&
										tags.map((tag) => (
											<Dropdown.Item
												className='lead'
												key={tag.id}
												onClick={() => setCurrentTag(tag)}
											>
												{tag.name}
												<BsTrash
													className='fa-lg ms-3 align-self-end color-danger'
													onClick={(e) => handleDeleteTag(e, tag.id)}
												/>
											</Dropdown.Item>
										))}
									<Dropdown.Divider />
									<Dropdown.ItemText className='d-flex align-text-center justify-center px-7 '>
										<Form onSubmit={handleSubmit(onSubmit)}>
											<div className='d-flex justify-center align-center'>
												<FormInput
													register={register}
													name='name'
													type='text'
													error={errors.name}
													errorMessage='Name is required'
													placeholder='New Tag'
													validation={{ required: true, maxLength: 50, minLength: 3 }} //TODO ver que sea un url
												/>
												<Button className='ms-2' color='success' type='submit'>
													+
												</Button>
											</div>
										</Form>
									</Dropdown.ItemText>
								</Dropdown.Menu>
							</Dropdown>
							<Badge className='lead ms-4'>
								{currentTag && (
									<>
										{currentTag.name.toUpperCase()}
										<BsXCircle className='ms-2' onClick={() => setCurrentTag(null)} />
									</>
								)}
							</Badge>
						</div>
						<ListGroup defaultActiveKey='#link1' className='mt-4'>
							{isSuccess &&
								urls &&
								urls.map((url) => (
									<ListGroup.Item
										key={url.id}
										onClick={() => setCurrentUrl(url)}
										active={currentUrl.id === url.id}
										className='lead'
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
							<Card className='p-3'>
								<Card.Body className='d-flex flex-column align-items-center'>
									<Card.Title>
										<h3>There are no alias urls that match your search</h3>
									</Card.Title>
									<Card.Text>
										<span className='Lead'>Have you tried creating a new one?</span>
									</Card.Text>

									<Button onClick={() => navigate('/new-url')}>Create new url</Button>
								</Card.Body>
							</Card>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
}
