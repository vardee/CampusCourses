import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import App from './App/App.tsx'
import './index.css'
import Registration from './pages/Registration/registration.tsx'
import Authorization from './pages/Authorization/authorization.tsx'
import Profile from './pages/Profile/profile.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import Courses from './pages/Courses/courses.tsx'
import MyCourses from './pages/MyCourses/mycourses.tsx'
import Teaching from './pages/Teaching/teaching.tsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children: [
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
        path:"/courses",
        element:<Courses />
      },
      {
        path:"/mycourses",
        element:<MyCourses />
      },
      {
        path:"/courses/teaching",
        element:<Teaching />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router ={router} />
  </Provider>,
)
