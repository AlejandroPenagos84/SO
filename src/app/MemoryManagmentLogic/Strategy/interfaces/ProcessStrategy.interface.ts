import { UnitMemory } from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';
import { Process } from '@interfaces/Process.interface';
import { Program } from "@interfaces/Program.interface";

export interface ProcessContiguousStrategy{
    addProcess(newProgram: Program, memory: Process[], totalMemory: number): 
    {memory: Process[], added: boolean, newTotalMemory: number};

    removeProcess(idProcess: string, memory: Process[], totalMemory: number): 
    {memory: Process[], removed: boolean, newTotalMemory: number};
}

export interface ProcessDiscontiguousStrategy{
    addProcess(newProgram: Program, memory: UnitMemory[], totalMemory: number, offset:number): 
    {memory: UnitMemory[], added: boolean, newTotalMemory: number};

    removeProcess(idUnitMemory: string, memory: UnitMemory[], totalMemory: number): 
    {memory: UnitMemory[], removed: boolean, newTotalMemory: number};
}