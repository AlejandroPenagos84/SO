import {UnitMemory} from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';
import { Program } from "@interfaces/Program.interface";
import { ProcessDiscontiguousStrategy } from "@memory-logic/Strategy//interfaces/ProcessStrategy.interface";

/**
 * Clase que maneja las particiones discontiguas 
 */
// Clase Context
export class MemoryManagamentDiscontiguous {

  private processStrategy!: ProcessDiscontiguousStrategy;
  private memory!: UnitMemory[];
  private totalMemory!: number;
  private offSet!: number;
  private numberPagingArray: number[] = [];

  public setInitialMemory(memory: UnitMemory[]){
    this.memory = memory;
  }

  public setOffset(segmentBits: number){
    this.offSet = 24 - segmentBits;
  }

  get Memory(): UnitMemory[]{
    if(this.memory === undefined) return []
    else return [...this.memory];
  }

  get total_Memory(): number{
    return this.totalMemory;
  }

  setTotalMemory(newMemory: number): void{
    this.totalMemory = newMemory;
  }

  // Inyeccion por setters.
  public setStrategies(
    processStrategy: ProcessDiscontiguousStrategy
  ) : void{
    this.processStrategy = processStrategy;
  }

  public addProgram(newProgram: Program): boolean
  {
    const result : 
    {
      memory: UnitMemory[],
      added: boolean,
      newTotalMemory: number
    } = this.processStrategy.addProcess(newProgram, this.memory, this.totalMemory, this.offSet);
      this.memory = result.memory;
      this.totalMemory = result.newTotalMemory;
      return result.added;
  }

  public removeProcess(idProcess: string): boolean
  {
    const result: {    
      memory: UnitMemory[],
      removed: boolean,
      newTotalMemory: number
    } = this.processStrategy.removeProcess(idProcess,this.memory, this.totalMemory);
      this.memory = result.memory;
      this.totalMemory = result.newTotalMemory;

      return result.removed;
  }

  public setNumberPagingArray(newPartitions:number[]):void{
    this.numberPagingArray = newPartitions;
  }

  public getNumberPagingArray(){
    return this.numberPagingArray;
  }
}
