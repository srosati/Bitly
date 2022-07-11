import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function Login() {
	return (
		<>
			<Helmet>
				<title>Bitly</title>
			</Helmet>
			<Container style={{ width: '50%' }} className='min-height'>
				<Row>
					<Col md={12}></Col>
				</Row>
			</Container>
		</>
	);
}
