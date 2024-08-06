import product1 from '../assets/product1.png';
import product2 from '../assets/product2.webp';
import product3 from '../assets/product3.png';

import '../pages/styles/Home.css'

import tags from '../assets/tags.svg'
import sizes from '../assets/sizesSlider.svg'


export const CATEGORIES_DATA = [
  {
    title: "Rugs",
    description: "Elegant and functional carpets to enhance any room’s comfort and style.",
    onClick: "/rugs",
    imageURL: product1
  },
  {
    title: "Wall Hangings",
    description: "Artistic decor pieces to transform your walls into visual masterpieces.",
    onClick: "/wall-hangings",
    imageURL: product2
  },
  {
    title: "Door Mats",
    description: "Durable mats designed to keep your entryways clean and inviting",
    onClick: "/door-mats",
    imageURL: product3
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
'Door mats','Wall Hangings','Runners','Versace','Vintage','Modern','Woven','Non Woven']


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