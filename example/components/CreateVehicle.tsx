import { useState } from "react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  HelperText,
  Label,
  Select,
} from "@roketid/windmill-react-ui";
import { getVehicleRequest, postRequest, postVehicleRequest } from "api";

function CreateVehicle({ isModalOpen, closeModal, updateData }) {
  const [payload, setPayload] = useState({
    id: "",
    vehicleName: "",
    vehicleModel: "",
    vehicleType: "CAR",
    userID: "",
  });
  const route = useRouter();
  const handleChange = (e) => {
    setPayload((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log(payload);
    if (
      payload.vehicleName === "" ||
      payload.vehicleModel === "" ||
      payload.vehicleType === ""
    ) {
      alert(
        "None of the fields can be empty. Check to see all fields are filled."
      );
      return;
    }

    onSubmit();
  };

  const onSubmit = async () => {
    try {
      const payloadFull = {
        ...payload,
        id: Math.floor(Math.random() * 5 + 10),
        userID: JSON.parse(localStorage.getItem("userprofile"))?.id || null,
      };
      const result = await postVehicleRequest("/vehicles", payloadFull);
      console.log({ result });
      if (result?.status == 0) {
        alert(result?.message);
        return;
      }
      getVehicleRequest("/vehicles").then((res) => updateData(res));
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>Create Vehicle Information</ModalHeader>
      <ModalBody>
        <div className="w-full">
          <Label className="mb-3">
            <span>Vehicle Name</span>
            <Input
              className="mt-1"
              type="text"
              placeholder="Nissan"
              id="vehicleName"
              onChange={handleChange}
            />
          </Label>
          <Label className="mb-3">
            <span>Vehicle Model</span>
            <Input
              className="mt-1"
              type="text"
              id="vehicleModel"
              placeholder="V6 '06"
              onChange={handleChange}
            />
          </Label>
          <Label className="mb-4">
            <span>Vehicle Type</span>
            <Select id="vehicleType" className="mt-1" onChange={handleChange}>
              <option value="CAR">Car</option>
              <option value="TRUCK">Truck</option>
              <option value="MOTOCYCLE">Motocycle</option>
              <option value="SEDAN">Sedan</option>
            </Select>
          </Label>

          <Button block className="mt-4" onClick={handleSubmit}>
            Create Vehicle
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default CreateVehicle;
