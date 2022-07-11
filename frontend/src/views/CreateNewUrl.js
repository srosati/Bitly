import { Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import CreateUrlForm from '../components/forms/CreateUrlForm';

export default function CreateNewUrl() {
	return (
		<>
			<Helmet>
				<title>New Url</title>
			</Helmet>
			<Container style={{ width: '50%' }} className='min-height'>
				<CreateUrlForm></CreateUrlForm>
			</Container>
		</>
	);
}
