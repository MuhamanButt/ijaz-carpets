import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import product6 from '../assets/product6.webp';
import product7 from '../assets/product7.png';

import '../pages/styles/Home.css'

import tags from '../assets/tags.svg'
import sizes from '../assets/sizesSlider.webp'


export const CATEGORIES_DATA = [
    {
      title: "Modern Rugs",
      description: "Contemporary designs that bring a touch of sophistication and comfort to any room.",
      onClick: "/rugs/modern",
      imageURL: product1
    },
    {
      title: "Woven Rugs",
      description: "Handcrafted with intricate patterns, these rugs combine traditional artistry with modern style.",
      onClick: '/rugs/woven',
      imageURL: product2
    },
    {
      title: "Non Woven Rugs",
      description: "Durable and versatile, these rugs are designed for high-traffic areas while maintaining elegance.",
      onClick: "/rugs/non-woven",
      imageURL: product3
    },
    {
      title: "Persian Rugs",
      description: "Timeless designs that add character and a sense of history to your living spaces.",
      onClick: "/rugs/persian",
      imageURL: product4
    },
    {
      title: "Runners",
      description: "Long, narrow rugs perfect for hallways and entryways, offering both style and practicality.",
      onClick: "/rugs/runners",
      imageURL: product5
    },
    {
      title: "Wall Hangings",
      description: "Artistic pieces to enhance your wall decor, transforming any space into a gallery of visual art.",
      onClick: "/wall-hangings",
      imageURL: product6
    },
    {
      title: "Door Mats",
      description: "Stylish and functional mats designed to keep your home’s entrance clean and welcoming.",
      onClick: "/door-mats",
      imageURL: product7
    }
  ];
  

export const SIGN_IN_IMAGE = "https://www.melikhancarpets.com/wp-content/uploads/2023/07/the-role-of-color-in-mosque-carpets-choosing-the-right-palette.jpg"


export const FREE_SHIPPING_ABOVE = 10000
export const DELIVERY_CHARGES = 300
export const PHONE_NUMBER = "+92 322 4922848"
export const ADDRESS = "318 - Landa Bazar Lahore"
export const EMAIL = "muhamanibutt@gmail.com"
export const TIMINGS = "Mon - Sat (10AM to 9PM)"
export const HEADLINE = `Enjoy Free Delivery on Orders Over Rs. ${FREE_SHIPPING_ABOVE} Shop Now 🚚✨`
export const ITEMS_PER_PAGE = 12

export const BANK_INFO = [
    {
        "title":"Muhaman Ijaz",
        "bank":"Meezan Bank",
        "account_number":"02500109574903",
        "iban":null,
        "logo_url":'https://play-lh.googleusercontent.com/7r_CxADHDXrfNNnwqCFcbwRboziLhtm-KUhBvt03f0-uSA1_h9G8jpjWnbMzmSXA7IY'
    },
    {
        "title":"Muhaman Ijaz",
        "bank":"Easypaisa",
        "account_number":"03224922848",
        "iban":null,
        "logo_url":'https://www.thenews.com.pk/assets/uploads/akhbar/2024-01-27/1151682_8435733_Easypaisa_akhbar.jpg'
    },

]

export const PRODUCT_CATEGORIES = [
'Door mats','Wall Hangings','Runners','Versace','Persian','Modern','Woven','Non Woven']


export const PRODUCT_TYPE = [
    { key: "Select an Option", value: "" },
    ...PRODUCT_CATEGORIES.map(type => ({
      key: type,
      value: type
    }))
];


export const SIZES_AVAILABLE = [
    "2.6 ft width x 6.3 ft length (80cm x 200cm)",
    "3 ft width x 5 ft length (100cm x 150cm)",
    "4 ft width x 5.6 ft length (120cm x 170cm)",
    "5 ft width x 7.3 ft length (150cm x 220cm)",
    "6.6 ft width x 9.6 ft length (200cm x 290cm)",
    "8.3 ft width x 11 ft length (250cm x 350cm)",
]

export const RUG_SIZES = [
    { key: "Select an Option", value: "" },
    ...SIZES_AVAILABLE.map(type => ({
      key: type,
      value: type
    }))
]

export const TOP_SEARCHES = [
    'Door mats','Wall Hangings','Runners'
]


export const TAGS_COMPONENTS = [
    <img src={tags} className='tags-item' />,

]


export const SIZES_COMPONENTS = [
    <img src={sizes} className='tags-item' />,

]

export const HOME_IMAGE2_DESCRIPTION = "Your ultimate destination for high quality carpets and rugs. We offer an extensive collection of exquisite carpets and rugs in a variety of styles, sizes, and colors to meet your unique preferences."