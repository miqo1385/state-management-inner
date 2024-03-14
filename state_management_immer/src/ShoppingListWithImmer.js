import React, { useState } from 'react';
import produce from 'immer';
import { useImmer } from 'use-immer';

function ShoppingListWithImmer() {
    const [shoppingList, updateShoppingList] = useImmer([
        { id: 1, name: 'Apples', quantity: 5, details: { category: 'Fruits', notes: 'Buy organic' } },
        { id: 2, name: 'Bread', quantity: 2, details: { category: 'Bakery', notes: 'Whole grain' } },
    ]);

    const addItem = newItem => {
        updateShoppingList(draft => {
            draft.push(newItem);
        });
    };

    const updateItem = (id, updatedItem) => {
        updateShoppingList(draft => {
            const index = draft.findIndex(item => item.id === id);
            if (index !== -1) {
                draft[index] = { ...draft[index], ...updatedItem };
            }
        });
    };

    const removeItem = id => {
        updateShoppingList(draft => {
            const index = draft.findIndex(item => item.id === id);
            if (index !== -1) {
                draft.splice(index, 1);
            }
        });
    };

    return (
        <div>
            <h2>Shopping List</h2>
            <ul>
                {shoppingList.map(item => (
                    <li key={item.id}>
                        <div>Name: {item.name}</div>
                        <div>Quantity: {item.quantity}</div>
                        <div>Category: {item.details.category}</div>
                        <div>Notes: {item.details.notes}</div>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <hr />
            <h3>Add New Item</h3>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    const name = e.target.elements.name.value;
                    const quantity = parseInt(e.target.elements.quantity.value);
                    const category = e.target.elements.category.value;
                    const notes = e.target.elements.notes.value;
                    addItem({
                        id: Date.now(),
                        name,
                        quantity,
                        details: {
                            category,
                            notes,
                        },
                    });
                    e.target.reset();
                }}
            >
                <input type="text" name="name" placeholder="Name" required />
                <input type="number" name="quantity" placeholder="Quantity" required />
                <input type="text" name="category" placeholder="Category" />
                <input type="text" name="notes" placeholder="Notes" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default ShoppingListWithImmer;
