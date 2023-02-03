import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {auth} from '../firebase.config.js';
import { storage } from '../firebase.config.js';
import {toast} from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config.js';

import '../styles/login.css';
import frontImg from "../assets/images/idfront.jpg";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone, setPhone] = useState("");
  const [password,setPassword] = useState('');
  const [file,setFile] = useState(null);

  const [street,setStreet] = useState('');
  const [city,setCity] = useState('');
  const [zipcode,setZipcode] = useState('');
  const [country, setCountry] = useState('');
  
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImg2 = (e) => {
    setImg1(URL.createObjectURL(e.target.files[0]))
  };

  const handleImg3 = (e) => {
    setImg2(URL.createObjectURL(e.target.files[0]))
  };

  const handleImg4 = (e) => {
    setImg3(URL.createObjectURL(e.target.files[0]))
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const storageRef = ref(storage, `/images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
    
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress updates
        },
        (error) => {
          console.error(error);
          toast.error(error.message);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
            // update user profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL
            });
    
            // store user data on firestore database
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL
            });
            setLoading(false);
            toast.success('Account created');
            navigate('/login');
          } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error('Error getting download URL');
          }
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Something went wrong');
    }
  }
    
  

  return (
    <Helmet title="SignUp">
      <section>
        <Container>
          <Row>
            {loading ? (
            <Col lg='12' className="text-center">
              <h5 className="fw-bold">Loading...</h5></Col>
              ) : (
              <Col lg='6' className="m-auto text-center">
              <h3 className='fw-bold mb-4'>Sign Up</h3>

              <Form className='auth__form' onSubmit={handleSignUp}>
              <FormGroup className='form__group'>
                  <input type="text" placeholder='Username' value={username} onChange={e=> setUsername(e.target.value)} />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type="email" placeholder='Enter your email' value={email} onChange={e=> setEmail(e.target.value)} />
                </FormGroup>

                

                <FormGroup className='form__group'>
                  <input type="password" placeholder='Enter your password' value={password} onChange={e=> setPassword(e.target.value)} />
                </FormGroup>

                
                <FormGroup className='form__group'>
                  <input type="file"  
                  onChange={(e) => setFile(e.target.files[0])} 
                  />
                </FormGroup>
                

                

                <button type="submit" className="buy__btn auth__btn w-100">Create an Account</button>
                <p>Already have an account? <Link to='/login'>Log in</Link></p>

                

              </Form>
            </Col>
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}


export default Signup