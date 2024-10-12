import { Process } from "@interfaces/Process.interface";
import { create_empty_process, create_empty_unit_memory, MEGABYTE, TOTAL } from "./Strategy/common/common_variables";
import { UnitMemory } from "@app/MemoryManagmentLogic/interfaces/UnitMemory.interface";

export const static_memory = (num_mega_bytes: number): [Process[],number[]] => {
    const num_partitions: number = Math.floor(15/num_mega_bytes); // Numero de particiones
    const array: number[] = Array(num_partitions).fill(num_mega_bytes); // Numero de la particion
    const bases: number[] = create_array_bases(array,MEGABYTE,MEGABYTE);
    const memory: Process[] = create_memory(bases,array);

    return [memory, array];
}

export const variable_memory = (): [Process[], number[]] => {
    const array: number[] = [0.5,0.5,1,1,2,2,4,4];
    const bases: number[] = create_array_bases(array, MEGABYTE,MEGABYTE);
    const memory : Process[] = create_memory(bases, array);
    return [memory, array];
}

export const dynamic_no_compaction = () : Process[] =>{
    return [create_empty_process(MEGABYTE,TOTAL-MEGABYTE,0)];
}

export const segmentation_memory = (): UnitMemory[] =>{
    return [create_empty_unit_memory(MEGABYTE,TOTAL-MEGABYTE,0)];
}

export const paging_memory = (pagingBits: number): [UnitMemory[],number[]] => {
    const array: number[] = Array(Math.pow(2, pagingBits)).fill(Math.pow(2, 24 - pagingBits)); // Numero de la particion
    const bases: number[] = create_array_bases(array,1,0);
    const memory: UnitMemory[] = create_memory_paging(bases,array);

    return [memory, array];
}

const create_array_bases = (array: number[], product: number, initialValue: number): number[] =>{
    const bases: number[] = [];
    let sum: number = initialValue;

    for(let i: number = 0; i < array.length; i++){
        bases[i] = sum;
        sum+=array[i]*product; // LLenar las bases
    }

    return bases;
}

const create_memory = (bases: number[], array: number[])=>{
    return bases.map((base, index)=>{
        return create_empty_process(base, array[index]*MEGABYTE, index);
    })
}


const create_memory_paging = (bases: number[], array: number[])=>{
    return bases.map((base, index)=>{
        return create_empty_unit_memory(base, array[index], index);
    })
}