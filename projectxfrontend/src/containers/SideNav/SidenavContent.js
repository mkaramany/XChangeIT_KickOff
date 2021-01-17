import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';


class SidenavContent extends Component {
  componentDidMount() {
    const {history} = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`;// get current path

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, 'li');
          if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
            menuLi[j].classList.remove('open')
          }
        }
        this.classList.toggle('open');
      }
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  componentWillReceiveProps(nextProps) {

    const {history} = nextProps;
    const pathname = `${history.location.pathname}`;// get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] == 'function') {
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
    } catch (e) {

    }

    return null;
  }

  render() {
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">
          <li className="nav-header">
            <IntlMessages id="sidebar.rentItOut" />
          </li>


          <li className="nav-header">
            <IntlMessages id="sidebar.items.itemsMenu" />
          </li>

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.items.items" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/items/myItems">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.items.myItems" />
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink className="prepend-icon" to="/app/items/allItems">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.items.allItems" />
                  </span>
                </NavLink>
              </li>
              
            </ul>
          </li>

          <li className="nav-header">
            <IntlMessages id="sidebar.main" />
          </li>

          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard" />
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/crypto">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.crypto" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/listing">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.listing" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/crm">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.crm" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/intranet">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.intranet" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                  <span className="nav-text text-transform-none">
                    <IntlMessages id="sidebar.dashboard.ecommerce" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/news">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.news" />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/misc">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.dashboard.misc" />
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>

          

          <li className="menu">
            <Button>
              <i className="zmdi zmdi-device-hub zmdi-hc-fw" />
              <span className="nav-text">
                <IntlMessages id="sidebar.menuLevels" />
              </span>
            </Button>

            <ul className="sub-menu">
              <li>
                <Button className="prepend-icon">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.menuLevels.level1" />
                  </span>
                </Button>
              </li>
              <li className="menu">
                <Button className="prepend-icon">
                  <span className="nav-text">
                    <IntlMessages id="sidebar.menuLevels.level1" />
                  </span>
                </Button>

                <ul className="sub-menu">
                  <li>
                    <Button href="">
                      <span className="nav-text">
                        <IntlMessages id="sidebar.menuLevels.level2" />
                      </span>
                    </Button>
                  </li>
                  <li className="menu">
                    <Button href="">
                      <span className="nav-text">
                        <IntlMessages id="sidebar.menuLevels.level2" />
                      </span>
                    </Button>

                    <ul className="sub-menu">
                      <li>
                        <Button href="">
                          <span className="nav-text">
                            <IntlMessages id="sidebar.menuLevels.level3" />
                          </span>
                        </Button>
                      </li>
                      <li>
                        <Button href="">
                          <span className="nav-text">
                            <IntlMessages id="sidebar.menuLevels.level3" />
                          </span>
                        </Button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
