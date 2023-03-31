/* eslint-disable no-unused-vars */
import { AgGridReact } from 'ag-grid-react'
import '/home/mstuser1/Desktop/Manager_UI/node_modules/ag-grid-community/styles/ag-grid.css'
import '/home/mstuser1/Desktop/Manager_UI/node_modules/ag-grid-community/styles/ag-theme-alpine.css'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { Card, Button, CardHeader, Modal, ModalBody, ModalHeader } from 'reactstrap'

const id = '1'

import Modalform from './modalForm'


function App() {
  const [rowData, setRowData] = useState()
  const [show, setShow] = useState(false)
  const gridRef = useRef()

  const [columnDefs] = useState([
    { headerName: 'ID', field: 'id', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Hotel ID', field: 'hotelID', suppressSizeToFit: true },
    { headerName: 'Attendant Name', field: 'attendantName' },
    { headerName: 'Roster Name', field: 'rosterName' },
    { headerName: 'Attendant ID', field: 'attendantID', suppressSizeToFit: true },
    { headerName: 'Floor', field: 'floor' },
    { headerName: 'Created By', field: 'createdBy' },
    { headerName: 'Created Time', field: 'createdTime', suppressSizeToFit: true }
  ])

  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ))


  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event)
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8000/getAttendantShift?hotelID=${id}`)
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData['data'])
        console.log(rowData['data'])
      })
  }, [])


  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 520 }}>
        <Card>
          <CardHeader>
            <h1>Attendant Roster</h1>
            <Button color='primary' onClick={() => setShow(!show)}>
              NEW
            </Button>
          </CardHeader>
        </Card>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection='multiple'
          onCellClicked={cellClickedListener}
          paginationPageSize='10'
          pagination='true'
          defaultColDef={defaultColDef}
          headerColor="ddw-primary"

        />
      </div>

      <div>
        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-xl'>
          <ModalHeader className='bg-transparent' toggle={() => setShow(!show)} ></ModalHeader>
          <ModalBody className='px-sm-5 mx-50 pb-5'>
            <h2 className='address-title text-center mb-1'>Create Roster</h2>
            <Modalform /> 
            <div>
            </div>
          </ModalBody>
        </Modal>
      </div>

    </div>


  )
}

export default App