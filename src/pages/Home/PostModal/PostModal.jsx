import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_imgbb_key;

const PostModal = ({ posting,  setPosting ,user , refetch }) => {
    const [axiosSecure] = useAxiosSecure();
    
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {
        
        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgResponse => {
            if(imgResponse.success){
                const imgURL = imgResponse.data.display_url;
                const {caption} = data;
                var today = new Date();
                const postDate = today.toString();
                const postTime = today.getTime();
                const newItem = { name: user.displayName , userPhoto: user.photoURL,  email:user.email , caption , image:imgURL , postDate, postTime }
                console.log(newItem)
                axiosSecure.post('/feedpost', newItem)
                .then(data => {
                    console.log('after posting new menu item', data.data)
                    if(data.data.insertedId){
                        reset();
                        if(refetch){
                            refetch();
                           }
                        setPosting(null);
                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully Post',
                            showConfirmButton: false,
                            timer: 1500
                          })

                       
                    }
                })
            }
        })

    };
    return (
        <div>
            <input type="checkbox" id="Booking-Modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="Booking-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                  
                    
                    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 grid-cols-1' >
                    <div className="form-control" >
                    
                    <textarea {...register("caption", { required: true })} className="textarea  h-24" placeholder="Type here"></textarea>
                </div>
                
                    <div className='flex justify-between'>
                       
                    <input type="file" alt='image'   {...register("image", { required: true })}  className=" bg-slate-500" />
                
                <input className="btn btn-sm " type="submit" value="Post" />
                
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostModal;