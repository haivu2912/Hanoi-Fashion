import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Product from './Product';
import { publicRequest } from '../requestMethod';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const ProductsSearch = ({ products, filter, sort }) => {
    console.log({ products, filter, sort });
    const [filterProducts, setFilterProducts] = useState([]);
    
    useEffect(() => {
        setFilterProducts(
            products.filter(item => Object.entries(filter).every(([key, value]) =>
                item[key].includes(value)
            ))
        )
    }, [products, filter]);

    useEffect(() => {
        if ((sort === 'newest')) {
            setFilterProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
        } else if ((sort === 'desc')) {
            setFilterProducts(prev => [...prev].sort((a, b) => a.price - b.price))
        } else {
            setFilterProducts(prev => [...prev].sort((a, b) => b.price - a.price))
        }
    }, [sort]);

    return (
        <Container>
            {
                filterProducts.map(item => item.inStock === true ? (<Product item={item} key={item._id} />) : '')
            }
        </Container>
    )
}

export default ProductsSearch
