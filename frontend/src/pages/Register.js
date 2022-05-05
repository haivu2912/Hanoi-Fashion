import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { register } from '../redux/apiCall';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: 
            linear-gradient(
                rgba(255, 255, 255, 0.5), 
                rgba(255, 255, 255, 0.5)), 
            url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;

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

const Agreement = styled.span`
    font-size: 14px;
    margin: 20px 0;
    text-align: center;
`;

const Button = styled.button`
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    border: none;
`;

const Error = styled.div`
    color: red;
`;

const Success = styled.div`
    color: green;
`;

const LinkTo = styled.a`
    margin: 10px 0;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
    text-align: center;
`;

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { isFetching, error } = useSelector(state => state.newUser);
    const dispatch = useDispatch();

    const handleCreate = (e) => {
        e.preventDefault();
        register(dispatch, {
            username,
            password,
            email
        })
    }

    return (
        <Container>
            <Wrapper>
                <Title>
                    Tạo mới
                </Title>

                <Form>
                    {/* <Input placeholder="name" /> */}
                    {/* <Input placeholder="last name" /> */}
                    <Input placeholder="username" onChange={e => setUsername(e.target.value)} />
                    <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
                    <Input placeholder="password" onChange={e => setPassword(e.target.value)} />
                    {/* <Input placeholder="confirm password" /> */}
                    {error &&
                        <Error>
                            Không hợp lệ, hãy thử lại
                        </Error>
                        // :
                        // <Success>
                        //     Register success
                        // </Success>
                    }
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the
                        <b> PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={handleCreate} disabled={isFetching}>Tạo mới</Button>
                    <Link to='/login'>
                        <LinkTo>
                            Đăng nhập
                        </LinkTo>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
