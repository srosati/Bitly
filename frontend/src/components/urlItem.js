import { BsPencilFill, BsTrash } from 'react-icons/bs';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDeleteUrl } from '../api/urls/urlsSlice';
import { useEffect } from 'react';

export default function UrlItem({ title, redirect_to, created_at, alias, clicks, id, onDelete }) {
	const navigate = useNavigate();

	const goToEditUrl = () => {
		navigate(`/editUrl/${id}`);
	};

	const [deleteUrl, result] = useDeleteUrl();
	useEffect(() => {
		if (result.isSuccess) onDelete();
	}, [result]);

	return (
		<div>
			<Row className='align-items-center justify-content-between'>
				<Col xs={10}>
					<h1 className='m-0'>{title}</h1>
				</Col>
				<Col>
					<span>
						<BsPencilFill className='fa-lg color-action' onClick={() => goToEditUrl()} />
					</span>
				</Col>
				<Col>
					<span>
						<BsTrash className='fa-lg color-danger' onClick={() => deleteUrl(id)} />
					</span>
				</Col>
			</Row>
			<hr></hr>
			<p>
				<a href={redirect_to}>{redirect_to}</a>
			</p>
			<p>Created at: {new Date(created_at).toLocaleDateString()}</p>
			<p>
				Alias:{' '}
				<a href={`${process.env.REACT_APP_API_URL}/${alias}`}>{`${process.env.REACT_APP_API_URL}/${alias}`}</a>
			</p>
			<p>Clicks: {clicks}</p>
		</div>
	);
}
