import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Gift from "../components/Gift"

const PendingGift = ({user , isMe}) => {
    const [myList, setMyList] = useState([]);

    useEffect(() => {

        let isApiSubscribed = true;
        if(isMe){
            axios.get(`/transactions/mytransactions`)
                .then(res =>{
                    if (isApiSubscribed) {
                        setMyList(res.data);
                    }
                }).catch(err=>{
                    console.log(err);
                })
        }
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, [isMe, user])

    return (
        <div>
            {
                myList.length?
                <>
                    <h1 className=" text-center lh-1">Pending Gifts</h1>
                    {
                        myList.map(gift=>{
                            return (
                                <div key={gift._id}>
                                    <Gift user={user} gift={gift} isMine={false} meDonator={true}/>
                                </div>
                            )
                        })
                    }
                </>:
                (
                    <h1 className=" text-center lh-1">No Pending Gifts</h1>
                ) 
            }
        </div>
    )
}

export default PendingGift