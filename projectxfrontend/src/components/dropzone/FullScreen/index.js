import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import _ from "lodash";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const getFiles = (acceptedFiles) => {
  return acceptedFiles.map((file) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
  );
};

function Previews(props) {
  const initialFiles = props.initialFiles ? props.initialFiles : [];
  const [files, setFiles] = useState(initialFiles);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      let files = _.slice(acceptedFiles, 0, props.maxFilesNumber);
      setFiles(getFiles(files));
      props.update(getFiles(files));
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt={file.name} src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks unless in the
      //state where the user is redirected tologin and come back to submit
      if (props.revokeOnNavigation) {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      }
    },
    [files]
  );

  return (
    <div className="dropzone-card" style={{ borderStyle: "dotted" }}>
      <div className="dropzone">
        <div {...getRootProps({ className: "dropzone-file-btn" })}>
          <input {...getInputProps()} />
          <p>{props.label}</p>
        </div>
      </div>
      <div className="dropzone-content" style={thumbsContainer}>
        {thumbs}
      </div>
    </div>
  );
}

export default Previews;
