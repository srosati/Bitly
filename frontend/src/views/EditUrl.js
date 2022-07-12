import { Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import CreateUrlForm from '../components/forms/CreateUrlForm';
import { EditUrlForm } from '../components/forms/EditUrlForm';

export default function EditUrl() {
	return (
		<>
			<Helmet>
				<title>Edit Url</title>
			</Helmet>
			<Container style={{ width: '50%' }} className='min-height'>
				<EditUrlForm></EditUrlForm>
			</Container>
		</>
	);
}
