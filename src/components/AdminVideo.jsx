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
import { selectUserAuthToken, selectUserIdentifier, setSignOutState, setUserLoginDetails } from '../redux/app/app.slice';
import { blue, green } from '@mui/material/colors';
import { getAllVideos, getVideos, setVideos } from '../redux/app/video.slice';
import { useNavigate } from 'react-router-dom';

export default function AdminVideo() {
  const dispatch = useDispatch()
  const data = useSelector(getVideos)
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
      },
      {
        accessorKey: 'video_title',
        header: 'Titre de la video',
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
  const authToken = useSelector(selectUserAuthToken);
  const [videoFile, setVideoFile] = useState(null)
  const [videoTitle, setVideoTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [actionResponse, setActionResponse] = useState({severity: "success", message: ""})
  const [loading, setLoading] = useState(false);
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization:  "Bearer "+authToken
  }

  const handleGetVideos = async() => {
    const url = "/api/admin/getVideos"
    axiosInstance.get(url, {headers})
    .then(response => {
       dispatch(setVideos(response.data))
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

  const handleCreateVideo = async() => {
    const formData = new FormData();
    formData.append("video_file", videoFile);
    formData.append("video_title", videoTitle);
    formData.append("user", user ? user : "chris25@gmail.com")
    setLoading(true);
    const url = "/api/admin/addVideo";
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
  const handleDeleteVideo = () => {
    setLoading(true);
    const url = "/api/admin/deleteVideo";
    setTimeout(() => {
      axiosInstance.put(url, selectedRow, {headers})
      .then(response => setActionResponse({severity: "success", message: response.data.message}))
      .catch(err => setActionResponse({severity: "error", message: err.message}));
      setLoading(false);
      setState({...state, open: true})
    }, 2000);
  }


  const handleDeleteAction = (row) => {
    setOpenDeleteDialog(true);
    setSelectedRow(row.original)
  }

  const handleResetForm = () => {
    setVideoFile(null);
    setVideoTitle("");
    setOpenModal(false);
  }
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  useEffect(() => {
    handleGetVideos();
  })
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
        fullWidth
        maxWidth={"sm"}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            handleDeleteVideo();
            setTimeout(() => {
              setOpenDeleteDialog(false)
            }, 2000);
          },
        }}
        sx={{
          width: "65%"
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
          fullWidth
          maxWidth={"sm"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            handleCreateVideo(); 
            setTimeout(() => {
              setOpenModal(false)
            }, 2000);
            handleResetForm()
          },
        }}
      >
        <DialogTitle className='text-green-800 font-bold'>Nouvelle Video</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={videoTitle}
            name="videoTitle"
            label="Titre de la video"
            type="text"
            onChange={(e) => setVideoTitle(e.target.value)}
            fullWidth
            variant="standard"
          />
          <div>
      <div className="mb-2 mt-5 flex flex-row justify-between items-center">
        <Label className='bg-gray-600 cursor-pointer p-2 text-white w-4/12' htmlFor="file-upload" value={videoFile ? "Changer" : "Choisir un fichier"} />
        <div className='text-gray-600 overflow-x-hidden p-2 bg-gray-200 w-8/12'>{videoFile ? videoFile.name : "Aucun fichier choisi"}</div>
      </div>
       <input             
       required
       onChange={(e) => setVideoFile(e.target.files[0])} type="file" name="video_image" id="file-upload" accept="video/*" hidden />
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
          onClick={() => setOpenModal(true)}
        >
          Ajouter une video
        </Button>
  )}
      localization={MRT_Localization_FR}
      enableRowActions
      renderRowActionMenuItems={({ row, table }) => [
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
