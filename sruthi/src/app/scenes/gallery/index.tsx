
"use client";
import { SelectedPage, ClassType } from "../../shared/types"
import { motion } from "framer-motion";
import HText from "../../shared/HText";
import React, { useEffect, useState } from 'react'
import { txtDB } from '@/app/firebase';
import { collection, getDocs } from "firebase/firestore";
import Class from "./Class";
 
interface DataType {
    id: string;
    txtVal: string;
    imgUrl: string;
}




type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Gallery = ({ setSelectedPage }: Props) => {

    const [txt, setTxt] = useState('')
    const [img, setImg] = useState('')
    const [data, setData] = useState<DataType[]>([]);

    const getData = async () =>{
        const valRef = collection(txtDB, 'txtData') // Ensure the collection name matches what was used in handleClick
        const dataDb = await getDocs(valRef)
        const allData = dataDb.docs.map(val=>({...val.data(), id:val.id}))
        setData(allData)
        console.log(dataDb)
    }

    useEffect(() => {
        getData()
    },[])

    console.log(data,"datadata")

  
  return (
    <section id="gallery" className="w-full bg-white py-40">
        <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Gallery)}>

            <motion.div
            className="mx-auto w-5/6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75 }}
            variants={{
                hidden: { opacity: 0, x:-100 },
                visible: { opacity: 1, x: 0},
            }}>
                <div className="px-8 md:w-3/5">
                <HText>
                       MY<span className="text-primary-300"> GALLERY</span>
                    </HText> 
                    <p className="py-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </motion.div>
            <motion.div 
            className=" mt-10 h-full w-full overflow-x-auto overflow-y-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75 }}
            variants={{
                hidden: { opacity: 0, x:-100 },
                visible: { opacity: 1, x: 0},
            }}>
                <ul className=" px-40 w-full whitespace-wrap">
                    {data.map((item) => (
                            <Class key={`${item.id}`}
                            name={item.txtVal}
                            image={item.imgUrl}
                            />
                            ))}
                </ul>
             

              
            </motion.div>

        </motion.div>

    </section>
  )
}

export default Gallery