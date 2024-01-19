import PropTypes from 'prop-types';
import styles from './index.module.css';

const classNames = [
    'bg-purple-50',
    'bg-blue-50',
    'bg-red-50',
    'bg-yellow-50',
    'bg-green-50',
    'bg-indigo-50',
    'bg-pink-50',
];

const CarouselItem = ({ children, className, image, title, detail, idx }) => {
    return (
        <div
            className={`${styles.item} ${className || ''} ${
                classNames[idx % classNames.length]
            }`}
        >
            <div className={styles.hoverArea}>
                <h3 className={styles.initTitle}>{title}</h3>
                <div className={styles.details}>
                    <p>{detail}</p>
                </div>

                <img
                    className={`${styles.carouselImageBack} ${styles.carouselImage}`}
                    src={image}
                    alt=''
                />
                <img
                    className={`${styles.carouselImage} active`}
                    src={image}
                    alt={title}
                />
                {children ?? ''}
            </div>
        </div>
    );
};

CarouselItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    detail: PropTypes.string,
    idx: PropTypes.number,
};

export default CarouselItem;
