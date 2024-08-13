const localDomain = "http://localhost:8080";
const ApiRequests = {
  signUp: {
    url: `${localDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${localDomain}/api/login`,
    method: "post",
  },
  userDetails: {
    url: `${localDomain}/api/user`,
    method: "get",
  },
  updateProducts: {
    url: `${localDomain}/api/updateProducts`,
    method: "post",
  },
  uploadProducts: {
    url: `${localDomain}/api/uploadProduct`,
    method: "post",
  },
  categoryProducts: {
    url: `${localDomain}/api/category-products`,
    method: "post",
  },
  updateaddToCartProduct: {
    url: `${localDomain}/api/update-cart-product`,
    method: "post",
  },
  deleteProduct: {
    url: `${localDomain}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${localDomain}/api/search-product`,
    method: "get",
  },
  forgotPassword:{
    url: `${localDomain}/api/forgot-password`,
    method: "post"
  }
};
export default ApiRequests;
