


import { BrowserRouter } from 'react-router-dom'
import OfferedServicesList from './components/offered-services-list/OfferedServicesList'
import AddServiceForm from './components/add-service-form/AddServiceForm'


function App() {


  return (
    <BrowserRouter>      
      <OfferedServicesList/>
      <AddServiceForm/>
    </BrowserRouter>
  )
}

export default App
