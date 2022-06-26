import Link from "next/link";
import classes from "../styles/Notfound.module.scss";
import React from "react";
const NotFound = () => {
  return (
    <section className={classes.page_404}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-12 text-center">
              <div className={classes.four_zero_four_bg}>
                <h1 className="text-center ">404</h1>
              </div>

              <div className={classes.contant_box_404}>
                <h3 className="h2">Look like you are lost</h3>

                <p>the page you are looking for not available!</p>

                <Link href="/">
                  <a className={classes.link_404}>Go to Home</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
