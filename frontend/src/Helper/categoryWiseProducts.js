import axios from "axios";
import ApiRequests from "../ApiRequests";

const categoryWiseProducts = async (category) => {
//   await axios
//     .post("/category-products",{category})
//     .then(({data}) => {
         
//          return data
//     })
//     .catch((err) => {
//       console.log(err)
//     });
    const dataReq=await fetch(ApiRequests.categoryProducts.url,{
        method:ApiRequests.categoryProducts.method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            category:category
        })
    })
    const dataRes=await dataReq.json()
    return dataRes

};
export default categoryWiseProducts