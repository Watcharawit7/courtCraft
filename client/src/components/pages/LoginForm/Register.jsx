import { Form, Button } from 'react-bootstrap'

const Register = () => {
  return (
    <>
      <Form className="w-50 mx-auto mt-5">
        <h2 className="mb-4 text-center">Register</h2>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </>
  )
}

export default Register
