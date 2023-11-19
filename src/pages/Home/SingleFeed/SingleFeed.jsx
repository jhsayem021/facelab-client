import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaThumbsUp } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import Comment from './Comment';
import ShowAllComment from './ShowAllComment';
import Swal from 'sweetalert2';
const SingleFeed = ({ singlepost, user, loading ,refetch }) => {
    const [comment, setComment] = useState(null);
    const [axiosSecure] = useAxiosSecure();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(singlepost.postDate).getDate();
    const month = new Date(singlepost.postDate).getMonth();

    const id = singlepost._id

    const {  data: postReact = [] } = useQuery({
        queryKey: ['postReact', id],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/singlepost?id=${id}`)

            return res.data;
        },
    })
    const { data: postComment = [] } = useQuery({
        queryKey: ['postComment', id],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/postComment?id=${id}`)

            return res.data;
        },
    })
    // setTotalComment(postComment);
    console.log('postReact =', postReact.length);
    postReact.filter(post => post.reactor === user.email)
    const handleReaction = n => {

        const newReaction = {
            postOwner: singlepost.email,
            postId: singlepost._id,
            reactor: user.email,
            reaction: n

        }
        axiosSecure.post('/postReact', newReaction)
            .then(data => {

                if (data.data.insertedId) {
                    refetch();
                }
            })
    }
    const handleDelete = singlepost => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/feedpost/${singlepost._id}`)
                    .then(res => {
                        console.log('deleted res', res.data);
                        console.log('deleted res', res.data.acknowledged);

                        if (res.data.acknowledged === true) {
                            
                            Swal.fire(
                                'Deleted!',
                                'Your Post has been deleted.',
                                'success'
                            )
                            refetch();
                        }
                       
                    })

            }
        })
    }
    const handleDeleteReaction = email => {
        axiosSecure.delete(`/postReact/${email}`)
        .then(res => {
            console.log('deleted res', res.data);
            console.log('deleted res', res.data.acknowledged);

            
            refetch();
        })
    }



    const totalReact = postReact.reduce((sum, item) => item?.reaction + sum, 0);
    const findUserReact = postReact.filter((item) =>item.reactor === user.email);
    console.log(findUserReact);

    return (
        <div className='my-4 rounded-lg border-zinc-600 border-2 p-5 w-full'>
            <div>
                <div className='flex items-start justify-between'>
                    <div className='flex items-center'>
                        <div className="avatar   me-4 ">
                            <div className="w-14 bg-slate-200 rounded-full ">
                                <img src={singlepost.userPhoto} />
                            </div>
                        </div>
                        <div className=''>
                            <p className=' text-2xl  '>
                                {singlepost.name}</p> <p className='text-[10px]'>{date} {months[month + 1].substr(0, 3)}</p>
                        </div>
                    </div>
                    <div>
                        
                       {
                        (singlepost.email === user.email) && <label htmlFor="my_modal_7" className="btn"><SlOptions /></label>
                       } 
                    </div>
                </div>
                <p className='text-lg my-5'>{singlepost.caption}</p>
                <div className=''>
                    <img className='w-[350px] mx-auto h-[400px]' src={singlepost.image} alt="" />
                </div>
            </div>
            <div className="divider"></div>
            <div className='flex justify-between items-center px-5'>
                {
                    (findUserReact.length > 0) ? <div className='flex items-center' onClick={() => handleDeleteReaction(user?.email)}  >  <FaThumbsUp className='  text-base-400 me-2' />{totalReact}</div> :<div className='flex items-center' onClick={() => handleReaction(1)} ><FaThumbsUp className=' text-blue-600 me-2' />{totalReact}</div>
                }
                <div className='flex items-center' onClick={() => setComment(true)} ><MdComment className=' text-blue-600 me-2' />{postComment.length}</div>
            </div>
            <div className="divider"></div>
            {comment && <ShowAllComment
                id={id}
                loading={loading}
                setComment={setComment}
                user={user}
                refetch={refetch}
            ></ShowAllComment>
            }

           { comment &&  <Comment

                singlepost={singlepost}
                user={user}
                refetch={refetch}
                setComment= {setComment}
            ></Comment>}

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box ">
                    <button className='btn ' htmlFor="my_modal_7" onClick={() => handleDelete(singlepost)} >Delete Post</button>
                  
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
};

export default SingleFeed;