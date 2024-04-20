import { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ActionMenuItem } from 'material-react-table';
import { Edit, Delete, Visibility, Close } from '@mui/icons-material';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import {Button, IconButton} from "@mui/material"
import {Modal} from "flowbite-react"

export const DataTable = () => {
const data = [
    {
        firstName: "Ange Chris",
        lastName: "Kameni Sepdeu",
        address: "IAI",
        city: "Yaounde",
        state: "Centre"
    }
]
  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
    //end
  );
    const [openModal, setOpenModal] = useState(false)
  return (
    <>
    <Modal open={openModal} className='px-4 py-2 rounded-2xl bg-white'>
        <div className='text-right'>
            <IconButton onClick={() => setOpenModal(false)} sx={{fontSize: 32}}>
            <Close  />
            </IconButton>
        </div>
        <h2 className='text-center'>Nouvelle Publication</h2>
    </Modal>
    <MaterialReactTable
      columns={columns}
      data={data}
      renderTopToolbarCustomActions={({ table }) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpenModal(true)}
        >
          Ajouter une publication
        </Button>
  )}
      localization={MRT_Localization_FR}
      enableRowActions
      renderRowActionMenuItems={({ row, table }) => [
        <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
          icon={<Edit />}
          key="edit"
          label="Mofifier"
          onClick={() => console.info('Edit')}
          table={table}
        />,
        <MRT_ActionMenuItem
          icon={<Delete />}
          key="delete"
          label="Delete"
          onClick={() => console.info('Delete')}
          table={table}
        />,
        <MRT_ActionMenuItem
        icon={<Visibility />}
        key="view"
        label="Voir"
        onClick={() => console.log(row)}
        table={table}
      />,
      ]}
    />
    </>
  );
};

export default DataTable;
