import { useEffect } from 'react'

export const Header = () => {

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    
  })

  return (
    <>
      <nav className="nav-extended  light-blue darken-4">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo"><img className="" style={{ margin: 0, width: 170, display: "flex", alignItems: "center" }} src="/img/logoBlanco.png" alt="" /></a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
          </ul>
        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab"><a style={{textDecoration : "none"}}  href="#test1">Home</a></li>
            <li className="tab"><a style={{textDecoration : "none"}} href="#test2">Perros</a></li>
            <li className="tab"><a style={{textDecoration : "none"}} href="#test3">Gatos</a></li>
            <li className="tab"><a style={{textDecoration : "none"}} href="#test4">Aves</a></li>
            <li className="tab"><a style={{textDecoration : "none"}} href="#test5">Peces</a></li>
            <li className="tab"><a style={{textDecoration : "none"}} href="#test6">Roedores</a></li>
            <li className="tab"><a style={{textDecoration : "none"}} href="#test7">Ofertas</a></li>
            <li className="tab"><a style={{textDecoration : "none"}} href="#test8">Todos los Productos</a></li>
            <li>
            </li>
          </ul>
        </div>

      </nav>
      <nav style={{ scale: "0.9" }}>
        <div className="nav-wrapper  light-blue darken-3">
          <form>
            <div className="input-field">
              <input style={{ textAlign: "center" }} id="search" type="search" required />
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
      <div className="container">


      <div id="test1" className="col s12"><h1>Test 1</h1></div>
      <div id="test2" className="col s12"><h1>Test 2</h1></div>
      <div id="test3" className="col s12"><h1>Test 3</h1></div>
      <div id="test4" className="col s12"><h1>Test 4</h1></div>
      <div id="test5" className="col s12"><h1>Test 5</h1></div>
      <div id="test6" className="col s12"><h1>Test 6</h1></div>
      <div id="test7" className="col s12"><h1>Test 7</h1></div>
      <div id="test8" className="col s12"><h1>Test 8</h1></div>
      </div>
    </>
  )
}
