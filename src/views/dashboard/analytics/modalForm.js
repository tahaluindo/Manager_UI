
import { Row, Col, Form, Button, Label, InputGroup,
  InputGroupText   } from 'reactstrap'
// ** React Imports
import Select from 'react-select'
import { useState } from "react"
import toast from "react-hot-toast"
import classnames from "classnames"
import Cleave from "cleave.js/react"
import { Check } from "react-feather"
import "cleave.js/dist/addons/cleave-phone.us"
import { useForm, Controller } from "react-hook-form"

import { selectThemeColors} from '@utils'
// ** Custom Components
import Avatar from "@components/avatar"

let attendantNames = [
  fetch('http://localhost:8000/getAttendantList?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      attendantNames = resp['data']
      console.log(attendantNames)
    })
]

const defaultValues = {
  attendantName: null,
  rosterName: "",
  attendantID:'',
  floor: '',
  createdBy: ""
}

const Modalform = () => {
  const [data, setData] = useState(null)
  const { reset, handleSubmit, control  } = useForm({ defaultValues })
  const onSubmit = (data) => {
    setData(data)
    console.log(data)
    if (
      data.rosterName !== null &&
      data.attendantID !== null &&
      data.floor !== null &&
      data.createdBy !== null 
    ) {
      console.log(data)
      const createasset = JSON.stringify({
        attendantName: data.attendantName.value,
        rosterName: data.rosterName,
        attendantID: data.attendantID,
        floor: data.floor,
        createdBy: data.createdBy
       })

      console.log(createasset)
        const res = fetch("http://localhost:8000/addAttendantToRoster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset
      }).then((res) => {
        console.log(res)
      })
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <h4>Successfully created shift</h4>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
        attendantName: null,
        rosterName: "",
        attendantID:'',
        floor: '',
        createdBy: ""
    })
  }

  return (
    <div>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md='6' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='attendantName'>
                      Attendant Name
                    </Label>
                    <Controller
                      id='attendantName'
                      control={control}
                      name='attendantName'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={attendantNames}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.attendantName === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
            {/* <Col md='6' sm='12' className='mb-1'>
              <div className="mb-1">
                <Label className="form-label" for="attendantName">
                  Attendant Name
                </Label>
                <InputGroup className="input-group-merge">
                  <InputGroupText
                    className={classnames({
                      "is-invalid": data !== null && (data.attendantName === null || !data.attendantName.length)
                    })}
                  ></InputGroupText>
                  <Controller
                    id="attendantName"
                    name="attendantName"
                    control={control}
                    render={({ field }) => (
                      <Cleave
                        placeholder="Attendant Name"
                        {...field}
                        className={classnames("form-control", {
                          "is-invalid":
                            data !== null && (data.attendantName === null || !data.attendantName.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col> */}
            <Col md='6' sm='12' className='mb-1'>
              <div className='mb-1'>
                <Label className='form-label' for='rosterName'>
                  Roster Name
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.rosterName === null || !data.rosterName.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='rosterName'
                    name='rosterName'
                    control={control}
                    render={({ field }) => (
                      <Cleave
                        placeholder='Roster Name'
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.rosterName === null || !data.rosterName.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <div className="mb-1">
                <Label className="form-label" for="attendantID">
                Attendant ID
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.attendantID === null || !data.attendantID.length)
                    })}
                  >
                  </InputGroupText>
                <Controller
                  id="attendantID"
                  control={control}
                  name="attendantID"
                  render={({ field }) => (
                    <Cleave
                      placeholder='Attendant ID'
                      {...field}
                      className={classnames('form-control', {
                        'is-invalid': data !== null && (data.attendantID === null || !data.attendantID.length)
                      })}
                    />
                  )}
                />
                </InputGroup>
              </div>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <div className='mb-1'>
                <Label className='form-label' for='floor'>
                  Floor
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.floor === null || !data.floor.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='floor'
                    name='floor'
                    control={control}
                    render={({ field }) => (
                      <Cleave
                        placeholder='Floor'
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.floor === null || !data.floor.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <div className='mb-1'>
                <Label className='form-label' for='createdBy'>
                Created By
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.createdBy === null || !data.createdBy.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='createdBy'
                    name='createdBy'
                    control={control}
                    render={({ field }) => (
                      <Cleave
                        placeholder='Created By'
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.createdBy === null || !data.createdBy.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                Submit
              </Button>
              <Button
                outline
                color="secondary"
                type="reset"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Modalform