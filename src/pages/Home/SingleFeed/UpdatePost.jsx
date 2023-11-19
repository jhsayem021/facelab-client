import React from 'react';

const UpdatePost = () => {

    const handleAddService = (data) => {
        const formData = new FormData();
        console.log(data.image[0])
        if(data.image[0]=== undefined){
            const service = {
                id: _id,
                title: data.title,
                duration: data.duration,
                description: data.description,
                price: data.price,
                image: image
            }
            console.log(service)
            // post doctor 

            fetch('https://tourism-planner-server-jhsayem021.vercel.app/updateservice', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(service)

            })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    toast.success(`${data.title} Update successful`);
                    navigate('/dashboard/updateservice')

                })
        }
        else{
            const image = data.image[0];
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData);
                if (imageData.success) {
                    console.log(imageData.data.url);
                    const service = {
                        id: _id,
                        title: data.title,
                        duration: data.duration,
                        description: data.description,
                        price: data.price,
                        image: imageData.data.url
                    }
                    console.log(service)
                    // post doctor 

                    fetch('https://tourism-planner-server-jhsayem021.vercel.app/updateservice', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(service)

                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            toast.success(`${data.title} Update successful`);
                            navigate('/dashboard/updateservice')

                        })


                }
            })
        }

    }
    return (
        <div>
            <input type="checkbox" id="Update_Modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box ">
                    <button className='btn ' onClick={() => handleDelete(singlepost)} >Delete Post</button>
                    <button className='btn ' onClick={() => handleDelete(singlepost)} >Delete Post</button>
                
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
};

export default UpdatePost;