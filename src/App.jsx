import React from "react";
import useDarkSide from "./config/useDarkMode";
import axios from 'axios'
import CustomizedSwitches from "./components/switcher";
import { useEffect, useState } from "react";
const App = () => {
  const [data, setData] = useState([]);
  const [theme, toggleTheme] = useDarkSide();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [addName, setAddName] = useState("")
  const [addSurname, setAddSurname] = useState("")
  const [addBio, setAddBio] = useState("")
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [addAge, setAddAge] = useState("")
  const [addStatus, setAddStatus] = useState(true)
  const [editName, setEditName] = useState("");
  const [editSurname, setEditSurname] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [idX, setIdX] = useState(null);
  const [infoName, setInfoName] = useState("")
  const [infoSurname, setInfoSurname] = useState("")
  const [infoBio, setInfoBio] = useState("")
  const [infoAge, setInfoAge] = useState("")
  const [infoStatus, setInfoStatus] = useState("")
  const api = "https://680167ea81c7e9fbcc427768.mockapi.io/tableUsers"
  async function get() {
    try {
      const { data } = await axios.get(api);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }
  function openAddFunc() {
    setOpenAdd(true);
  }
  async function addFunc() {
    let newObj = {
      name: addName,
      surname: addSurname,
      bio: addBio,
      age: addAge,
      status: addStatus == "true" ? "Active" : "Inactive"
    }
    try {
      await axios.post(api, newObj);
      get();
    } catch (error) {
      console.error(error);
    }
    setOpenAdd(false);
  }
  async function delFunc(id) {
    try {
      await axios.delete(`${api}/${id}`);
      get();
    } catch (error) {
      console.error(error);
    }
  }
  function showEdit(e) {
    setOpenEdit(true);
    setEditName(e.name)
    setEditSurname(e.surname)
    setEditBio(e.bio)
    setEditAge(e.age)
    setEditStatus(e.status)
    setIdX(e.id)
  }
  async function editFunc() {
    let updatedUser = {
      name: editName,
      surname: editSurname,
      bio: editBio,
      age: editAge,
      status: editStatus == "true" ? true : false
    }
    try {
      await axios.put(`${api}/${idX}`, updatedUser);
      get();
    } catch (error) {
      console.error(error);
    }
    setOpenEdit(false)
  }
  async function checkFunc(id) {
    try {
      let obj = data.map((e) => {
        if (e.id == id) {

          e.status = !e.status

        }
        return e;
      })
      let newww = obj.find((e) => e.id == id)
      await axios.put(`${api}/${id}`, newww);
      get();
    } catch (error) {
      console.error(error);
    }
  }
  async function showInfo(e) {
    setOpenInfo(true);
    setInfoName(e.name)
    setInfoSurname(e.surname)
    setInfoBio(e.bio)
    setInfoAge(e.age)
    setInfoStatus(e.status)
    setIdX(e.id)
  }
  function hideInfo() {
    setOpenInfo(false)
  }
  useEffect(() => {
    get()
  }, [])
  return (
    <div className="dark:bg-black">
      <div className="dark:bg-black pb-[50px] dark:text-white relative">
        {openAdd && (
          <>
            <div className="fixed inset-0 backdrop-blur-[5px] bg-black/30 z-40"></div>
            <div className="fixed z-50 top-[200px] left-1/2 transform -translate-x-1/2 dark:bg-gray-500 bg-white border border-gray-300 rounded-[10px] p-[20px] flex flex-col gap-[10px] w-[90%] sm:w-[60%] lg:w-[25%]">
              <h1 className="font-bold">Add Modal</h1>
              <div className="flex flex-col gap-[5px]">
                <input value={addName} onChange={(e) => setAddName(e.target.value)} type="text" placeholder="Name..." className="border border-gray-300 p-[5px] rounded-[5px]" />
                <input value={addSurname} onChange={(e) => setAddSurname(e.target.value)} type="text" placeholder="Surname..." className="border border-gray-300 p-[5px] rounded-[5px]" />
                <input value={addBio} onChange={(e) => setAddBio(e.target.value)} type="text" placeholder="Bio..." className="border border-gray-300 p-[5px] rounded-[5px]" />
                <input value={addAge} onChange={(e) => setAddAge(e.target.value)} type="number" placeholder="Age..." className="border border-gray-300 p-[5px] rounded-[5px]" />
                <select value={addStatus} onChange={(e) => setAddStatus(e.target.value)} name="status" className="border rounded-[5px] border-gray-300 p-[7px]">
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                <button onClick={() => addFunc()} className="bg-blue-500 py-[5px] text-white rounded-[5px] px-[10px]">Save</button>
              </div>
            </div>
          </>
        )}
        {openEdit && (
          <>
            <div className="fixed inset-0 backdrop-blur-[5px] bg-black/30 z-40"></div>
            <div className="fixed z-50 top-[200px] left-1/2 transform -translate-x-1/2 dark:bg-gray-500 bg-white border border-gray-300 rounded-[10px] p-[20px] flex flex-col gap-[10px] w-[90%] sm:w-[60%] lg:w-[25%]">
              <h1 className="font-bold">Edit Modal</h1>
              <div className="flex flex-col gap-[5px]">
                <input value={editName} onChange={(e) => setEditName(e.target.value)} type="text" placeholder="Name..." className="border border-gray-300 p-[5px] rounded-[5px]" />
                <input value={editSurname} onChange={(e) => setEditSurname(e.target.value)} type="text" placeholder="Surname..." className="border border-gray-300 p-[5px] rounded-[5px]" />
                <input value={editBio} onChange={(e) => setEditBio(e.target.value)} type="text" placeholder="Bio..." className="border border-gray-300 p-[5px] rounded-[5px]" />
                <input value={editAge} onChange={(e) => setEditAge(e.target.value)} type="number" placeholder="Age..." className="border border-gray-300 p-[5px] rounded-[5px]" />
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} name="status" className="border rounded-[5px] border-gray-300 p-[7px]">
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                <button onClick={() => editFunc()} className="bg-blue-500 py-[5px] text-white rounded-[5px] px-[10px]">Save</button>
              </div>
            </div>
          </>
        )}
        {openInfo && (
          <>
            <div className="fixed inset-0 backdrop-blur-[5px] bg-black/30 z-40"></div>
            <div className="fixed z-50 top-[200px] left-1/2 transform -translate-x-1/2 dark:bg-gray-500 bg-white border border-gray-300 rounded-[10px] p-[20px] flex flex-col gap-[10px] w-[90%] sm:w-[60%] lg:w-[25%]">
              <h1 className="font-bold">Info Modal</h1>
              <div className="flex flex-col gap-[5px]">
                <button className="border border-gray-300 bg-gray-200 font-bold dark:bg-gray-400 p-[5px] rounded-[5px]" >{infoName}</button>
                <button className="border border-gray-300 bg-gray-200 font-bold dark:bg-gray-400 p-[5px] rounded-[5px]" >{infoSurname}</button>
                <textarea className="border border-gray-300 bg-gray-200 h-[200px] font-bold dark:bg-gray-400 p-[5px] rounded-[5px]" name="" id="">{infoBio}</textarea>
                <button className="border border-gray-300 bg-gray-200 font-bold dark:bg-gray-400 p-[5px] rounded-[5px]" >{infoAge} Years old</button>
                <button className="border border-gray-300 bg-gray-200 font-bold dark:bg-gray-400 p-[5px] rounded-[5px]" >{infoStatus ? "Active" : "Inactive"}</button>
                <button onClick={hideInfo} className="border border-red-500 bg-white text-red-500 font-bold dark:bg-red-500 dark:text-white p-[5px] rounded-[5px]" >Cancel</button>
              </div>
            </div>
          </>
        )}
        <div className="flex pt-[20px] lg:justify-between gap-[5px] lg:flex-row flex-col px-[20px] lg:px-[155px] lg:items-center">
          <CustomizedSwitches toggleTheme={toggleTheme} />
          <div className="flex lg:flex-row flex-col gap-[10px] lg:gap-[5px] lg:items-center">
            <button onClick={() => openAddFunc()} className="bg-blue-500 py-[5px] text-white rounded-[5px] px-[10px]">New</button>
            <input className="border border-gray-300 px-[10px] py-[5px] rounded-[5px] bg-gray-100 dark:bg-gray-500" value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search..." />
            <select className="border border-gray-300 px-[10px] py-[6px] rounded-[5px] bg-gray-100 dark:bg-gray-500" value={select} onChange={(e) => setSelect(e.target.value)} name="" id="">
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
        <div className="mt-[40px]">
          <h1 className="text-center text-[25px] font-bold">Users</h1>
          <div className="flex flex-wrap justify-center lg:flex-row gap-[20px] mt-[20px] lg:px-[0px] px-[20px] flex-col">
            {data
              .filter((e) => e.name.toLowerCase().trim().includes(search.toLowerCase().trim()))
              .filter((e) => e.status.toString().includes(select))
              .map((e) => {
                return (
                  <article className="dark:bg-gray-500 bg-blue-300 text-white flex flex-col w-[100%] lg:w-[30%] items-start py-[20px] rounded-[10px] px-[20px] lg:px-[30px] gap-[20px]" key={e.id}>
                    <div className="flex gap-[5px] items-center font-bold">
                      <h1 className="text-[22px] lg:text-[25px]">{e.name}</h1>
                      <h1 className="text-[14px] relative top-[2px] lg:top-[3px] lg:text-[14px]">{e.surname}</h1>
                    </div>
                    <div className="flex flex-col gap-[5px]">
                      <b>Age: {e.age} years old</b>
                      <p className="text-[16px] text-gray-100">{e.bio}</p>
                    </div>
                    <button className={`bg-white border border-dashed rounded-[5px] py-[1px] px-[10px] ${e.status ? "border-green-500 text-green-500" : "bg-red-500 text-red-500"}`}>{e.status ? "Active" : "Inactive"}</button>
                    <div className="flex items-center gap-[5px]">
                      <button onClick={() => delFunc(e.id)} className="bg-red-500 text-white py-[1px] px-[10px] rounded-[5px]">Delete</button>
                      <button onClick={() => showEdit(e)} className="bg-orange-500 text-white py-[1px] px-[10px] rounded-[5px]">Edit</button>
                      <button onClick={() => checkFunc(e.id)} className="bg-green-500 text-white py-[1px] px-[10px] rounded-[5px]">Check</button>
                      <button onClick={() => showInfo(e)} className="bg-gray-300 text-white py-[1px] px-[10px] rounded-[5px]">Info</button>
                    </div>
                  </article>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;