import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosinstace";
import Toast from "../../components/ToastMessage/toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/images/add-notes-icon_933463-109914.jpg"

const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [showToastMessage, setShowToastMessage] = useState({
        isShown: false,
        message: "",
        type: "add",
    });

    const [allNotes, setAllNotes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
    };

    const showToastMsg = (message, type) => {
        setShowToastMessage({
            isShown: true,
            message,
            type
        })
    };

    const handleCloseToast = () => {
        setShowToastMessage({
            isShown: false,
            message: "",
        })
    };
 
    // Get User Info 
    const getUserInfo = async () => {
        try{
           const response = await axiosInstance.get("/get-user");
           if(response.data && response.data.user){
            setUserInfo(response.data.user);
           }
        }catch(error){
            if(error.response.status === 401){
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    // Get all notes
    const getAllNotes = async () => {
        try{
           const response = await axiosInstance.get("/get-all-notes");
           if(response.data && response.data.notes){
            setAllNotes(response.data.notes);
           }
        }catch(error){
            console.log("An unexpected error occured. Please try again.");
        }
    }

    // Delete Note 
    const deleteNote = async (data) => {
        const noteId = data._id
        try{
            const response = await axiosInstance.delete("/delete-note/" + noteId);
            if(response.data && !response.data.error){ 
                getAllNotes();
            }
         }catch(error){
             if(error.response && error.response.data && error.response.data.message){
                console.log("An unexpected error occured. Please try again.");
             }
         }
    }

    // Search Bar 
    const onSearchNote = async (query) => {
        try{
           const response = await axiosInstance.get("/search-notes", {
            params: { query }
           });
           if(response.data && response.data.notes){
            setIsSearch(true),
            setAllNotes(response.data.notes);
           }
        }catch(error){
            console.log(error);
        }
    }

    // Pinned Note
    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id
        const newIsPinned = !noteData.isPinned;
        
        console.log("Changing isPinned to:", newIsPinned);
        
        try {
            const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
                isPinned: newIsPinned,
            });
            
            if (response.data && response.data.note) {
                showToastMessage("Note Updated Successfully");
                getAllNotes();
            } else {
                console.log("Failed to update note:", response.data);
            }
        } catch (error) {
            console.log("Error while updating note:", error);
        }
    };

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    }

    useEffect(() => {
        getAllNotes();
        getUserInfo();
        return () => {};
    }, [])

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
            <div className="container mx-auto">
                {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8">
                    {allNotes.map((item, index) => (
                        <NoteCard key={item._id} title={item.title} date={item.createdOn} content={item.content} tags={item.tags} isPinned={item.isPinned} onEdit={() => handleEdit(item)} onDelete={() => deleteNote(item)} onPinNote={() => updateIsPinned(item)} />
                    ))}
                
                </div> : <EmptyCard imgSrc={AddNotesImg} message={`Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`}/>}
            </div>
            <button className="w-16 h-16 flex items-center justify-center rounded 2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {
                setOpenAddEditModal({isShown: true, type: "add", data: null});
            }}>
                <MdAdd className="text-[32px] text-white"    />
            </button>
            <Modal isOpen={openAddEditModal.isShown} onRequestClose={() => {}} style={{overlay: {backgroundColor: "rgba(0,0,0,0.2", },}} contentLabel="" className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">
            <AddEditNotes onClose={() => setOpenAddEditModal({isShown: false, type: "add", data: null})} getAllNotes={getAllNotes} type={openAddEditModal.type} noteData={openAddEditModal.data} showToastMessage={showToastMsg}/>
            </Modal>
            <Toast isShown={showToastMessage.isShown} message={showToastMessage.message} type={showToastMessage.type} onClose={handleCloseToast}/>
        </>
    )
}

export default Home;
