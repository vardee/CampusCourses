import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import App from './App/App.tsx'
import './index.css'
import Registration from './pages/Registration/registration.tsx'
import Authorization from './pages/Authorization/authorization.tsx'
import Profile from './pages/Profile/profile.tsx'
import { Provider } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/store.ts'
import MyCourses from './pages/MyCourses/mycourses.tsx'
import Teaching from './pages/Teaching/teaching.tsx'
import MainPage from './pages/Main/mainPage.tsx'
import Groups from './pages/Groups/groups.tsx'
import GroupPage from './pages/GroupPage/groupPage.tsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children: [
      {
        path:"/",
        element:<MainPage />
      },
      {
        path:"/registration",
        element:<Registration />
      },
      {
        path:"/authorization",
        element:<Authorization />
      },
      {
        path:"/profile",
        element:<Profile />
      },
      {
        path:"/groups",
        element:<Groups />
      },
      {
        path:"/mycourses",
        element:<MyCourses />
      },
      {
        path:"/courses/teaching",
        element:<Teaching />
      },
      {
        path:"/groups/:id",
        element:<GroupPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router ={router} />,
    <ToastContainer position='bottom-left' autoClose={2000} />,
  </Provider>,
)
