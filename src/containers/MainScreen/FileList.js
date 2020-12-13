import React from 'react';
import FileListItem from '../../componenets/FileListItem';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '124px',
  },
});

const FileList = ({ userId, files, onOpen, tree }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {files.map((file) => {
        return (
          <FileListItem
            key={file.id}
            tree={tree}
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
