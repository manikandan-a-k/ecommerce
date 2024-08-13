
const url= `https://api.cloudinary.com/v1_1/dsu4ymo0y/image/upload`

const uploadImage=async(image)=>{
    const formData=new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mern_product")

        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
        

        return response.json()
   
}
export default uploadImage
