import { View, Text, Button, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import CarRepository, { Car } from "../src/database/CarRepository";

const repository = new CarRepository();

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchModel, setSearchModel] = useState("");

  const create = async () => {
    const id = await repository.create({
      brand: "VW",
      model: "Fusca",
      hp: Math.floor(Math.random() * 100),
    });
    console.log("Created: ", id);

    await all();
  };

  const all = async () => {
    const cars = await repository.all();
    setCars(cars);

    console.log(cars);
  };

  const deleteById = async (id: number) => {
    await repository.deleteById(id);
    console.log("Carro deletado");
    await all();
  };

  const searchByModel = async () => {

      const cars = await repository.findByModel(searchModel);
      setCars(cars);
      console.log(cars);

  };

  const getRandomBrand = () => {
    const brands = ["VW", "Toyota", "Ford", "BMW", "Audi"];
    return brands[Math.floor(Math.random() * brands.length)];
  };

  const getRandomModel = () => {
    const models = ["Model X", "Model S", "Corolla", "Civic", "Mustang"];
    return models[Math.floor(Math.random() * models.length)];
  };

  const updateCar = async (id: number) => {
    const updatedCar: Car = {
      id,
      brand: getRandomBrand(),
      model: getRandomModel(),
      hp: Math.floor(Math.random() * 100),
    };
    await repository.update(updatedCar);
    console.log("Carro atualizado");
    await all();
  };

  useEffect(() => {
    all();
  }, []);

  return (
    <View>
      <Button onPress={create} title="create" />
      <Button onPress={all} title="all" />

      <TextInput
        placeholder="Search by model"
        value={searchModel}
        onChangeText={setSearchModel}
        style={{ borderWidth: 1, padding: 5, marginVertical: 10 }}
      />
      <Button onPress={searchByModel} title="Search" />

      {cars.map((car) => (
        <View key={car.id} style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
          <Text>{car.id} - </Text>
          <Text>
            {car.brand} {car.model} {car.hp}
          </Text>
          <Button title="Deletar" onPress={() => deleteById(car.id)} />
          <Button title="Atualizar" onPress={() => updateCar(car.id)} />
        </View>
      ))}
    </View>
  );
}
