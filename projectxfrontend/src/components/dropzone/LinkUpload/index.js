import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import _ from "lodash";
import IntlMessages from "util/IntlMessages";


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
    <div className="dropzone-card" style={{ borderStyle: "none" }}>
      <div>
        <div {...getRootProps({ className: "dropzone-file-btn" })}>
          <input {...getInputProps()} />
          <a href="javascript:void(0)"><IntlMessages id="component.link.upload" /> </a>
        </div>
      </div>
    </div>
  );
}

export default Previews;
