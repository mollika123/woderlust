"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  Input,
  TextArea,
  
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";

export default function EditModal({ destination }) {
  const [open, setOpen] = useState(false);

  const {
    _id,
    destinationName,
    country,
    price,
    duration,
    imageUrl,
    description,
  } = destination;

  // FORM SUBMIT
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    console.log("Updated Data:", updatedData);

    const res = await fetch(
      `http://localhost:5000/destination/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    const data = await res.json();
    console.log("Server response:", data);

    setOpen(false);
  };

  return (
    <>
      {/* OPEN BUTTON */}
      <Button
        onPress={() => setOpen(true)}
        className="rounded-none"
        variant="outline"
      >
        <BiEdit /> Edit
      </Button>

      {/* MODAL */}
      <Modal isOpen={open} onOpenChange={setOpen}>
        <Modal.Content>
          {(onClose) => (
            <>
              <Modal.Header>Edit Destination</Modal.Header>

              <Modal.Body>
                <form onSubmit={onSubmit} className="space-y-4">

                  <Input
                    name="destinationName"
                    defaultValue={destinationName}
                    placeholder="Destination Name"
                  />

                  <Input
                    name="country"
                    defaultValue={country}
                    placeholder="Country"
                  />

                  <Input
                    name="price"
                    defaultValue={price}
                    type="number"
                    placeholder="Price"
                  />

                  <Input
                    name="duration"
                    defaultValue={duration}
                    placeholder="Duration"
                  />

                  <Input
                    name="imageUrl"
                    defaultValue={imageUrl}
                    placeholder="Image URL"
                  />

                  <TextArea
                    name="description"
                    defaultValue={description}
                    placeholder="Description"
                  />

                  <Button type="submit" className="w-full bg-cyan-500 text-white">
                    Save Changes
                  </Button>

                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onPress={onClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Content>
      </Modal>
    </>
  );
}