import { Process } from '@interfaces/Process.interface';
import { Program } from "@interfaces/Program.interface";
import { MEGABYTE } from "@memory-logic/Strategy//common/common_variables";
import { ProcessContiguousStrategy } from "@memory-logic/Strategy//interfaces/ProcessStrategy.interface";

/**
 * Clase que maneja las particiones contiguas 
 */
// Clase Context
export class MemoryManagamentContiguous {
  private processStrategy!: ProcessContiguousStrategy;
  private memory!: Process[];
  private totalMemory: number;
  private _fixedPatitions: number[] = [];

  constructor() {
    this.totalMemory = 15728640;
  }

  public setInitialMemory(memory: Process[]): void{
    this.memory = memory;
  }

  get Memory(): Process[]{
    if(this.memory === undefined) return []
    else return [...this.memory];
  }

  get total_Memory(): number{
    return this.totalMemory;
  }

  setTotalMemory(): void{
    this.totalMemory = MEGABYTE*15;
  }

  // Inyeccion por setters.
  public setStrategies(
    processStrategy: ProcessContiguousStrategy
  ) : void{
    this.processStrategy = processStrategy;
  }

  public addProgram(newProgram: Program): boolean
  {
    const result : 
    {
      memory: Process[],
      added: boolean,
      newTotalMemory: number
    } = this.processStrategy.addProcess(newProgram, this.memory, this.totalMemory);
      this.memory = result.memory;
      this.totalMemory = result.newTotalMemory;

      return result.added;
  }

  public removeProcess(idProcess: string): boolean
  {
    const result: {    
      memory: Process[],
      removed: boolean,
      newTotalMemory: number
    } = this.processStrategy.removeProcess(idProcess,this.memory, this.totalMemory);
      this.memory = result.memory;
      this.totalMemory = result.newTotalMemory;

      return result.removed;
  }

  public setCurrextFixedPartitions(newPartitions:number[]):void{
    this._fixedPatitions = newPartitions;
  }

  public getCurrentFixedPartitions(){
    return this._fixedPatitions;
  }
}
