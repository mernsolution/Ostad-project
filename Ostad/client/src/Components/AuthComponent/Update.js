import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { GetProfileDetails,userUpdate} from '../../ApiRequest/ApiRequest';
import { isEmpty, isEmail} from '../../helper/Validation';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { getBase64 } from '../../helper/FormHelper';


export default function Update() {
  const userName = useRef();
  const userMail = useRef();
  const userPassword = useRef();
  const userImg = useRef();
  const imageView = useRef();


  useEffect(() => {
    GetProfileDetails();
  }, []);

  const profileData = useSelector((state) => state.profile.value);

  const previewImage = () => {
    const imageFile = userImg.current.files[0];
    getBase64(imageFile).then((base64Image) => {
      imageView.current.src = base64Image;
    });
  };

  const HandleRegistration = () => {
    const First_Name = userName.current.value;
    const user_email = userMail.current.value;
    const user_password = userPassword.current.value;
    const userPhoto = imageView.current.src;

    if (isEmpty(First_Name)) {
      toast.error('Name is required');
    } else if (isEmail(user_email)) {
      toast.error('Email is required');
    } else if (isEmpty(user_password)) {
      toast.error('Password is required');
    }else {
      userUpdate(First_Name, user_email, user_password, userPhoto)
      .then((Result) => {
          if (Result === true) {
            toast.success('Register successfully ');
            window.location.href='/DeshboardPage';
            return true
          } else {
            toast.error('Failed to update');
          }
        }
      );
    }
  };
  return (
    <>
      <Container>
        <Toaster />
        <Row>
          {profileData.map((item, index) => (
            <Col md={{ span: 6, offset: 3 }} className="LoginCol mt-8">
              <div className="LoginTopText">
                <img ref={imageView} src={item.userPhoto} alt="user profile"/>
              </div>
              <Form>
                <Row className="mb-3">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label>Upload your Image</Form.Label>

                    <Form.Control
                      onChange={previewImage} ref={userImg} type="file"
                    />
                  </Form.Group>
                  <Form.Group controlId="formGridEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control ref={userName} type="text" placeholder="First Name" defaultValue={item.userName}/>
                  </Form.Group>
                  <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control readOnly='true' ref={userMail}type="email"placeholder="Enter email"  defaultValue={item.userMail}/>
                  </Form.Group>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={userPassword} type="text" placeholder="Password" defaultValue={item.userPassword}/>
                  </Form.Group>
                </Row>
                <Button variant="primary" onClick={HandleRegistration}>Submit </Button>
              </Form>
            </Col>
          ))}
        </Row>
      </Container>
  </>)
}