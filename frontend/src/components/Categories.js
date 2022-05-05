import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
//import {categories} from '../data'
import { publicRequest } from '../requestMethod';
import { mobile } from '../responsive';
import CategoryItem from './CategoryItem';

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${
        mobile({
            padding: '0',
            flexDirection: 'column'
        })
    }
`;

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await publicRequest.get('/category');
                setCategories(res.data);
            } catch (err) {

            }
        }
        getCategories();
    }, []);
    console.log(categories);
    return (
        <Container>
            {categories.map(category => (
                <CategoryItem item={category} key={category._id}/>
            ))}
        </Container>
    )
}

export default Categories
