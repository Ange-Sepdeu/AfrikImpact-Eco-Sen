import React, { useState } from 'react'
import logoWithOutBackground from "../assets/logo_without.png"
import { TextField } from '@mui/material'
import {useForm} from "react-hook-form"
import axiosInstance from '../axiosInstance/axiosInstance';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserLoginDetails } from '../redux/app/app.slice';

export default function Register() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const [loading, setLoading] = useState(false)
  const [actionResponse, setActionResponse] = useState({severity: "success", message: ""})
  const onSubmit = values => {
    const url = "/api/auth/register";
    setLoading(true);
    setTimeout(() => {
      axiosInstance.post(url,values)
      .then(response => {
        console.log(response.data);
        setActionResponse({severity: "success", message: response.data.message})
        navigate("/connexion");
      })
      .catch(err => {
        console.log(err)
        setActionResponse({severity: "error", message: err.response.data.message})
      });
      setLoading(false);
      setState({...state, open: true})
    }, 2000);
  }


  return (
    <>
         <Snackbar 
      open={actionResponse.message.length>0 && open} 
      autoHideDuration={6000} 
      anchorOrigin={{vertical, horizontal}} 
      onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={actionResponse.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {actionResponse.message}
        </Alert>
      </Snackbar>
        <div className='m-auto shadow-2xl w-10/12 sm:w-6/12 md:w-4/12 lg:w-3/12 rounded-2xl bg-white mb-20 p-2 text-center mt-20'>
            <div className='m-auto'>
                <img src={logoWithOutBackground} className='object-contain w-3/12 m-auto' alt="Logo AfrikImpact Eco-sen" />
            </div>
            <div className='text-2xl font-semibold w-full text-green-700 mt-7'>Inscription</div>
            <form onSubmit={handleSubmit(onSubmit)} method="post">
            <div className='mt-10 mb-7'>
            <TextField 
                {...register("username", {
                    required: "Champs requis"
                  })}
                className='w-10/12'
                type="text" 
                error={errors.username ? true : false}
                placeholder='Nom' />
                {errors.username && <div className="text-red-600 mt-2"> {errors.username.message} </div>}
            </div>
            <div>
            <TextField 
                {...register("email", {
                    required: "Champs requis",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Entrez un identifiant valide"
                    }
                  })}
                className='w-10/12'
                type="email" 
                error={errors.email ? true : false}
                placeholder='Identifiant' />
                {errors.email && <div className="text-red-600 mt-2"> {errors.email.message} </div>}
            </div>
            <div className='mt-7'>
                <TextField 
                    {...register("password", {
                    required: "Champs requis",
                    })}
                error={errors.password ? true : false}
                type="password" 
                className='w-10/12'
                placeholder='Mot de passe' />
                {errors.password && <div className="text-red-600 mt-2"> {errors.password.message} </div>}
            </div>
            <LoadingButton className='w-10/12' sx={{marginTop: 5, marginBottom:5}} type="submit" loading={loading} color="success" variant="contained">
          inscrire
      </LoadingButton>
            </form>
        </div>
    </>
  )
}
