import classNames from 'classnames';
import Widget from "components/Widget/index";
import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import IntlMessages from "util/IntlMessages";
import ItemsPaginatedTable from "./ItemsPaginatedTable";

const ItemsCard = (props) => {

  const [activeTab, setActiveTab] = useState(1);

  const sportEquipment = props.allItems.filter(function (item) {
    return item.category === "SPORTS_EQUIPMENT";
  });

  const activityEquipment = props.allItems.filter(function (item) {
    return item.category === "ACTIVITY_EQUIPMENT";
  });

  const handymanTools = props.allItems.filter(function (item) {
    return item.category === "HANDYMAN_TOOLS";
  });

  return (
    <Widget styleName='mb-0'>
      <div className="d-flex flex-row justify-content-between mb-2">
        <h4 className="mr-2">{<IntlMessages id="header.items.itemsForRent" />}</h4>

        <span className="ml-2 pointer"><i className="zmdi zmdi-search text-primary jr-fs-xl" /></span>
      </div>
      <div className="jr-news-action jr-tabs-classic jr-tabs-classic-no-border">
        <div className="jr-tabs-up jr-tabs-up-no-border">
          <Nav className="jr-tabs-pills-ctr" pills>
            <NavItem>
              <NavLink
                className={classNames({ active: activeTab === 1 })}
                onClick={() => {
                  setActiveTab(1);
                }}
              >
                <IntlMessages id={"items.category.all"} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames({ active: activeTab === 2 })}
                onClick={() => {
                  setActiveTab(2);
                }}
              >
                <IntlMessages id={"items.category.sportsEquipment"} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames({ active: activeTab === 3 })}
                onClick={() => {
                  setActiveTab(3);
                }}>
                <IntlMessages id={"items.category.handymanTools"} />

              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames({ active: activeTab === 4 })}
                onClick={() => {
                  setActiveTab(4);
                }}>
                <IntlMessages id={"items.category.activityEquipment"} />

              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <TabContent className="jr-tabs-content" activeTab={activeTab}>
          <TabPane tabId={1}>
            <ItemsPaginatedTable items={props.allItems} />
          </TabPane>

          <TabPane tabId={2}>
            <ItemsPaginatedTable items={sportEquipment} />
          </TabPane>

          <TabPane tabId={3}>
            <ItemsPaginatedTable items={handymanTools} />
          </TabPane>

          <TabPane tabId={4}>
            <ItemsPaginatedTable items={activityEquipment} />
          </TabPane>
        </TabContent>
      </div>
    </Widget>
  );
}

export default ItemsCard;
