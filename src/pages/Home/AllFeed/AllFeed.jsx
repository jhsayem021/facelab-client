import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SingleFeed from '../SingleFeed/SingleFeed';
import PostModal from '../PostModal/PostModal';
import emoji1 from '../../../assets/photo-upload.png'

const AllFeed = ({ user , loading }) => {
    const [posting, setPosting] = useState(null)
    const [axiosSecure] = useAxiosSecure();
    const { data: feedpost = [], refetch } = useQuery(['feedpost'], async () => {
        const res = await axiosSecure.get('/feedpost')
        return res.data;
    })


    return (
        <div  >
            <div  className=' rounded-lg  border-2 mt-5 p-1 border-opacity-0'>
            <label onClick={() => setPosting("post data")}
                htmlFor="Booking-Modal">
                <div className=" flex justify-between mt-3" >
                    <div className="avatar   ms-3">
                        <div className="w-12 bg-slate-200 rounded-full">
                            <img src={user.photoURL} />
                        </div>
                    </div>
                    <h1   className="input input-bordered w-full max-w-xs pt-2 hover:bg-slate-100" > Type here </h1>
                </div>
                <div  className=' flex justify-between items-center my-4'>
                <div>
                    <img src={emoji1} alt="" className='hover:bg-slate-100 p-2 rounded-lg' />
                </div>         
                    <h1 className="btn  text-black  ">Post</h1>
                </div>
            </label>
            </div>
            <div>
                {
                    feedpost.sort((a, b) => b.postTime - a.postTime).map(singlepost => <SingleFeed
                        key={singlepost._id}
                        singlepost={singlepost}
                        user={user}
                        setPosting={setPosting}
                        refetch={refetch}
                    ></SingleFeed>)
                }
            </div>
            {
                posting && <PostModal
                    posting={posting}
                    setPosting={setPosting}
                    user={user}
                    loading={loading}
                    refetch={refetch}
                ></PostModal>
            }
        </div>
    );
};

export default AllFeed;