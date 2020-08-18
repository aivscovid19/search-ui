import React from 'react';
import SlickSlider from 'react-slick';
import styled from 'styled-components';

// Slider directly from the react-slick documentation
// https://react-slick.neostack.com/docs/example/multiple-items

const Container = styled.ul`
    width: 100%;
    padding: 32px;
`

const SlideView = ({ children }) => (
    <Container>
        <SlickSlider
            speed={300}
            slidesToShow={5}
            slidesToScroll={3}
            infinte={false}
        >
            {children}
        </SlickSlider>
    </Container>
)

export default SlideView;