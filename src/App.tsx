import { RouterProvider } from 'react-router-dom'
import './App.css'
import { Center } from '@chakra-ui/react'
import { CustomSpinner } from './components'
import Routes from './Routes'
// import { Button } from './components'

function App() {

  return (
    <RouterProvider router={Routes} fallbackElement={
      <Center h={"100vh"} w={"100vw"}>
        <CustomSpinner />
      </Center>
    } />
  )
}

export default App
