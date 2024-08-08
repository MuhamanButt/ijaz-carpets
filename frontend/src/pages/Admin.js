import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Signin from "../components/Signin";
import './styles/Admin.css'
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo_black.svg'
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../redux/AdminToken/Action";
import { LogoutOutlined,FundProjectionScreenOutlined,SettingOutlined,DropboxOutlined,PlusOutlined ,TableOutlined} from '@ant-design/icons';
import AddProduct from "./AddProduct";
import Settings from "./Settings";
import { Menu,Popconfirm } from "antd";
import ViewProducts from "./ViewProducts";
import ViewOrders from "./ViewOrders";


const Admin = () => {
  const { isLoggedIn } = useSelector((state) => state.adminToken);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [selectedKey, setSelectedKey] = React.useState('view_orders');
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const onClick = (e) => {
    setSelectedKey(e.key);
    if(e.key == "home")
        navigate('/')
  };
  const logoutUser = ()=>{
    
    dispatch(setLoggedIn(false));
    navigate('/');
  }

  React.useEffect(() => {
    const handleResize = () => { setWindowWidth(window.innerWidth); };
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {!isLoggedIn ? <Signin/> :
      <>
        <div style={{ display: 'flex', height: '100vh' }} className="admin-menu">
            <div style={{ width: windowWidth < 768 ? 50 : 256}}>
                {windowWidth > 768 &&  
                    <div className="menu-logo">
                        <img src={logo} />
                    </div>
                }
                <Menu onClick={onClick}  inlineCollapsed={windowWidth < 600} className={'menu'} defaultSelectedKeys={'view_orders'} mode="inline">
                    <Menu.Item key="home"  icon={<FundProjectionScreenOutlined />}> Home </Menu.Item>
                    <Menu.Item key="view_orders" icon={<DropboxOutlined />}> Order Dashboard </Menu.Item>
                    <Menu.Item key="view_products" icon={<TableOutlined />}> Product Dashboard </Menu.Item>
                    <Menu.Item key="add_product"  icon={<PlusOutlined />}> Add Product </Menu.Item>
                    {/* <Menu.Item key="settings" icon={<SettingOutlined />}> Settings </Menu.Item> */}
                    <Menu.Item key="logout" icon={<LogoutOutlined />} >
                        <Popconfirm title="Are you sure you want to logout?" onConfirm={logoutUser} okText="Yes" cancelText="No" >Logout</Popconfirm>
                    </Menu.Item>
                </Menu>
            </div>
            <div style={{ width: windowWidth > 768 ? `calc(100vw - ${256}px)` : `calc(100vw - ${60}px)`}}>
                {selectedKey === 'add_product' && <AddProduct />}
                {selectedKey === 'view_products' && <ViewProducts />}
                {selectedKey === 'view_orders' && <ViewOrders />}
                {selectedKey === 'settings' && <Settings />}
            </div>
        </div>
      </>
      }
    </div>
  );
};

export default Admin;





