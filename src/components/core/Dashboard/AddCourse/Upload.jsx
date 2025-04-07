import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import {Player} from "video-react"
import "video-react/dist/video-react.css"; 

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video= false,
  viewData = null,
  editData = null,
}) => {

  // const {course} = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null) //selectedFile: Holds the file selected by the user.

  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  ) //previewSource: Stores the data URL of the file for preview. Initially set based on viewData or editData.

  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    console.log("Accepted Files:", acceptedFiles);
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  // The useDropzone hook is used to handle drag-and-drop or browse-based file selection
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    //Dynamically styled based on the drag state (isDragActive)
    accept : !video
    ? { "image/*": [".jpeg", ".jpg", ".png"] }
    : { "video/*": [".mp4"] },
    onDrop, //onDrop:Triggered when a file is dropped or selected.The first file (acceptedFiles[0]) is passed to the previewFile function.Updates the selectedFile state with the file.
  })


  // Reads the selected file as a Data URL using the FileReader API.
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      console.log("File Preview:", reader.result); 
      setPreviewSource(reader.result) //Updates the previewSource state with the file preview.
    }
    reader.onerror = () => {
      console.error("File could not be read!");
    };
  }

  useEffect(() => {
    register(name, {required :true})
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue, name]) //Updates the form field value whenever the selectedFile state changes.

  return (
    <div className='flex flex-col space-y-2'>

      <label htmlFor={name} className="text-sm text-richblack-5">
        {label} {!viewData && <sup className='text-pink-200'>*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {/* <input {...getInputProps()} ref={inputRef} /> */}
        { ////When a file is selected (previewSource is truthy)
          previewSource ? (
            <div className="flex w-full flex-col p-6">
              { 
                !video 
                ? (
                  <img src={previewSource} alt="Preview" style={{ maxWidth: "100%" }} className='h-full w-full rounded-md object-cover'/> //Image Preview: Renders an <img> tag with the preview
                ) 
                : (
                  <Player aspectRatio = "16:9" playsInline src={previewSource} /> //Video Preview: Renders a Player from the video-react library
                )
              }
              {
                !viewData && (
                  <button 
                    type='button'
                    // Resets the preview, selected file, and form value
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log("Cancel button clicked");
                      
                      setPreviewSource("")
                      setSelectedFile(null)
                      setValue(name, null)
                    }}
                    className='mt-3 text-richblack-400 underline'
                  >
                    cancel
                  </button> //If not in viewData mode, a "Cancel" button allows resetting the preview and selected file.
                )
              }
            </div>
          ) 
          //When no file is selected (previewSource is falsy)
          : ( //Renders the drag-and-drop area using useDropzone
            <div 
              className='flex w-full flex-col items-center p-6'
              {...getRootProps()}
            >
              <input {...getInputProps()} ref={inputRef}/>
              <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                <FiUploadCloud className = "text-2xl text-yellow-50" />
              </div>
              
              <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                  {/* Accepts image/* files by default or video/* files when video is true. */}
                  Drag and Drop an { !video ? "image" : "video"}, or click to {" "} 
                  <span className="font-semibold text-yellow-50">Browse</span> a file 
              </p>
              <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>

            </div>
          )
        }

      </div>
      {
        errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )
      }
      
    </div>
  )
}

export default Upload
