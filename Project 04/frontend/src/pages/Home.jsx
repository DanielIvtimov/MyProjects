import React from "react";
import "../styles/Home.css"
import { Container, Row, Col } from "reactstrap";
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png'
import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedToursList from "../components/Featured-tours/FeaturedToursList";
import experienceImg from "../assets/images/experience.png";
import MasonryGalleryImages from "../components/Image-gallery/MasonryGalleryImages";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";

const Home = () => {
    return(
        <>
            {/* Hero Section Start */}
            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className="hero__content">
                                <div className="hero__subtitle d-flex align-items-center">
                                    <Subtitle Subtitle={'Know Before You Go'}/> 
                                    <img src={worldImg} alt="" />
                                </div>
                                <h1>Traveling opens the door to creating <span className="highlight">memories</span></h1>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores omnis magnam nemo, tempore, sapiente maxime nostrum rem obcaecati sequi reprehenderit architecto numquam soluta. Velit quisquam eos veniam unde? Odio, numquam.</p>
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box">
                                <img src={heroImg} alt="" />
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box hero__video-box mt-4" >
                                <video src={heroVideo} alt="" controls/>
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box mt-5">
                                <img src={heroImg02} alt="" />
                            </div>
                        </Col>
                        <SearchBar />
                    </Row>
                </Container>
            </section>
            {/* Hero Section End */}
            <section>
                <Container>
                    <Row>
                        <Col lg='3'>
                            <h5 className="services__subtitle">What we serve</h5>
                            <h2 className="services__title">We offer our best services</h2> 
                        </Col>
                        <ServiceList /> 
                    </Row>
                </Container>
            </section>  
            {/* Featured Tour Section Start */};
            <section>
                <Container>
                    <Row>
                        <Col lg='12' className="mb-5">
                            <Subtitle Subtitle={'Explore'} />
                            <h2 className="featured__tour-title">Our featured tours</h2>
                        </Col>
                        <FeaturedToursList />
                    </Row>
                </Container>
            </section>
            {/* Featured Tour Section End */};
            {/* Experience Section Start */};
            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className="experience__content">
                                <Subtitle Subtitle={'Experience'} />
                                <h2>With our all experience <br /> we will serve you</h2>
                                <p>Lorem ispum dolor sit amet, consectur adipisicing elit. <br /> Quas aliquam, hic tempora inventore suscipit unde.</p>
                            </div>
                            <div className="counter__wrapper d-flex align-items-center gap-5">
                                <div className="counter__box">
                                    <span>12k+</span>
                                    <h6>Successful trip</h6>
                                </div>
                                <div className="counter__box">
                                    <span>2k+</span>
                                    <h6>Regular clients</h6>
                                </div>
                                <div className="counter__box">
                                    <span>15</span>
                                    <h6>Years experience</h6>
                                </div>
                            </div>
                        </Col>
                        <Col lg='6'>
                            <div className="experience__img">
                                <img src={experienceImg} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Experience Section End */};
            {/* Gallery Section Start */};
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <Subtitle Subtitle={'Gallery'} />
                            <h2 className="gallery__title">Visit our customers tour gallery</h2>
                        </Col>
                        <Col lg='12'>
                            <MasonryGalleryImages />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Testimonial Section Start */};
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <Subtitle Subtitle={'Fans Love'} />
                            <h2 className="testimonial__title">What our fans say about us</h2>
                        </Col>
                        <Col lg='12'>
                            <Testimonials />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Testimonial Section End */};
            <Newsletter />
        </>
    )
}

export default Home;    