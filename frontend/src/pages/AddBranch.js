import React, { useEffect, useState } from "react"

// Components & Widgets
import Label from "../widgets/Label"
import Input from "../widgets/Input"
import Button from "../widgets/Button"
import NavSideBar from "../components/NavSideBar"
import HeaderBar from "../components/HeaderBar"
import SelectAddress from "../components/SelectAddress"
import Select from "../widgets/Select"

// Services
import branchTypeService from "../services/branchType"
import branchService from "../services/branch"
import { useHistory } from "react-router-dom"

const AddBranch = () => {

  // const [ branchName, setBranchName ] = useState('')
  // const [ addressBranch, setAddressBranch ] = useState('')
  // const [ telBranch, setTelBranch ] = useState('')
  // const [ startDate, setStartDate ] = useState('')
  // const handleChangeBranchName = (event) => setBranchName(event.target.value)
  // const handleChangeAddressBranch = (event) => setAddressBranch(event.target.value)

  // const handleChangeTelBranch = (event) => setTelBranch(event.target.value)
  // const handleChangeStartDate= (event) => setStartDate(event.target.value)
  const [branch, setBranch] = useState({
    name: "",
    address: "",
    mainAddress: {
      subdistrict: "",
      district: "",
      province: "",
      zipcode: "",
    },
    tel: "",
    dateStarted: "" 
  })

  const inputConstraints = {
    tel: {
      regex: /[0-9]/,
      length: 10
    },
    zipcode: {
      regex: /[0-9]/,
      length: 5
    }
  }

  const [branchTypes, setBranchTypes] = useState([])
  const [branchType, setBranchType] = useState({
    value: '',
    label: ''
  })
  const [thaiAddress, setThaiAddress] = useState([])
  const [isDisabledTitle, setIsDisabledTitle] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true)

  const history = useHistory()

  useEffect(() => {
    // Setup Thai address
    const jsonAddress = require('../json/thailand_address.json')
    setThaiAddress(jsonAddress)

  }, [])

  // Fetch all branch types
  useEffect(() => {
    let isSubscribed = true
    branchTypeService
      .findAll()
      .then(items => {
        if (isSubscribed) {
          const newBranchTypes = []
          for (const item of items) {
            const newBranchType = { value: item.id, label: item.name }
            newBranchTypes.push(newBranchType)
          }
          setBranchTypes(newBranchTypes)
          setBranchType(newBranchTypes[0])
        }
      })
    
    // Cleanup()
    return () => { isSubscribed = false }
  }, [])



  const handleClickToggle = () => {
    setIsDisabledTitle(!isDisabledTitle)
    setIsDisabledButton(!isDisabledButton)
    setIsDisabled(!isDisabled)
    setIsDisabledSubmit(!isDisabledSubmit)
  }

  const handleChange = (event) => {
    const [parent, child] = event.target.name.split(".")
    if (child) {
      setBranch({
        ...branch,
        [parent]: {
          ...branch[parent],
          [child]: event.target.value
        }
      })
    } else {
      setBranch({
        ...branch,
        [parent]: event.target.value
      })
    }
  }

  const handleBranchTypeChange = (event) => {
    setBranchType(branchTypes[event.target.value - 1])
  }

  const handleKeyPress = (event) => {
    const [, child] = event.target.name.split(".")
    const value = event.target.value
    let constraint = ""
    if (child) {
      constraint = inputConstraints[child]
    } else {
      constraint = inputConstraints[event.target.name]
    }
    if (!constraint.regex.test(event.key) || value.length >= constraint.length) {
      event.preventDefault()
    }
  } 

  const handleSubmit = async () => {
    // Hide submit button
    setIsDisabledSubmit(true)

    // Get count from branches that has the same branch type
    // and the same subdistrict
    const branchTypeCount = await branchService
      .findBranchTypeWithSubdistrictCount(branchType.value, branch.mainAddress.subdistrict) 

    // Generate new name for branch
    // Ex. ศูนย์คัดแยก คลองเตย 3
    const newBranchNumber = branchTypeCount.amount + 1
    const newName = `${branchType.label} ${branch.mainAddress.subdistrict} ${newBranchNumber}`

    // Create branch object that has the same structure
    // as Branch Model Schema 
    const newBranch = {
      name: newName,
      address: branch.address,
      subdistrict: branch.mainAddress.subdistrict,
      district: branch.mainAddress.district,
      province: branch.mainAddress.province,
      zipcode: branch.mainAddress.zipcode,
      tel: branch.tel,
      dateStarted: branch.dateStarted,
      branchTypeId: branchType.value
    }
    
    console.log(newBranch)

    try {

      // Add new branch to the database
      const addBranch = await branchService.add(newBranch)
      console.log(addBranch)

      // Redirect to /admin after adding new branch is completed
      history.push("/admin")
    } catch (exception) {
      console.log(exception)
    }
  }

return (
  <div>
    <HeaderBar />
    <NavSideBar />
    <Label text="เพิ่มข้อมูลสาขา" isHide = {isDisabledTitle} />
    <Label text="ยืนยันการบันทึกข้อมูล" isHide = {!isDisabledTitle} />
    <br/>
    <Label text="ประเภทสาขา" />
    <Select
      value={branchType.value}
      name="branchType"
      options={branchTypes}
      onChange={handleBranchTypeChange}
      disabled={isDisabled}
    />
    <br/>
    <Label text="ที่อยู่สาขา" />
    <Input 
      type="text" 
      value={branch.address} 
      name="address"
      onChange={handleChange} 
      disabled={isDisabled} 
    />
    <br/>
    <SelectAddress 
      value={branch.mainAddress} 
      name="mainAddress" 
      options={thaiAddress} 
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      disabled={isDisabled} 
    />
    <br/>
    <Label text="เบอร์โทร" />
    <Input 
      type="text" 
      value={branch.tel} 
      name="tel"
      onChange={handleChange} 
      onKeyPress={handleKeyPress}
      disabled={isDisabled} 
    />
    <br/>
    <Label text="วันที่ก่อตั้ง" />
    <Input 
      type="date" 
      value={branch.dateStarted} 
      name="dateStarted"
      onChange={handleChange} 
      disabled={isDisabled} 
    />
    <br/>
    <Button type={'button'} text={'บันทึก'} isHide = {isDisabledButton} onClick = {handleClickToggle}  />
    <Button type={'button'} text={'แก้ไข'} isHide = {!isDisabledButton} onClick = {handleClickToggle} />
    <Button 
      type={'button'} 
      text={'ยืนยันการบันทึก'} 
      isHide = {isDisabledSubmit} 
      onClick={handleSubmit}
    />

  </div>
  )
}

export default AddBranch