import { StarBorderOutlined } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const Container = styled.div`
    
`;

const Title = styled.h1`
    text-align: center;
    font-weight: 400;
`;

const Wrapper = styled.div`

`;

const Comment = styled.div`
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 5px;
`;

const Star = styled.p`
    margin-left: 5px;
`;

const Content = styled.div`

`;
const Rate = () => {

    return (
        <Container>
            <Title>
                Đánh giá
            </Title>
            <Wrapper>
                <Comment>
                    <Header>
                        <Avatar src='https://nhacchuonghinhnen.com/wp-content/uploads/2020/03/hinh-nen-gai-xinh-full-hd-cho-dien-thoai-2-scaled.jpg' />
                        <Star>
                            <Box component="fieldset" mb={3} borderColor="transparent" style={{
                                margin: '0',
                                border: '0',
                                padding: '0'
                            }}>
                                <Typography component="legend">UserName</Typography>
                                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                            </Box>
                        </Star>
                    </Header>
                    <Content>
                        Rất tốt
                    </Content>
                </Comment>

                <Comment>
                    <Header>
                        <Avatar src='https://nhacchuonghinhnen.com/wp-content/uploads/2020/03/hinh-nen-gai-xinh-full-hd-cho-dien-thoai-2-scaled.jpg' />
                        <Star>
                            <Box component="fieldset" mb={3} borderColor="transparent" style={{
                                margin: '0',
                                border: '0',
                                padding: '0'
                            }}>
                                <Typography component="legend">UserName</Typography>
                                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                            </Box>
                        </Star>
                    </Header>
                    <Content>
                        Rất tốt
                    </Content>
                </Comment>

                <Comment>
                    <Header>
                        <Avatar src='https://nhacchuonghinhnen.com/wp-content/uploads/2020/03/hinh-nen-gai-xinh-full-hd-cho-dien-thoai-2-scaled.jpg' />
                        <Star>
                            <Box component="fieldset" mb={3} borderColor="transparent" style={{
                                margin: '0',
                                border: '0',
                                padding: '0'
                            }}>
                                <Typography component="legend">UserName</Typography>
                                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                            </Box>
                        </Star>
                    </Header>
                    <Content>
                        Rất tốt
                    </Content>
                </Comment>
            </Wrapper>
        </Container>
    )
}

export default Rate
