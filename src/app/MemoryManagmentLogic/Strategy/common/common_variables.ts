import { UnitMemory } from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';
import { Process } from '@interfaces/Process.interface';
import { Program } from "@interfaces/Program.interface";
import { getRandomInt } from "@memory-logic/Strategy/util/util_functions";

// Aqui agrego las variables que se usan en varias partes del programa y también aquellas funciones que solo sirven para
// crear un objeto

export const HEAP: number = 131072;
export const STACK: number = 65536;
export const TOTAL: number = 16777216;
export const MEGABYTE: number = 1048576;
// Funcion para crear un proceso vacio
export const create_process = (
  newProgram: Program,
  memory_process: number,
  base: number,
  name: string
): Process => {
  return {
    ...newProgram,
    id: name + getRandomInt(100001).toString(),
    heap: HEAP,
    stack: STACK,
    base: base,
    memory: memory_process,
  };
};

// Funcion para crear un proceso vacio
export const create_empty_process = (
  base: number,
  memory: number,
  key: number
): Process => {
  return {
    heap: 0,
    stack: 0,
    id: "0",
    key: key,
    name: "0",
    bss: 0,
    data: 0,
    txt: 0,
    memory: memory,
    base: base,
  };
};


export const create_unit_memory = (
  id: string,
  memory_unit_memory: number,
  base: number,
  name: string,
  permits: string
): UnitMemory =>{
  return {
    id: id,
    key: getRandomInt(100000),
    name: name,
    base: base,
    memory: memory_unit_memory,
    permits: permits
  };
}

export const create_empty_unit_memory = (
  base: number,
  memory: number,
  key: number
): UnitMemory => {
  return{
    id: '0',
    key: key,
    name: '0',
    base: base,
    memory: memory,
    permits: ''
  }
}