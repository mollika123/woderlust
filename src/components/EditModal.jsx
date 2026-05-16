"use client";

import { useState } from "react";
import { Button, Modal, Input, TextArea, TextField, Label, FieldError, ListBox,Select } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";

const EditModal = ({ destination }) => {
  const [open, setOpen] = useState(false);

  const { _id, destinationName, country, price, duration, imageUrl, description,category,departureDate } = destination;

  // FORM SUBMIT
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    console.log("Updated Data:", updatedData);

    const res = await fetch(`http://localhost:5000/destination/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    console.log("Server response:", data);

    setOpen(false);
  };

  return (
    <Modal isOpen={open} onOpenChange={setOpen} className="w-11/12 mx-auto">
      <Modal.Trigger>
        <Button className=" flex py-3 px-5 items-center gap-2 text-white justify-center bg-purple-500 rounded-full" variant="outline">
          <BiEdit /> Edit
        </Button>
      </Modal.Trigger>
      <Modal.Container placement="center">
        <Modal.Dialog>
          {({ close }) => (
            <>
              <Modal.Header className="text-2xl text-center mt-20">Edit Destination</Modal.Header>

              <Modal.Body>
                {/* <form onSubmit={onSubmit} className="space-y-4">
                  <Input
                    name="destinationName"
                    defaultValue={destinationName}
                    placeholder="Destination Name"
                  />

                  <Input name="country" defaultValue={country} placeholder="Country" />

                  <Input name="price" defaultValue={price} type="number" placeholder="Price" />

                  <Input name="duration" defaultValue={duration} placeholder="Duration" />

                  <Input name="imageUrl" defaultValue={imageUrl} placeholder="Image URL" />

                  <TextArea
                    name="description"
                    defaultValue={description}
                    placeholder="Description"
                  />

                  <Button type="submit" className="w-full bg-cyan-500 text-white">
                    Save Changes
                  </Button>
                </form> */}


                  <form onSubmit={onSubmit}
                            className="p-10 space-y-6 w-1/2 mx-auto shadow-2xl py-12 my-12"
                >
                <IoCloseSharp onClick={close} className="bg-red-500 rounded-3xl flex flex-end " />
                  
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {/* Destination Name */}
                              <div className="md:col-span-2">
                                <TextField name="destinationName" isRequired defaultValue={destinationName}>
                                  <Label>Destination Name</Label>
                                  <Input placeholder="Bali Paradise" className="bg-gray-200" />
                                  <FieldError />
                                </TextField>
                              </div>
                
                              {/* Country */}
                              <TextField name="country" isRequired defaultValue={country}>
                                <Label>Country</Label>
                                <Input placeholder="Indonesia" className="bg-gray-200" />
                                <FieldError />
                              </TextField>
                
                              {/* Category - Updated Select Component */}
                              <div className="flex gap-2 items-center">
                                <Select
                                  name="category"
                                  isRequired
                                  className="w-full gap-2 items-center " defaultValue={category}
                                  placeholder="Select category"
                                >
                                  <Label >Category</Label>
                                  <Select.Trigger className="rounded-2xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                  </Select.Trigger>
                                  <Select.Popover className="p-1 bg-gray-300 ">
                                    <ListBox>
                                      <ListBox.Item id="Beach" textValue="Beach"   className="px-0 py-0 min-h-0 rounded-lg">
                                        Beach
                                        {/* <ListBox.ItemIndicator /> */}
                                      </ListBox.Item>
                                      <ListBox.Item id="Mountain" textValue="Mountain"   className="px-0 py-0 min-h-0 rounded-lg">
                                        Mountain
                                        {/* <ListBox.ItemIndicator /> */}
                                      </ListBox.Item>
                                      <ListBox.Item id="City" textValue="City"  className="px-3 py-2 min-h-0 rounded-lg">
                                        City
                                        {/* <ListBox.ItemIndicator /> */}
                                      </ListBox.Item>
                                      <ListBox.Item id="Adventure" textValue="Adventure"  className="px-0 py-0 min-h-0 rounded-lg">
                                        Adventure
                                        {/* <ListBox.ItemIndicator /> */}
                                      </ListBox.Item>
                                      <ListBox.Item id="Cultural" textValue="Cultural"  className="px-0 py-0 min-h-0 rounded-lg">
                                        Cultural
                                        {/* <ListBox.ItemIndicator /> */}
                                      </ListBox.Item>
                                      <ListBox.Item id="Luxury" textValue="Luxury"  className="px-0 py-0 min-h-0 rounded-lg">
                                        Luxury
                                        <ListBox.ItemIndicator />
                                      </ListBox.Item>
                                    </ListBox>
                                  </Select.Popover>
                                </Select>
                              </div>
                
                              {/* Price */}
                              <TextField name="price" type="number" isRequired defaultValue={price}>
                                <Label>Price (USD)</Label>
                                <Input
                                  type="number"
                                  placeholder="1299"
                                  className="bg-gray-200"
                                />
                                <FieldError />
                              </TextField>
                
                              {/* Duration */}
                              <TextField name="duration" isRequired defaultValue={duration}>
                                <Label>Duration</Label>
                                <Input
                                  placeholder="7 Days / 6 Nights"
                                  className="bg-gray-200"
                                />
                                <FieldError />
                              </TextField>
                
                              {/* Departure Date */}
                              <div className="md:col-span-2">
                                <TextField name="departureDate" type="date" isRequired defaultValue={departureDate}>
                                  <Label>Departure Date</Label>
                                  <Input type="date" className="bg-gray-200" />
                                  <FieldError />
                                </TextField>
                              </div>
                
                              {/* Image URL - Removed preview */}
                              <div className="md:col-span-2">
                                <TextField name="imageUrl" isRequired defaultValue={imageUrl}>
                                  <Label>Image URL</Label>
                                  <Input
                                    type="url"
                                    placeholder="https://example.com/bali-paradise.jpg"
                                    className="bg-gray-200"
                                  />
                                  <FieldError />
                                </TextField>
                              </div>
                
                              {/* Description */}
                              <div className="md:col-span-2 gap-2">
                                <TextField name="description" isRequired defaultValue={description}>
                                  <Label>Description</Label>
                                  <TextArea
                                    placeholder="Describe the travel experience..."
                                    className="bg-gray-200"
                                  />
                                  <FieldError />
                                </TextField>
                              </div>
                            </div>
                
                            {/* Buttons */}
                
                        
                  <Modal.Footer className="flex justify-between">
                        <Button type="submit"
                              variant="outline"
                             
                              className=" bg-cyan-500 text-white px-5 py-3 rounded-2xl"
                            >
                              Save
                    </Button>
                    <div></div>
              
              </Modal.Footer>
                </form>
                
              </Modal.Body>

            
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
};

export default EditModal;
