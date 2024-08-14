import axios from "axios"
import { toast } from 'react-toastify';

const addToCart=async(e,id)=>{
    e?.stopPropagation()
    e?.preventDefault()

    await axios.post("api/addtocart",{
        productId:id
    }).then(({data})=>{
           console.log(data.data)
           if(data.success)
           {
            toast.success(data.message)
           }
           if(data.error)
           {
            toast.error(data.message)
           }
        
    }).catch((err)=>{
        toast.error(err)
    })
}
export default addToCart
