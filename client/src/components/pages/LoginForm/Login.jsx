import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const Login = () => {
  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <Row className="w-100">
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <div className="p-4 shadow rounded">
            <h3 className="text-center mb-4">Sign In</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Log In
                </Button>
              </div>
            </Form>
            {/* <div className="text-center mt-3">
              <a href="#">Forgot password?</a>
            </div> */}
            <div className="text-center mt-2">
              <span>Don't have an account? </span>
              <a href="/register">Register</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
