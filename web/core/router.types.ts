/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import type { ComponentClass, ComponentProps, FunctionComponent } from "react";
import type { Environment, GraphQLTaggedNode, Variables } from "react-relay";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type RouterContext = {
  path: string;
  query: URLSearchParams;
  params?: Record<string, string>;
  relay: Environment;
};

export type RouterResponse<
  Component extends
    | FunctionComponent<any>
    | ComponentClass<any> = FunctionComponent<any>,
> = {
  title?: string;
  description?: string;
  component?: Component;
  props?: ComponentProps<Component>;
  error?: Error;
  redirect?: string;
  status?: number;
  layout?: boolean;
};

export type Route<
  Component extends FunctionComponent<any> | ComponentClass<any>,
  Query extends { variables: Variables; response: unknown } = {
    variables: Variables;
    response: any;
  },
> = {
  /**
   * URL path pattern.
   */
  path: string[] | string;
  /**
   * GraphQL query expression.
   */
  query?: GraphQLTaggedNode;
  /**
   * GraphQL query variables.
   */
  variables?: ((ctx: RouterContext) => Query["variables"]) | Query["variables"];
  /**
   * Authorization rule(s) / permissions.
   */
  authorize?: ((ctx: RouterContext) => boolean) | boolean;
  /**
   * React component (loader).
   */
  component?: () => Promise<{ default: Component }>;
  /**
   * React component props and metadata that needs to be rendered
   * once the route was successfully resolved.
   */
  response: (
    queryResponse: Query["response"],
    context: RouterContext,
  ) => RouterResponse<Component>;
};
