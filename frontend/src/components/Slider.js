import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { sliderItems } from '../data';
import { mobile } from '../responsive';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${
        mobile({
            display: 'none'
        })
    }
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === 'left' && '10px'};
    right: ${props => props.direction === 'right' && '10px'};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 1;
`;

let Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg};
`;

const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
`;

const Image = styled.img`
    height: 80%;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`;

const Title = styled.h1`
    font-size: 70px;
`;

const Desc = styled.p`
    margin: 50px 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
    border: 1px solid black;
`;


const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = direction => {
        if (direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
        } else {
            setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
        }
    };

    // setInterval((i) => {
    //     i = 0
    //     console.log(i);
    //     Wrapper = styled.div`
    //         height: 100%;
    //         display: flex;
    //         transition: all 1.5s ease;
    //         transform: translateX(${i => i * -100}vw);
    //     `;
    //     ++i;
    //     if(i >= sliderItems.length) {
    //         i = 0;
    //     }
    // },1500);

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick('left')}>
                <ArrowLeftOutlined />
            </Arrow>

            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map(sliderItem => (
                    <Slide bg={sliderItem.bg} key={sliderItem.id}>
                        <ImgContainer>
                            <Image src={sliderItem.img} />
                        </ImgContainer>

                        <InfoContainer>
                            <Title>
                                {sliderItem.title}
                            </Title>
                            <Desc>
                                {sliderItem.desc}
                            </Desc>

                            <Button>
                                Xem chi tiết
                            </Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>

            <Arrow direction="right" onClick={() => handleClick('right')}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider
