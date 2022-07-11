import { Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap';

const logo = 'https://sproutsocial.com/insights/social-media-image-sizes-guide/';

// function Footer(props: ReduxProps) {
export default function Footer() {
	return (
		<footer className=' footer-style bg-color-primary'>
			<Card.Body className='row my-n4'>
				<div className='col-4 footer-image-col'>
					<Image src={logo} className='mt-n3' height='180px' width='auto' alt='RentApp' />
				</div>
				<div className='col-4'>
					<ListGroup as='ul' className='col-6 list-unstyled'>
						<h3 className='h3 fw-bold color-grey'>team</h3>
						<ListGroupItem bsPrefix='color-grey fw-bold mt-2'>Santos Rosati</ListGroupItem>
						<ListGroupItem bsPrefix='color-grey fw-bold mt-2'>Matias Lombardi</ListGroupItem>
						<ListGroupItem bsPrefix='color-grey fw-bold mt-2'>Patrick Dey</ListGroupItem>
					</ListGroup>
				</div>

				<div className='col-4'>
					<ListGroup className='list-unstyled' as='ul'>
						<ListGroupItem bsPrefix='h3 fw-bold color-grey'>contact</ListGroupItem>
						<ListGroupItem bsPrefix='lead color-grey'>
							email:
							<a href='mailto:paw2021b3@gmail.com' className='color-secondary ms-1 pb-1'>
								paw2021b3@gmail.com
							</a>
						</ListGroupItem>
					</ListGroup>
				</div>
			</Card.Body>
			<Card.Footer
				className='bg-color-secondary d-flex justify-content-center align-content-center'
				style={{ height: '40px' }}
			>
				<p className='fw-light'>PAW 2021b - Grupo 3</p>
			</Card.Footer>
		</footer>
	);
}
