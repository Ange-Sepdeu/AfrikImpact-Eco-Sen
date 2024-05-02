import React, { useEffect, useState } from 'react';
import companyLogo from "../assets/logo.jpg";
import bgOffer from "../assets/pub9.jpg";
import { EmailOutlined, VillaSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import CountryList from 'country-list-with-dial-code-and-flag'
import {getCountryCode, getCountryData, getCountryDataList} from "countries-list"


export default function Offres() {
    const [amountDetail, setAmountDetail] = useState([
        {
            amount: "45",
            active: false
        },
        {
            amount: "70",
            active: false
        },
        {
            amount: "90",
            active: false
        }
    ])
    const [countries, setCountries] = useState([])
    const [activeAmount, setActiveAmount] = useState();
    const [btn, setBtn] = useState(false);
    const handleSetAmount = (amt) => {
        setActiveAmount(amt);
        let amount = [...amountDetail];
        amount.forEach(amnt => {
            amnt.active = false;
        })
        amount.forEach(amnt => {
            if(amnt.amount === amt.amount){
                amnt.amount = !active
            }
        })
        setAmountDetail(amount);
    }
    const handleSetMontantLibre = (text) => {
        setActiveAmount({amount: text});
        let amount = [...amountDetail];
        amount.forEach(amnt => {
            amnt.active = false;
        })
    }
    const getFlagEmoji = (countryCode) => {
        if(countryCode)
        {const codePoints = countryCode
                            .toUpperCase()
                            .split("")
                            .map(char => 127397 + char.charCodeAt());
           return String.fromCodePoint(...codePoints);
        }
        return 
    }
    useEffect(() => {
        const countriesList = getCountryDataList();
        setCountries(countriesList);
    })
  return (
    <div className='h-[120vh]'>
        <img src={bgOffer} alt="Background offer image" className='w-full h-full fixed resize-contain'/>
        <img src={companyLogo} alt="Background offer image" className='w-[200px] h-[200px] absolute rounded-full top-[5%] left-[7%] resize-contain'/>
        <div className='absolute right-10 top-[40%] sm:top-[35%] md:top-[30%] lg:top-[10%]'>
              <Breadcrumbs
                sx={{ color: "white", textTransform: "none", fontSize: 20 }}
                className="mb-15"
              >
                <Link className="underline hover:text-white text-blue-800" to={"/"}>
                  Page d'accueil
                </Link>
                <div>Faire une offre</div>
              </Breadcrumbs>
        </div>
        <div className='absolute top-[45%] left-5 sm:left-[7%] md:left-[4%] lg:left-[5%] flex w-[90%] lg:w-[90%] h-[100vh] flex-wrap flex-row justify-between items-center'>
            <div className='bg-white h-full w-full sm:w-full md:w-full lg:w-[32%]'>
                <div className='w-full uppercase text-[24px] font-semibold bg-blue-800 p-4 text-center text-white'>
                    1. votre don
                </div>
                <div className='p-4 w-full'>
                    <h2 className='text-center text-[18px] font-semibold bg-green-800 text-white p-4 rounded-[10px] m-auto w-[50%]'>Choisissez le montant de votre offre</h2>
                    <button onClick={() => setBtn(!btn)} className='p-4 text-center m-auto'>{btn ? "Afficher les choix" : "Afficher montant libre"}</button>
                    { !btn ?
                    <div className="flex flex-row justify-between items-center mt-2">
                        {
                            [...amountDetail].map((amt, index) => (
                                <div key={index} onClick={() => handleSetAmount(amt)} 
                                className={`cursor-pointer p-2 w-[32%] text-center text-[20px] ${(activeAmount?.amount===amt.amount) ? "text-white bg-green-800": "border border-gray-400"}  rounded-[5px]`}>
                                    {amt.amount}
                                </div>
                            ))
                        }
                    </div>
                    :<div className='flex border border-gray-400 rounded-[7px] flex-row justify-between items-center mt-2 w-[95%] m-auto'>
                        <input type="number" min={1} onChange={(e) => handleSetMontantLibre(e.target.value)} className='p-3 ml-1 outline-none text-[20px] w-[80%]' placeholder='Montant Libre' id="" />
                        <div className='rounded-r-[7px] text-[20px] p-3 text-center text-gray-400 bg-gray-200 border-l border-gray-400 w-[15%]'>$</div>
                    </div>}
                </div>
            </div>
            <div className='bg-white h-full w-full sm:w-full md:w-full lg:w-[32%]'>
                <div className='w-full text-[24px] font-semibold bg-blue-800 p-4 text-center text-white'>
                    2. Mes coordonnées
                </div>
                <div className='w-10/12 m-auto flex border border-gray-400 flex-row justify-between items-center mt-5'>
                        <div className='text-[20px] p-3 text-center text-gray-400 bg-gray-200 border-r border-gray-400 w-[15%]'>
                            <EmailOutlined />
                        </div>
                        <input type="email" onChange={(e) => handleSetMontantLibre(e.target.value)} className='p-3 mr-1 outline-none text-[20px] w-[85%]' placeholder='Email' id="" />
                </div>
                <div className='mt-5 w-10/12 m-auto flex flex-row justify-between items-center'>
                        <select className='p-3 w-[60%] border border-gray-400 outline-none' name="" id="">
                            <option disabled className='text-gray-400'>Civilite*</option>
                            <option value="">M.</option>
                            <option value="">Mme</option>
                            <option value="">Mlle</option>
                        </select>
                        <input type="text" placeholder='Prenom*' className='p-3 outline-none border border-gray-400 w-[35%]' />
                </div>
                <div className='m-auto w-10/12'>
                <input type="text" className='p-3 mt-3 w-full outline-none border border-gray-400' placeholder='Nom*' />
                </div>
                <div className='m-auto w-10/12'>
                <input type="text" className='p-3 mt-3 w-full outline-none border border-gray-400' placeholder='Adresse' />
                </div>
                
                <div className='mt-5 w-10/12 m-auto flex flex-row justify-between items-center'>
                        <input type="text" placeholder='Code postal*' className='p-3 outline-none border border-gray-400 w-[49%]' />
                        <input type="text" placeholder='Ville*' className='p-3 outline-none border border-gray-400 w-[49%]' />
                </div>
                <div className='m-auto w-10/12'>
                    <select className='p-3 uppercase mt-3 w-full outline-none border border-gray-400'>
                        {
                            [...countries].map((singleCountry, index)=> {
                                console.log(getFlagEmoji(getCountryCode(singleCountry.name)))
                                return(
                                <option value={singleCountry.name} key={index}> {getFlagEmoji(getCountryCode(singleCountry.name))} {singleCountry.name}</option>
                                )})
                        }
                    </select>
                </div>
                <div className='mt-3 w-10/12 m-auto flex flex-row justify-between items-center'>
                        <select className='py-3 w-[20%] border border-gray-400 outline-none' name="" id="">
                            <option disabled className='text-gray-400'>Civilite*</option>
                            <option value="">+237</option>
                        </select>
                        <input type="text" placeholder='Numéro de téléphone' className='p-3 outline-none border border-gray-400 w-[77%]' />
                </div>
                <div className='mt-5 text-[13px] w-10/12 m-auto'>
                * Champs obligatoires (ces informations sont indispensables 
                pour bénéficier de votre réduction fiscale)
                </div>
            </div>
            <div className='bg-white h-full w-full sm:w-full md:w-full lg:w-[32%]'>
                <div className='w-full text-[24px] font-semibold bg-blue-800 p-4 text-center text-white'>
                    3. Mon règlement
                </div>
                <div className='w-10/12 m-auto mt-7'>
                    <input type="text" placeholder='Nom sur la carte*' className='p-3 outline-none border w-full border-gray-400' />
                    <div className='flex border border-gray-400 flex-row justify-between items-center mt-7 w-full m-auto'>
                        <input type="text" className='p-3 ml-1 outline-none text-[18px] w-[80%]' placeholder='Numero de la carte*' id="" />
                        <div className='rounded-r-[7px] text-[20px] p-3 text-center text-gray-400 bg-gray-200 border-l border-gray-400 w-[15%]'>$</div>
                    </div>
                    <div className='mt-5'>Date d'expiration*</div>
                    <input type="date" placeholder='Date D"expiration' className='p-3 outline-none border w-full border-gray-400' />
                    <input type="text" placeholder='Code CVC*' className='p-3 outline-none border w-full mt-7 border-gray-400' />
                    <button className='bg-green-800 text-white text-center text-[20px] w-full uppercase font-bold p-3 mt-7 hover:text-green-900 hover:bg-white'>Valider</button>
                </div>
            </div>
        </div>
        <div className='absolute -bottom-[310%] sm:-bottom-[250%] md:-bottom-[150%] lg:-bottom-[80%] w-full bg-blue-800 p-8 h-[20vh]'></div>

    </div>
  )
}
