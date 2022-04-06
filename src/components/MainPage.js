import { Fragment, useState, useEffect } from "react";
import * as React from "react";
import classes from "./MainPage.module.css";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import fx from "money"; 

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const MainPage = () => {
  const [information, setInformation] = useState();
  const [elem1Class, setElem1Class] = useState(classes.productBox);
  const [elem2Class, setElem2Class] = useState(classes.productBox);
  const [elem3Class, setElem3Class] = useState(classes.productBox);
  const [elem4Class, setElem4Class] = useState(classes.productBox);
  const [dataToCart, setDataToCart] = useState();
  const [cartDiv, setCartDiv] = useState();
  const [totalValue, setTotalValue] = useState();
  const [lengthP, setLengthP] = useState(-1);
  const [eventTargetValue, setEventTargetValue] = useState(1);
  const [isUsd, setIsUsd] = useState(true);
  const [isEur, setIsEur] = useState(false);
  const [isGbp, setIsGbp] = useState(false);
  const [price1, setPrice1] = useState(1);
  const [price2, setPrice2] = useState(1);
  const [price3, setPrice3] = useState(1);
  const [price4, setPrice4] = useState(1);
  let aux;
  const dataToApply = [];
  const dataToCartCopy = [];
  let contor;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://private-32dcc-products72.apiary-mock.com/product"
      );
      const responseData = await response.json();
      for (let i = 0; i < responseData.length - 1; i++) {
        for (let j = i + 1; j < responseData.length; j++) {
          if (responseData[i].price < responseData[j].price) {
            aux = responseData[i];
            responseData[i] = responseData[j];
            responseData[j] = aux;
          }
        }
      }
      setInformation(responseData);
    };
    fetchData().catch((e) => {
      console.log("Something went wrong with fetching!!!");
    });
  }, []);
  const usdHandler = () => {
    if (isUsd !== true) {
      setIsUsd(true);
      const toUsd = () => {
        let elem1, elem2, elem3, elem4;
        if (isEur === true) {
          fx.base = "EUR";
          fx.rates = {
            USD: 1.6,
            EUR: 1,
          };
          elem1 = fx(information[0].price).from("EUR").to("USD");
          elem2 = fx(information[1].price).from("EUR").to("USD");
          elem3 = fx(information[2].price).from("EUR").to("USD");
          elem4 = fx(information[3].price).from("EUR").to("USD");
          setIsEur(false);
        } else if (isGbp === true) {
          fx.base = "GBP";
          fx.rates = {
            USD: 1.31,
            GBP: 1,
          };
          elem1 = fx(information[0].price).from("GBP").to("USD");
          elem2 = fx(information[1].price).from("GBP").to("USD");
          elem3 = fx(information[2].price).from("GBP").to("USD");
          elem4 = fx(information[3].price).from("GBP").to("USD");
          setIsGbp(false);
        }
        setPrice1(elem1);
        setPrice2(elem2);
        setPrice3(elem3);
        setPrice4(elem4);
      };
      toUsd();
    }
  };
  const eurHandler = () => {
    setIsEur(true);

    const toEur = () => {
      let elem1, elem2, elem3, elem4;
      if (isUsd === true) {
        fx.base = "USD";
        fx.rates = {
          EUR: 0.9,
          USD: 1,
        };
        elem1 = fx(information[0].price).from("USD").to("EUR");
        elem2 = fx(information[1].price).from("USD").to("EUR");
        elem3 = fx(information[2].price).from("USD").to("EUR");
        elem4 = fx(information[3].price).from("USD").to("EUR");
        setIsUsd(false);
      } else if (isGbp === true) {
        fx.base = "GBP";
        fx.rates = {
          EUR: 1.18,
          GBP: 1,
        };
        elem1 = fx(information[0].price).from("GBP").to("EUR");
        elem2 = fx(information[1].price).from("GBP").to("EUR");
        elem3 = fx(information[2].price).from("GBP").to("EUR");
        elem4 = fx(information[3].price).from("GBP").to("EUR");
        setIsGbp(false);
      }
      setPrice1(elem1);
      setPrice2(elem2);
      setPrice3(elem3);
      setPrice4(elem4);
    };
    toEur();
  };
  const gbpHandler = () => {
    setIsGbp(true);

    const toGbp = () => {
      let elem1, elem2, elem3, elem4;
      if (isEur === true) {
        fx.base = "EUR";
        fx.rates = {
          EUR: 1,
          GBP: 0.85,
        };
        elem1 = fx(information[0].price).from("EUR").to("GBP");
        elem2 = fx(information[1].price).from("EUR").to("GBP");
        elem3 = fx(information[2].price).from("EUR").to("GBP");
        elem4 = fx(information[3].price).from("EUR").to("GBP");
        setIsEur(false);
      } else if (isUsd === true) {
        fx.base = "USD";
        fx.rates = {
          USD: 0.9,
          GBP: 0.76,
        };
        elem1 = fx(information[0].price).from("USD").to("GBP");
        elem2 = fx(information[1].price).from("USD").to("GBP");
        elem3 = fx(information[2].price).from("USD").to("GBP");
        elem4 = fx(information[3].price).from("USD").to("GBP");
        setIsUsd(false);
      }
      setPrice1(elem1);
      setPrice2(elem2);
      setPrice3(elem3);
      setPrice4(elem4);
    };
    toGbp();
  };

  useEffect(() => {
    if (information !== undefined) {
      information[0].price = price1;
      information[1].price = price2;
      information[2].price = price3;
      information[3].price = price4;
    }
  }, [price1, price2, price3, price4]);

  const addToCartHanlder0 = () => {
    dataToCartCopy.push(information[0]);
    setElem1Class(classes.displayNone);
    if (dataToCart !== undefined) {
      setDataToCart((prevState) => [...prevState, information[0]]);
    } else {
      setDataToCart(dataToCartCopy);
    }
    if (dataToCart !== undefined && dataToCart.length !== 0) {
      setLengthP(dataToCart.length);
    }
  };
  const addToCartHanlder1 = () => {
    dataToCartCopy.push(information[1]);
    setElem2Class(classes.displayNone);
    if (dataToCart !== undefined) {
      setDataToCart((prevState) => [...prevState, information[1]]);
    } else {
      setDataToCart(dataToCartCopy);
    }
    if (dataToCart !== undefined && dataToCart.length !== 0) {
      setLengthP(dataToCart.length);
    }
  };
  const addToCartHanlder2 = () => {
    dataToCartCopy.push(information[2]);
    setElem3Class(classes.displayNone);
    if (dataToCart !== undefined) {
      setDataToCart((prevState) => [...prevState, information[2]]);
    } else {
      setDataToCart(dataToCartCopy);
    }
    if (dataToCart !== undefined && dataToCart.length !== 0) {
      setLengthP(dataToCart.length);
    }
  };
  const addToCartHanlder3 = () => {
    dataToCartCopy.push(information[3]);
    setElem4Class(classes.displayNone);
    if (dataToCart !== undefined) {
      setDataToCart((prevState) => [...prevState, information[3]]);
    } else {
      setDataToCart(dataToCartCopy);
    }
    if (dataToCart !== undefined && dataToCart.length !== 0) {
      setLengthP(dataToCart.length);
    }
  };

  const focusHandler = (event) => {
    setEventTargetValue(event.target.value);
  };

  useEffect(() => {
    setTotalValue(0);
    if (dataToCart !== undefined && dataToCart.length !== lengthP) {
      if (dataToCart !== undefined) {
        for (const elem of dataToCart) {
          contor = 0;
          let index;
          const copyElement = (
            <div className={classes.productBoxCart} key={elem.id}>
              <div className={classes.tooltipBox}>
                <DeleteIcon
                  className={classes.deleteIcon}
                  onClick={() => {
                    if (elem.id === 123459) {
                      setElem1Class(classes.productBox);
                      index = dataToCart.indexOf(elem);
                      dataToCart.splice(index, 1);
                      setLengthP((prevState) => prevState - 1);
                    } else if (elem.id === 123458) {
                      setElem2Class(classes.productBox);
                      index = dataToCart.indexOf(elem);
                      dataToCart.splice(index, 1);
                      setLengthP((prevState) => prevState - 1);
                    }

                    if (elem.id === 123456) {
                      setElem3Class(classes.productBox);
                      index = dataToCart.indexOf(elem);
                      dataToCart.splice(index, 1);
                      setLengthP((prevState) => prevState - 1);
                    } else if (elem.id === 123457) {
                      setElem4Class(classes.productBox);
                      index = dataToCart.indexOf(elem);
                      dataToCart.splice(index, 1);
                      setLengthP((prevState) => prevState - 1);
                    }
                  }}
                />
                <p className={classes.productNameCart}>{elem.name}</p>
                <Tooltip
                  title={
                    <h1 className={classes.tooltipText}>{elem.description}</h1>
                  }
                >
                  <InfoIcon fontSize="small" className={classes.tooltipIcon} />
                </Tooltip>
              </div>
              <div className={classes.specialBoxCart}>
                <label htmlFor="value" />
                <input
                  type="number"
                  id="value"
                  name="valueItems"
                  defaultValue={1}
                  className={classes.cartInput}
                  onFocus={focusHandler}
                  onChange={(event) => {
                    let currentPrice = event.target.value * elem.price;
                    {
                      eventTargetValue < event.target.value
                        ? setTotalValue(
                            (prevState) =>
                              prevState +
                              (currentPrice - eventTargetValue * elem.price)
                          )
                        : setTotalValue(
                            (prevState) =>
                              prevState +
                              (currentPrice -
                                (eventTargetValue + 1) * elem.price)
                          );
                    }
                  }}
                ></input>
                <p className={classes.productPriceCart}>${elem.price}</p>
              </div>
            </div>
          );
          contor++;
          setTotalValue((prevState) => prevState + elem.price);
          dataToApply.push(copyElement);
        }
        if (cartDiv !== dataToApply) {
          setCartDiv(dataToApply);
        }
      }
    }
  }, [dataToCart, lengthP, price1, price2, price3, price4]);
  return (
    <Fragment>
      <div className={classes.currencyList}>
        <p className={classes.defaultCurrency}>Default currency is USD</p>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="outlined" {...bindTrigger(popupState)}>
                Currency
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={usdHandler}>USD</MenuItem>
                <MenuItem onClick={eurHandler}>EUR</MenuItem>
                <MenuItem onClick={gbpHandler}>GBP</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
      <div className={classes.elementsBox}>
        {information !== undefined ? (
          <Fragment>
            <div className={classes.container}>
              <div className={elem1Class} id={information[0].id}>
                <p className={classes.productName}>{information[0].name}</p>
                <div className={classes.specialBox}>
                  {isEur === false && isGbp === false ? (
                    <p className={classes.productPrice}>
                      Price : ${information[0].price}
                    </p>
                  ) : (
                    <p className={classes.productPrice}>Price : {price1}</p>
                  )}
                  <button
                    className={classes.productButton}
                    onClick={addToCartHanlder0}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div className={elem2Class} id={information[1].id}>
                <p className={classes.productName}>{information[1].name}</p>
                <div className={classes.specialBox}>
                  {isEur === false && isGbp === false ? (
                    <p className={classes.productPrice}>
                      Price : ${information[1].price}
                    </p>
                  ) : (
                    <p className={classes.productPrice}>Price : {price2}</p>
                  )}
                  <button
                    className={classes.productButton}
                    onClick={addToCartHanlder1}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div className={elem3Class} id={information[2].id}>
                <p className={classes.productName}>{information[2].name}</p>
                <div className={classes.specialBox}>
                  {isEur === false && isGbp === false ? (
                    <p className={classes.productPrice}>
                      Price : ${information[2].price}
                    </p>
                  ) : (
                    <p className={classes.productPrice}>Price : {price3}</p>
                  )}
                  <button
                    className={classes.productButton}
                    onClick={addToCartHanlder2}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div className={elem4Class} id={information[3].id}>
                <p className={classes.productName}>{information[3].name}</p>
                <div className={classes.specialBox}>
                  {isEur === false && isGbp === false ? (
                    <p className={classes.productPrice}>
                      Price : ${information[3].price}
                    </p>
                  ) : (
                    <p className={classes.productPrice}>Price : {price4}</p>
                  )}
                  <button
                    className={classes.productButton}
                    onClick={addToCartHanlder3}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
            {dataToCart === undefined || dataToCart.length === 0 ? (
              <div className={classes.cartBox}>
                <p>No products in your shopping cart</p>
              </div>
            ) : (
              <div className={classes.cartWithElements}>
                <h1 className={classes.cartTitle}>
                  Products in your shopping cart
                </h1>
                <div className={classes.boxDetails}>
                  <p className={classes.product}>Product</p>
                  <div className={classes.valueBox}>
                    <p className={classes.quantity}>Quantity</p>
                    <p className={classes.value}>Value</p>
                  </div>
                </div>
                <hr
                  size="1"
                  width="95%"
                  color="black"
                  className={classes.hrLine}
                />
                {cartDiv}
                <hr size="1" width="95%" color="black" />
                <div
                  className={classes.totalPriceBox}
                >{`Total : ${totalValue}`}</div>
                <div className={classes.cartButtonBox}>
                  <button className={classes.continueButton}>Continue</button>
                </div>
              </div>
            )}
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

export default MainPage;
