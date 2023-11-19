import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { IoIosArrowUp } from "react-icons/io";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete } from "react-icons/md";
const ShowAllComment = ({id ,loading ,setComment ,user , refetch}) => {
    const [axiosSecure] = useAxiosSecure();
    const {  data: postComment = [] } = useQuery({
        queryKey: ['postComment', id],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/postComment?id=${id}`)

            return res.data;
        },
    })

    const handleDeleteComment = singlecomment => {
        axiosSecure.delete(`/postComment/${singlecomment._id}`)
        .then(res => {
            console.log('deleted res', res.data);
            console.log('deleted res', res.data.acknowledged);
            refetch();
        })
    }


    console.log(postComment);
   console.log(postComment.length)
    const setDataReload = () =>{
        setComment(null);
        refetch();
    }

    return (
        <div>
            <div className='mt-10  mb-5 relative'>
                {
                    (postComment.length !== 0) && <button className='absolute right-0 -top-10' onClick={() => setDataReload()}>< IoIosArrowUp className='text-3xl' /></button>
                }
                {
                     postComment.map(singlecomment =><div className='relative group'>
                       { (singlecomment.commentor === user.email) && <button className=' absolute right-0 group-hover:block hidden' onClick={() => handleDeleteComment(singlecomment)} ><MdDelete /></button>}
                        <div className="chat chat-start ">
                        
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS chat bubble component" src={singlecomment?.commentorPhoto} />
                            </div>
                        </div>
                        <div className="chat-bubble">{singlecomment.postcomment}</div>
                        

                    </div>
                     </div>) }
                 </div>
        </div>
    );
};

export default ShowAllComment;