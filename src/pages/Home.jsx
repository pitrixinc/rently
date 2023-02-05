import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';

import heroImg from '../assets/images/foto.png'
import "../styles/home.css";
import Services from '../services/Services';
import ProductsList from '../components/UI/ProductsList';
import Clock from '../components/UI/Clock';
import counterImg from '../assets/images/time.png';
import useGetData from '../custom-hooks/useGetData';

const Home = () => {

  const {data: products, loading} = useGetData('products');

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      item=> item.category ==="cardigan"
      );

    const filteredBestSalesProducts = products.filter(
      item=> item.category ==="suit"
      );

    const filteredMobileProducts = products.filter(
      item=> item.category ==="shirt"
      );

    const filteredWirelessProducts = products.filter(
      item=> item.category ==="mini-dress"
      );

    const filteredPopularProducts = products.filter(
      item=> item.category ==="shorts"
      );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  const { data: appearancesData} = useGetData ('appearance');
  

  return (
    <Helmet title={'Home'}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                  <p className="hero__subtitle">{
                   (appearancesData.map(item=>(
                    <tr key={item.id}>
                  
                  <td>{item.shortDesc}</td>
                  
                  
                </tr>
                  ))
                )} {/*} {year} */} </p>


                  <h2>
                  {
                   (appearancesData.map(item=>(
                    <tr key={item.id}>
                  
                  <td>{item.description}</td>
                  
                  
                </tr>
                  ))
                )}
                  </h2>


                  <p>
                  {
                   (appearancesData.map(item=>(
                    <tr key={item.id}>
                  
                  <td>{item.bannerDesc}</td>
                  
                  
                </tr>
                  ))
                )}
                  </p>

                  <motion.button whileTap={{ scale: 1.2 }} className="buy__btn"><Link to='/shop'>Shop Now</Link></motion.button>
              </div>
            </Col>

            <Col lg='6' md='6'>
              <div className="hero__img">
              {
                (appearancesData.map(item=>(
                  <tr key={item.id}>
                
                <td>
                  <motion.img whileHover={{ scale: 0.7 }} src={item.bannerLogoUrl} alt="" />
                </td>
                
                
              </tr>
                ))
              )
              }
                {/*<motion.img whileHover={{ scale: 0.7 }} src={heroImg} alt="" /> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services/>
      <section className="trending__products">
         <Container>
           <Row>
             <Col lg='12' className="text-center">
              <h2 className="section__title">Trending Products</h2>
             </Col>
             {
              loading ? <h5 className="fw-bold">Loading</h5> : 
              <ProductsList data={trendingProducts} />
            }
             
           </Row>
         </Container>
      </section>

     <section className="best__sales">
      <Container>
          <Row>
             <Col lg='12' className="text-center">
              <h2 className="section__title">Best Sales</h2>
             </Col>
             {
              loading ? <h5 className="fw-bold">Loading</h5> : 
              <ProductsList data={bestSalesProducts} />
            }
           </Row>
      </Container>
      </section> 

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg='6' md='12' className='count__down-col'>
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offer</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />

              <motion.button 
              whileTap={{scale:1.2}} 
              className="buy__btn store__btn">
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>

            <Col lg='6' md='12'
             className="text-end counter__img">
              {
                (appearancesData.map(item=>(
                  <tr key={item.id}>
                
                <td>
                  <img src={item.limitedLogoUrl} alt="" />
                </td>
                
                
              </tr>
                ))
              )
              }
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
          <Col lg='12' className="text-center mb-5">
              <h2 className="section__title">New Arrivals</h2>
          </Col>
          {
              loading ? <h5 className="fw-bold">Loading</h5> : 
              <ProductsList data={mobileProducts} />
            }
          {
              loading ? <h5 className="fw-bold">Loading</h5> : 
              <ProductsList data={wirelessProducts} />
            }
          </Row>
        </Container>
      </section>

      <section className="popular__category">
      <Container>
          <Row>
          <Col lg='12' className="text-center mb-5">
              <h2  className="section__title">Popular in Category</h2>
          </Col>
          {
              loading ? <h5 className="fw-bold">Loading</h5> : 
              <ProductsList data={popularProducts} />
            }
          
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home