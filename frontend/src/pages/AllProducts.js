import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BreadCrumb from "../components/BreadCrumb";
import { generateBreadcrumbs } from "../utils/Important_functions";
import { Button, Drawer } from "antd";
import "./styles/AllProducts.css";
import filterIcon from '../assets/icons/filter.svg'
import Filters from "../less_use/Filters";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const path = window.location.pathname;
  const breadcrumbItems = generateBreadcrumbs(path);
  const lastItem = breadcrumbItems[breadcrumbItems.length - 1]; // last item to show in title
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Handler for apply filters
  const handleApplyFilters = (filters) => {
    onClose()
    console.log("Filters applied:", filters);
  };

  // Handler for clear filters
  const handleClearFilters = () => {
    onClose()
    console.log("Filters cleared");
  };

  // Handler for drawer visibility
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const items = [
    {
        "product_id" : "72bdh1g",
        "product_name" : "Persian Polypropylene Rug,Back Woven (Article-1231-Blue)",
        "product_price_old":32300,
        "product_price_new":25300,
        "product_description":'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quae, culpa harum id quisquam error ex tenetur esse, aspernatur perspiciatis dolorem a, quidem accusamus. Amet, quaerat quis ab obcaecati sunt aliquid ipsam dolores corporis in officiis inventore dignissimos vel explicabo culpa, nulla repellat magnam modi magni quae soluta totam ex? Velit, cumque excepturi! Illum accusamus fuga exercitationem quisquam dolorum accusantium explicabo fugiat sapiente placeat, numquam ullam facilis, blanditiis ipsam perspiciatis nemo unde omnis cupiditate iste! Explicabo facilis culpa voluptatibus, ad laboriosam quos perspiciatis, autem libero impedit recusandae, id placeat officia sint delectus quibusdam velit in mollitia iste neque ab! Adipisci at sunt magni illo magnam ab sed officiis totam voluptates obcaecati in dicta cupiditate dolore ratione eveniet vitae ex quod velit et nihil, sapiente dolorem libero tempora. Doloribus vero tempore, molestiae dolorum optio corporis inventore, quam minus facilis, sequi eligendi ut qui commodi! Doloremque odio eum delectus sint itaque iusto!',
        "sizes_available" : ["2.6 ft width x 6.3 ft length (80cm x 200cm)","3 ft width x 5 ft length (100cm x 150cm)"],
        "num_of_review":5,
        "average_rating":3.5,
        "estimated_delivery_days":7,
        "reviews" : [{
            "userID":893283,
            "review": "Lorem ipsum dolor siommodi! Doloremque odio eum delectus sint itaque iusto!"
        },{
            "userID":893283,
            "review": "Lorem ipsum dolor siommodi! Doloremque odio eum delectus sint itaque iusto!"
        }],
        "images_url":[
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
        ]
    },
    {
        "product_id" : "72bdh1g",
        "product_name" : "Persian Polypropylene Rug,Back Woven (Article-1231-Blue)",
        "product_price_old":32300,
        "product_price_new":25300,
        "product_description":'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quae, culpa harum id quisquam error ex tenetur esse, aspernatur perspiciatis dolorem a, quidem accusamus. Amet, quaerat quis ab obcaecati sunt aliquid ipsam dolores corporis in officiis inventore dignissimos vel explicabo culpa, nulla repellat magnam modi magni quae soluta totam ex? Velit, cumque excepturi! Illum accusamus fuga exercitationem quisquam dolorum accusantium explicabo fugiat sapiente placeat, numquam ullam facilis, blanditiis ipsam perspiciatis nemo unde omnis cupiditate iste! Explicabo facilis culpa voluptatibus, ad laboriosam quos perspiciatis, autem libero impedit recusandae, id placeat officia sint delectus quibusdam velit in mollitia iste neque ab! Adipisci at sunt magni illo magnam ab sed officiis totam voluptates obcaecati in dicta cupiditate dolore ratione eveniet vitae ex quod velit et nihil, sapiente dolorem libero tempora. Doloribus vero tempore, molestiae dolorum optio corporis inventore, quam minus facilis, sequi eligendi ut qui commodi! Doloremque odio eum delectus sint itaque iusto!',
        "sizes_available" : ["2.6 ft width x 6.3 ft length (80cm x 200cm)","3 ft width x 5 ft length (100cm x 150cm)"],
        "num_of_review":5,
        "average_rating":3.5,
        "estimated_delivery_days":7,
        "reviews" : [{
            "userID":893283,
            "review": "Lorem ipsum dolor siommodi! Doloremque odio eum delectus sint itaque iusto!"
        },{
            "userID":893283,
            "review": "Lorem ipsum dolor siommodi! Doloremque odio eum delectus sint itaque iusto!"
        }],
        "images_url":[
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
        ]
    },
    {
        "product_id" : "72bdh1g",
        "product_name" : "Persian Polypropylene Rug,Back Woven (Article-1231-Blue)",
        "product_price_old":32300,
        "product_price_new":25300,
        "product_description":'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quae, culpa harum id quisquam error ex tenetur esse, aspernatur perspiciatis dolorem a, quidem accusamus. Amet, quaerat quis ab obcaecati sunt aliquid ipsam dolores corporis in officiis inventore dignissimos vel explicabo culpa, nulla repellat magnam modi magni quae soluta totam ex? Velit, cumque excepturi! Illum accusamus fuga exercitationem quisquam dolorum accusantium explicabo fugiat sapiente placeat, numquam ullam facilis, blanditiis ipsam perspiciatis nemo unde omnis cupiditate iste! Explicabo facilis culpa voluptatibus, ad laboriosam quos perspiciatis, autem libero impedit recusandae, id placeat officia sint delectus quibusdam velit in mollitia iste neque ab! Adipisci at sunt magni illo magnam ab sed officiis totam voluptates obcaecati in dicta cupiditate dolore ratione eveniet vitae ex quod velit et nihil, sapiente dolorem libero tempora. Doloribus vero tempore, molestiae dolorum optio corporis inventore, quam minus facilis, sequi eligendi ut qui commodi! Doloremque odio eum delectus sint itaque iusto!',
        "sizes_available" : ["2.6 ft width x 6.3 ft length (80cm x 200cm)","3 ft width x 5 ft length (100cm x 150cm)"],
        "num_of_review":5,
        "average_rating":3.5,
        "estimated_delivery_days":7,
        "reviews" : [{
            "userID":893283,
            "review": "Lorem ipsum dolor siommodi! Doloremque odio eum delectus sint itaque iusto!"
        },{
            "userID":893283,
            "review": "Lorem ipsum dolor siommodi! Doloremque odio eum delectus sint itaque iusto!"
        }],
        "images_url":[
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
        ]
    },
    {
        "product_id" : "72bdh1g",
        "product_name" : "Persian Polypropylene Rug,Back Woven (Article-1231-Blue)",
        "product_price_old":32300,
        "product_price_new":25300,
        "product_description":'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quae, culpa harum id quisquam error ex tenetur esse, aspernatur perspiciatis dolorem a, quidem accusamus. Amet, quaerat quis ab obcaecati sunt aliquid ipsam dolores corporis in officiis inventore dignissimos vel explicabo culpa, nulla repellat magnam modi magni quae soluta totam ex? Velit, cumque excepturi! Illum accusamus fuga exercitationem quisquam dolorum accusantium explicabo fugiat sapiente placeat, numquam ullam facilis, blanditiis ipsam perspiciatis nemo unde omnis cupiditate iste! Explicabo facilis culpa voluptatibus, ad laboriosam quos perspiciatis, autem libero impedit recusandae, id placeat officia sint delectus quibusdam velit in mollitia iste neque ab! Adipisci at sunt magni illo magnam ab sed officiis totam voluptates obcaecati in dicta cupiditate dolore ratione eveniet vitae ex quod velit et nihil, sapiente dolorem libero tempora. Doloribus vero tempore, molestiae dolorum optio corporis inventore, quam minus facilis, sequi eligendi ut qui commodi! Doloremque odio eum delectus sint itaque iusto!',
        "sizes_available" : ["2.6 ft width x 6.3 ft length (80cm x 200cm)","3 ft width x 5 ft length (100cm x 150cm)"],
        "num_of_review":5,
        "average_rating":3.5,
        "estimated_delivery_days":7,
        "reviews" : [{
            "userID":893283,
            "review": "Lorem ipsum dolor siommodi! Doloremque odio eum delectus sint itaque iusto!"
        },{
            "userID":893283,
            "review": "Lorem ipsum dolor siommodi! Doloremque odio eum delectus sint itaque iusto!"
        }],
        "images_url":[
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
        ]
    },
    {
        "product_id" : "72bdh1g",
        "product_name" : "Persian Polypropylene Rug,Back Woven (Article-1231-Blue)",
        "product_price_old":32300,
        "product_price_new":25300,
        "product_description":'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quae, culpa harum id quisquam error ex tenetur esse, aspernatur perspiciatis dolorem a, quidem accusamus. Amet, quaerat quis ab obcaecati sunt aliquid ipsam dolores corporis in officiis inventore dignissimos vel explicabo culpa, nulla repellat magnam modi magni quae soluta totam ex? Velit, cumque excepturi! Illum accusamus fuga exercitationem quisquam dolorum accusantium explicabo fugiat sapiente placeat, numquam ullam facilis, blanditiis ipsam perspiciatis nemo unde omnis cupiditate iste! Explicabo facilis culpa voluptatibus, ad laboriosam quos perspiciatis, autem libero impedit recusandae, id placeat officia sint delectus quibusdam velit in mollitia iste neque ab! Adipisci at sunt magni illo magnam ab sed officiis totam voluptates obcaecati in dicta cupiditate dolore ratione eveniet vitae ex quod velit et nihil, sapiente dolorem libero tempora. Doloribus vero tempore, molestiae dolorum optio corporis inventore, quam minus facilis, sequi eligendi ut qui commodi! Doloremque odio eum delectus sint itaque iusto!',
        "sizes_available" : ["2.6 ft width x 6.3 ft length (80cm x 200cm)","3 ft width x 5 ft length (100cm x 150cm)"],
        "num_of_review":5,
        "average_rating":3.5,
        "estimated_delivery_days":7,
        "reviews" : [{
            "userID":893283,
            "review": "Lorem ipsum dolor siommodi! Doloremque odio eum delectus sint itaque iusto!"
        },{
            "userID":893283,
            "review": "Lorem ipsum dolor siommodi! Doloremque odio eum delectus sint itaque iusto!"
        }],
        "images_url":[
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
        ]
    },
  ]
  return (
    <div>
      <Navbar />
      {/* //!-------------------------------------- BREADCRUMB AND TITLE ---------------- */}
      <div className="row m-0">
        <div className="col p-0 px-5">
          {lastItem && <h2>{lastItem.title}</h2>}
          <BreadCrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="row px-1 px-sm-3 px-md-5 mb-5 m-0">
        <div className="d-md-none mb-3">
          <Button className="open-filter-btn" onClick={showDrawer}>
            <img src={filterIcon} alt="" />
            Filters
          </Button>
          <Drawer
            title="Filters"
            placement="left"
            onClose={onClose}
            visible={drawerVisible}
            width={300}
          >
            <Filters
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </Drawer>
        </div>
        <div className="col-3 d-none d-md-block">
          <Filters
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </div>
        <div className="col-12 col-md-9">
          <div className="row m-0">
            {items.map((item, key) => (
              <div className="col-6 col-lg-4 p-2" key={key}>
                <ProductCard productDetails={item}  />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllProducts;
