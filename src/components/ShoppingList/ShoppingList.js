import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ShoppingItemsService from '../../services/firebaseService';
import { Modal } from '../ItemModal/ItemModal';
import "./ShoppingList.scss";

export default function ShoppingList() {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalId, setModalId] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [items, setItems] = useState([]);

  const handleToggle = async (value, idx) => {
   const updatedItem = {
    title: value.title,
    description: value.description,
    amount: value.amount,
    completed: value.completed ? false : true,
    }
    try {
        await ShoppingItemsService.updateItem(value.id, updatedItem);
    } catch(err) {
        console.log(err);
    }
    getItems();
  };

  const openModal = (id) => {
    setModalId(id);
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
    setIsDeleting(false);
    getItems();
  }

  const modalDeleting = () => {
    setIsDeleting(true);
  }

  const handleDelete = async (id) => {
    await ShoppingItemsService.deleteItem(id);
    closeModal();
    getItems();
  }

  const getItems = async () => {
    const data = await ShoppingItemsService.getAllItems();
    setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getItems();
  }, [])

  return (
    <div className="list-container">
        {items.length > 0 &&
        <>
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
        {items.map((value, idx) => {
            const labelId = `checkbox-list-label-${value.id}`;

            return (
            <ListItem
                className={value.completed ? 'completed' : ''}
                key={value.id}
                secondaryAction={
                  <>
                <IconButton 
                  edge="end"
                  aria-label="edit" 
                  onClick={() => {
                    openModal(value.id)
                    modalEdit()
                  }}>
                    <EditIcon />
                </IconButton>
                <IconButton
                  className="delete"
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    modalDeleting();
                    openModal(value.id);
                  }}
                >
                    <DeleteOutlineIcon />
                </IconButton>
                </>
                }
                disablePadding
            >
                <ListItemButton
                  role={undefined}
                  onClick={() => {
                    handleToggle(value, idx)
                  }}
                  dense
                >
                <ListItemIcon>
                    <Checkbox
                    edge="start"
                    checked={value.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value.title}`} secondary={`${value.description}`}/>
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
        </>
        }
        {items.length === 0 && 
          <div className="noitems-container">
              <div className="inner-container">
                <h3>Your shopping list is empty :(</h3>
                <button onClick={() => {
                  openModal()
                  modalAdd()
                }}>
                  Add your first item
                </button>
              </div>
          </div>
        }
        {modalDisplay && <Modal modalId={modalId} modalTitle={modalTitle} closeModal={closeModal} isDeleting={isDeleting} handleDelete={handleDelete} />}
    </div>
  );
}