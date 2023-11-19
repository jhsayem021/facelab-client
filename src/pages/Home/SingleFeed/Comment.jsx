import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { BiSend } from "react-icons/bi";
const Comment = ({user,singlepost,refetch ,setComment}) => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset , } = useForm();

    const onSubmit = data => {
        
        const {commentText} = data;
        console.log(data);
        const Data = {
            postOwner: singlepost.email,
            postId: singlepost._id,
            commentor: user.email,
            commentorPhoto: user.photoURL,
            postcomment: commentText

        }
        console.log(Data)
        axiosSecure.post('/postComment', Data)
            .then(data => {
                
                if (data.data.acknowledged) {
                
                    refetch();
                    reset();
                    setComment(null);

                }
                
            })



    };
    
    return (
         <div className='' >
                <form onSubmit={handleSubmit(onSubmit)} className="  grid grid-cols-12" >
                    <input  {...register("commentText", { required: true })} type="text" className=" col-span-8 border-2 ps-4" placeholder="Type Here"></input>
                    <button  className=" col-span-4  btn" type='submit'  ><BiSend className=' text-blue-600 text-2xl' /> </button>
                </form>
            </div>
    );
};

export default Comment;