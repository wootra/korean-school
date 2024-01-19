import PropTypes from 'prop-types';
import Slider from 'react-slick';
import styles from './MarketingCarousel.module.css';
import myPrincessImage from './assets/my-princess.jpeg';
import CarouselItem from '../CarouselItem';

const MarketingCarousel = () => {
    const marketingObj = [
        {
            title: 'My Princess',
            image: myPrincessImage,
            detail: 'Dolor laborum quis dolore officia ullamco magna ea eu nulla duis enim excepteur. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            title: 'The Lean Startup',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg',
            detail: 'Dolor laborum quis dolore officia ullamco magna ea eu nulla duis enim excepteur.',
        },
        {
            title: 'My Princess 3',
            image: myPrincessImage,
            detail: 'Dolor laborum quis dolore officia ullamco magna ea eu nulla duis enim excepteur.',
        },
        {
            title: 'My Princess 4',
            image: myPrincessImage,
            detail: 'Dolor laborum quis dolore officia ullamco magna ea eu nulla duis enim excepteur.',
        },
        {
            title: 'My Princess 5',
            image: myPrincessImage,
            detail: 'Dolor laborum quis dolore officia ullamco magna ea eu nulla duis enim excepteur.',
        },
    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className={`${styles.carouselWrapper}`}>
            <Slider {...settings}>
                {marketingObj.map((item, index) => (
                    <CarouselItem
                        key={item.title + index}
                        title={item.title}
                        image={item.image}
                        detail={item.detail}
                        idx={index}
                    />
                ))}
            </Slider>
        </div>
    );
};

MarketingCarousel.propTypes = {
    idx: PropTypes.number,
};

export default MarketingCarousel;
