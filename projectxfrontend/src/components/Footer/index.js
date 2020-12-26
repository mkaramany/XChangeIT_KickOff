import React from 'react';
import IntlMessages from "util/IntlMessages";


const Footer = () => {
    return (
      <footer className="app-footer">
        <span className="d-inline-block"><IntlMessages id="footer.copyRight" /></span>
        <span className="d-inline-block"><IntlMessages id="footer.contactUs" /><a href="#"></a></span>
        <span className="d-inline-block"><IntlMessages id="footer.termsOfUse" /><a href="#"></a></span>
        <span className="d-inline-block"><IntlMessages id="footer.disclaimer" /><a href="#"></a></span>
        {/* <Button
          href="https://codecanyon.net/cart/configure_before_adding/20978545?license=regular&ref=phpbits&size=source&support=bundle_12month&_ga=2.172338659.1340179557.1515677375-467259501.1481606413"
          target="_blank"
          size="small"
          color="primary"
        ><IntlMessages id="eCommerce.buyNow"/></Button> */}
      </footer>
    );
  }
;

export default Footer;
