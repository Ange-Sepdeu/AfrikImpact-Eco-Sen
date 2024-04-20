import React from 'react'
import { useMemo, useEffect, useState } from 'react';
import { MaterialReactTable, MRT_ActionMenuItem } from 'material-react-table';
import { Edit, Delete, Visibility, Close, Input } from '@mui/icons-material';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import {Button, IconButton,TextField, TextareaAutosize} from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FileInput, Label, Textarea } from 'flowbite-react';
import axiosInstance from "../axiosInstance/axiosInstance";
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import { getAllActualites, getActualites, setActualites } from '../redux/app/actualite.slice';
import { selectUserAuthToken, selectUserIdentifier, setSignOutState } from '../redux/app/app.slice';
import { blue, green } from '@mui/material/colors';

export default function AdminActualite() {
  const dispatch = useDispatch();
  useEffect(() => {
    handleGetActualites()
  });
  const data = useSelector(getActualites);
  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
      },
      {
        accessorKey: 'actualite_title',
        header: 'Titre de la actualite',
      },
      {
        accessorKey: 'actualite_text',
        header: 'Texte a afficher',
        size: 400
      },
      {
        accessorKey: 'user',
        header: 'Auteur(e)',
      },
      {
        accessorKey: 'view_status',
        header: 'Statut',
      },
    ],
    [],
    //end
  );
  
  const user = useSelector(selectUserIdentifier);
  const authToken =  useSelector(selectUserAuthToken);
  const [actualiteImage, setActualiteImage] = useState(null);
  const [actualiteTitle, setActualiteTitle] = useState("");
  const [actualiteText, setActualiteText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [actionResponse, setActionResponse] = useState({severity: "success", message: ""});
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("");
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization:  "Bearer "+authToken
  }

  const handleGetActualites = async() => {
    const url = "/api/admin/getActualites"
    axiosInstance.get(url, {headers})
    .then(response => {
       dispatch(setActualites(response.data))
    })
    .catch(error => {
      if (error.response.status == 401)
      {
        dispatch(setSignOutState());
        navigate('/connexion');
        return;
      }
      setActionResponse({message:error.response.data.message, severity: "error"})
    })
  }

  const handleCreateActualite = async() => {
    const formData = new FormData();
    formData.append("actualite_image", actualiteImage);
    formData.append("actualite_text", actualiteText);
    formData.append("actualite_title", actualiteTitle);
    formData.append("user", user ? user : "chris25@gmail.com")
    setLoading(true);
    const url = "/api/admin/addActualite";
    setTimeout(() => {
      axiosInstance.post(url,formData, {headers})
      .then(response => setActionResponse({severity: "success", message: response.data.message}))
      .catch(err => {
        console.log(err)
        setActionResponse({severity: "error", message: err.response.data.message})
      });
      setLoading(false);
      setState({...state, open: true})
    }, 2000);
    handleResetForm()
  }
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const [selectedRow, setSelectedRow] = useState(null)
  const handleDeleteActualite = () => {
    setLoading(true);
    const url = "/api/admin/deleteActualite";
    setTimeout(() => {
      axiosInstance.put(url, selectedRow, {headers})
      .then(response => setActionResponse({severity: "success", message: response.data.message}))
      .catch(err => setActionResponse({severity: "error", message: err.message}));
      setLoading(false);
      setState({...state, open: true})
    }, 2000);
  }

  const handleEditActualite = () => {
    if (!actualiteText && !actualiteImage){ 
      setActionResponse({severity: "error", message: "Modifiez l'image ou/et le texte !"});
      setState({...state, open: true});
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("actualite_image", actualiteImage);
    formData.append("actualite_text", actualiteText);
    formData.append("_id", selectedRow._id);
    const url = "/api/admin/updateActualite";
    setTimeout(() => {
      axiosInstance.post(url, formData, {headers})
      .then(response => setActionResponse({severity: "success", message: response.data.message}))
      .catch(err => setActionResponse({severity: "error", message: err.response.data.message}));
      setLoading(false);
      setState({...state, open: true});
      handleResetForm();
    }, 2000);
    // handleResetForm()
  }

  const handleDeleteAction = (row) => {
    setOpenDeleteDialog(true);
    setSelectedRow(row.original)
  }
  const handleEditAction = (row) => {
    setOpenModal(true); 
    setMode("edit"); 
    setSelectedRow(row.original)
  }
  const handleResetForm = () => {
    setActualiteImage(null);
    setActualiteText("");
    setOpenModal(false);
  }
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  
  return (
    <>
     <Snackbar open={actionResponse.message.length>0 && open} autoHideDuration={6000} anchorOrigin={{vertical, horizontal}} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={actionResponse.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {actionResponse.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            handleDeleteActualite();
            setTimeout(() => {
              setOpenDeleteDialog(false)
            }, 2000);
          },
        }}
      >
        <DialogTitle className='text-green-800 font-bold'>Voulez-vous continuer ?</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenDeleteDialog(false)} color="error">Annuler</Button>
        <LoadingButton type="submit" loading={loading} color="success" variant="contained">
          supprimer
      </LoadingButton>
        </DialogActions>
      </Dialog>
          <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            (
            mode === "create" ?
            handleCreateActualite() : 
            handleEditActualite()
            )
            setTimeout(() => {
              setOpenModal(false)
            }, 2000);
          },
        }}
      >
        <DialogTitle className='text-green-800 font-bold'>{mode==="create" ? "Nouvelle Actualite":"Modifier une actualite"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={actualiteTitle}
            required
            name="actualiteTitle"
            label={mode==="create"?"Titre de la actualite": selectedRow?.actualite_title}
            type="text"
            disabled={mode==="create"?false:true}
            onChange={(e) => setActualiteTitle(e.target.value)}
            fullWidth
            variant="standard"
          />
          <textarea 
            required={mode=="create" ? true : false} 
            name="actualite_text" 
            placeholder={mode==="create" ? 'Texte de la actualite' : selectedRow?.actualite_text} 
            className='w-full border-b border-black mt-7 outline-none' 
            value={actualiteText} 
            onChange={(e) => setActualiteText(e.target.value)} 
            cols="30" rows="10"></textarea>
          <div>
      <div className="mb-2 mt-5 flex flex-row justify-between items-center">
        <Label className='bg-gray-600 cursor-pointer p-2 text-white w-4/12' htmlFor="file-upload" value={actualiteImage ? "Changer" : "Choisir un fichier"} />
        <div className='text-gray-600 overflow-x-hidden p-2 bg-gray-200 w-8/12 overflow-x-hidden'>{actualiteImage ? actualiteImage.name : "Aucun fichier choisi"}</div>
      </div>
       <input             
       required={mode=="create" ? true : false} 
       onChange={(e) => setActualiteImage(e.target.files[0])} type="file" name="actualite_image" id="file-upload" accept='image/*' hidden />
    </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleResetForm()} color="error">Annuler</Button>
        <LoadingButton type="submit" loading={loading} color="success" variant="contained">
          Enregistrer
      </LoadingButton>
        </DialogActions>
      </Dialog>
      <MaterialReactTable
      columns={columns}
      data={data}
      muiTableHeadCellProps={({row}) => ({
        sx: {
          backgroundColor: blue[700],
          color: 'white'
        }
      })}
      muiTableBodyCellProps={({row}) => ({
        sx: {
          backgroundColor: blue[100],
          color: ''
        }
      })}
      renderTopToolbarCustomActions={({ table }) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => {setOpenModal(true); setMode("create")}}
        >
          Ajouter une actualite
        </Button>
  )}
      localization={MRT_Localization_FR}
      enableRowActions
      renderRowActionMenuItems={({ row, table }) => [
        <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
          icon={<Edit />}
          key="edit"
          label="Modifier"
          disabled={row.original.view_status=="inactive"}
          onClick={() => handleEditAction(row)}
          table={table}
        />,
        <MRT_ActionMenuItem
          icon={<Delete />}
          key="delete"
          disabled={row.original.view_status=="inactive"}
          label="Supprimer"
          onClick={() => handleDeleteAction(row)}
          table={table}
        />,
      ]}
    />
    </>
  );
};
