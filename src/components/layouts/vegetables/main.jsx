import React, { Component } from 'react';
import {Helmet} from 'react-helmet'
import '../../common/index.scss';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';

// Import custom components
import {Slider3} from "../../../services/script"
import Trading from "./tranding"
import Special from "../common/special"
import {
    svgFreeShipping,
    svgservice,
    svgoffer
} from "../../../services/script"
import HeaderTwo from "../../common/headers/header-two"
import FooterOne from "../../common/footers/footer-one"

class Vegetables extends Component {

    componentDidMount() {
        document.getElementById("color").setAttribute("href", `#` );
    }
    render(){
        return (
            <div>
                <Helmet>
                    <title>AsanKasan | Home</title>
                </Helmet>
                <HeaderTwo logoName={'logo.png'} />
                <section className="p-0">
                    <Slider className="slide-1 home-slider"  autoplay={true}>
                    <div>
                            <div className="home home39 text-center" style={{backgroundImage: "url('https://r-fa.bstatic.com/xdata/images/xphoto/1920x810/94265151.jpg?k=004e73dd6eb034d190633d9ec39cf2ff695ab1d2a025b4aaad239a502d73b584&o=')", backgroundSize:"center"}}>
                                    <div className="container" >
                                        <div className="row">
                                            <div className="col">
                                                <div className="slider-contain" >
                                                    <div>
                                                        <h4 style={{color:"white"}}>Ease your Work</h4>
                                                        <h1 style={{color:"white"}}>Become Farmer Now</h1><a href={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">shop
                                                        now</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home38 text-center" style={{backgroundImage: "url('https://r-fa.bstatic.com/xdata/images/xphoto/1920x810/94265151.jpg?k=004e73dd6eb034d190633d9ec39cf2ff695ab1d2a025b4aaad239a502d73b584&o=')", backgroundSize:"center"}}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="slider-contain">
                                                    <div>
                                                        <h4 style={{color: "white"}}>Buy healthy products</h4>
                                                        <h1 style={{color: "white"}}>Everything, One step away</h1><a href={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">shop
                                                        now</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </Slider>
                </section>

                {/*collection banner layout*/}
                <section className="banner-padding absolute-banner pb-0">
                    <div className="container absolute-bg">
                        <div className="service p-0">
                            <div className="row">
                                <div className="col-md-4 service-block">
                                    <div className="media">
                                        <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                                        <div className="media-body">
                                            <h4>free shipping</h4>
                                            <p>free shipping world wide</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 service-block">
                                    <div className="media">
                                        <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                        <div className="media-body">
                                            <h4>24 X 7 service</h4>
                                            <p>online service for new customer</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 service-block">
                                    <div className="media">
                                        <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                                        <div className="media-body">
                                            <h4>festival offer</h4>
                                            <p>new online special festival offer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*collection banner layout end*/}

                {/*product section Start*/}
                <Trading type={'Fruits'} />
                {/*product section End*/}

                {/*Parallax banner*/}
                <section className="p-0">
                    <div className="full-banner parallax-banner15 parallax text-left p-left" style={{backgroundImage: "url('https://r-fa.bstatic.com/xdata/images/xphoto/1920x810/94265151.jpg?k=004e73dd6eb034d190633d9ec39cf2ff695ab1d2a025b4aaad239a502d73b584&o=')", backgroundSize:"center"}}>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        <h2>2020</h2>
                                        <h3 style={{color:'white'}}>Asan Kasan Market</h3>
                                        <h4 style={{color:'white'}}>special offer</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*Parallax banner end*/}

                {/*product-box slider*/}
                <Special type={'Fruits'} />
                {/*product-box slider end*/}

                {/*Blog Section End*/}
                <FooterOne logoName={'logo.png'} />
            </div>
        )
    }
}


export default Vegetables