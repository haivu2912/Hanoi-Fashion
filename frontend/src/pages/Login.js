import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCall';
import {registerClear} from '../redux/newUserRedux'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: 
            linear-gradient(
                rgba(255, 255, 255, 0.5), 
                rgba(255, 255, 255, 0.5)), 
            url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;

    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
    ${mobile({
    width: '75%'
})
    }
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin: 20px 0;
    padding: 10px;
`;

const Button = styled.button`
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    border: none;
    margin-bottom: 10px;
    &:disabled{
        cursor: not-allowed;
    }
`;

const Error = styled.div`
    color: red;
`;

const Link = styled.a`
    margin: 10px 0;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
    text-align: center;
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.user);
    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, {
            username,
            password
        })
    }

    return (
        <Container>
            <Wrapper>
                <Title>
                    Đăng nhập
                </Title>

                <Form>
                    <Input placeholder="username" onChange={e => setUsername(e.target.value)} />
                    <Input placeholder="password" type='password' onChange={e => setPassword(e.target.value)} />
                    <Button onClick={handleLogin} disabled={isFetching}>
                        Đăng nhập
                    </Button>
                    {error &&
                        <Error>
                            Tài khoản hoặc mất khẩu không chính xác
                        </Error>
                    }
                    {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link> */}
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
