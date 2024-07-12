"use client";
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { imgDB } from "../firebase";
import { txtDB } from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

interface DataType {
    id: string;
    txtVal: string;
    imgUrl: string;
}

function Admin() {

    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect("/signin");
        },
    });

    const [txt, setTxt] = useState('')
    const [img, setImg] = useState('')
    const [data, setData] = useState<DataType[]>([]);

    const handleUpload = (e) => {
        console.log(e.target.files[0])
        const imgs = ref(imgDB,`Imgs/${v4()}`)
        uploadBytes(imgs, e.target.files[0]).then(data=>{
            console.log(data,"imgs")
            getDownloadURL(data.ref).then(val=>{
                setImg(val)
            })
        })
    }
   
    const handleClick = async () =>{
        const valRef = collection(txtDB, `txtData`)
        await addDoc(valRef, {txtVal:txt, imgUrl:img})
        alert("Data added successfully!")
        setTxt('');
        setImg('');
     }

    return (
        <div>
            <input value={txt} onChange={(e)=>setTxt(e.target.value)}/><br/>
            <input type="file" onChange={(e)=>handleUpload(e)}/><br/>
            <button onClick={handleClick}>Add</button>
       
            <div className="p-8">
                <div className="text-black">{session?.data?.user?.email}</div>
                <button className="text-black" onClick={() => signOut()}>
                Logout
                </button>
            </div>
        </div>
    )
}

export default Admin;

