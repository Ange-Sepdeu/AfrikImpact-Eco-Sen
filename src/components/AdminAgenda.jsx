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
import {  FileInput, Label, Textarea } from 'flowbite-react';
import axiosInstance from "../axiosInstance/axiosInstance";
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import { getAllAgendas, getAgendas, setAgendas } from '../redux/app/agenda.slice';
import { selectUserAuthToken, selectUserIdentifier, setSignOutState } from '../redux/app/app.slice';
import { blue, green } from '@mui/material/colors';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function AdminAgenda() {
  const dispatch = useDispatch();
  const authToken = useSelector(selectUserAuthToken);
  useEffect(() => {
    handleGetAgendas()
  });
  const data = useSelector(getAgendas);
  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
      },
      {
        accessorKey: 'agenda_title',
        header: "Titre de l'agenda"
      },
      {
        accessorKey: 'agenda_date',
        header: 'Date prevue',
      },
      {
        accessorKey: 'agenda_text',
        header: 'Texte a afficher'
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
  const [agendaImage, setAgendaImage] = useState(null);
  const [agendaTitle, setAgendaTitle] = useState("");
  const [agendaDate, setAgendaDate] = useState(new Date())
  const [agendaText, setAgendaText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [actionResponse, setActionResponse] = useState({severity: "success", message: ""});
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("");
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization:  "Bearer "+authToken
  }

  const handleGetAgendas = async() => {
    const url = "/api/admin/getAgendas"
    axiosInstance.get(url, {headers})
    .then(response => {
       dispatch(setAgendas(response.data))
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

  const handleCreateAgenda = async() => {
    const formData = new FormData();
    formData.append("agenda_image", agendaImage);
    formData.append("agenda_text", agendaText);
    formData.append("agenda_date", agendaDate);
    formData.append("agenda_title", agendaTitle);
    formData.append("user", user ? user : "chris25@gmail.com")
    setLoading(true);
    const url = "/api/admin/addAgenda";
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
  const handleDeleteAgenda = () => {
    setLoading(true);
    const url = "/api/admin/deleteAgenda";
    setTimeout(() => {
      axiosInstance.put(url, selectedRow, {headers})
      .then(response => setActionResponse({severity: "success", message: response.data.message}))
      .catch(err => setActionResponse({severity: "error", message: err.message}));
      setLoading(false);
      setState({...state, open: true})
    }, 2000);
  }

  const handleEditAgenda = () => {
    if (!agendaText && !agendaImage){ 
      setActionResponse({severity: "error", message: "Modifiez l'image ou/et le texte !"});
      setState({...state, open: true});
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("agenda_image", agendaImage);
    formData.append("agenda_text", agendaText);
    formData.append("_id", selectedRow._id);
    const url = "/api/admin/updateAgenda";
    setTimeout(() => {
      axiosInstance.put(url, formData, {headers})
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
    setAgendaImage(null);
    setAgendaText("");
    setOpenModal(false);
  }
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  
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
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            handleDeleteAgenda();
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
        fullWidth
        maxWidth={"sm"}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            (
            mode === "create" ?
            handleCreateAgenda() : 
            handleEditAgenda()
            )
            setTimeout(() => {
              setOpenModal(false)
            }, 2000);
          },
        }}
      >
        <DialogTitle className='text-green-800 font-bold'>{mode==="create" ? "Nouvel Agenda":"Modifier un agenda"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={agendaTitle}
            required
            name="agendaTitle"
            label={mode==="create"?"Titre de l'agenda": selectedRow?.agenda_title}
            type="text"
            disabled={mode==="create"?false:true}
            onChange={(e) => setAgendaTitle(e.target.value)}
            fullWidth
            variant="standard"
          />
              <Label className='mt-10 text-lg text-gray-700 ' htmlFor="agendaDate" value={"Date"} />
              <br />
              <DatePicker selected={agendaDate} onChange={(date) => setAgendaDate(date)} /> 
          <textarea 
            required={mode=="create" ? true : false} 
            name="agenda_text" 
            placeholder={mode==="create" ? 'Texte de la agenda' : selectedRow?.agenda_text} 
            className='w-full border-b border-black mt-7 outline-none' 
            value={agendaText} 
            onChange={(e) => setAgendaText(e.target.value)} 
            cols="30" rows="5"></textarea>
          <div>
      <div className="mb-2 mt-5 flex flex-row justify-between items-center">
        <Label className='bg-gray-600 cursor-pointer p-2 text-white w-4/12' htmlFor="file-upload" value={agendaImage ? "Changer" : "Choisir un fichier"} />
        <div className='text-gray-600 overflow-x-hidden p-2 bg-gray-200 w-8/12 overflow-x-hidden'>{agendaImage ? agendaImage.name : "Aucun fichier choisi"}</div>
      </div>
       <input             
       required={mode=="create" ? true : false} 
       onChange={(e) => setAgendaImage(e.target.files[0])} type="file" name="agenda_image" id="file-upload" accept='image/*' hidden />
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
      data={data.length == 0 ? [] : data}
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
          Ajouter un agenda
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
