import React, { PureComponent } from "react";
import {
  Container,
  TotalsWrapper,
  Total,
  TotalAmount,
  ButtonsWrapper,
  ViewBagBtn,
  CheckoutBtn,
} from "./CartTotalsStyles";

import { connect } from "react-redux";
import { toggleCartOverlay } from "../../../redux/shopping/shopping-actions";

class CartTotals extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalItems: 0,
      totalPrice: 0,
    };
  }

  handleTotals = () => {
    let items = 0;
    let price = 0;

    this.props.cart.forEach((item) => {
      items += item.qty;

      item.prices.map((itemPrice) => {
        if (itemPrice.currency.symbol === this.props.currencySymbol) {
          price += item.qty * itemPrice.amount;
        }
        return price;
      });
    });

    this.setState({
      totalItems: items,
      totalPrice: price,
    });
  };

  componentDidMount() {
    this.handleTotals();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.currencySymbol !== prevProps.currencySymbol ||
      this.props.cart !== prevProps.cart ||
      this.state.totalItems !== prevState.totalItems ||
      this.state.totalPrice !== prevState.totalPrice
    ) {
      this.handleTotals();
    }
  }

  render() {
    const { totalPrice } = this.state;
    return (
      <Container>
        <TotalsWrapper>
          <Total>Total</Total>
          <TotalAmount>
            {this.props.currencySymbol} {totalPrice.toFixed(2)}
          </TotalAmount>
        </TotalsWrapper>
        <ButtonsWrapper>
          <ViewBagBtn to="/cart" onClick={() => this.props.toggleCartOverlay()}>
            View Bag
          </ViewBagBtn>
          <CheckoutBtn to="#">Checkout</CheckoutBtn>
        </ButtonsWrapper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    currencySymbol: state.shop.currencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartOverlay: () => dispatch(toggleCartOverlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTotals);
