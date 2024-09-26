import { useState } from 'react';
import DashSidebar from './DashSidebar.jsx';
import DashMainProducts from './DashMainProducts.jsx';
import DashMainUsers from './DashMainUsers.jsx';
import '../css/Dashboard.css';

function Dashboard() {
  const [displayProducts, setDisplayProducts] = useState(true);
  const [displayUsers, setDisplayUsers] = useState(false);

  return (
    <div className="dashboard">
      <DashSidebar setDisplayProducts={setDisplayProducts} setDisplayUsers={setDisplayUsers} />
      <div className="dashboard-main">
        {displayProducts && <DashMainProducts />}
        {displayUsers && <DashMainUsers />}
      </div>
    </div>
  );
}

export default Dashboard;
