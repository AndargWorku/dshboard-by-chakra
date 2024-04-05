import React from 'react'
import ProductList from './pages/ProductList'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar';
import Analytics from './pages/Analytics';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Sidebar>
      <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/analytics" element={<Analytics  />} />
      <Route path="/product" element={<ProductList />}/>
      
      </Routes>
    </Sidebar>
  </BrowserRouter>
    </div>
  )
}

export default App





















// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Sidebar from './components/Sidebar';

// import Dashboard from './pages/Dashboard'

// import Analytics from './pages/AnalyticsPage'

// import ProductList from './ProductList';
// import './App.css';


// // import { ChakraProvider } from '@chakra-ui/react';

// type SaleData = {
//   date: string;
//   amount: number;
// };

// type RevenueData = {
//   month: string;
//   revenue: number;
// };

// const App: React.FC = () => {
//   const saleData: SaleData[] = [
//     { date: '2022-01-01', amount: 100 },
//     { date: '2022-01-02', amount: 150 },
//     { date: '2022-01-03', amount: 200 },
//     { date: '2022-01-04', amount: 120 },
//     { date: '2022-01-05', amount: 180 },
//     { date: '2022-01-06', amount: 90 },
//     { date: '2022-01-07', amount: 110 },
//     { date: '2022-01-08', amount: 130 },
//     { date: '2022-01-09', amount: 170 },
//     { date: '2022-01-10', amount: 160 },
//   ];

//   const revenueData: RevenueData[] = [
//     { month: 'January', revenue: 500 },
//     { month: 'February', revenue: 700 },
//     { month: 'March', revenue: 600 },
//     { month: 'April', revenue: 800 },
//     { month: 'May', revenue: 900 },
//     { month: 'June', revenue: 750 },
//     { month: 'July', revenue: 850 },
//     { month: 'August', revenue: 950 },
//     { month: 'September', revenue: 700 },
//     { month: 'October', revenue: 850 },
//   ];

//   return (
//     // <ChakraProvider>
//       <div>
//         <BrowserRouter>
//           <Sidebar>
//             <Routes>
//               <Route path="/" element={<Dashboard saleData={saleData} revenueData={revenueData} />} />
//               <Route path="/dashboard" element={<Dashboard saleData={saleData} revenueData={revenueData} />} />
              
//               <Route path="/analytics" element={<Analytics />} />
//               <Route path="/product" element={<ProductList />} />
              
//             </Routes>
//           </Sidebar>
//         </BrowserRouter>
//       </div>
//     {/* </ChakraProvider> */}
//   );
// };

// export default App;
