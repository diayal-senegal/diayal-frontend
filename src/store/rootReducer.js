import  authReducer  from './reducers/authReducer';
import  cardReducer  from './reducers/cardReducer';
import  dashboardReducer  from './reducers/dashboardRducer';
import homeReducer  from './reducers/homeReducer';
import orderReducer  from './reducers/orderReducer';
import chatReducer  from './reducers/chatReducer';
import shippingReducer from './reducers/shippingReducer';


const rootReducer =  {
   home: homeReducer,
   auth: authReducer,
   card: cardReducer,
   order: orderReducer,
   dashboard: dashboardReducer,
   chat: chatReducer,
   shipping: shippingReducer
   
}
export default rootReducer;