import '../css/DashMain.css'
import DashMainProducts from './DashMainProducts.jsx'
import DashMainUsers from './DashMainUsers.jsx'
function DashMain() {
  return (
    <div className="Dash-main_sections">
        <section className="Dash-main_section_products">  <DashMainProducts/>  </section>
        <section className="Dash-main_section_users"> <DashMainUsers/> </section>
    </div>
  )
}
export default DashMain
