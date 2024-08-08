import React from 'react';
import './styles/Testimonials.css';

const testimonials = [
    {
      name: "Usman Shah",
      rating: 4.5,
      text: "The rug we purchased has truly transformed our living space. It's beautiful and incredibly well-made, becoming the centerpiece of our home.",
      address: "Karachi, Pakistan"
    },
    {
      name: "Zainab Bibi",
      rating: 4,
      text: "We are thrilled with our new rug. It adds a touch of elegance to our decor, and the quality is second to none.",
      address: "Lahore, Pakistan"
    },
    {
      name: "Hassan Malik",
      rating: 5,
      text: "The selection of rugs is fantastic, and the service was excellent. The rug fits perfectly in our home office and looks stunning.",
      address: "Islamabad, Pakistan"
    },
    {
      name: "Ayesha Tariq",
      rating: 4.5,
      text: "Our new rug exceeded expectations. It's vibrant and durable, adding a wonderful touch to our home environment.",
      address: "Lahore, Pakistan"
    },
    {
      name: "Bilal Ahmed",
      rating: 5,
      text: "Exceptional quality and craftsmanship. The rug's design is impressive and the customer service was outstanding.",
      address: "Karachi, Pakistan"
    },
    {
      name: "Hira Khan",
      rating: 4.5,
      text: "Absolutely delighted with our purchase. The rug is of top quality and adds a luxurious feel to our living space.",
      address: "Lahore, Pakistan"
    },
    {
      name: "Ali Raza",
      rating: 4,
      text: "The rug is exactly what we were looking for. It enhances the look of our room and the quality is fantastic.",
      address: "Peshawar, Pakistan"
    },
    {
      name: "Nida Ahmed",
      rating: 4.5,
      text: "I'm impressed by the quality and design of the rug. It fits perfectly in our living area and has brought a fresh look to the space.",
      address: "Lahore, Pakistan"
    },
    {
      name: "Arif Khan",
      rating: 5,
      text: "Excellent purchase experience. The rug is beautiful and adds a warm touch to our home. Highly recommend.",
      address: "Faisalabad, Pakistan"
    }
  ];
  

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const testimonialChunks = chunkArray(testimonials, 3); // Show 3 testimonials per slide

const Testimonials = () => {
  return (
    <section className="ezy__testimonial20 light">
      <div className="container position-relative">
        <div className="row justify-content-between mb-md-4">
        <h2 className="ezy__testimonial20-heading mb-4">What Our Clients Say</h2>
          <div className="col-8 col-lg-6 col-xl-5">
           
            <p className="ezy__testimonial20-sub-heading mb-0">
              Hear from our satisfied customers about their experiences with our exquisite rugs.
            </p>
          </div>
          <div className="col-3 col-sm-auto d-flex justify-content-end align-items-center position-relative">
            <button
              className="carousel-control-prev me-4"
              type="button"
              data-bs-target="#ezy__testimonial20-controls"
              data-bs-slide="prev"
            >
              <i className="fas fa-angle-left"></i>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#ezy__testimonial20-controls"
              data-bs-slide="next"
            >
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div id="ezy__testimonial20-controls" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner overflow-visible">
                {testimonialChunks.map((chunk, chunkIndex) => (
                  <div className={`carousel-item ${chunkIndex === 0 ? 'active' : ''}`} key={chunkIndex}>
                    <div className="row mt-1">
                      {chunk.map((testimonial, index) => (
                        <div className="col-md-6 col-lg-4 mt-4" key={index}>
                          <div className="ezy__testimonial20-item px-4 py-4">
                            <div className="ezy__testimonial20-content mt-3">
                              <p className="mb-4 ezy__testimonial20-rating">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span
                                    key={i}
                                    className={`fas fa-star ${i < Math.floor(testimonial.rating) ? 'active' : ''} ${i === Math.floor(testimonial.rating) && testimonial.rating % 1 !== 0 ? 'fa-star-half-alt' : ''}`}
                                  ></span>
                                ))}
                              </p>
                              <p className="opacity-50 mb-4">
                                {testimonial.text}
                              </p>
                              <div className="d-flex align-items-center">
                                <span className="me-2">
                                  <h5 className="mb-0 fw-bold"><i class="fa-solid fa-user me-2"></i>{testimonial.name}</h5>
                                  <p>{testimonial.address}</p>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials;
