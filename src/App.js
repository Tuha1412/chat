import './App.css';
import Login from './components/Login/Login';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ChatRoom from './components/ChatRoom/ChatRoom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modal/AddRoomModal';
import InviteMemberModal from './components/Modal/InviteMemberModal';

function App() {

   return (
      <BrowserRouter>
         <AuthProvider>
            <AppProvider>
               <Switch>
                  <Route component={Login} path="/login"/>
                  <Route component={ChatRoom} path="/"/>
               </Switch>
               <AddRoomModal/>
               <InviteMemberModal/>
            </AppProvider>
         </AuthProvider>
      </BrowserRouter>
   );
}

export default App;