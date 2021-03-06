import { getCookie } from '../lib/session';
import { redirect } from '../lib/helpers';
import React, { Component } from 'react';
const getDisplayName = (Component) =>
  Component.displayName || Component.name || 'Component';

const withAuthSync = (WrappedComponent) =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const isLoggedIn = getCookie('id_token', ctx.req) ? true : false;
      const isAdmin = getCookie('id_token_a', ctx.req) ? true : false;

      if (!isLoggedIn && !isAdmin) {
        redirect(ctx, '/user');
        return { isLoggedIn, isAdmin };
      }
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, isLoggedIn, isAdmin };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withAuthSync;
