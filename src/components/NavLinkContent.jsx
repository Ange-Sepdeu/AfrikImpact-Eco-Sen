import React, { useState } from 'react'
import { DrawerList } from '../utils/navlinks'
import axiosInstance from "../axiosInstance/axiosInstance"
import {useSelector} from "react-redux";
import {selectUserAuthToken} from "../redux/app/app.slice"

export default function NavLinkContent() {
    const [selectedNavLink, setSelectedNavLink] = useState(DrawerList[3].name);
    const [selectedSubLink, setSelectedSubLink] = useState(DrawerList[3].dropdownList[0].label);
    const [selectedLinkDropdown, setSelectedLinkDropdown] = useState(DrawerList[3].dropdownList);
    const [contentText, setContentText] = useState("")
    const authToken = useSelector(selectUserAuthToken)
    const handleSetSelectedNavLink = (value) => {
        const dropdown = [...DrawerList].find(dtl => dtl.name === value).dropdownList;
        setSelectedLinkDropdown(dropdown)
        setSelectedNavLink(value)
    }
    const handleSubmit = async() => {
        const url = "/api/admin/addNavContent";
        if (contentText.length > 0){
        const data = {
            nav_link:selectedNavLink,
            content_title:selectedSubLink,
            content_text:contentText
        }
        const headers = {
            Authorization: "Bearer "+authToken
        }
        axiosInstance.post(url, data, {headers})
        .then(response => alert(response.data.message))
        .catch(error => alert(error.response.data.message))}
        else
        alert("Remplir les champs vides")
    }
  return (
    <>
        <div className='text-[24px] text-green-700 font-semibold'>Ajouter du contenu</div>
        <div className='font-semibold'>Selectionner le lien et le sous-lien</div>
        <label htmlFor="lien">Lien:</label>
        <select className='p-4 mt-7 ml-[4.5%] border border-gray-400 w-8/12' name="" id="" value={selectedNavLink} onChange={(e) => handleSetSelectedNavLink(e.target.value)}>
        {
            [...DrawerList].map((drawer, index) => {
                if (index > 2)
                {
                    return (
                        <option key={index}>{drawer.name}</option>
                    )
                }
            })
        }
        </select>
        <br />
        <label htmlFor="sous-lien">Sous-lien:</label>
        <select className='p-4 mt-7 ml-5 border border-gray-400 w-8/12' name="" id="" value={selectedSubLink} onChange={(e) => setSelectedSubLink(e.target.value)}>
        {
            [...selectedLinkDropdown].map((link, index)=>(
                        <option key={index}>{link.label}</option>
                    )
            )
        }
        </select>
        <br />
        <textarea value={contentText} required={true} name="" placeholder='Texte' className='border border-gray-400 mt-7 ml-[7.5%] p-4' id="" cols="97" rows="10" onChange={(e) => setContentText(e.target.value)}></textarea>
        <br />
        <button onClick={() => handleSubmit()} className='p-3 ml-[7%] mt-5 bg-green-700 text-white hover:text-green-700 hover:bg-white font-semibold rounded-[10px]'>
            Enregistrer
        </button>
    </>
  )
}
