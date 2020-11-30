import React from 'react';
import FileListItem from '../../componenets/FileListItem';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
    minHeight: '200px',
  },
});

const FileList = ({ userId, files, onOpen }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      {files.map((file) => {
        return (
          <FileListItem
            key={file.id}
            id={file.id}
            file={file}
            name={file.name}
            type={file.type}
            isOwner={file.owners ? file.owners.includes(userId) : null}
            onClick={() => onOpen(file.type, file.id)}
          />
        );
      })}
    </div>
  );
};

export default FileList;
