import React, { useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../AuthComponent/Login.css';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { isEmpty} from '../../helper/Validation';
import { RecoverResetPassword } from '../../ApiRequest/ApiRequest';
import { getEmail, getOTP } from '../../helper/SessionHelper';

export default function ResetPassword() {
  const Password = useRef();
  const ConfirmPassword = useRef();
  const navigate = useNavigate();

  const setPassword = () => {
    const password = Password.current.value;
    const confirmPassword = ConfirmPassword.current.value;
    if (isEmpty(password)) {
      toast.error('Password is required');
    } else if (isEmpty(confirmPassword)) {
      toast.error('Confirm password is required');
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      RecoverResetPassword(getEmail(), getOTP(), password).then((Result) => {
        if (Result === true) {
          toast.success('Password updated successfully');
          navigate('/LoginPage');
        } else {
          toast.error('Failed to update password');
        }
      });
    }
  };

  return (
    <>
      <Container>
        <Toaster />
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="LoginCol mt-12">
            <h3>Reset your password</h3>
            <Form>
              <Row className="mb-3">
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    readOnly={true}
                    value={getEmail()}
                    type="text"
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    ref={Password}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group controlId="formGridPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    ref={ConfirmPassword}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Group>
              </Row>
              <Button variant="primary" onClick={setPassword}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
