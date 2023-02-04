import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import {toast} from 'react-toastify';

const AllAppearance = () => {

  const { data: appearancesData, loading} = useGetData ('appearance');

  const deleteProduct = async(id)=>{
    await deleteDoc(doc(db,'appearance', id))
    toast.success("Appearance deleted!")
  }


  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Header</th>
                  <th>Intro</th>
                  <th>Banner Title</th>
                  <th>Banner Description</th>
                  <th>Limited Offer Date</th>
                  <th>Site Logo</th>
                  <th>Banner Logo</th>
                  <th>Limitted Offer Logo</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? (<h4 className='py-5 text-center fw-bold'>Loading...</h4>) : (appearancesData.map(item=>(
                    <tr key={item.id}>
                  
                  <td>{item.productName}</td>
                  <td>{item.shortDesc}</td>
                  <td>{item.description}</td>
                  <td>{item.bannerDesc}</td>
                  <td>{item.date}</td>
                  <td>
                    <img src={item.siteLogoUrl} alt="" />
                  </td>
                  <td>
                    <img src={item.bannerLogoUrl} alt="" />
                  </td>
                  <td>
                    <img src={item.limitedLogoUrl} alt="" />
                  </td>
                  <td>
                    <button 
                      onClick={() => {
                        deleteProduct(item.id);
                        }} 
                        className='btn btn-danger'
                    >
                          Delete
                    </button>
                  </td>
                </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllAppearance;