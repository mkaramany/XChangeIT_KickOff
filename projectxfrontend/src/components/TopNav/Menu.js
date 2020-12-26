import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";

class Menu extends Component {
  componentDidMount() {
    const { history } = this.props;

    const pathname = `#${history.location.pathname}`; // get current path
    const mainMenu = document.getElementsByClassName("nav-item");
    for (let i = 0; i < mainMenu.length; i++) {
      mainMenu[i].onclick = function() {
        for (let j = 0; j < mainMenu.length; j++) {
          if (mainMenu[j].classList.contains("active")) {
            mainMenu[j].classList.remove("active");
          }
        }
        this.classList.toggle("active");
      };
    }
    const subMenuLi = document.getElementsByClassName("nav-arrow");
    for (let i = 0; i < subMenuLi.length; i++) {
      subMenuLi[i].onclick = function() {
        for (let j = 0; j < subMenuLi.length; j++) {
          if (subMenuLi[j].classList.contains("active")) {
            subMenuLi[j].classList.remove("active");
          }
        }
        this.classList.toggle("active");
      };
    }
    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("active");
      } else {
        this.closest(activeLi, "li").classList.add("active");
      }
      const parentNav = this.closest(activeNav, ".nav-item");
      if (parentNav) {
        parentNav.classList.add("active");
      }
    } catch (e) {}
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      [
        "matches",
        "webkitMatchesSelector",
        "mozMatchesSelector",
        "msMatchesSelector",
        "oMatchesSelector",
      ].some(function(fn) {
        if (typeof document.body[fn] === "function") {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {}

    return null;
  }

  render() {
  return (
      <div className="app-main-menu d-none d-md-block">
        <ul className="navbar-nav ">{/**navbar-nav-mega */}
          <li className="nav-item">
            <span className="nav-link">
              <IntlMessages id="sidebar.items.itemsMenu" />
            </span>
            <ul className="sub-menu">
              <li className="nav-arrow">
                <span className="nav-link">
                  <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                  <span className="nav-text">
                    <IntlMessages id="sidebar.items.items" />
                  </span>
                </span>
                <ul className="sub-menu">
                  {this.props.loggedInUser && (<li>
                    <NavLink
                      className="prepend-icon"
                      to="/app/items/myItems"
                    >
                      <span className="nav-text">
                        <IntlMessages id="sidebar.items.myItems" />
                      </span>
                    </NavLink>
                  </li>)}
                  <li>
                    <NavLink
                      className="prepend-icon"
                      to="/app/items/allItems"
                    >
                      <span className="nav-text">
                      <IntlMessages id="menu.items.allItems" />
                      </span>
                    </NavLink>
                  </li>
                  
                  
                  {/* <li>
                    <NavLink
                      className="prepend-icon"
                      to="/app/dashboard/intranet"
                    >
                      <span className="nav-text">
                        <IntlMessages id="sidebar.dashboard.intranet" />
                      </span>
                    </NavLink>
                  </li> */}
                </ul>
              </li>
              {/* <li className="nav-arrow">
                <span className="nav-link">
                  <i className="zmdi zmdi-widgets zmdi-hc-fw" />
                  <span className="nav-text">
                    <IntlMessages id="sidebar.widgets" />
                  </span>
                </span>
                <ul className="sub-menu">
                  <li>
                    <NavLink className="prepend-icon" to="/app/widgets/classic">
                      <span className="nav-text">
                        <IntlMessages id="sidebar.classic" />
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="prepend-icon" to="/app/widgets/modern">
                      <span className="nav-text">
                        <IntlMessages id="sidebar.modern" />
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </li> */}
            </ul>
          </li>

          <li className="nav-item mega-menu" style={{display: "none"}}>
            <span className="nav-link">
              <IntlMessages id="sidebar.components" />
            </span>

            {/*  */}
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.authUser,
  };
};

export default connect(mapStateToProps)(withRouter(Menu));
