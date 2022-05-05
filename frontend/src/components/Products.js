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

const Products = ({ cat, filter, sort }) => {
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(
                    cat ? `/product?category=${cat}` : '/product'
                );
                setProducts(res.data);
            } catch (err) {

            }
        }
        getProducts();
    }, [cat]);
    console.log(products);
    useEffect(() => {
        cat && setFilterProducts(
            products.filter(item => Object.entries(filter).every(([key, value]) =>
                item[key].includes(value)
            ))
        )
    }, [products, cat, filter]);

    useEffect(() => {
        if ((sort === 'newest')) {
            setFilterProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
        } else if ((sort === 'desc')) {
            setFilterProducts(prev => [...prev].sort((a, b) => a.price - b.price))
        } else {
            setFilterProducts(prev => [...prev].sort((a, b) => b.price - a.price))
        }
    }, [sort]);
    console.log(filterProducts)
    return (
        <Container>
            {cat
                ? filterProducts.map(item => item.inStock === true ? (<Product item={item} key={item._id} />) : '')
                : products
                    .slice(0, 8)
                    .map(popularProduct => popularProduct.inStock === true ? (<Product item={popularProduct} key={popularProduct._id} />) : '')
            }
        </Container>
    )
}

export default Products
