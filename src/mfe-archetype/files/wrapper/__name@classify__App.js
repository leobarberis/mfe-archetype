import { mount } from "<%= camelize(name) %>/<%= classify(name) %>App";
import React, { useRef, useEffect } from "react";
<% if(routing) { %>import { useHistory } from "react-router-dom";<% } %>

export default () => {
  const ref = useRef(null);
  <% if(routing) { %>const history = useHistory();  <% } %>
  <% if(routing && fw == "angular") { %>
    useEffect(() => {
      const { onParentNavigate, onUnmount } = mount(ref.current, {
        onNavigate: ({ url: nextPathName }) => {
          const { pathname } = history.location;
          if (pathname !== nextPathName) {
            history.push(nextPathName);
          }
        },
      });
      history.listen(onParentNavigate);
  <% } %>
  <% if(routing && fw == "react") { %>
    useEffect(() => {
      const { onParentNavigate } = mount(ref.current, {
        initialPath: history.location.pathname,
        onNavigate: ({ pathname: nextPathName }) => {
          const { pathname } = history.location;
          if (pathname !== nextPathName) {
            history.push(nextPathName);
          }
        },
      });
      history.listen(onParentNavigate);
  <% } %>
  <% if(!routing) { %>
    useEffect(() => {
      mount(ref.current);
  <% } %>
<% if(fw == "angular") { %>
  return () => onUnmount();
<% } %>    
  }, []);
  return <div ref={ref} />;
};

