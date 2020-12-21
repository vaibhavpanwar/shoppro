import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

import LoginScreen from "./screens/LoginScreen";

import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className="py-3">
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route
              path="/admin/platinumgalary/pankaj@123"
              component={LoginScreen}
            />

            <Route path="/admin/productlist" component={ProductListScreen} />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
            />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />

            <Route path="/product/:id" component={ProductScreen} />

            <Route path="/search/:keyword" component={HomeScreen} />
            <Route path="/page/:pageNumber" component={HomeScreen} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
