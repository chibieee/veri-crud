import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Modal } from '../ItemModal/ItemModal';
import "./ShoppingList.scss";

export default function ShoppingList() {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const openModal = () => {
    setModalDisplay(true);
  }

  const modalAdd = () => {
    setModalTitle("Add");
  }

  const modalEdit = () => {
    setModalTitle("Edit");
  }

  const closeModal = () => {
    setModalDisplay(false);
  }

  return (
    <div className="list-container">
        <div className="list-container-header">
            <h2>Your Items</h2>
            <button onClick={() => {
              openModal()
              modalAdd()
            }}>
              Add Item
            </button>
        </div>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
            <ListItem
                key={value}
                secondaryAction={
                  <>
                <IconButton edge="end" aria-label="edit">
                    <EditIcon onClick={() => {
                      openModal()
                      modalEdit()
                    }} />
                </IconButton>
                <IconButton className="delete" edge="end" aria-label="delete">
                    <DeleteOutlineIcon />
                </IconButton>
                </>
                }
                disablePadding
            >
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                    <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
        {modalDisplay && <Modal modalTitle={modalTitle} closeModal={closeModal} />}
    </div>
  );
}