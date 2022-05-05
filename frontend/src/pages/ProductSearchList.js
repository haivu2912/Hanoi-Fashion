import { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { Link, useLocation } from 'react-router-dom';
import ProductsSearch from '../components/ProductsSearch';

const Container = styled.div`

`;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({
    display: 'flex',
    flexDirection: 'column',
    width: '0 20px'
})
    }
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({
    marginRight: '0'
})
    }
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({
    margin: '10px 0'
})
    }
`;

const Option = styled.option`

`;

const UL = styled.ul`

`;

const ProductSearchList = () => {
    const location = useLocation();
    const products = location.state.products;
    const input = location.state.input
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState('newest');

    const handleFilter = (e) => {
        const value = e.target.value;
        setFilter({
            ...filter,
            [e.target.name]: value
        })
    };

    const handleSort = (e) => {
        const value = e.target.value;
        setSort(value)
    };

    return (
        <Container>
            <Announcement />

            <Navbar />
            <Title>Tìm kiếm cho: {input}</Title>

            <FilterContainer>
                <Filter>
                    <FilterText>
                        Filter Product:
                    </FilterText>
                    <Select name='color' onChange={handleFilter}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>Whilte</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select name='size' onChange={handleFilter}>
                        <Option disabled>
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>
                        Sort Product:
                    </FilterText>
                    <Select onChange={handleSort}>
                        <Option value='newest'>Mới nhất</Option>
                        <Option value='desc'>Giá giảm dần</Option>
                        <Option value='asc'>Giá tăng dần</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <ProductsSearch products={products} filter={filter} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductSearchList
