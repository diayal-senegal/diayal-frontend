import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import "react-multi-carousel/lib/styles.css";
import { useSelector } from 'react-redux';


const Categorys = () => {

     const {categorys} = useSelector(state => state.home)

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1400 },
            items: 6,
            slidesToSlide: 2
        },
        desktop: {
            breakpoint: { max: 1400, min: 1024 },
            items: 5,
            slidesToSlide: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 4,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 768, min: 480 },
            items: 3,
            slidesToSlide: 1
        },
        smallMobile: {
            breakpoint: { max: 480, min: 0 },
            items: 2,
            slidesToSlide: 1
        }
    };
    return (
        <div className='bg-gray-50 py-8'>
            <div className='w-[87%] mx-auto relative'>
                {/* Titre style Amazon */}
                <div className='mb-6'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Meilleures catégories</h2>
                        <Link to='/categories' className='text-sm text-blue-600 hover:text-blue-800 hover:underline'>
                            Voir tout
                        </Link>
                    </div>
                    <p className='text-sm text-gray-600'>Découvrez nos catégories les plus populaires</p>
                </div>
           
                <Carousel
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    infinite={true}
                    arrows={true}
                    responsive={responsive}
                    transitionDuration={500}
                    containerClass="carousel-container"
                    itemClass="carousel-item-padding-40-px"
                    removeArrowOnDeviceType={["mobile", "smallMobile"]}
                >
                    {
                        categorys.map((c, i) => 
                        <div key={i} className='px-2'>
                            <Link to={`/products?category=${encodeURIComponent(c.slug)}`} 
                                  className='block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300'>
                                <div className='aspect-square p-4 flex items-center justify-center bg-gray-50'>
                                    <img className='w-full h-full object-contain' src={c.image} alt={c.name} />
                                </div>
                                <div className='p-3 text-center'>
                                    <h3 className='text-sm font-medium text-gray-900 truncate'>{c.name}</h3>
                                </div>
                            </Link>
                        </div>
                        ) 
                    }
                 </Carousel>
            </div>
        </div>
    );
};

export default Categorys;