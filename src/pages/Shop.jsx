import React, { useState } from 'react';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css';
import ProductsLists from '../components/UI/ProductsList';
import useGetData from '../custom-hooks/useGetData';

const Shop = () => {

  const {data: products, loading} = useGetData('products');
  const [productsData, setProductsData] = useState(products);

  const handleFilter = e=>{

    const filterValue = e.target.value
        if(filterValue==="suit"){
          const filteredProducts = products.filter(
            (item) => item.category==="suit"
            );

          setProductsData(filteredProducts);
        }

        if(filterValue==="shirt"){
          const filteredProducts = products.filter(
            (item) => item.category==="shirt"
            );

          setProductsData(filteredProducts);
        }

        if(filterValue==="cardigan"){
          const filteredProducts = products.filter(
            (item) => item.category==="cardigan"
            );

          setProductsData(filteredProducts);
        }

        if(filterValue==="shorts"){
          const filteredProducts = products.filter(
            (item) => item.category==="shorts"
            );

          setProductsData(filteredProducts);
        }

        if(filterValue==="mini-dress"){
          const filteredProducts = products.filter(
            (item) => item.category==="mini-dress"
            );

          setProductsData(filteredProducts);
        }
  };

  const handleSearch = e=>{
    const searchTerm = e.target.value

    const searchedProducts = products.filter(item=> item.productName.toLowerCase().includes(searchTerm.toLowerCase()))

    setProductsData(searchedProducts)
  }

  return (
    <Helmet title='Shop'>
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg='3' md='6' xs='6'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                <option value="all">Filter By Category</option>
                  <option value="suit">suit</option>
                  <option value="shirt">shirt</option>
                  <option value="cardigan">cardigan</option>
                  <option value="shorts">shorts</option>
                  <option value="mini-dress">mini-dress</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6' xs='6' className='text-end'>
            <div className="filter__widget">
                <select>
                <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                  
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search__box">
                <input 
                   type="text" 
                   placeholder="Search..." 
                   onChange={handleSearch} 
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {
              loading ? <h5 className='fw-bold'>Loading...</h5> : 
                productsData.length === 0? (
                <h1 className='text-center fs-4'>No products are found!</h1>
                ) : (
                <ProductsLists data={productsData} />
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Shop