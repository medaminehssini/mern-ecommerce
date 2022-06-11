import {Container} from 'react-bootstrap'
import Footer from './components/Footer';
import Header from './components/Header';
import {BrowserRouter as Router , Route} from "react-router-dom"
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import OrdersScreen from './screens/user/OrdersScreen';
import Wishlist from './screens/user/Wishlist';
import ProductSearchScreen from './screens/ProductSearchScreen';

function App() {
  return (
    <div className="App">
        <Router>
            <Header />

            <Container>
              <main>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/search" component={ProductSearchScreen} exact />
              <Route path="/search/:keyword" component={ProductSearchScreen} exact />
              <Route path="/page/:pageNumber" component={ProductSearchScreen} exact />
              <Route path="/search/:keyword/page/:pageNumber" component={ProductSearchScreen} exact />

              <Route path="/products/:id" component={ProductScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/login" component={LoginScreen}  />
              <Route path="/register" component={RegisterScreen}  />

              <Route path="/user/edit/profile" component={ProfileScreen}  />
              <Route path="/user/orders" component={OrdersScreen}  />
              <Route path="/user/wishlist" component={Wishlist}  />


              <Route path="/shipping" component={ShippingScreen}  />
              <Route path="/payment" component={PaymentScreen}  />
              <Route path="/placeorder" component={PlaceOrderScreen}  />
              <Route path="/order/:id" component={OrderScreen}  />
              
              <Route path="/admin/user/list" component={UserListScreen}  />
              <Route path="/admin/user/:id/edit" component={UserEditScreen}  />
              <Route path="/admin/product/list" component={ProductListScreen} exact />
              <Route path="/admin/product/list/:pageNumber" component={ProductListScreen} exact />

              <Route path="/admin/product/:id/edit" component={ProductEditScreen}  />
              <Route path="/admin/order/list" component={OrderListScreen}  />

              
              </main> 
            </Container>

            <Footer/>
        </Router>
    </div>
  );
}

export default App;
