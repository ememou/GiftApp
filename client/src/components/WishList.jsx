import React, { useEffect, useState }from 'react'
import axios from 'axios'
import Gift from "../components/Gift"

const WishList = ({user , userProfileData, isMe}) => {
    const [myWishlist, setMyWishlist] = useState([])
    const [isMine, setisMine] = useState(false)
    
    useEffect(() => {
        let isApiSubscribed = true;
        
        if(isMe){
            const  {_id} = user;
            const body = JSON.stringify({ _id})
            axios.post(`/product/getwishlist/`, body)
                .then(res =>{
                    if (isApiSubscribed) {
                        setMyWishlist(res.data);
                        setisMine(true);
                    }
                }).catch(err=>{
                    console.log(err);
                })
        }
        else{
            const  {_id} = userProfileData;
            const body = JSON.stringify({ _id})
            axios.post(`/product/getwishlist/`, body)
                .then(res =>{
                    if (isApiSubscribed) {
                        setMyWishlist(res.data);
                        setisMine(false);
                    }
                }).catch(err=>{
                    console.log(err);
                })
        }
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
        //eslint-disable-next-line
    }, [myWishlist])

    return (
        <div>
            {
                myWishlist.length?
                <>
                    <h1 className=" text-center lh-1">Wishlist</h1>
                    {
                        myWishlist.map(gift=>{
                            return (
                                <div key={gift._id}>
                                    <Gift user={user} gift={gift} isMine={isMine} meDonator={gift.meDonator}/>
                                </div>
                            )
                        })
                    }
                </>:
                (
                    <h1 className=" text-center lh-1">No Gifts to Wishlist</h1>
                )     
            }
        </div>
    )
}

export default WishList