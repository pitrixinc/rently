import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import {toast} from 'react-toastify';

import {db,storage} from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Appearance = () => {

  const [logoTitle, setLogoTitle] = useState('');
  const [firstMessage, setFirstMessage] = useState('');
  const [firstBannerTitle, setFirstBannerTitle] = useState('');
  const [bannerDescription, setBannerDescription] = useState('');
  const [date, setDate] = useState('');
  const [siteLogo, setSiteLogo] = useState(null);
  const [bannerLogo, setBannerLogo] = useState(null);
  const [limitedLogo, setLimitedLogo] = useState(null);
  
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const appearance = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Upload all logos in parallel
      const [siteLogoURL, bannerLogoURL, limitedLogoURL] = await Promise.all([
        uploadLogo(siteLogo, `logoImages/${Date.now() + siteLogo.name}`),
        uploadLogo(bannerLogo, `bannerImages/${Date.now() + bannerLogo.name}`),
        uploadLogo(limitedLogo, `limitedImages/${Date.now() + limitedLogo.name}`)
      ]);
  
      // Add data to Firestore
      const docRef = collection(db, "appearance");
      await addDoc(docRef, {
        productName: logoTitle,
        shortDesc: firstMessage,
        description: firstBannerTitle,
        bannerDesc: bannerDescription,
        date: date,
        siteLogoUrl: siteLogoURL,
        bannerLogoUrl: bannerLogoURL,
        limitedLogoUrl: limitedLogoURL
      });
  
      setLoading(false);
      toast.success("Appearance added successfully!");
      navigate("/dashboard/all-appearance");
    } catch (err) {
      setLoading(false);
      toast.error("Appearance not added! Error: " + err.message);
      console.log(err.message)
    }
  };
  
  const uploadLogo = async (logo, path) => {
    const logoRef = ref(storage, path);
    const logoUploadTask = uploadBytesResumable(logoRef, logo);
    return new Promise((resolve, reject) => {
      logoUploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => reject(error),
        async () => {
          const logoURL = await getDownloadURL(logoUploadTask.snapshot.ref);
          resolve(logoURL);
        }
      );
    });
  };
  
  
  
  
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {
              loading ? <h4 className='py-5'>Loading</h4> : <>
               <h4 className='mb-5'>Change Site Appearance</h4>
            <Form onSubmit={appearance}>
              <FormGroup className="form__group">
                <span>Logo Title</span>
                <input type="text" placeholder='Double sofa' value={logoTitle} onChange={e=> setLogoTitle(e.target.value)}  />
              </FormGroup>
              <FormGroup className="form__group">
                <span>First message</span>
                <input type="text" placeholder='lorem...'  value={firstMessage} onChange={e=> setFirstMessage(e.target.value)}  />
              </FormGroup>

              <FormGroup className="form__group">
                <span>First Banner Title</span>
                <input type="text" placeholder='Description...'  value={firstBannerTitle} onChange={e=> setFirstBannerTitle(e.target.value)} />
              </FormGroup>

              <div className='d-flex align-items-center justify-content-between gap-5'>
              <FormGroup className="form__group w-50">
                <span>Limited Offer Date</span>
                <input type="date" placeholder='$100'  value={date} onChange={e=> setDate(e.target.value)} />
              </FormGroup>

              <FormGroup className="form__group w-50">
                <span>Banner Description</span>
                <input type="text" placeholder='Enter banner description'  value={bannerDescription} onChange={e=> setBannerDescription(e.target.value)} />
              </FormGroup>
              </div>

              <div>
              <FormGroup className="form__group">
                <span>Site Logo</span>
                <input type="file" onChange={e=> setSiteLogo(e.target.files[0])} />
              </FormGroup>

              <FormGroup className="form__group">
                <span>First Banner Image</span>
                <input type="file" onChange={e=> setBannerLogo(e.target.files[0])} />
              </FormGroup>

              <FormGroup className="form__group">
                <span>Limited Offer Image </span>
                <input type="file" onChange={e=> setLimitedLogo(e.target.files[0])} />
              </FormGroup>
              </div>

              <button className="buy__btn" type="submit">Update Appearance</button>
            </Form>
              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Appearance